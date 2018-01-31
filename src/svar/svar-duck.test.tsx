import { erPaVeiBakover } from './svar-duck';
import spm from '../sporsmal/sporsmal-alle';

describe('svar-duck', () => {
    describe('erPaVeiBakover', () => {
        it('skal finne ut om brukeren er på vei bakover i spørsmålrekkefølgen', () => {
            const ids = spm.map(s => s.id);

            const spm1 = ids[0];
            const spm2 = ids[4];
            const spm3 = ids[7];
            const spm4 = ids[9];

            expect(erPaVeiBakover(spm2, spm3)).toBe(false);
            expect(erPaVeiBakover(spm4, spm2)).toBe(true);
            expect(erPaVeiBakover(spm1, spm1)).toBe(false);
            expect(erPaVeiBakover(spm4, spm4)).toBe(false);
        });
    });
});
