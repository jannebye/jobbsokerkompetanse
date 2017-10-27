import Svar from './svar/svar-modell';

export enum ActionType {
    BESVAR,
    ENDRE_ALTERNATIV,
    FJERN_MARKERING,
    TILBAKE,
}

export interface BesvarAction {
    type: ActionType.BESVAR;
    data: Svar;
}

export interface TilbakeAction {
    type: ActionType.TILBAKE;
}

export interface EndreAlternativAction {
    type: ActionType.ENDRE_ALTERNATIV;
    data: Svar;
}

export type Handling =
    BesvarAction | EndreAlternativAction
    | TilbakeAction
    ;
