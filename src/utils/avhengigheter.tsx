import { AlternativTyper } from './konstanter';

export interface AvhengighetModell {
    sporsmalId: string;
    type: AlternativTyper;
    harSvartAlternativId: string;
    sendesTilSporsmalId: string;
}

const Avhengigheter: AvhengighetModell[] = [
    {
        sporsmalId: 'soke-spm-01',
        type: AlternativTyper.FLERVALG,
        harSvartAlternativId: 'soke-svar-0101',
        sendesTilSporsmalId: 'soke-spm-04'
    },
    {
        sporsmalId: 'soke-spm-02',
        type: AlternativTyper.ETTVALG,
        harSvartAlternativId: 'soke-svar-0201',
        sendesTilSporsmalId: 'soke-spm-04'
    }
];

export default Avhengigheter;
