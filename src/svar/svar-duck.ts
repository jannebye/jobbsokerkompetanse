import BesvarelseModell from './svar-modell';
import {
    Handling,
    ActionType,
    BesvarAction,
    EndreAlternativAction,
    NesteSporsmalAction,
    ResetAction, VisTipsAction, SkjulTipsAction
} from '../actions';
import SvarAlternativModell from '../sporsmal/svaralternativ';

const { BESVAR, ENDRE_ALTERNATIV, NESTE_SPORSMAL, RESET, VIS_TIPS, SKJUL_TIPS } = ActionType;

export enum FlytType {
    FREMOVER,
    BAKOVER
}

export interface SvarState {
    data: BesvarelseModell[];
    gjeldendeSpmId: string;
    flyt: FlytType;
    tips: {
        skalVises: boolean;
        id: string;
    };
}

export const initialState = {
    data: [{ sporsmalId: 'finn-spm-01', svarAlternativer: [] }],
    gjeldendeSpmId: 'finn-spm-01',
    flyt: FlytType.FREMOVER,
    tips: {skalVises: false, id: ''}
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
                            svarAlternativer: action.data.svarAlternativer
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
                    flyt: FlytType.BAKOVER
                };
            } else {
                return {
                    ...state,
                    data: [
                        ...state.data,
                        { sporsmalId: action.data, svarAlternativer: [] }
                    ],
                    gjeldendeSpmId: action.data,
                    flyt: FlytType.FREMOVER
                };
            }

        case ActionType.RESET:
            return initialState;
        case ActionType.VIS_TIPS:
            return {
                ...state,
                tips: {skalVises: true, id: action.data}
            };
        case ActionType.SKJUL_TIPS:
            console.log('SKJUL');
            return {
                ...state,
                tips: {skalVises: false, id: state.tips.id}
            };
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
