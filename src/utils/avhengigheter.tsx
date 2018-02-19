export interface AvhengighetModell {
    sporsmalId: string;
    svarId: string;
    sporsmalSomIkkeVises: string[];
}

const Avhengigheter: AvhengighetModell[] = [
    {
        sporsmalId: 'soke-spm-01',
        svarId: 'soke-svar-0101',
        sporsmalSomIkkeVises: ['soke-spm-02', 'soke-spm-03']
    },
    {
        sporsmalId: 'soke-spm-02',
        svarId: 'soke-svar-0201',
        sporsmalSomIkkeVises: ['soke-spm-03']
    }
];

export default Avhengigheter;
