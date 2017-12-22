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
    ENDRE_SIDE,
    VIS_TIPS,
    SKJUL_TIPS
}

export interface EndreAlternativAction {
    type: ActionType.ENDRE_ALTERNATIV;
    data: {
        sporsmalId: string;
        svarAlternativer: SvarAlternativModell[]
    };
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

export interface VisTipsAction {
    type: ActionType.VIS_TIPS;
    data: string;
}

export interface SkjulTipsAction {
    type: ActionType.SKJUL_TIPS;
}

export type Handling =
    EndreAlternativAction
    | EndreAlternativOgAntallAction
    | NesteSporsmalAction
    | VisAlternativerAction
    | ForrigeSporsmalAction
    | ResetAction
    | EndreSideAction
    | VisTipsAction
    | SkjulTipsAction
    ;
