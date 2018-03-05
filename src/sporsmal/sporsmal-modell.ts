import { AlternativTyper } from '../utils/konstanter';

export interface Alternativ {
    id: string;
}

interface SporsmalModell {
    id: string;
    sorter: number;
    alternativer: string[];
    type: AlternativTyper;
    overskriftId?: string;
    erForsteSpm?: boolean;
    erSisteSpm?: boolean;
    uniktAlternativ?: string; // Gjelder når ett alternativ nuller ut og disabler de andre
    egenUndertekst?: string;
}

export default SporsmalModell;
