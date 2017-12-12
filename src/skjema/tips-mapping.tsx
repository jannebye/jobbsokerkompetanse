
interface TipsLogikkModell {
    [key: string]: {
        unikeAlternativ?: string[]; // Gjelder hvis tipset genereres av at bruker har valgt kun ett av dem
        flereAlternativ?: string[]; // Gjelder hvis tipset genereres av at bruker har valgt ett eller flere alternativ
        maksAntall?: number; // Gjelder hvis bruker har valgt få flervalgsalternativ
        visesEtterSpm: string; // spørsmålId
    };
}

const tipsLogikk: TipsLogikkModell = {
    'sok-utenfor-hjemsted': {
        unikeAlternativ: ['finn-svar-0201', 'finn-svar-0202'],
        visesEtterSpm: 'finn-spm-01'
    },
    'passer-flere-jobber': {
        flereAlternativ: ['finn-svar-0301'],
        visesEtterSpm: 'finn-spm-03'
    },
    'vikariat-deltid': {
        unikeAlternativ: ['finn-svar-0401', 'finn-svar-0405'],
        visesEtterSpm: 'finn-spm-04'
    }
};

export default tipsLogikk;

