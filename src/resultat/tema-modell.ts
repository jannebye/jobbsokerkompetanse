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

export interface AktivitetModell {
    id: string;
    tittel: string;
    innhold: string;
    tags: {
        tag: string[];
    };
    collapsable:  boolean;
}

interface Aktiviteter {
    aktivitet: AktivitetModell[] | AktivitetModell;
}

interface TemaModell {
    id: string;
    tittel: string;
    refid: string;
    ingress: string;
    aktiviteter: Aktiviteter;
}

interface Temaer {
    tema: TemaModell[];
}

interface StegModell {
    id: string;
    tittel: string;
    forsidetekst: string;
    innhold: string;
    ikon: string;
    temaer: Temaer;
}

export interface RaadModell {
    steg: {
        understeg: StegModell[];
    };
}
