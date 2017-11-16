export enum typeHandling {
    VIS,
    SKJUL
}

export enum defaultType {
    FAST,
    LEGGES_TIL,
    INGEN
}

export interface TemaModell {
  id: string;
  tekst: string;
  prioritet: number;
  defaultPosisjon: defaultType;
}