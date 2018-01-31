import { BesvarelseModell } from './svar-modell';
import {
    Handling,
    ActionType,
    EndreAlternativAction,
    NesteSporsmalAction,
    ResetAction,
    VisTipsAction,
    SkjulTipsAction,
    VisAlternativerAction,
    EndreAlternativOgAntallAction
} from '../actions';
import SvarAlternativModell from '../sporsmal/svaralternativ';
import spm from '../sporsmal/sporsmal-alle';

const {
    ENDRE_ALTERNATIV,
    ENDRE_ALTERNATIV_OG_ANTALL,
    VIS_ALTERNATIVER,
    NESTE_SPORSMAL,
    RESET,
    VIS_TIPS,
    SKJUL_TIPS
} = ActionType;

export interface SvarState {
    data: BesvarelseModell[];
    gjeldendeSpmId: string;
    viserAlternativer: boolean;
    paVeiBakover: boolean;
    totalAntallSpm: number;
}

export const initialState = {
    data: [
        { sporsmalId: 'finn-spm-01', svarAlternativer: [], tips: undefined }
    ],
    gjeldendeSpmId: 'finn-spm-01',
    viserAlternativer: false,
    paVeiBakover: false,
    totalAntallSpm: 19
};

type SporsmalId = string;

function harBesvartSpm(state: SvarState, sporsmalId: SporsmalId) {
    return state.data.find(
        besvarelse => besvarelse.sporsmalId === sporsmalId
    );
}

function sporsmalIndex(sporsmalId: SporsmalId) {
    return spm.map(s => s.id).indexOf(sporsmalId);
}

export function erPaVeiBakover(gjeldendeSpmId: SporsmalId, sporsmalId: SporsmalId) {
    return sporsmalIndex(sporsmalId) < sporsmalIndex(gjeldendeSpmId);
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
                    data: [
                        ...state.data,
                        {
                            sporsmalId: action.data.sporsmalId,
                            svarAlternativer: action.data.svarAlternativer,
                            tips: undefined
                        }
                    ],
                    totalAntallSpm: action.data.totalAntallSpm
                };
            }
        }
        case ActionType.NESTE_SPORSMAL:
            const sporsmalId = action.data;
            const paVeiBakover = erPaVeiBakover(state.gjeldendeSpmId, sporsmalId);
            if (harBesvartSpm(state, sporsmalId)) {
                return {
                    ...state,
                    gjeldendeSpmId: sporsmalId,
                    viserAlternativer: true,
                    paVeiBakover
                };
            } else {
                return {
                    ...state,
                    data: [
                        ...state.data,
                        {
                            sporsmalId: sporsmalId,
                            svarAlternativer: [],
                            tips: undefined
                        }
                    ],
                    gjeldendeSpmId: sporsmalId,
                    viserAlternativer: false,
                    paVeiBakover
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
                data: [
                    ...state.data.map(
                        besvarelse =>
                            besvarelse.sporsmalId === state.gjeldendeSpmId
                                ? { ...besvarelse, tips: action.data }
                                : besvarelse
                    )
                ]
            };
        case ActionType.SKJUL_TIPS:
            return {
                ...state,
                data: [
                    ...state.data.map(
                        besvarelse =>
                            besvarelse.sporsmalId === state.gjeldendeSpmId
                                ? { ...besvarelse, tips: undefined }
                                : besvarelse
                    )
                ]
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
