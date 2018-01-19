import { AppState } from '../ducks/reducer';
import { SvarState } from './svar-duck';
import alleSporsmal from '../sporsmal/sporsmal-alle';
import { BesvarelseModell } from './svar-modell';

function selectSvarSlice(state: AppState): SvarState {
    return state.svar;
}

export function selectAlleSvar(state: AppState) {
    const data = selectSvarSlice(state).data;
    return Object.keys(data).map(k => data[k]);
}

export function selectSvar(state: AppState, id: string) {
    return selectSvarSlice(state)[id];
}

export function selectErAlleSpormalBesvart(besvarelser: BesvarelseModell[]) {
    const liste = [...besvarelser];
    if (liste.length === alleSporsmal.length) {
        if (
            liste.filter(svar => svar.svarAlternativer.length === 0).length ===
            0
        ) {
            return true;
        }
    }
    return false;
}

export function sorterSvar(svar: BesvarelseModell[]) {
    svar.sort(function(svarA: BesvarelseModell, svarB: BesvarelseModell) {
        return (
            Number(svarA.sporsmalId.split('-')[2]) -
            Number(svarB.sporsmalId.split('-')[2])
        );
    });
}
