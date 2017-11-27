import * as React from 'react';
import { connect } from 'react-redux';
import SporsmalModell from '../sporsmal/sporsmal-modell';
import { marker } from '../svar/svar-duck';
import { Dispatch } from '../types';
import { AppState } from '../ducks/reducer';
import {
    ettValgHjelpetekst,
    flereValgHjelpetekst,
    skalaHjelpetekst
} from '../tekster/hjelptetekster';
import SvarAlternativModell from '../sporsmal/svaralternativ';
import BesvarelseModell from '../svar/svar-modell';
import Alternativ from './alternativ';
// import Avhengigheter, { AvhengighetModell } from '../utils/avhengigheter';
import { AlternativTyper } from '../utils/konstanter';
import { FormattedMessage } from 'react-intl';

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
    markerAlternativ: (sporsmalId: string,
                       alternativ: SvarAlternativModell[]) => void;
}

interface OwnProps {
    nesteSpm: () => void;
    forrigeSpm: () => void;
    sporsmal: SporsmalModell;
    feil?: boolean;
}

interface StateProps {
    besvarteSporsmal: BesvarelseModell[];
}

interface EgenStateProps {
    feil: boolean;
}

function prepMarkerAlternativ(alternativ: SvarAlternativModell,
                              erValgt: boolean,
                              alternativListe: SvarAlternativModell[],
                              sporsmal: SporsmalModell,
                              type: string): SvarAlternativModell[] {
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
                    return alternativ.skalaId! >= alt.skalaId!;
                })
            ];
        }
        return [...alternativListe, alternativ];
    }
}

// function sjekkAvhengigheter(
//     sporsmalId: string,
//     svarteAlternativ: SvarAlternativModell[]
// ): string {
//     const avhengighet: AvhengighetModell | undefined = Avhengigheter.find(
//         avh => avh.sporsmalId === sporsmalId
//     );
//     if (
//         !!avhengighet &&
//         !!svarteAlternativ.find(a => a.id === avhengighet.harSvartAlternativId)
//     ) {
//         return avhengighet.sendesTilSporsmalId;
//     }
// }

type SporsmalProps = OwnProps & DispatchProps & StateProps;

class Sporsmal extends React.Component<SporsmalProps, EgenStateProps> {
    private liElement: HTMLLIElement;

    constructor(props: SporsmalProps) {
        super(props);
        this.state = {feil: false};
    }

    sjekkSvar(markerteSpm: SvarAlternativModell[], sporsmalId: string) {
        if (markerteSpm.length === 0) {
            this.setState({ feil: true });
        } else {
            return this.props.nesteSpm();
        }
    }

    render() {
        const {
            sporsmal,
            besvarteSporsmal,
            markerAlternativ,
            forrigeSpm
        } = this.props;
        const hjelpetekst: string = finnHjelpetekst(sporsmal.type);
        const besvartSpm: BesvarelseModell | undefined = besvarteSporsmal.find(
            besvarelse => besvarelse.sporsmalId === sporsmal.id
        );
        const markerteAlternativer: SvarAlternativModell[] = besvartSpm
            ? besvartSpm.svarAlternativer
            : [];
        if (this.state.feil && markerteAlternativer.length !== 0) {
            this.setState({feil: false});
        }
        return (
            <li
                ref={li => (this.liElement = li!)}
                id={'sp-' + sporsmal.id}
                className={'sporsmal active'}
                tabIndex={0}
            >
                <section>
                    <h1 className="typo-element blokk-xs">
                        <FormattedMessage id={sporsmal.id}/>
                    </h1>
                    {this.state.feil && (
                        <p className="skjemaelement__feilmelding">
                            Du må svare på spørsmålet før du kan gå videre
                        </p>
                    )}
                    <p className="hjelpetekst">{hjelpetekst}</p>
                    {sporsmal.alternativer.map(function (alternativ: SvarAlternativModell) {
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
                    { !sporsmal.erForsteSpm &&
                    <button
                        className="knapp"
                        key="tilbake"
                        onClick={e => {
                            e.preventDefault();
                            forrigeSpm();
                        }}
                    >
                        Tilbake
                    </button> }
                    { !sporsmal.erSisteSpm &&
                    <button
                        className="knapp knapp--hoved"
                        key="besvar"
                        onClick={e => {
                            e.preventDefault();
                            this.sjekkSvar(markerteAlternativer, sporsmal.id);
                        }}
                    >
                        Fortsett
                    </button> }
                </section>
            </li>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    besvarteSporsmal: state.svar.data
});

const mapDispatchToProps = (dispatch: Dispatch,
                            props: OwnProps): DispatchProps => ({
    markerAlternativ: (sporsmalId, alternativ: SvarAlternativModell[]) =>
        dispatch(marker(sporsmalId, alternativ))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sporsmal);
