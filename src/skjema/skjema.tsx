import * as React from 'react';
import alleSporsmal from '../sporsmal/sporsmal-alle';
import Sporsmal from '../sporsmal/sporsmal';
import { connect } from 'react-redux';
import { Dispatch } from '../types';
import { AppState } from '../ducks/reducer';
import { nesteSporsmal } from '../svar/svar-duck';
import { BesvarelseModell } from '../svar/svar-modell';
import {
    default as Avhengigheter,
    AvhengighetModell
} from '../utils/avhengigheter';

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

function finnNesteSpm(sporsmalId: string,
                      forelopigBesvarelse: BesvarelseModell[]): string {
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
    startPaNytt: () => void;
}

interface StateProps {
    gjeldendeSporsmalId: string;
    forelopigBesvarelse: BesvarelseModell[];
    viserAlternativer: boolean;
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
        const nesteSpmId = finnNesteSpm(spmId, this.props.forelopigBesvarelse);
        this.props.byttSpm(nesteSpmId).then(res => {
            const nesteSpm = this.sporsmalRefs[this.props.gjeldendeSporsmalId];
            nesteSpm.focus();
        });
    }

    render() {
        const {
            handleSubmit,
            startPaNytt,
            gjeldendeSporsmalId,
            byttSpm,
            forelopigBesvarelse,
            viserAlternativer
        } = this.props;
        let sporsmalRefs = this.sporsmalRefs;

        return (
            <Sporsmal
                key={gjeldendeSporsmalId}
                sporsmal={
                    alleSporsmal.find(
                        sporsmal => sporsmal.id === gjeldendeSporsmalId
                    )!
                }
                spmRef={(ref: {}) => (sporsmalRefs[gjeldendeSporsmalId] = ref)}
                nesteSpm={(id: string) => this.byttSpmOgFokus(id)}
                forrigeSpm={() =>
                    byttSpm(
                        forrigeSporsmal(
                            gjeldendeSporsmalId,
                            forelopigBesvarelse
                        )
                    )
                }
                handleSubmit={() => handleSubmit()}
                startPaNytt={() => startPaNytt()}
            />
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    gjeldendeSporsmalId: state.svar.gjeldendeSpmId,
    forelopigBesvarelse: state.svar.data,
    viserAlternativer: state.svar.viserAlternativer
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    byttSpm: (sporsmalId: string) =>
        new Promise(resolve => resolve(dispatch(nesteSporsmal(sporsmalId))))
});

export default connect(mapStateToProps, mapDispatchToProps)(Skjema);
