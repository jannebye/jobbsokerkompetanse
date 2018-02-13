import { Sidetype } from './utils/konstanter';
import SvarAlternativModell from './svar/svaralternativ';
import { TemaModell } from './resultat/tema-modell';

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
    ENDRE_SPORSMAL,
    VIS_TIPS,
    SKJUL_TIPS,
    HENT_TEMA_OK,
    LEGGE_TIL_SPORSMAL,
}

export interface LeggeTilSporsmalAction {
    type: ActionType.LEGGE_TIL_SPORSMAL;
    spmId: string;
}

export interface EndreAlternativAction {
    type: ActionType.ENDRE_ALTERNATIV;
    data: {
        sporsmalId: string;
        svarAlternativer: SvarAlternativModell[];
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
    spmId: string;
    spmErBesvart: boolean;
}

export interface ForrigeSporsmalAction {
    type: ActionType.FORRIGE_SPORSMAL;
    spmId: string;
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
    tipsId: string;
    spmId: string;
}

export interface SkjulTipsAction {
    type: ActionType.SKJUL_TIPS;
    spmId: string;
}

export interface HentTemaAction {
    type: ActionType.HENT_TEMA_OK;
    data: TemaModell;
}

export type Handling =
    | EndreAlternativAction
    | EndreAlternativOgAntallAction
    | NesteSporsmalAction
    | VisAlternativerAction
    | ForrigeSporsmalAction
    | ResetAction
    | EndreSideAction
    | VisTipsAction
    | SkjulTipsAction
    | HentTemaAction
    | LeggeTilSporsmalAction;
