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

export interface TemaModell {
    ref: string;
    id: string;
    tekst: string;
    prioritet: number;
    defaultPosisjon: defaultTemaType;
    kategori: TemaKategori;
}
