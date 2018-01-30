export enum defaultTemaType {
    FAST,
    LEGGES_TIL,
    INGEN
}

export enum TemaKategori {
    BEGYNN_MED_DEG_SELV = 'Begynn med deg selv',
    FINN_JOBB = 'Finn jobb',
    SOKNAD_CV = 'Søknad og CV',
    INTERVJU = 'Intervju',
    HVERDAG_JOBBSOKER = 'Hverdagen som jobbsøker'
}

export interface UtledetRaadModell {
    ref: string;
    id: string;
    refid?: string;
    tekst: string;
    prioritet: number;
    defaultPosisjon: defaultTemaType;
    kategori: TemaKategori;
}

export interface Aktivitet {
    id: string;
    tittel: string;
    innhold: string;
    tags: {
        tag: string[];
    };
    collapsable:  boolean;
}

interface Aktiviteter {
    aktivitet: Aktivitet[] | Aktivitet;
}

interface TemaEnonic {
    id: string;
    tittel: string;
    refid: string;
    ingress: string;
    aktiviteter: Aktiviteter;
}

interface Tema {
    id: string;
    tittel: string;
    refid: string;
    ingress: string;
    aktiviteter: Aktivitet[];
}

interface Temaer {
    tema: TemaEnonic[];
}

interface StegEnonic {
    id: string;
    tittel: string;
    forsidetekst: string;
    innhold: string;
    ikon: string;
    temaer: Temaer;
}

interface Steg {
    id: string;
    tittel: string;
    forsidetekst: string;
    innhold: string;
    ikon: string;
    temaer: Tema[];
}

export interface TemaModell {
    steg: {
        understeg: StegEnonic[];
    };
}

export interface RaadModell {
    steg: Steg[];
}
