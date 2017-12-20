import Svar from './svar/svar-modell';
import { Sidetype } from './utils/konstanter';
import SvarAlternativModell from './sporsmal/svaralternativ';

export enum ActionType {
    BESVAR,
    ENDRE_ALTERNATIV,
    ENDRE_ALTERNATIV_OG_ANTALL,
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

export interface EndreAlternativOgAntallAction {
    type: ActionType.ENDRE_ALTERNATIV_OG_ANTALL;
    data: {
        sporsmalId: string;
        svarAlternativer: SvarAlternativModell[];
        totalAntallSpm: number;
    };
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
    | EndreAlternativOgAntallAction
    | NesteSporsmalAction
    | VisAlternativerAction
    | ForrigeSporsmalAction
    | ResetAction
    | EndreSideAction
    ;
