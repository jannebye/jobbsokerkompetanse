import { AlternativTyper } from '../utils/konstanter';

interface SporsmalModell {
    id: string;
    alternativer: string[];
    type: AlternativTyper;
    overskriftId?: string;
    erForsteSpm?: boolean;
    erSisteSpm?: boolean;
    uniktAlternativ?: string; // Gjelder når ett alternativ nuller ut og disabler de andre
    egenUndertekst?: string;
}

export default SporsmalModell;
