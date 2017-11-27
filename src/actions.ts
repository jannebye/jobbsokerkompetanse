import Svar from './svar/svar-modell';

export enum ActionType {
    BESVAR,
    ENDRE_ALTERNATIV,
    FJERN_MARKERING,
    NESTE_SPORSMAL,
    FORRIGE_SPORSMAL,
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

export type Handling =
    BesvarAction | EndreAlternativAction
    | NesteSporsmalAction | ForrigeSporsmalAction
    ;
