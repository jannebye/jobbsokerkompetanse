import SvarAlternativModell from './svaralternativ';
import { AlternativTyper } from '../utils/konstanter';

export default interface SporsmalModell {
    id: string;
    alternativer: SvarAlternativModell[];
    type: AlternativTyper;
    overskriftId?: string;
}
