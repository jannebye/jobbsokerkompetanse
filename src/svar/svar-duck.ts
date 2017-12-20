import BesvarelseModell from './svar-modell';
import {
    Handling,
    ActionType,
    BesvarAction,
    EndreAlternativAction,
    NesteSporsmalAction,
    ResetAction, VisAlternativerAction, EndreAlternativOgAntallAction
} from '../actions';
import SvarAlternativModell from '../sporsmal/svaralternativ';

const {
    BESVAR,
    ENDRE_ALTERNATIV,
    ENDRE_ALTERNATIV_OG_ANTALL,
    VIS_ALTERNATIVER,
    NESTE_SPORSMAL,
    RESET
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
    totalAntallSpm: number;
}

export const initialState = {
    data: [{sporsmalId: 'finn-spm-01', svarAlternativer: []}],
    gjeldendeSpmId: 'finn-spm-01',
    flyt: FlytType.FREMOVER,
    viserAlternativer: false,
    totalAntallSpm: 19
};

//  Reducer
export default function reducer(state: SvarState = initialState,
                                action: Handling): SvarState {
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
                            svarAlternativer: action.data.svarAlternativer
                        }
                    ]
                };
            }
        }
        case ActionType.ENDRE_ALTERNATIV_OG_ANTALL: {
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
                            svarAlternativer: action.data.svarAlternativer
                        }
                    ],
                    totalAntallSpm: action.data.totalAntallSpm
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
                        {sporsmalId: action.data, svarAlternativer: []}
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

export function marker(sporsmalId: string,
                       svarAlternativ: SvarAlternativModell[]): EndreAlternativAction | EndreAlternativOgAntallAction {
    if (sporsmalId === 'soke-spm-01') {
        if (svarAlternativ.some(alternativ => alternativ.id === 'soke-svar-0101')) {
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
    } else if (sporsmalId === 'soke-spm-02' && svarAlternativ.some(alternativ => alternativ.id === 'soke-svar-0201')) {
        if (svarAlternativ.some(alternativ => alternativ.id === 'soke-svar-0201')) {
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
