import { Handling, ActionType, NesteSporsmalAction } from '../actions';
import { Sidetype } from '../utils/konstanter';
import spm from '../sporsmal/sporsmal-alle';
import alleSporsmal from '../sporsmal/sporsmal-alle';

export interface SideState {
    sideType: Sidetype;
    spmId: string;
    viserAlternativer: boolean;
    paVeiBakover: boolean;
}

export const initialState = {
    sideType: Sidetype.START,
    spmId: alleSporsmal[0].id,
    viserAlternativer: false,
    paVeiBakover: false
};

export type SporsmalId = string;

function sporsmalIndex(sporsmalId: SporsmalId) {
    return spm.map(s => s.id).indexOf(sporsmalId);
}

export function erPaVeiBakover(gjeldendeSpmId: SporsmalId, sporsmalId: SporsmalId) {
    return sporsmalIndex(sporsmalId) < sporsmalIndex(gjeldendeSpmId);
}

//  Reducer
export default function reducer(state: SideState = initialState,
                                action: Handling): SideState {
    switch (action.type) {
        case ActionType.NESTE_SPORSMAL: {
            const nySpmId = action.spmId;
            const paVeiBakover = erPaVeiBakover(state.spmId, nySpmId);
            return {
                ...state,
                spmId: nySpmId,
                viserAlternativer: action.spmErBesvart,
                paVeiBakover
            };
        }
        case
        ActionType.FORRIGE_SPORSMAL: {
            return {...state, spmId: action.spmId};
        }
        default:
            return state;
    }
}

export function nesteSporsmal(spmId: string, spmErBesvart: boolean): NesteSporsmalAction {
    return {
        type: ActionType.NESTE_SPORSMAL,
        spmId: spmId,
        spmErBesvart: spmErBesvart
    };
}
