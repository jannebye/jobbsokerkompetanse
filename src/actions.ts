import Svar from './svar/svar-modell';
import { Sidetype } from './utils/konstanter';

export enum ActionType {
    BESVAR,
    ENDRE_ALTERNATIV,
    FJERN_MARKERING,
    NESTE_SPORSMAL,
    FORRIGE_SPORSMAL,
    RESET,
    ENDRE_SIDE,
    VIS_TIPS,
    SKJUL_TIPS
}

export interface BesvarAction {
    type: ActionType.BESVAR;
    data: Svar;
}

export interface EndreAlternativAction {
    type: ActionType.ENDRE_ALTERNATIV;
    data: Svar;
}

export interface NesteSporsmalAction {
    type: ActionType.NESTE_SPORSMAL;
    data: string;
}

export interface ForrigeSporsmalAction {
    type: ActionType.FORRIGE_SPORSMAL;
}

export interface ResetAction {
    type: ActionType.RESET;
}

export interface EndreSideAction {
    type: ActionType.ENDRE_SIDE;
    data: Sidetype;
}

export interface VisTipsAction {
    type: ActionType.VIS_TIPS;
    data: string;
}

export interface SkjulTipsAction {
    type: ActionType.SKJUL_TIPS;
}

export type Handling =
    BesvarAction | EndreAlternativAction
    | NesteSporsmalAction | ForrigeSporsmalAction | ResetAction | EndreSideAction | VisTipsAction | SkjulTipsAction
    ;
