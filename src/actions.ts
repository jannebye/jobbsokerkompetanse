import Svar from './svar/svar-modell';
import { Sidetype } from './utils/konstanter';

export enum ActionType {
    BESVAR,
    ENDRE_ALTERNATIV,
    VIS_ALTERNATIVER,
    FJERN_MARKERING,
    NESTE_SPORSMAL,
    FORRIGE_SPORSMAL,
    RESET,
    ENDRE_SIDE
}

export interface BesvarAction {
    type: ActionType.BESVAR;
    data: Svar;
}

export interface EndreAlternativAction {
    type: ActionType.ENDRE_ALTERNATIV;
    data: Svar;
}

export interface VisAlternativerAction {
    type: ActionType.VIS_ALTERNATIVER;
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

export type Handling =
    BesvarAction
    | EndreAlternativAction
    | NesteSporsmalAction
    | VisAlternativerAction
    | ForrigeSporsmalAction
    | ResetAction
    | EndreSideAction
    ;
