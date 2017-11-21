import { typeHandling } from './tema-modell';

const temaLogikk = {
    finnJobb1: {
        alternativ: ['finn-svar-0101'],
        handling: typeHandling.SKJUL
    },
    finnJobb2: {
        alternativ: ['finn-svar-0103'],
        handling: typeHandling.SKJUL
    },
    finnJobb3: {
        alternativ: ['cv-svar-0104', 'cv-svar-0203'],
        handling: typeHandling.SKJUL
    },
    finnJobb4: {
        alternativ: ['finn-svar-0107'],
        handling: typeHandling.SKJUL
    },
    finnJobb5: {
        alternativ: ['finn-svar-0104'],
        handling: typeHandling.SKJUL
    },
    finnJobb6: {
        alternativ: ['cv-svar-0103'],
        handling: typeHandling.SKJUL
    },
    finnJobb7: {
        alternativ: ['finn-svar-0102'],
        handling: typeHandling.SKJUL
    },
    finnJobb8: {
        sporsmalId: 3,
        alternativ: ['finn-svar-0302'],
        handling: typeHandling.SKJUL
    },
    soknadCV2: {
        alternativ: [
            '1007',
            'soke-svar-0101',
            'soke-svar-0201',
            'soke-svar-0401'
        ],
        handling: typeHandling.VIS
    },
    soknadCV5: {
        alternativ: ['soke-svar-0103', 'soke-svar-0104', 'soke-svar-0105'],
        handling: typeHandling.VIS
    },
    soknadCV6: {
        alternativ: ['cv-svar-0104'],
        handling: typeHandling.SKJUL
    },
    intervju1: {
        alternativ: ['soke-svar-0101', 'soke-svar-0201'],
        handling: typeHandling.SKJUL
    },
    intervju2: {
        alternativ: [
            'soke-svar-0101',
            'soke-svar-0201',
            'intervju-svar-0101',
            'intervju-svar-0102',
            'intervju-svar-0201',
            'intervju-svar-0202',
            'intervju-svar-0301'
        ],
        handling: typeHandling.VIS
    },
    intervju3: {
        alternativ: ['soke-svar-0101', 'soke-svar-0201'],
        handling: typeHandling.VIS
    },
    intervju4: {
        alternativ: ['soke-svar-0101', 'soke-svar-0201'],
        handling: typeHandling.VIS
    },
    intervju5: {
        alternativ: [
            'soke-svar-0101',
            'soke-svar-0102',
            'intervju-svar-0101',
            'intervju-svar-0102',
            'intervju-svar-0201',
            'intervju-svar-0202',
            'intervju-svar-0301'
        ],
        handling: typeHandling.VIS
    },
    intervju6: {
        alternativ: ['intervju-svar-0203', 'intervju-svar-0204'],
        handling: typeHandling.SKJUL
    },
    intervju7: {
        alternativ: [
            'soke-svar-0101',
            'soke-svar-0102',
            'intervju-svar-0201',
            'intervju-svar-0202',
            'intervju-svar-0301'
        ],
        handling: typeHandling.VIS
    },
    intervju8: {
        alternativ: ['soke-svar-0202', 'soke-svar-0203'],
        handling: typeHandling.VIS
    },
    intervju9: {
        alternativ: ['soke-svar-0301'],
        handling: typeHandling.VIS
    },
    hverdagJobbsok2: {
        alternativ: ['soke-svar-0201', 'soke-svar-0202'],
        handling: typeHandling.VIS
    },
    hverdagJobbsok3: {
        alternativ: ['intervju-svar-0407'],
        handling: typeHandling.SKJUL
    },
    hverdagJobbsok4: {
        alternativ: ['intervju-svar-0403'],
        handling: typeHandling.SKJUL
    },
    begynnSelv1: {
        alternativ: [
            'soke-svar-0101',
            'intervju-svar-0501',
            'intervju-svar-0502'
        ],
        handling: typeHandling.VIS
    },
    begynnSelv4: {
        alternativ: ['intervju-svar-0403', 'intervju-svar-0405'],
        handling: typeHandling.SKJUL
    },
    begynnSelv7: {
        alternativ: ['intervju-svar-0405'],
        handling: typeHandling.SKJUL
    },
    begynnSelv8: {
        alternativ: ['intervju-svar-0403'],
        handling: typeHandling.SKJUL
    },
    begynnSelv12: {
        alternativ: [
            'finn-svar-0203',
            'finn-svar-0204',
            'finn-svar-0205',
            'finn-svar-0206',
            'intervju-svar-0406'
        ],
        handling: typeHandling.SKJUL
    },
    begynnSelv13: {
        alternativ: [
            'finn-svar-0302',
            'cv-svar-0403',
            'cv-svar-0404',
            'cv-svar-0405'
        ],
        handling: typeHandling.SKJUL
    }
};

export default temaLogikk;
