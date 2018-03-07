import { AlternativTyper, Sidetype } from './utils/konstanter';
import { TemaModell } from './resultat/tema-modell';
import { BesvartSporsmal } from './ducks/sporsmal-duck';

export enum ActionType {
    ENDRE_ALTERNATIV = 'ENDRE_ALTERNATIV',
    ENDRE_ALTERNATIV_OG_ANTALL = 'ENDRE_ALTERNATIV_OG_ANTALL',
    VIS_ALTERNATIVER = 'VIS_ALTERNATIVER',
    NESTE_SPORSMAL = 'NESTE_SPORSMAL',
    FORRIGE_SPORSMAL = 'FORRIGE_SPORSMAL',
    STARTE_SVAR = 'STARTE_SVAR',
    ENDRE_SIDE = 'ENDRE_SIDE',
    VIS_TIPS = 'VIS_TIPS',
    SKJUL_TIPS = 'SKJUL_TIPS',
    HENT_TEMA_OK = 'HENT_TEMA_OK',
    LEGGE_TIL_SPORSMAL = 'LEGGE_TIL_SPORSMAL',
    LEGG_TIL_BESVART_SPORSMAL = 'LEGG_TIL_BESVART_SPORSMAL',
    KLIKK_ALTERNATIV = 'KLIKK_ALTERNATIV',
    SJEKK_AVHENGIGHETER = 'SJEKK_AVHENGIGHETER',
    NULL_STILL_AVGITTE_SVAR = 'NULL_STILL_AVGITTE_SVAR',
    SKAL_STOPPE_FOR_A_VISE_NYTT_TIPS = 'SKAL_STOPPE_FOR_A_VISE_NYTT_TIPS',
    VIS_NYTT_TIPS = 'VIS_NYTT_TIPS',
    LAST_INN_BESVART_SPORSMAL = 'LAST_INN_BESVART_SPORSMAL',
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

export interface StarteSvarAction {
    type: ActionType.STARTE_SVAR;
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

export interface LeggTilBesvartSporsmalAction {
    type: ActionType.LEGG_TIL_BESVART_SPORSMAL;
    spmId: string;
    svar: string[];
    tips: string | undefined;
}

export interface KlikkAlternativAction {
    type: ActionType.KLIKK_ALTERNATIV;
    svarId: string;
    spmId: string;
    alternativType: AlternativTyper;
    besvarteSporsmal: BesvartSporsmal[];
}

export interface NullStillAvgitteSvarAction {
    type: ActionType.NULL_STILL_AVGITTE_SVAR;
}

export interface StoppForAViseNyttTipsAction {
    type: ActionType.SKAL_STOPPE_FOR_A_VISE_NYTT_TIPS;
    stopp: boolean;
}

export interface VisNyttTipsAction {
    type: ActionType.VIS_NYTT_TIPS;
    skalViseNyttTips: boolean;
}

export interface LastInnBesvartSporsmalAction {
    type: ActionType.LAST_INN_BESVART_SPORSMAL;
    svar: string[];
    tips: string | undefined;
}

export type Handling =
    | EndreAlternativAction
    | EndreAlternativOgAntallAction
    | NesteSporsmalAction
    | ForrigeSporsmalAction
    | StarteSvarAction
    | VisAlternativerAction
    | EndreSideAction
    | VisTipsAction
    | SkjulTipsAction
    | HentTemaAction
    | LeggeTilSporsmalAction
    | LeggTilBesvartSporsmalAction
    | KlikkAlternativAction
    | SjekkAvhengigheterAction
    | NullStillAvgitteSvarAction
    | StoppForAViseNyttTipsAction
    | VisNyttTipsAction
    | LastInnBesvartSporsmalAction;

export interface SjekkAvhengigheterAction {
    type: ActionType.SJEKK_AVHENGIGHETER;
    svarId: string;
    spmId: string;
}
