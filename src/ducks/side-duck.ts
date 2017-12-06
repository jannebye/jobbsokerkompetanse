import { Handling, ActionType, EndreSideAction } from '../actions';
import { Sidetype } from '../utils/konstanter';

const { ENDRE_SIDE } = ActionType;

export interface SideState {
    data: Sidetype;
}

export const initialState = {
    data: Sidetype.START
};

//  Reducer
export default function reducer(
    state: SideState = initialState,
    action: Handling
): SideState {
    switch (action.type) {
        case ActionType.ENDRE_SIDE: {
            return { ...state, data: action.data };
        }
        default:
            return state;
    }
}

export function endreSide(side: Sidetype): EndreSideAction {
    return {
        type: ENDRE_SIDE,
        data: side
    };
}
