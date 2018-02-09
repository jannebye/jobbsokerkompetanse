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

export interface TemaModell {
    steg: {
        understeg: StegEnonic[];
    };
}
