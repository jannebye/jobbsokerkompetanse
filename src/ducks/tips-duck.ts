import { Handling, ActionType, SkalViseTipsAction, SkalSkjuleTipsAction } from '../actions';

export interface TipsState {
    visTips: boolean;
}

export const initialState = {
    visTips: false
};

//  Reducer
export default function reducer(state: TipsState = initialState, action: Handling): TipsState {
    switch (action.type) {
        case ActionType.SKAL_VISE_TIPS:
            return { ...state, visTips: true };
        case ActionType.SKAL_SKJULE_TIPS:
            return { ...state, visTips: false };
        default:
            return state;
    }
}

export function skalViseTips(): SkalViseTipsAction {
    return {
        type: ActionType.SKAL_VISE_TIPS,
    };
}

export function skalSkjuleTips(): SkalSkjuleTipsAction {
    return {
        type: ActionType.SKAL_SKJULE_TIPS,
    };
}
