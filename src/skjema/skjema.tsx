import * as React from 'react';
import alleSporsmal from '../sporsmal/sporsmal-alle';
import Sporsmal from '../sporsmal/sporsmal';
import { connect } from 'react-redux';
import { Dispatch } from '../types';
import { AppState } from '../ducks/reducer';
import { nesteSporsmal } from '../ducks/side-duck';
import { BesvarelseModell } from '../svar/svar-modell';
import { harBesvartSpm } from '../ducks/svar-duck';

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

interface OwnProps {
    handleSubmit: () => void;
    startPaNytt: () => void;
}

interface StateProps {
    gjeldendeSporsmalId: string;
    forelopigBesvarelse: BesvarelseModell[];
}

interface DispatchProps {
    byttSpm: (sporsmalId: string, spmErBeesvart: boolean) => Promise<{}>;
}

type SkjemaProps = OwnProps & StateProps & DispatchProps;

class Skjema extends React.Component<SkjemaProps, {}> {
    private sporsmalRefs = {};

    constructor(props: SkjemaProps) {
        super(props);
    }

    render() {
        const {
            handleSubmit,
            startPaNytt,
            gjeldendeSporsmalId,
            byttSpm,
            forelopigBesvarelse
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
                forrigeSpm={() =>
                    byttSpm(
                        forrigeSporsmal(
                            gjeldendeSporsmalId,
                            forelopigBesvarelse
                        ),
                        harBesvartSpm(
                            forelopigBesvarelse,
                            gjeldendeSporsmalId
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
    gjeldendeSporsmalId: state.side.spmId,
    forelopigBesvarelse: state.svar.data,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    byttSpm: (sporsmalId: string, spmErBesvart: boolean) => {
        return new Promise(resolve => resolve(dispatch(
            nesteSporsmal(
                sporsmalId,
                spmErBesvart)
            ))
        );
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Skjema);
