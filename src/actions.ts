import Svar from './svar/svar-modell';

export enum ActionType {
    BESVAR,
    TILBAKE,
}

export interface BesvarAction {
    type: ActionType.BESVAR;
    data: Svar;
}

export interface TilbakeAction {
    type: ActionType.TILBAKE;
}

export type Handling =
    BesvarAction
    | TilbakeAction
    ;
