import { Handling, ActionType, KlikkAlternativAction } from '../actions';

export interface SvarState {
    avgitteSvar: string[];
}

export const initialState = {
    avgitteSvar: []
};

//  Reducer
export default function reducer(state: SvarState = initialState, action: Handling): SvarState {
    switch (action.type) {
        case ActionType.KLIKK_ALTERNATIV:
            const tempListe = state.avgitteSvar.includes(action.svarId)
                ? state.avgitteSvar.filter(svarId => svarId !== action.svarId)
                : state.avgitteSvar.concat(action.svarId);
            return { ...state, avgitteSvar: tempListe };
        default:
            return state;
    }
}

export function klikkAlternativ(svarId: string): KlikkAlternativAction {
    return {
        type: ActionType.KLIKK_ALTERNATIV,
        svarId: svarId
    };
}
