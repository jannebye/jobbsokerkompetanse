import BesvarelseModell from './svar-modell';
import { Handling, ActionType, BesvarAction, MarkerAction } from '../actions';
import SvarAlternativModell from '../sporsmal/svaralternativ';

const { BESVAR, MARKER } = ActionType;

export interface SvarState {
    data: BesvarelseModell[];
    alternativer: SvarAlternativModell[];
}

const initialState = {
    data: [],
    alternativer: []
};

//  Reducer
export default function reducer(
    state: SvarState = initialState,
    action: Handling
): SvarState {
    switch (action.type) {
        case ActionType.MARKER:
            if (state.alternativer.indexOf(action.data) > -1) {
                return {
                    ...state,
                    alternativer: [...state.alternativer, action.data]
                };
            } else {
                return {
                    ...state,
                    alternativer: state.alternativer.filter(
                        alt => alt !== action.data
                    )
                };
            }
        case ActionType.BESVAR:
            const besvarelse = action.data;
            return { ...state, data: [...state.data, besvarelse] };
        case ActionType.TILBAKE:
            return { ...state };
        default:
            return state;
    }
}

// Action Creators
export function besvar(svar: BesvarelseModell): BesvarAction {
    return {
        type: BESVAR,
        data: svar
    };
}

export function marker(svarAlternativ: SvarAlternativModell): MarkerAction {
    return {
        type: MARKER,
        data: svarAlternativ
    };
}
