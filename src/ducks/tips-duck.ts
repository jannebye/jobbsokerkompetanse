import {
    Handling, ActionType, VisTipsAction,
    SkjulTipsAction
} from '../actions';

export interface TipsState {
    spmTilTipsMap: {
        [key: string]: string
    };
}

export const initialState = {
    spmTilTipsMap: {}
};

//  Reducer
export default function reducer(state: TipsState = initialState, action: Handling): TipsState {
    switch (action.type) {
        case ActionType.VIS_TIPS:
            return { ...state, spmTilTipsMap: { ...state.spmTilTipsMap, [action.spmId]: action.tipsId} };
        case ActionType.SKJUL_TIPS:
            return { ...state };
        default:
            return state;
    }
}

export function visTips(tipsId: string, spmId: string): VisTipsAction {
    return {
        type: ActionType.VIS_TIPS,
        tipsId: tipsId,
        spmId: spmId
    };
}

export function skjulTips(): SkjulTipsAction {
    return {
        type: ActionType.SKJUL_TIPS,
    };
}
