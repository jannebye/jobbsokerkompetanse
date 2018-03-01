import reducer, { oppdaterAvgitteSvar } from './svar-duck';
import { AlternativTyper } from '../utils/konstanter';
import { ActionType } from '../actions';

it('duck skal håndtere spørsmålstypen', () => {
    expect(reducer(undefined, {
        type: ActionType.KLIKK_ALTERNATIV,
        spmId: 'cv-spm-01',
        svarId: 'cv-svar-0101',
        besvarteSporsmal: [],
        alternativType: AlternativTyper.FLERVALG,
    })).toEqual({
        avgitteSvar: ['cv-svar-0101'],
        alternativType: AlternativTyper.FLERVALG,
        skalViseNyttTips: false,
        tips: 'registrer-CV'
    });
});

it('oppdaterAvgitteSvar skal legge til flervalgsalternativer', () => {
    const svarId = 'finn-svar-0101';
    const svarState = {
        avgitteSvar: ['finn-svar-0103', 'finn-svar-0104'],
        alternativType: AlternativTyper.FLERVALG,
        tips: undefined,
        skalViseNyttTips: false
};
    expect(oppdaterAvgitteSvar(svarId, svarState)).toEqual(
        ['finn-svar-0103', 'finn-svar-0104', 'finn-svar-0101']
    )
});

it('oppdaterAvgitteSvar skal fjerne flervalgsalternativer', () => {
    const svarId = 'finn-svar-0101';
    const svarState = {
        avgitteSvar: ['finn-svar-0103', 'finn-svar-0104', 'finn-svar-0101'],
        alternativType: AlternativTyper.FLERVALG,
        tips: undefined,
        skalViseNyttTips: false
    };
    expect(oppdaterAvgitteSvar(svarId, svarState)).toEqual(
        ['finn-svar-0103', 'finn-svar-0104']
    )
});
