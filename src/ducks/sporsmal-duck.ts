import { Handling, ActionType, NesteSporsmalAction } from '../actions';

const { NESTE_SPORSMAL } = ActionType;

export interface VisningState {
    data: string;
}

const initialState = {
    data: 'finn-spm-01'
};

//  Reducer
export default function reducer(
    state: VisningState = initialState,
    action: Handling
): VisningState {
    switch (action.type) {
        case ActionType.NESTE_SPORSMAL:
            return { ...state, data: action.data };
        default:
            return state;
    }
}

// Action Creators
export function nesteSporsmal(sporsmal: string): NesteSporsmalAction {
    return {
        type: NESTE_SPORSMAL,
        data: sporsmal
    };
}
