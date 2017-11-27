import SvarAlternativModell from './svaralternativ';
import { OverskriftModell } from '../tekster/overskrifter';
import { AlternativTyper } from '../utils/konstanter';

interface SporsmalModell {
    id: string;
    alternativer: SvarAlternativModell[];
    type: AlternativTyper;
    overskriftId?: OverskriftModell;
    erForsteSpm?: boolean;
    erSisteSpm?: boolean;
}

export default SporsmalModell;