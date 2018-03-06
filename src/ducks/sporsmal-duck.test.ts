import {
    fjernAvhengighetsSporsmal, sporsmalSomSkalVisesInneholderAvhengighetsSporsmal,
    inkluderAvhengighetsSporsmal
} from './sporsmal-duck';
import alleSporsmal from '../sporsmal/sporsmal-alle';

describe('sporsmal-duck', () => {
    it('inneholderSporsmalSomSkalFjernes', () => {
        const sporsmalSomVises = ['1', '2', '3', '4'];
        const sporsmalSomSkalFjernes1 = ['1', '2', 'c'];
        const sporsmalSomSkalFjernes2 = ['h'];
        expect(sporsmalSomSkalVisesInneholderAvhengighetsSporsmal(sporsmalSomVises, sporsmalSomSkalFjernes1))
            .toBe(true);
        expect(sporsmalSomSkalVisesInneholderAvhengighetsSporsmal(sporsmalSomVises, sporsmalSomSkalFjernes2))
            .toBe(false);
    });

    it('fjernAvhengighetsSporsmal', () => {
        const sporsmalSomVises = ['1', '2', '3', '4'];
        const sporsmalSomSkalFjernes = ['2', '3'];
        expect(fjernAvhengighetsSporsmal(sporsmalSomVises, sporsmalSomSkalFjernes)).toEqual(['1', '4']);
    });

    it('leggTilAvhengighetsSporsmal', () => {
        const sporsmalSomSkalFjernes = ['finn-spm-03'];
        const state = {
            alleSporsmal: alleSporsmal,
            sporsmalSomVises: ['cv-spm-01', 'intervju-spm-02'],
            besvarteSporsmal: []
        };
        expect(inkluderAvhengighetsSporsmal(state, sporsmalSomSkalFjernes))
            .toEqual(['finn-spm-03', 'cv-spm-01', 'intervju-spm-02']);
    });
    it('skal legge til avhengighetsporsmal', () => {
        const state = {
            alleSporsmal: alleSporsmal,
            sporsmalSomVises: alleSporsmal.map((spm) => spm.id).filter(spm => {
                return !(spm === 'soke-spm-02' || spm === 'soke-spm-03');
            }),
            besvarteSporsmal: []
        };

        expect(state.sporsmalSomVises.length).toBe(state.alleSporsmal.length - 2);
        expect(state.sporsmalSomVises.includes('soke-spm-02')).toBe(false);
        expect(state.sporsmalSomVises.includes('soke-spm-03')).toBe(false);

        const nySporsmalSomVises =
            inkluderAvhengighetsSporsmal(state, ['soke-spm-02', 'soke-spm-03']);
        expect(nySporsmalSomVises.includes('soke-spm-02')).toBe(true);
        expect(nySporsmalSomVises.includes('soke-spm-03')).toBe(true);
    });
});
