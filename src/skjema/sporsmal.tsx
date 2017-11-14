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
import Avhengigheter, { AvhengighetModell } from '../utils/avhengigheter';
import { AlternativTyper } from '../utils/konstanter';

function finnHjelpetekst(type: AlternativTyper): string {
    switch (type) {
        case AlternativTyper.FLERVALG:
            return flereValgHjelpetekst;
        case AlternativTyper.ETTVALG:
            return ettValgHjelpetekst;
        case AlternativTyper.SKALA:
            return skalaHjelpetekst;
        default:
            return '';
    }
}

interface DispatchProps {
    markerAlternativ: (
        sporsmalId: string,
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
            return alternativListe.filter(
                alt =>
                    !sporsmalAlternativer.find(
                        a => alt.id === a.id && a.skalaId! > alternativ.skalaId!
                    )
            );
        }
        return alternativListe.filter(alt => alt.id !== alternativ.id);
    } else {
        if (type === 'radio') {
            return [alternativ];
        } else if (type === 'skala') {
            alternativListe = [];
            return [
                ...sporsmalAlternativer.filter(alt => {
                    return alt.skalaId! <= alternativ.skalaId!;
                })
            ];
        }
        return [...alternativListe, alternativ];
    }
}

function sjekkAvhengigheter(
    sporsmalId: string,
    svarteAlternativ: SvarAlternativModell[]
): string {
    const avhengighet: AvhengighetModell | undefined = Avhengigheter.find(
        avh => avh.sporsmalId === sporsmalId
    );
    if (
        !!avhengighet &&
        !!svarteAlternativ.find(a => a.id === avhengighet.harSvartAlternativId)
    ) {
        return avhengighet.sendesTilSporsmalId;
    }
    return '';
}

type SporsmalProps = OwnProps & Dispatch & StateProps;

class Sporsmal extends React.Component<SporsmalProps, EgenStateProps> {
    private liElement: HTMLLIElement;

    constructor(props: SporsmalProps) {
        super(props);
        this.state = { feil: false };
        this.focusNesteSporsmal = this.focusNesteSporsmal.bind(this);
    }

    focusNesteSporsmal() {
        //this.liElement.focus();
    }

    sjekkSvar(markerteSpm: SvarAlternativModell[], sporsmalId: string) {
        if (markerteSpm.length === 0) {
            this.setState({ feil: true });
        } else if (sjekkAvhengigheter(sporsmalId, markerteSpm)) {
            document.getElementById(
                `sp-${sjekkAvhengigheter(sporsmalId, markerteSpm)}`
            )!.scrollIntoView();
            window.scrollBy(0, -300);
        } else {
            const nesteSpmId = sporsmalId + 1;
            document.getElementById(`sp-${nesteSpmId}`)!.scrollIntoView();
            window.scrollBy(0, -300);
        }
    }

    render() {
        const {
            sporsmal,
            besvarteSporsmal,
            markerAlternativ,
            isActive
        } = this.props;
        const hjelpetekst: string = finnHjelpetekst(sporsmal.type);
        const besvartSpm: BesvarelseModell | undefined = besvarteSporsmal.find(
            besvarelse => besvarelse.sporsmalId === sporsmal.id
        );
        const markerteAlternativer: SvarAlternativModell[] = besvartSpm
            ? besvartSpm.svarAlternativer
            : [];
        const cls = ['sporsmal', isActive ? 'active' : ''].join(' ');
        if (this.state.feil && markerteAlternativer.length !== 0) {
            this.setState({ feil: false });
        }
        return (
            <li
                ref={li => (this.liElement = li!)}
                id={'sp-' + sporsmal.id}
                className={cls}
                tabIndex={0}
            >
                <section>
                    <h1 className="typo-element blokk-xs">
                        {sporsmal.id + '.' + ' ' + sporsmal.id}
                    </h1>
                    {this.state.feil && (
                        <p className="skjemaelement__feilmelding">
                            Du må svare på spørsmålet før du kan gå videre
                        </p>
                    )}
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
                                markerAlternativ={() =>
                                    markerAlternativ(
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
                            this.sjekkSvar(markerteAlternativer, sporsmal.id);
                            this.focusNesteSporsmal();
                        }}
                    >
                        Fortsett
                    </button>
                </section>
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
