import { Aktivitet } from './tema-modell';

interface Tema {
    id: string;
    tittel: string;
    refid: string;
    ingress: string;
    aktiviteter: Aktivitet[];
}

interface Steg {
    id: string;
    tittel: string;
    forsidetekst: string;
    innhold: string;
    ikon: string;
    temaer: Tema[];
}

export interface RaadModell {
    steg: Steg[];
}

export const RaadInitialState: RaadModell = {
    steg: [{
        id: '',
        tittel: '',
        forsidetekst: '',
        innhold: '',
        ikon: '',
        temaer: [{
            id: '',
            tittel: '',
            refid: '',
            ingress: '',
            aktiviteter: [{
                id: '',
                tittel: '',
                innhold: '',
                tags: {
                    tag: ['']
                },
                collapsable: true
            }]
        }]
    }]
};

export enum DefaultRaadType {
    FAST,
    LEGGES_TIL,
    INGEN
}

export enum RaadKategori {
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
    defaultPosisjon: DefaultRaadType;
    kategori: RaadKategori;
}
