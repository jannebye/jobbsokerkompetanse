import SvarAlternativModell from './svaralternativ';
export default interface Sporsmal {
    id: number;
    sporsmal: string;
    alternativer: SvarAlternativModell[];
    type: string;
}
