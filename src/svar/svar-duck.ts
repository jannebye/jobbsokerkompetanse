import Svar from './svar-modell';
import { Handling, ActionType, BesvarAction } from '../actions';

const {BESVAR} = ActionType;

export interface SvarState {
    data: {
        [key: string]: Svar
    };
}

const initialState = {
    data: {}
};

//  Reducer
export default function reducer(state: SvarState = initialState, action: Handling): SvarState {
    const stateData = state.data;
    switch (action.type) {
        case ActionType.BESVAR:
            const svar = action.data;
            return {...state, data: {...stateData, [svar.sporsmalId]: svar}};
        case ActionType.TILBAKE:
            return {...state};
        default:
            return state;
    }
}

// Action Creators
export function besvar(svar: Svar): BesvarAction {
    return {
        type: BESVAR,
        data: svar
    };
}
