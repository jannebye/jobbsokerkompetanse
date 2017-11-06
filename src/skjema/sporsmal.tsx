import * as React from 'react';
import { connect } from 'react-redux';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import { marker } from '../svar/svar-duck';
import { Dispatch } from '../types';
import { AppState } from '../reducer';
import {
    ettValgHjelpetekst,
    flereValgHjelpetekst,
    skalaHjelpetekst
} from '../tekster/hjelptetekster';
import SvarAlternativModell from '../sporsmal/svaralternativ';
import BesvarelseModell from '../svar/svar-modell';
import Alternativ from './alternativ';

function finnHjelpetekst(type: string): string {
    switch (type) {
        case 'checkbox':
            return flereValgHjelpetekst;
        case 'radio':
            return ettValgHjelpetekst;
        case 'skala':
            return skalaHjelpetekst;
        default:
            return '';
    }
}

interface DispatchProps {
    markerAlternativ: (
        sporsmalId: number,
        alternativ: SvarAlternativModell[]
    ) => void;
}

interface OwnProps {
    isActive: boolean;
    sporsmal: SporsmalModell;
    feil?: boolean;
}

interface StateProps {
    besvarteSporsmal: BesvarelseModell[];
}

interface EgenStateProps {
    feil: boolean;
}

export type SporsmalProps = DispatchProps & OwnProps & StateProps;

function prepMarkerAlternativ(
    alternativ: SvarAlternativModell,
    erValgt: boolean,
    alternativListe: SvarAlternativModell[],
    sporsmal: SporsmalModell,
    type: string
): SvarAlternativModell[] {
    let sporsmalAlternativer = [...sporsmal.alternativer];
    if (erValgt) {
        if (type === 'radio') {
            return alternativListe;
        } else if (type === 'skala') {
            return alternativListe
                .filter((alt) => !(sporsmalAlternativer
                    .find(a => (alt.id === a.id && (a.skalaId! > alternativ.skalaId!)))));
        }
        return alternativListe.filter(alt => alt.id !== alternativ.id);
    } else {
        if (type === 'radio') {
            return [alternativ];
        } else if (type === 'skala') {
            return [...alternativListe, ...sporsmalAlternativer.filter((alt) => {
                return (alt.skalaId!) <= (alternativ.skalaId!);
            })];
        }
        return [...alternativListe, alternativ];
    }
}

type SporsmalProps = OwnProps & Dispatch & StateProps;

class Sporsmal extends React.Component<SporsmalProps, EgenStateProps> {
    constructor(props: SporsmalProps) {
        super(props);
        this.state = {feil: false};
    }

    sjekkSvar(markerteSpm: SvarAlternativModell[]) {
        if (markerteSpm.length === 0) {
            this.setState({feil: true});
        }
    }

    render() {
        const { sporsmal, besvarteSporsmal, markerAlternativ, isActive  } = this.props;
        const hjelpetekst: string = finnHjelpetekst(sporsmal.type);
        const besvartSpm: BesvarelseModell | undefined = besvarteSporsmal.find(
            besvarelse => besvarelse.sporsmalId === sporsmal.id
        );
        const markerteAlternativer: SvarAlternativModell[] = besvartSpm
            ? besvartSpm.svarAlternativer
            : [];
        const cls = ['sporsmal', isActive ? 'active' : ''].join(' ');
        if (this.state.feil && markerteAlternativer.length !== 0) {
            this.setState({feil: false});
        }
        return (
            <li id={'sp-' + sporsmal.id} className={cls}>
                <h1 className="typo-element blokk-xs">{sporsmal.sporsmal}</h1>
                {this.state.feil && <p className="skjemaelement__feilmelding">
                    Du må svare på spørsmålet før du kan gå videre</p>}
                <p className="hjelpetekst">{hjelpetekst}</p>
                {sporsmal.alternativer.map(function(
                    alternativ: SvarAlternativModell
                ) {
                    const erValgt = !!markerteAlternativer.find(
                        alt => alt.id === alternativ.id
                    );
                    return (
                        <Alternativ
                            key={alternativ.id}
                            alternativ={alternativ}
                            erValgt={erValgt}
                            sporsmalId={sporsmal.id}
                            sporsmalType={sporsmal.type}
                            markerAlternativ={() => markerAlternativ(
                                sporsmal.id,
                                prepMarkerAlternativ(
                                    alternativ,
                                    erValgt,
                                    markerteAlternativer,
                                    sporsmal,
                                    sporsmal.type
                                )
                            )}
                        />
                    );
                })}
                <button
                    className="knapp knapp--hoved"
                    key="besvar"
                    onClick={e => {
                        e.preventDefault();
                        this.sjekkSvar(markerteAlternativer);
                    }}
                >
                    Fortsett
                </button>
            </li>
        );
    }
}


const mapStateToProps = (state: AppState): StateProps => ({
    besvarteSporsmal: state.svar.data
});

const mapDispatchToProps = (
    dispatch: Dispatch,
    props: OwnProps
): DispatchProps => ({
    markerAlternativ: (sporsmalId, alternativ: SvarAlternativModell[]) =>
        dispatch(marker(sporsmalId, alternativ))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sporsmal);
