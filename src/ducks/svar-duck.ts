import { Handling, ActionType, KlikkAlternativAction } from '../actions';
import { AlternativTyper } from '../utils/konstanter';

export interface SvarState {
    avgitteSvar: string[];
    alternativType: AlternativTyper;
}

export const initialState = {
    avgitteSvar: [],
    alternativType: AlternativTyper.ETTVALG
};

//  Reducer
export default function reducer(state: SvarState = initialState, action: Handling): SvarState {
    switch (action.type) {
        case ActionType.KLIKK_ALTERNATIV:
            return {...state, avgitteSvar: oppdaterAvgitteSvar(action.svarId, state), alternativType: action.alternativType};
        default:
            return state;
    }
}

export function oppdaterAvgitteSvar(svarId: string, state: SvarState): string[] {
    let tempListe;
    if (state.alternativType === AlternativTyper.FLERVALG) {
        tempListe = state.avgitteSvar.includes(svarId)
            ? state.avgitteSvar.filter(sid => sid !== svarId)
            : state.avgitteSvar.concat(svarId);
    } else {
        const fellesPrefixSvarId = svarId.substring(0, svarId.length - 2);
        tempListe = state.avgitteSvar.filter(svarId => !svarId.startsWith(fellesPrefixSvarId));
        tempListe = tempListe.concat(svarId);
    }
    return tempListe;
}

export function klikkAlternativ(svarId: string, alternativType: AlternativTyper): KlikkAlternativAction {
    return {
        type: ActionType.KLIKK_ALTERNATIV,
        svarId: svarId,
        alternativType: alternativType
    };
}
