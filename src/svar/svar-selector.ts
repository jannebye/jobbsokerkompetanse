import { AppState } from '../reducer';
import { SvarState } from './svar-duck';
import alleSporsmal from '../sporsmal/sporsmal-alle';

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

export function selectErAlleSpormalBesvart(state: AppState) {
    return selectAlleSvar(state).length === alleSporsmal.length;
}
