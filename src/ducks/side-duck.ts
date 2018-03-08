import {
    Handling, ActionType, StarteSvarAction, StoppForAViseNyttTipsAction,
    ByttSporsmalAction
} from '../actions';
import { Sidetype } from '../utils/konstanter';
import spm from '../sporsmal/sporsmal-alle';
import alleSporsmal from '../sporsmal/sporsmal-alle';

export interface SideState {
    sideType: Sidetype;
    spmId: string;
    viserAlternativer: boolean;
    paVeiBakover: boolean;
    erNySide: boolean;
    skalStoppeForAViseNyttTips: boolean;
}

export const initialState = {
    sideType: Sidetype.START,
    spmId: alleSporsmal[0].id,
    viserAlternativer: false,
    paVeiBakover: false,
    erNySide: true,
    skalStoppeForAViseNyttTips: false
};

export type SporsmalId = string;

function sporsmalIndex(sporsmalId: SporsmalId) {
    return spm.map(s => s.id).indexOf(sporsmalId);
}

export function erPaVeiBakover(gjeldendeSpmId: SporsmalId, sporsmalId: SporsmalId) {
    return sporsmalIndex(sporsmalId) < sporsmalIndex(gjeldendeSpmId);
}

// Reducer
export default function reducer(state: SideState = initialState,
                                action: Handling): SideState {
    switch (action.type) {
        case ActionType.BYTT_SPORSMAL: {
            const paVeiBakover = erPaVeiBakover(state.spmId, action.spmId);
            return {
                ...state,
                sideType: Sidetype.KARTLEGGING,
                spmId: action.spmId,
                viserAlternativer: action.spmErBesvart,
                paVeiBakover,
                erNySide: true
            };
        }
        case ActionType.FORRIGE_SPORSMAL: {
            return {...state, spmId: action.spmId, erNySide: true};
        }
        case ActionType.STARTE_SVAR: {
            return {...state, erNySide: false};
        }
        case ActionType.SKAL_STOPPE_FOR_A_VISE_NYTT_TIPS:
            return { ...state, skalStoppeForAViseNyttTips: action.stopp };
        default:
            return state;
    }
}

export function byttSporsmal(spmId: string, spmErBesvart: boolean): ByttSporsmalAction {
    return {
        type: ActionType.BYTT_SPORSMAL,
        spmId: spmId,
        spmErBesvart: spmErBesvart
    };
}

export function stoppForAViseNyttTips(stopp: boolean): StoppForAViseNyttTipsAction {
    return {
        type: ActionType.SKAL_STOPPE_FOR_A_VISE_NYTT_TIPS,
        stopp: stopp,
    };
}

export function starteSvar(): StarteSvarAction {
    return {
        type: ActionType.STARTE_SVAR
    };
}
