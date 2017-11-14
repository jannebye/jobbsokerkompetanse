import SvarAlternativModell from './svaralternativ';
import { OverskriftModell } from '../tekster/overskrifter';
import { AlternativTyper } from '../utils/konstanter';

export default interface SporsmalModell {
    id: number;
    sporsmal: string;
    alternativer: SvarAlternativModell[];
    type: AlternativTyper;
    overskriftId?: OverskriftModell;
}
