import { BesvarelseModell } from '../svar/svar-modell';
import {
    Handling,
    ActionType,
    EndreAlternativAction,
    ResetAction,
    VisAlternativerAction,
    EndreAlternativOgAntallAction,
    LeggeTilSporsmalAction
} from '../actions';
import SvarAlternativModell from '../svar/svaralternativ';
import { SporsmalId } from './side-duck';

const {
    ENDRE_ALTERNATIV,
    ENDRE_ALTERNATIV_OG_ANTALL,
    VIS_ALTERNATIVER,
    RESET,
} = ActionType;

export interface SvarState {
    data: BesvarelseModell[];
    viserAlternativer: boolean;
    totalAntallSpm: number;
}

export const initialState = {
    data: [],
    viserAlternativer: false,
    totalAntallSpm: 19
};

export function harBesvartSpm(utforteBesvarelser: BesvarelseModell[], sporsmalId: SporsmalId): boolean {
    return utforteBesvarelser.map((besvarelse) => {
        return besvarelse.sporsmalId;
    }).includes(sporsmalId);
}

//  Reducer
export default function reducer(
    state: SvarState = initialState,
    action: Handling
): SvarState {
    switch (action.type) {
        case ActionType.ENDRE_ALTERNATIV: {
            if (
                state.data.find(
                    (sprsm) => sprsm.sporsmalId === action.data.sporsmalId
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
                    data: state.data.concat(
                        {
                            sporsmalId: action.data.sporsmalId,
                            svarAlternativer: action.data.svarAlternativer,
                            tips: undefined
                        })
                };
            }
        }
        case ActionType.ENDRE_ALTERNATIV_OG_ANTALL: {
            if (
                state.data.find(
                    sprsm => sprsm.sporsmalId === action.data.sporsmalId
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
                    ),
                    totalAntallSpm: action.data.totalAntallSpm
                };
            } else {
                return {
                    ...state,
                    data: state.data.concat(
                        {
                            sporsmalId: action.data.sporsmalId,
                            svarAlternativer: action.data.svarAlternativer,
                            tips: undefined
                        }),
                    totalAntallSpm: action.data.totalAntallSpm
                };
            }
        }
        case ActionType.VIS_ALTERNATIVER:
            return {
                ...state,
                viserAlternativer: true
            };
        case ActionType.RESET:
            return initialState;
        case ActionType.LEGGE_TIL_SPORSMAL:
            return {
                ...state,
                data: state.data.concat({ sporsmalId: action.spmId, svarAlternativer: [], tips: undefined })
            };
        default:
            return state;
    }
}

export function marker(
    sporsmalId: string,
    svarAlternativ: SvarAlternativModell[]
): EndreAlternativAction | EndreAlternativOgAntallAction {
    if (sporsmalId === 'soke-spm-01') {
        if (
            svarAlternativ.some(
                alternativ => alternativ.id === 'soke-svar-0101'
            )
        ) {
            return {
                type: ENDRE_ALTERNATIV_OG_ANTALL,
                data: {
                    sporsmalId: sporsmalId,
                    svarAlternativer: svarAlternativ,
                    totalAntallSpm: 17
                }
            };
        } else {
            return {
                type: ENDRE_ALTERNATIV_OG_ANTALL,
                data: {
                    sporsmalId: sporsmalId,
                    svarAlternativer: svarAlternativ,
                    totalAntallSpm: 19
                }
            };
        }
    } else if (
        sporsmalId === 'soke-spm-02' &&
        svarAlternativ.some(alternativ => alternativ.id === 'soke-svar-0201')
    ) {
        if (
            svarAlternativ.some(
                alternativ => alternativ.id === 'soke-svar-0201'
            )
        ) {
            return {
                type: ENDRE_ALTERNATIV_OG_ANTALL,
                data: {
                    sporsmalId: sporsmalId,
                    svarAlternativer: svarAlternativ,
                    totalAntallSpm: 18
                }
            };
        } else {
            return {
                type: ENDRE_ALTERNATIV_OG_ANTALL,
                data: {
                    sporsmalId: sporsmalId,
                    svarAlternativer: svarAlternativ,
                    totalAntallSpm: 19
                }
            };
        }
    }
    return {
        type: ENDRE_ALTERNATIV,
        data: {
            sporsmalId: sporsmalId,
            svarAlternativer: svarAlternativ
        }
    };
}

export function leggeTilSporsmal(spmId: string): LeggeTilSporsmalAction {
    return {
        type: ActionType.LEGGE_TIL_SPORSMAL,
        spmId: spmId
    };
}

export const visHeleSporsmal: VisAlternativerAction = {
    type: VIS_ALTERNATIVER
};

export function reset(): ResetAction {
    return {
        type: RESET
    };
}
