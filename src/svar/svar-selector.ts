import { AppState } from '../reducer';
import { SvarState } from './svar-duck';
import alleSporsmal from '../sporsmal/sporsmal-alle';

function selectSvarSlice(state: AppState): SvarState {
    return state.svar;
}

export function selectAlleSvar(state: AppState) {
    return Object.values(selectSvarSlice(state).data);
}

export function selectSvar(state: AppState, id: string) {
    return selectSvarSlice(state)[id];
}

export function selectErAlleSpormalBesvart(state: AppState) {
    return selectAlleSvar(state).length === alleSporsmal.length;
}
