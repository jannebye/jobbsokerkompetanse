import {
    Handling, ActionType, KlikkAlternativAction, VisNyttTipsAction,
    NullStillAvgitteSvarAction, LastInnBesvartSporsmalAction
} from '../actions';
import { AlternativTyper } from '../utils/konstanter';
import { BesvartSporsmal } from './sporsmal-duck';
import { visTipsEtterSporsmal } from '../skjema/tips/tips-generering';

export interface SvarState {
    avgitteSvar: string[];
    tips: string | undefined;
    skalViseNyttTips: boolean;
    alternativType: AlternativTyper;
}

export const initialState = {
    avgitteSvar: [],
    tips: undefined,
    skalViseNyttTips: false,
    alternativType: AlternativTyper.ETTVALG
};

//  Reducer
export default function reducer(state: SvarState = initialState, action: Handling): SvarState {
    switch (action.type) {
        case ActionType.KLIKK_ALTERNATIV:
            const avgitteSvar = oppdaterAvgitteSvar(action.svarId, state, action.alternativType);
            const tips = visTipsEtterSporsmal(action.spmId, action.besvarteSporsmal, avgitteSvar);
            return {
                ...state,
                avgitteSvar: avgitteSvar,
                alternativType: action.alternativType,
                tips: tips,
            };
        case ActionType.NULL_STILL_AVGITTE_SVAR:
            return initialState;
        case ActionType.VIS_NYTT_TIPS:
            return {...state, skalViseNyttTips: action.skalViseNyttTips};
        case ActionType.LAST_INN_BESVART_SPORSMAL:
            return {...initialState, avgitteSvar: action.svar, tips: action.tips, skalViseNyttTips: !!action.tips};
        default:
            return state;
    }
}

export function oppdaterAvgitteSvar(svarId: string, state: SvarState, type: AlternativTyper): string[] {
    let tempListe;
    if (type === AlternativTyper.FLERVALG) {
        tempListe = state.avgitteSvar.includes(svarId)
            ? state.avgitteSvar.filter(sid => sid !== svarId)
            : state.avgitteSvar.concat(svarId);
    } else {
        const fellesPrefixSvarId = svarId.substring(0, svarId.length - 2);
        tempListe = state.avgitteSvar.filter(sid => !sid.startsWith(fellesPrefixSvarId));
        tempListe = tempListe.concat(svarId);
    }
    return tempListe;
}

export function klikkAlternativ(svarId: string, spmId: string, besvartSporsmal: BesvartSporsmal[],
                                alternativType: AlternativTyper): KlikkAlternativAction {
    return {
        type: ActionType.KLIKK_ALTERNATIV,
        svarId: svarId,
        spmId: spmId,
        besvarteSporsmal: besvartSporsmal,
        alternativType: alternativType
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

export function lastInnBesvartSporsmal(svar: string[], tips: string | undefined): LastInnBesvartSporsmalAction {
    return {
        type: ActionType.LAST_INN_BESVART_SPORSMAL,
        svar: svar,
        tips: tips,
    };
}
