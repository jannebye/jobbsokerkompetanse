export enum defaultType {
    FAST,
    LEGGES_TIL,
    INGEN
}

export interface TemaModell {
    referanse: string;
    kategori: string;
    tekst: string;
    prioritet: number;
    defaultPosisjon: defaultType;
}
