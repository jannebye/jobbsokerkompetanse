import BesvarelseModell from './svar-modell';
import {
    Handling, ActionType, BesvarAction, EndreAlternativAction } from '../actions';
import SvarAlternativModell from '../sporsmal/svaralternativ';

const { BESVAR, ENDRE_ALTERNATIV } = ActionType;

export interface SvarState {
    data: BesvarelseModell[];
}

const initialState = {
    data: []
};

//  Reducer
export default function reducer(
    state: SvarState = initialState,
    action: Handling
): SvarState {
    // return initialState;
    switch (action.type) {
        case ActionType.ENDRE_ALTERNATIV:
            {
                const besvarteSpm: BesvarelseModell[] = state.data
                    .filter((besvarelse) => besvarelse.sporsmalId !== action.data.sporsmalId);
                return {
                    ...state,
                    data: [...besvarteSpm, action.data]
                };
            }
        case ActionType.TILBAKE:
            return { ...state };
        default:
            return state;
    }
}

// Action Creators
export function besvar(svar: BesvarelseModell): BesvarAction {
    return {
        type: BESVAR,
        data: svar
    };
}

export function marker(sporsmalId: number, svarAlternativ: SvarAlternativModell[]): EndreAlternativAction {
    return {
        type: ENDRE_ALTERNATIV,
        data: {
            sporsmalId: sporsmalId,
            svarAlternativer: svarAlternativ
        }
    };
}