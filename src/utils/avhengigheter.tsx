import { AlternativTyper } from './konstanter';

export interface AvhengighetModell {
    sporsmalId: number;
    type: AlternativTyper;
    harSvartAlternativId: string;
    sendesTilSporsmalId: number;
}

const Avhengigheter: AvhengighetModell[] = [
    {
        sporsmalId: 11,
        type: AlternativTyper.FLERVALG,
        harSvartAlternativId: '1101',
        sendesTilSporsmalId: 14
    }, {
        sporsmalId: 12,
        type: AlternativTyper.ETTVALG,
        harSvartAlternativId: '1201',
        sendesTilSporsmalId: 14
    }
];

export default Avhengigheter;