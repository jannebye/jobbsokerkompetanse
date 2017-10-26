import Svar from './svar/svar-modell';
import SvarAlternativModell from './sporsmal/svaralternativ';

export enum ActionType {
    BESVAR,
    MARKER,
    TILBAKE,
}

export interface BesvarAction {
    type: ActionType.BESVAR;
    data: Svar;
}

export interface TilbakeAction {
    type: ActionType.TILBAKE;
}

export interface MarkerAction {
    type: ActionType.MARKER;
    data: SvarAlternativModell;
}

export type Handling =
    BesvarAction | MarkerAction
    | TilbakeAction
    ;
