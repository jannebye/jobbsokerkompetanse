
import { typeHandling } from './tema-modell';

const temaLogikk = {
    'finnJobb1': [{
        sporsmalId: 1,
        alternativ: 1,
        handling: typeHandling.SKJUL
    }],
    'finnJobb2': [{
        sporsmalId: 1,
        alternativ: 3,
        handling: typeHandling.SKJUL
    }, {
        sporsmalId: 7,
        alternativ: 3,
        handling: typeHandling.SKJUL
    }],
    'finnJobb3': [{
        sporsmalId: 6,
        alternativ: 4,
        handling: typeHandling.SKJUL
    }],
    'finnJobb4': [{
        sporsmalId: 1,
        alternativ: 7,
        handling: typeHandling.SKJUL
    }],
    'finnJobb5': [{
        sporsmalId: 1,
        alternativ: 4,
        handling: typeHandling.SKJUL
    }],
    'finnJobb6': [{
        sporsmalId: 1,
        alternativ: 2,
        handling: typeHandling.SKJUL
    }],
    'finnJobb7': [{
        sporsmalId: 1,
        alternativ: 2,
        handling: typeHandling.SKJUL
    }],
    'finnJobb8': [{
        sporsmalId: 3,
        alternativ: 2,
        handling: typeHandling.SKJUL
    }],
    'soknadCV2': [{
        sporsmalId: 10,
        alternativ: 7,
        handling: typeHandling.VIS
    }, {
        sporsmalId: 11,
        alternativ: 1,
        handling: typeHandling.VIS
    }, {
        sporsmalId: 12,
        alternativ: 1,
        handling: typeHandling.VIS
    }, {
        sporsmalId: 14,
        alternativ: 1,
        handling: typeHandling.VIS
    }],
    'soknadCV5': [{
        sporsmalId: 11,
        alternativ: [ 3, 4, 5],
        handling: typeHandling.VIS
    }, {
        sporsmalId: 11,
        alternativ: 1,
        handling: typeHandling.VIS
    }, {
        sporsmalId: 12,
        alternativ: 1,
        handling: typeHandling.VIS
    }, {
        sporsmalId: 14,
        alternativ: 1,
        handling: typeHandling.VIS
    }]
};