import * as React from 'react';
import alleSporsmal from '../sporsmal/sporsmal-alle';
import Sporsmal from './sporsmal';
import { connect } from 'react-redux';
import { Dispatch } from '../types';
import { AppState } from '../ducks/reducer';
import { nesteSporsmal } from '../svar/svar-duck';
import BesvarelseModell from '../svar/svar-modell';
import {
    default as Avhengigheter,
    AvhengighetModell
} from '../utils/avhengigheter';
import { FormattedMessage } from 'react-intl';

// TODO: Legg til feilhåndtering hvis spørsmål ikke finnes

function forrigeSporsmal(gjeldendeSpm: string, besvarelse: BesvarelseModell[]) {
    const svarListe: BesvarelseModell[] = [...besvarelse];
    const gjeldendeIndex = svarListe.findIndex(
        spm => spm.sporsmalId === gjeldendeSpm
    );
    if (gjeldendeIndex === -1) {
        // Returnerer siste besvarelse i listen.
        // Gjelder når bruker ikke har valgt noen alternativer på gjeldende spm enda
        return svarListe.find((value, index) => index === svarListe.length - 1)!
            .sporsmalId;
    }
    return svarListe.find((value, index) => index === gjeldendeIndex - 1)!
        .sporsmalId;
}

function finnNesteSpmIListe(id: string): string {
    const gjeldendeIndex = alleSporsmal.findIndex(spm => spm.id === id);
    return alleSporsmal.find((value, index) => index === gjeldendeIndex + 1)!
        .id;
}

function finnNesteSpm(
    sporsmalId: string,
    forelopigBesvarelse: BesvarelseModell[]
): string {
    const avhengighet: AvhengighetModell | undefined = Avhengigheter.find(
        avh => avh.sporsmalId === sporsmalId
    );
    if (
        !!avhengighet &&
        !!forelopigBesvarelse.find(
            b =>
                !!b.svarAlternativer.find(
                    alternativ =>
                        alternativ.id === avhengighet.harSvartAlternativId
                )
        )
    ) {
        return avhengighet.sendesTilSporsmalId;
    }

    return finnNesteSpmIListe(sporsmalId);
}

interface OwnProps {
    handleSubmit: () => void;
}

interface StateProps {
    gjeldendeSporsmalId: string;
    forelopigBesvarelse: BesvarelseModell[];
}

interface DispatchProps {
    byttSpm: (sporsmalId: string) => Promise<{}>;
}

type SkjemaProps = OwnProps & StateProps & DispatchProps;

class Skjema extends React.Component<SkjemaProps, {}> {
    private sporsmalRefs = {};
    constructor(props: SkjemaProps) {
        super(props);

        this.byttSpmOgFokus = this.byttSpmOgFokus.bind(this);
    }

    byttSpmOgFokus(spmId: string) {
        this.props
            .byttSpm(finnNesteSpm(spmId, this.props.forelopigBesvarelse))
            .then(res => {
                const nesteSpm = this.sporsmalRefs[
                    this.props.gjeldendeSporsmalId
                ];
                nesteSpm.focus();
                nesteSpm.scrollIntoView();
            });
    }

    render() {
        const {
            handleSubmit,
            gjeldendeSporsmalId,
            byttSpm,
            forelopigBesvarelse
        } = this.props;
        let sporsmalRefs = this.sporsmalRefs;
        const gjeldendeSporsmal = alleSporsmal.find(
            spm => spm.id === gjeldendeSporsmalId
        );

        return (
            <form>
                <ul className="sporsmalsliste">
                    {forelopigBesvarelse.map(spm => (
                        <Sporsmal
                            key={spm.sporsmalId}
                            sporsmal={
                                alleSporsmal.find(
                                    sporsmal => sporsmal.id === spm.sporsmalId
                                )!
                            }
                            spmRef={(ref: {}) =>
                                (sporsmalRefs[spm.sporsmalId] = ref)}
                            nesteSpm={id => this.byttSpmOgFokus(id)}
                            forrigeSpm={() =>
                                byttSpm(
                                    forrigeSporsmal(
                                        gjeldendeSporsmalId,
                                        forelopigBesvarelse
                                    )
                                )}
                        />
                    ))}
                    {gjeldendeSporsmal!.erSisteSpm && (
                        <button
                            className="knapp knapp--hoved"
                            onClick={() => handleSubmit()}
                        >
                            <FormattedMessage id="send-inn" />
                        </button>
                    )}
                </ul>
            </form>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    gjeldendeSporsmalId: state.gjeldendeSporsmal.data,
    forelopigBesvarelse: state.svar.data
});

const mapDispatchToProps = (
    dispatch: Dispatch,
    props: OwnProps
): DispatchProps => ({
    byttSpm: (sporsmalId: string) =>
        new Promise(resolve => resolve(dispatch(nesteSporsmal(sporsmalId))))
});

export default connect(mapStateToProps, mapDispatchToProps)(Skjema);
