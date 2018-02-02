import SvarAlternativModell from './svaralternativ';

export interface BesvarelseModell {
    sporsmalId: string;
    svarAlternativer: SvarAlternativModell[];
    tips: string | undefined;
}
