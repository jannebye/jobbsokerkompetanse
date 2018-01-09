import { visTipsEtterSporsmal } from './tips-generering';
import SvarAlternativModell from '../../sporsmal/svaralternativ';

describe('TipsGenerator', () => {
    let svarAlternativer: Array<SvarAlternativModell>;

    beforeEach(() => {
        svarAlternativer = new Array<SvarAlternativModell>();
    });

    it('skal foreslå å søke jobb utenfor hjemsted dersom man kun ser etter jobber i nærområdet ',
       () => {
            svarAlternativer.push({id: 'finn-svar-0201'});
            const spmId = 'finn-spm-02', expected = 'sok-utenfor-hjemsted';
            const besvarelse = [{sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined}];
            const tips = visTipsEtterSporsmal(spmId, besvarelse);

            expect(tips).toEqual(expected);
        }
    );

    it('skal foreslå å søke jobb utenfor hjemsted dersom man kun ser etter jobber under en times reisevei',
       () => {
            svarAlternativer.push({id: 'finn-svar-0202'});
            const spmId = 'finn-spm-02', expected = 'sok-utenfor-hjemsted';
            const besvarelse = [{sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined}];
            const tips = visTipsEtterSporsmal(spmId, besvarelse);

            expect(tips).toEqual(expected);
        }
    );

    it('skal foreslå å søke jobb utenfor hjemsted ' +
            'dersom man kun ser etter jobber i nærområdet og under en times reisevei',
       () => {
            svarAlternativer.push({id: 'finn-svar-0201'});
            svarAlternativer.push({id: 'finn-svar-0202'});
            const spmId = 'finn-spm-02', expected = 'sok-utenfor-hjemsted';
            const besvarelse = [{sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined}];
            const tips = visTipsEtterSporsmal(spmId, besvarelse);

            expect(tips).toEqual(expected);
        }
    );

    it('skal ikke foreslå å søke jobb utenfor hjemsted dersom man ser etter jobber i flere fylker',
       () => {
            svarAlternativer.push({id: 'finn-svar-0203'});
            const spmId = 'finn-spm-02', expected = undefined;
            const besvarelse = [{sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined}];
            const tips = visTipsEtterSporsmal(spmId, besvarelse);

            expect(tips).toEqual(expected);
        }
    );

    it('skal foreslå å søke på flere type jobber dersom man søker på kun en type stilling',
       () => {
            svarAlternativer.push({id: 'finn-svar-0301'});
            const spmId = 'finn-spm-03', expected = 'passer-flere-jobber';
            const besvarelse = [{sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined}];
            const tips = visTipsEtterSporsmal(spmId, besvarelse);

            expect(tips).toEqual(expected);
        }
    );

    it('skal ikke foreslå å søke på flere type jobber dersom man søker på forskjellige type stillinger',
       () => {
            svarAlternativer.push({id: 'finn-svar-0302'});
            const spmId = 'finn-spm-03', expected = undefined;
            const besvarelse = [{sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined}];
            const tips = visTipsEtterSporsmal(spmId, besvarelse);

            expect(tips).toEqual(expected);
        }
    );

    it('skal foreslå å søke på flere type ansettelser dersom kun søker på faste stillinger',
       () => {
            svarAlternativer.push({id: 'finn-svar-0401'});
            const spmId = 'finn-spm-04', expected = 'vikariat-deltid';
            const besvarelse = [{sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined}];
            const tips = visTipsEtterSporsmal(spmId, besvarelse);

            expect(tips).toEqual(expected);
        }
    );

    it('skal foreslå å søke på flere type ansettelser dersom kun søker på heltid stillinger',
       () => {
            svarAlternativer.push({id: 'finn-svar-0405'});
            const spmId = 'finn-spm-04', expected = 'vikariat-deltid';
            const besvarelse = [{sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined}];
            const tips = visTipsEtterSporsmal(spmId, besvarelse);

            expect(tips).toEqual(expected);
        }
    );

    it('skal ikke foreslå å søke på flere type ansettelser dersom man kun søker på vikariat',
       () => {
            svarAlternativer.push({id: 'finn-svar-0402'});
            const spmId = 'finn-spm-04', expected = undefined;
            const besvarelse = [{sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined}];
            const tips = visTipsEtterSporsmal(spmId, besvarelse);

            expect(tips).toEqual(expected);
        }
    );

    it('skal foreslå å registrere CV flere steder dersom man kun har lagt den inn på ett sted',
       () => {
            svarAlternativer.push({id: 'cv-svar-0101'});
            const spmId = 'cv-spm-01', expected = 'registrer-CV';
            const besvarelse = [{sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined}];
            const tips = visTipsEtterSporsmal(spmId, besvarelse);

            expect(tips).toEqual(expected);
        }
    );

    it('skal foreslå å registrere CV flere steder dersom man kun har lagt den inn på to steder',
       () => {
            svarAlternativer.push({id: 'cv-svar-0101'});
            svarAlternativer.push({id: 'cv-svar-0102'});
            const spmId = 'cv-spm-01', expected = 'registrer-CV';
            const besvarelse = [{sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined}];
            const tips = visTipsEtterSporsmal(spmId, besvarelse);

            expect(tips).toEqual(expected);
        }
    );

    it('skal ikke foreslå å registrere CV flere steder dersom man kun har lagt den inn på flere enn to steder',
       () => {
            svarAlternativer.push({id: 'cv-svar-0101'});
            svarAlternativer.push({id: 'cv-svar-0102'});
            svarAlternativer.push({id: 'cv-svar-0103'});
            const spmId = 'cv-spm-01', expected = undefined;
            const besvarelse = [{sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined}];
            const tips = visTipsEtterSporsmal(spmId, besvarelse);

            expect(tips).toEqual(expected);
        }
    );

    it('skal foreslå å tilpasse søknad og CV dersom man ikke gjør det og søker på forskjellige typer stilling',
       () => {
            svarAlternativer.push({id: 'cv-svar-0303'});
            const spmId = 'cv-spm-03', expected = 'tilpass-cv';
            const besvarelse = [
                {sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined},
                {sporsmalId: 'finn-spm-03', svarAlternativer: [{id: 'finn-svar-0302'}], tips: undefined}
            ];
            const tips = visTipsEtterSporsmal(spmId, besvarelse);

            expect(tips).toEqual(expected);
        }
    );

    it('skal ikke foreslå å tilpasse søknad og CV dersom man gjør det og søker på forskjellige typer stilling',
       () => {
            svarAlternativer.push({id: 'cv-svar-0301'});
            const spmId = 'cv-spm-03', expected = undefined;
            const besvarelse = [
                {sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined},
                {sporsmalId: 'finn-spm-03', svarAlternativer: [{id: 'finn-svar-0302'}], tips: undefined}
            ];
            const tips = visTipsEtterSporsmal(spmId, besvarelse);

            expect(tips).toEqual(expected);
        }
    );

    it('skal ikke foreslå å tilpasse søknad og CV dersom man ikke gjør det men søker på kun en type stilling',
       () => {
            svarAlternativer.push({id: 'cv-svar-0303'});
            const spmId = 'cv-spm-03', expected = undefined;
            const besvarelse = [
                {sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined},
                {sporsmalId: 'finn-spm-03', svarAlternativer: [{id: 'finn-svar-0301'}], tips: undefined}
            ];
            const tips = visTipsEtterSporsmal(spmId, besvarelse);

            expect(tips).toEqual(expected);
        }
    );

    it('skal foreslå å lage en oversikt over stillinger hvis man har søkt på 1-5 stillinger det siste året',
       () => {
            svarAlternativer.push({id: 'soke-svar-0102'});
            const spmId = 'soke-spm-01', expected = 'oversikt-soknader';
            const besvarelse = [{sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined}];
            const tips = visTipsEtterSporsmal(spmId, besvarelse);

            expect(tips).toEqual(expected);
        }
    );

    it('skal foreslå å lage en oversikt over stillinger hvis man har søkt på 50+ stillinger det siste året',
       () => {
            svarAlternativer.push({id: 'soke-svar-0105'});
            const spmId = 'soke-spm-01', expected = 'oversikt-soknader';
            const besvarelse = [{sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined}];
            const tips = visTipsEtterSporsmal(spmId, besvarelse);

            expect(tips).toEqual(expected);
        }
    );

    it('skal ikke foreslå å lage en oversikt over stillinger hvis man ikke har søkt på noen stillinger det siste året',
       () => {
            svarAlternativer.push({id: 'soke-svar-0101'});
            const spmId = 'soke-spm-01', expected = undefined;
            const besvarelse = [{sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined}];
            const tips = visTipsEtterSporsmal(spmId, besvarelse);

            expect(tips).toEqual(expected);
        }
    );

    it('skal foreslå å jobbe bedre med CV og søknaden ' +
        'hvis man ikke har blitt kalt inn til intervju og har søkt på 21-50 stillinger',
       () => {
            svarAlternativer.push({id: 'soke-svar-0201'});
            const spmId = 'soke-spm-02', expected = 'forberedt-ikke-intervju';
            const besvarelse = [
                {sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined},
                {sporsmalId: 'soke-spm-01', svarAlternativer: [{id: 'soke-svar-0104'}], tips: undefined}
            ];
            const tips = visTipsEtterSporsmal(spmId, besvarelse);

            expect(tips).toEqual(expected);
        }
    );

    it('skal foreslå å jobbe bedre med CV og søknaden ' +
        'hvis man ikke har blitt kalt inn til intervju og har søkt på 50+ stillinger',
       () => {
            svarAlternativer.push({id: 'soke-svar-0201'});
            const spmId = 'soke-spm-02', expected = 'forberedt-ikke-intervju';
            const besvarelse = [
                {sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined},
                {sporsmalId: 'soke-spm-01', svarAlternativer: [{id: 'soke-svar-0105'}], tips: undefined}
            ];
            const tips = visTipsEtterSporsmal(spmId, besvarelse);

            expect(tips).toEqual(expected);
        }
    );

    it('skal ikke foreslå å jobbe bedre med CV og søknaden ' +
        'hvis man har blitt kalt inn til intervju og har søkt på 50+ stillinger',
       () => {
            svarAlternativer.push({id: 'soke-svar-0202'});
            const spmId = 'soke-spm-02', expected = undefined;
            const besvarelse = [
                {sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined},
                {sporsmalId: 'soke-spm-01', svarAlternativer: [{id: 'soke-svar-0105'}], tips: undefined}
            ];
            const tips = visTipsEtterSporsmal(spmId, besvarelse);

            expect(tips).toEqual(expected);
        }
    );

    it('skal foreslå fokus på intervjuet ' +
        'dersom man ikke har fått tilbud om stilling og man har vært på flere intervjuer',
       () => {
            svarAlternativer.push({id: 'soke-svar-0301'});
            const spmId = 'soke-spm-03', expected = 'intervju-fokus';
            const besvarelse = [
                {sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined},
                {sporsmalId: 'soke-spm-02', svarAlternativer: [{id: 'soke-svar-0203'}], tips: undefined}
            ];
            const tips = visTipsEtterSporsmal(spmId, besvarelse);

            expect(tips).toEqual(expected);
        }
    );

    it('skal ikke foreslå fokus på intervjuet ' +
        'dersom man ikke har fått tilbud om stilling og man ikke har vært på intervju',
       () => {
            svarAlternativer.push({id: 'soke-svar-0301'});
            const spmId = 'soke-spm-03', expected = undefined;
            const besvarelse = [{sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined},
                {sporsmalId: 'soke-spm-02', svarAlternativer: [{id: 'soke-svar-0201'}], tips: undefined}];
            const tips = visTipsEtterSporsmal(spmId, besvarelse);

            expect(tips).toEqual(expected);
        }
    );

    it('skal foreslå å tilpasse søknaden dersom man sender samme søknad på alle',
       () => {
            svarAlternativer.push({id: 'soke-svar-0401'});
            const spmId = 'soke-spm-04', expected = 'soknad-svar-paa-annonsen';
            const besvarelse = [{sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined}];
            const tips = visTipsEtterSporsmal(spmId, besvarelse);

            expect(tips).toEqual(expected);
        }
    );

    it('skal ikke foreslå å tilpasse søknaden dersom man tilpasser søknaden',
       () => {
            svarAlternativer.push({id: 'soke-svar-0402'});
            const spmId = 'soke-spm-04', expected = undefined;
            const besvarelse = [{sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined}];
            const tips = visTipsEtterSporsmal(spmId, besvarelse);

            expect(tips).toEqual(expected);
        }
    );

   /* it('skal foreslå å forberede til intervjuet alltid?? (spm 16)', () => {
        svarAlternativer.push({id:'soke-svar-0402'});
        const spmId = 'intervju-spm-02', expected = 'intervju-hvorfor-deg';
        const besvarelse = [{sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined}];
        const tips = visTipsEtterSporsmal(spmId, besvarelse);

        expect(tips).toEqual(expected);
    });*/

    it('skal foreslå forberede seg til intervjuet ' +
        'dersom man ikke gjør det bra på intervju, ikke forbereder seg, ikke føler seg trygg',
       () => {
            svarAlternativer.push({id: 'intervju-svar-0301'});
            const spmId = 'intervju-spm-03', expected = 'intervju-trygg';
            const besvarelse = [
                {sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined},
                {sporsmalId: 'intervju-spm-02', svarAlternativer: [{id: 'intervju-svar-0201'}], tips: undefined},
                {sporsmalId: 'intervju-spm-01', svarAlternativer: [{id: 'intervju-svar-0101'}], tips: undefined}
            ];
            const tips = visTipsEtterSporsmal(spmId, besvarelse);

            expect(tips).toEqual(expected);
        }
    );

    it('skal ikke foreslå forberede seg til intervjuet ' +
        'dersom man gjør det bra på intervju, ikke forbereder seg, ikke føler seg trygg',
       () => {
            svarAlternativer.push({id: 'intervju-svar-0304'});
            const spmId = 'intervju-spm-03', expected = undefined;
            const besvarelse = [{sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined},
                {sporsmalId: 'intervju-spm-02', svarAlternativer: [{id: 'intervju-svar-0201'}], tips: undefined},
                {sporsmalId: 'intervju-spm-01', svarAlternativer: [{id: 'intervju-svar-0101'}], tips: undefined}];
            const tips = visTipsEtterSporsmal(spmId, besvarelse);

            expect(tips).toEqual(expected);
        }
    );

    it('skal foreslå å bruke nettverk ' +
        'dersom man ikke har gjort noe for å øke sjansene for å få jobb og man har søkt på mange jobber',
       () => {
            svarAlternativer.push({id: 'intervju-svar-0409'});
            const spmId = 'intervju-spm-04', expected = 'nettverk';
            const besvarelse = [{sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined},
                {sporsmalId: 'soke-spm-01', svarAlternativer: [{id: 'soke-svar-0104'}], tips: undefined}];
            const tips = visTipsEtterSporsmal(spmId, besvarelse);

            expect(tips).toEqual(expected);
        }
    );

    it('skal ikke foreslå å bruke nettverk dersom man gjør det allerede og man har søkt på mange jobber',
       () => {
            svarAlternativer.push({id: 'intervju-svar-0402'});
            const spmId = 'intervju-spm-04', expected = undefined;
            const besvarelse = [{sporsmalId: spmId, svarAlternativer: svarAlternativer, tips: undefined},
                {sporsmalId: 'soke-spm-01', svarAlternativer: [{id: 'soke-svar-0104'}], tips: undefined}];
            const tips = visTipsEtterSporsmal(spmId, besvarelse);

            expect(tips).toEqual(expected);
        }
    );
});
