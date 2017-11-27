import SvarAlternativModell from '../sporsmal/svaralternativ';

export default interface BesvarelseModell {
    sporsmalId: string;
    svarAlternativer: SvarAlternativModell[];
}
