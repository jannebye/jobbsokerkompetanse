import { Sidetype } from './utils/konstanter';
import { TemaModell } from './resultat/tema-modell';

export enum ActionType {
    ENDRE_ALTERNATIV,
    ENDRE_ALTERNATIV_OG_ANTALL,
    VIS_ALTERNATIVER,
    NESTE_SPORSMAL,
    FORRIGE_SPORSMAL,
    ENDRE_SPORSMAL,
    ENDRE_SIDE,
    VIS_TIPS,
    SKJUL_TIPS,
    HENT_TEMA_OK,
    LEGGE_TIL_SPORSMAL,
    LEGG_TIL_SPORSMAL_SOM_VISES,
    FJERNE_SPORSMAL_SOM_VISES,
    LEGG_TIL_BESVART_SPORSMAL,
    KLIKK_ALTERNATIV,
    SJEKK_AVHENGIGHETER,
}

export interface LeggeTilSporsmalAction {
    type: ActionType.LEGGE_TIL_SPORSMAL;
    spmId: string;
}

export interface EndreAlternativAction {
    type: ActionType.ENDRE_ALTERNATIV;
    data: {
        sporsmalId: string;
        svarAlternativer: string[];
    };
}

export interface EndreAlternativOgAntallAction {
    type: ActionType.ENDRE_ALTERNATIV_OG_ANTALL;
    data: {
        sporsmalId: string;
        svarAlternativer: string[];
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

export interface EndreSideAction {
    type: ActionType.ENDRE_SIDE;
    side: Sidetype;
    spmId: string;
}

export interface VisTipsAction {
    type: ActionType.VIS_TIPS;
    tipsId: string;
    spmId: string;
}

export interface SkjulTipsAction {
    type: ActionType.SKJUL_TIPS;
}

export interface HentTemaAction {
    type: ActionType.HENT_TEMA_OK;
    data: TemaModell;
}

export interface LeggTilSporsmalSomVisesAction {
    type: ActionType.LEGG_TIL_SPORSMAL_SOM_VISES;
    spmId: string;
}

export interface FjerneSporsmalSomVisesAction {
    type: ActionType.FJERNE_SPORSMAL_SOM_VISES;
    spmId: string;
}

export interface LeggTilBesvartSporsmalAction {
    type: ActionType.LEGG_TIL_BESVART_SPORSMAL;
    spmId: string;
    svar: string[];
}

export interface KlikkAlternativAction {
    type: ActionType.KLIKK_ALTERNATIV;
    svarId: string;
}

export interface SjekkAvhengigheterAction {
    type: ActionType.SJEKK_AVHENGIGHETER;
    svarId: string;
    spmId: string;
}

export type Handling =
    | EndreAlternativAction
    | EndreAlternativOgAntallAction
    | NesteSporsmalAction
    | VisAlternativerAction
    | ForrigeSporsmalAction
    | EndreSideAction
    | VisTipsAction
    | SkjulTipsAction
    | HentTemaAction
    | LeggeTilSporsmalAction
    | LeggTilSporsmalSomVisesAction
    | FjerneSporsmalSomVisesAction
    | LeggTilBesvartSporsmalAction
    | KlikkAlternativAction
    | SjekkAvhengigheterAction;
