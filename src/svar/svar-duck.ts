import BesvarelseModell from './svar-modell';
import {
    Handling,
    ActionType,
    EndreAlternativAction,
    NesteSporsmalAction,
    ResetAction, VisTipsAction, SkjulTipsAction, VisAlternativerAction
} from '../actions';
import SvarAlternativModell from '../sporsmal/svaralternativ';

const {
    ENDRE_ALTERNATIV,
    VIS_ALTERNATIVER,
    NESTE_SPORSMAL,
    RESET,
    VIS_TIPS,
    SKJUL_TIPS
} = ActionType;

export enum FlytType {
    FREMOVER,
    BAKOVER
}

export interface SvarState {
    data: BesvarelseModell[];
    gjeldendeSpmId: string;
    flyt: FlytType;
    viserAlternativer: boolean;
}

export const initialState = {
    data: [{ sporsmalId: 'finn-spm-01', svarAlternativer: [], tips: undefined }],
    gjeldendeSpmId: 'finn-spm-01',
    flyt: FlytType.FREMOVER,
    viserAlternativer: false
};

//  Reducer
export default function reducer(
    state: SvarState = initialState,
    action: Handling
): SvarState {
    switch (action.type) {
        case ActionType.ENDRE_ALTERNATIV: {
            if (
                state.data.find(
                    spm => spm.sporsmalId === action.data.sporsmalId
                )
            ) {
                return {
                    ...state,
                    data: state.data.map(
                        besvarelse =>
                            besvarelse.sporsmalId === action.data.sporsmalId
                                ? {
                                      ...besvarelse,
                                      svarAlternativer:
                                          action.data.svarAlternativer
                                  }
                                : besvarelse
                    )
                };
            } else {
                return {
                    ...state,
                    data: [
                        ...state.data,
                        {
                            sporsmalId: action.data.sporsmalId,
                            svarAlternativer: action.data.svarAlternativer,
                            tips: undefined
                        }
                    ]
                };
            }
        }
        case ActionType.NESTE_SPORSMAL:
            if (
                state.data.find(
                    besvarelse => besvarelse.sporsmalId === action.data
                )
            ) {
                return {
                    ...state,
                    gjeldendeSpmId: action.data,
                    flyt: FlytType.BAKOVER,
                    viserAlternativer: true
                };
            } else {
                return {
                    ...state,
                    data: [
                        ...state.data,
                        { sporsmalId: action.data, svarAlternativer: [], tips: undefined }
                    ],
                    gjeldendeSpmId: action.data,
                    flyt: FlytType.FREMOVER,
                    viserAlternativer: false
                };
            }
        case ActionType.VIS_ALTERNATIVER:
            return {
                ...state,
                viserAlternativer: true
            };
        case ActionType.RESET:
            return initialState;
        case ActionType.VIS_TIPS:
            return {
                ...state,
                data: [...state.data.map(besvarelse => (besvarelse.sporsmalId === state.gjeldendeSpmId) ?
                    {...besvarelse, tips: action.data} : besvarelse ) ]
            };
        case ActionType.SKJUL_TIPS:
            return {
                ...state,
                data: [...state.data.map(besvarelse => (besvarelse.sporsmalId === state.gjeldendeSpmId) ?
                    {...besvarelse, tips: undefined} : besvarelse ) ]
            };
        default:
            return state;
    }
}

// Action Creators

export function marker(
    sporsmalId: string,
    svarAlternativ: SvarAlternativModell[]
): EndreAlternativAction {
    return {
        type: ENDRE_ALTERNATIV,
        data: {
            sporsmalId: sporsmalId,
            svarAlternativer: svarAlternativ
        }
    };
}

export const visHeleSporsmal: VisAlternativerAction = {
    type: VIS_ALTERNATIVER
};

export function nesteSporsmal(sporsmal: string): NesteSporsmalAction {
    return {
        type: NESTE_SPORSMAL,
        data: sporsmal
    };
}

export function reset(): ResetAction {
    return {
        type: RESET
    };
}

export function visTips(tipsId: string): VisTipsAction {
    return {
        type: VIS_TIPS,
        data: tipsId
    };
}

export function skjulTips(): SkjulTipsAction {
    return {
        type: SKJUL_TIPS
    };
}
