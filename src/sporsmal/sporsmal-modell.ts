import SvarAlternativModell from './svaralternativ';
import { OverskriftModell } from '../tekster/overskrifter';
import { AlternativTyper } from '../utils/konstanter';

export default interface SporsmalModell {
    id: string;
    alternativer: SvarAlternativModell[];
    type: AlternativTyper;
    overskriftId?: OverskriftModell;
}
