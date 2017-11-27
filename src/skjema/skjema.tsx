import * as React from 'react';
import alleSporsmal from '../sporsmal/sporsmal-alle';
import Sporsmal from './sporsmal';
import { connect } from 'react-redux';
import { Dispatch } from '../types';
import { AppState } from '../ducks/reducer';
import { nesteSporsmal } from '../sporsmal/sporsmal-duck';
import BesvarelseModell from '../svar/svar-modell';

// TODO: Legg til feilhåndtering hvis spørsmål ikke finnes

function forrigeSporsmal(gjeldendeSpm: string, besvarelse: BesvarelseModell[]) {
    const svarListe: BesvarelseModell[] = [...besvarelse];
    const gjeldendeIndex = svarListe.findIndex(spm => spm.sporsmalId === gjeldendeSpm);
    if (gjeldendeIndex === -1) {
        // Returnerer siste besvarelse i listen.
        // Gjelder når bruker ikke har valgt noen alternativer på gjeldende spm enda
        return svarListe.find((value, index) => index === svarListe.length - 1)!.sporsmalId;
    }
    return svarListe.find((value, index) => index === gjeldendeIndex - 1)!.sporsmalId;
}

function finnNesteSpm(id: string): string {
    const gjeldendeIndex = alleSporsmal.findIndex(spm => spm.id === id);
    return alleSporsmal.find((value, index) => index === gjeldendeIndex + 1)!.id;
}

interface OwnProps {
    handleSubmit: () => void;
}

interface StateProps {
    gjeldendeSporsmalId: string;
    forelopigBesvarelse: BesvarelseModell[];
}

interface DispatchProps {
    byttSpm: (sporsmalId: string) => void;
}

type SkjemaProps = OwnProps & StateProps & DispatchProps;

function Skjema({ handleSubmit, gjeldendeSporsmalId, byttSpm, forelopigBesvarelse }: SkjemaProps) {
    const sporsmal = alleSporsmal.find(spm => (spm.id === gjeldendeSporsmalId));

    return (
        <form className="sporsmalsskjema">
            <Sporsmal
                sporsmal={sporsmal!}
                nesteSpm={() => byttSpm(finnNesteSpm(gjeldendeSporsmalId))}
                forrigeSpm={() => byttSpm( forrigeSporsmal(gjeldendeSporsmalId, forelopigBesvarelse) )}
            />
            <button onClick={() => handleSubmit()}>Send inn</button>
        </form>
    );
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
        dispatch(nesteSporsmal(sporsmalId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Skjema);