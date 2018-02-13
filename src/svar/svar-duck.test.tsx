import { erPaVeiBakover } from '../ducks/side-duck';
import spm from '../sporsmal/sporsmal-alle';

describe('svar-duck', () => {
    describe('erPaVeiBakover', () => {

        const ids = spm.map(s => s.id);

        const spm1 = ids[0];
        const spm5 = ids[4];
        const spm8 = ids[7];
        const spm10 = ids[9];

        it('bruker er på vei bakover', () => {
            expect(erPaVeiBakover(spm5, spm8)).toBe(false);
        });
        it('bruker er på vei forover', () => {
            expect(erPaVeiBakover(spm10, spm5)).toBe(true);
        });
        it('bruker er på gjeldende spørsmål', () => {
            expect(erPaVeiBakover(spm1, spm1)).toBe(false);
            expect(erPaVeiBakover(spm10, spm10)).toBe(false);
        });
    });
});
