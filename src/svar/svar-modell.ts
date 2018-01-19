import SvarAlternativModell from '../sporsmal/svaralternativ';

export interface BesvarelseModell {
    sporsmalId: string;
    svarAlternativer: SvarAlternativModell[];
    tips: string | undefined;
}
