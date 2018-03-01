import { fjernAvhengighetsSporsmal, inneholderSporsmalSomSkalFjernes,
    leggTilAvhengighetsSporsmal } from './sporsmal-duck';

it('inneholderSporsmalSomSkalFjernes', () => {
    const sporsmalSomVises = ['1', '2', '3', '4'];
    const sporsmalSomSkalFjernes1 = ['1', '2', 'c'];
    const sporsmalSomSkalFjernes2 = ['h'];
    expect(inneholderSporsmalSomSkalFjernes(sporsmalSomVises, sporsmalSomSkalFjernes1)).toBe(true);
    expect(inneholderSporsmalSomSkalFjernes(sporsmalSomVises, sporsmalSomSkalFjernes2)).toBe(false);
});

it('fjernAvhengighetsSporsmal', () => {
    const sporsmalSomVises = ['1', '2', '3', '4'];
    const sporsmalSomSkalFjernes = ['2', '3'];
    expect(fjernAvhengighetsSporsmal(sporsmalSomVises, sporsmalSomSkalFjernes)).toEqual(['1', '4']);
});

it('leggTilAvhengighetsSporsmal', () => {
    const sporsmalSomVises = ['cv-spm-01', 'intervju-spm-02'];
    const sporsmalSomSkalFjernes = ['finn-spm-03'];
    expect(leggTilAvhengighetsSporsmal(sporsmalSomVises, sporsmalSomSkalFjernes))
        .toEqual(['finn-spm-03', 'cv-spm-01', 'intervju-spm-02']);
});
