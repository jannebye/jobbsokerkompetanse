import SvarModell from './svar-modell';
import { Handling, ActionType, BesvarAction, MarkerAction } from '../actions';

const {BESVAR, MARKER} = ActionType;

export interface SvarState {
    data: SvarModell[];
    alternativer: string[];
}

const initialState = {
    data: [],
    alternativer: []
};

//  Reducer
export default function reducer(state: SvarState = initialState, action: Handling): SvarState {
    switch (action.type) {
        case ActionType.MARKER:
            return {...state, alternativer: [...state.alternativer, action.data]};
        case ActionType.BESVAR:
            const besvarelse = action.data;
            return {...state, data: [...state.data, besvarelse]};
        case ActionType.TILBAKE:
            return {...state};
        default:
            return state;
    }
}

// Action Creators
export function besvar(svar: SvarModell): BesvarAction {
    return {
        type: BESVAR,
        data: svar
    };
}

export function marker(svarAlternativ: string): MarkerAction {
    return {
        type: MARKER,
        data: svarAlternativ
    };
}
