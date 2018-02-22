import { Handling, ActionType, KlikkAlternativAction, NullStillAvgitteSvarAction, VisNyttTipsAction } from '../actions';
import { visTipsEtterSporsmal } from '../skjema/tips/tips-generering';
import { BesvartSporsmal } from './sporsmal-duck';

export interface SvarState {
    avgitteSvar: string[];
    tips: string | undefined;
    skalViseNyttTips: boolean;
}

export const initialState: SvarState = {
    avgitteSvar: [],
    tips: undefined,
    skalViseNyttTips: false,
};

//  Reducer
export default function reducer(state: SvarState = initialState, action: Handling): SvarState {
    switch (action.type) {
        case ActionType.KLIKK_ALTERNATIV:
            const tempAvgitteSvar = state.avgitteSvar.includes(action.svarId)
                ? state.avgitteSvar.filter(svarId => svarId !== action.svarId)
                : state.avgitteSvar.concat(action.svarId);
            return {
                ...state,
                avgitteSvar: tempAvgitteSvar,
                tips: visTipsEtterSporsmal(action.spmId, action.besvarteSporsmal, tempAvgitteSvar),
            };
        case ActionType.NULL_STILL_AVGITTE_SVAR:
            return initialState;
        case ActionType.VIS_NYTT_TIPS:
            return { ...state, skalViseNyttTips: action.skalViseNyttTips };
        default:
            return state;
    }
}

export function klikkAlternativ(svarId: string, spmId: string,
                                besvarteSporsmal: BesvartSporsmal[]): KlikkAlternativAction {
    return {
        type: ActionType.KLIKK_ALTERNATIV,
        svarId: svarId,
        spmId: spmId,
        besvarteSporsmal: besvarteSporsmal,
    };
}

export function nullStillAvitteSvar(): NullStillAvgitteSvarAction {
    return {
        type: ActionType.NULL_STILL_AVGITTE_SVAR,
    };
}

export function visNyttTips(visTips: boolean): VisNyttTipsAction {
    return {
        type: ActionType.VIS_NYTT_TIPS,
        skalViseNyttTips: visTips,
    };
}
