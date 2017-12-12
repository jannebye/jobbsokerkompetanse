
import SvarAlternativModell from '../sporsmal/svaralternativ';

enum TriggerType {
    ENTEN_ELLER,
    OG_ELLER
}

interface TipsLogikkModell {
    sporsmalId: string;
    id: string;
    alternativ?: string[];
    maksAntall?: number; // Gjelder hvis bruker har valgt få flervalgsalternativ
    visesEtterSpm: string; // spørsmålId
    type?: TriggerType;
}

const tipsLogikk: TipsLogikkModell[] = [
    {
        sporsmalId: 'finn-spm-02',
        id: 'sok-utenfor-hjemsted',
        alternativ: ['finn-svar-0201', 'finn-svar-0202'],
        visesEtterSpm: 'finn-spm-02',
        type: TriggerType.OG_ELLER
    }, {
        sporsmalId: 'finn-spm-03',
        id: 'passer-flere-jobber',
        alternativ: ['finn-svar-0301'],
        visesEtterSpm: 'finn-spm-03',
        type: TriggerType.OG_ELLER
    }, {
        sporsmalId: 'finn-spm-04',
        id: 'vikariat-deltid',
        alternativ: ['finn-svar-0401', 'finn-svar-0405'],
        visesEtterSpm: 'finn-spm-04',
        type: TriggerType.OG_ELLER
    }, {
        sporsmalId: 'cv-spm-01',
        id: 'registrer-CV',
        maksAntall: 2,
        visesEtterSpm: 'cv-spm-01'
     }, // {
    //     sporsmalId: 'cv-spm-03',
    //     id: 'tilpass-cv',
    //     alternativ: ['cv-svar-0303', 'finn-svar-0302', 'finn-svar-0303'],
    //     visesEtterSpm: 'cv-spm-03',
    //     type: TriggerType.ENTEN_ELLER
    // },
    {
        sporsmalId: 'soke-spm-02',
        id: 'oversikt-soknader',
        alternativ: ['soke-svar-0202', 'soke-svar-0203', 'soke-svar-0204', 'soke-svar-0205'],
        visesEtterSpm: 'soke-spm-02',
        type: TriggerType.OG_ELLER
    }

];

export default tipsLogikk;
//
// function finnTipsMaksAntall(svarAlternativer: SvarAlternativModell[], tips: TipsLogikkModell[]) {
//     tips.find(tip => tip.maksAntall ? tip.maksAntall <= svarAlternativer.length : false);
// }
//
export function finnTips(sporsmalId: string, svarAlternativer: SvarAlternativModell[]) {
    const tip = tipsLogikk.find(t => t.sporsmalId === sporsmalId);
    if (!!tip) {
        if (!!tip.maksAntall) {
            return tip.maksAntall <= svarAlternativer.length ? tip.id : false;
        } else if (tip.type === TriggerType.ENTEN_ELLER) {
            return svarAlternativer.
            filter(alt => tip.alternativ!
                .some(a => a === alt.id)).length === 1 ? tip.id : false;
        } else if (tip.type === TriggerType.OG_ELLER) {
            return svarAlternativer
                .some(alt => tip.alternativ!
                    .some(a => alt.id === a)) ? tip.id : false;
        }
    }
    return false;
}