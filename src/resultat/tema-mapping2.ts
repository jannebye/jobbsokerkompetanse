import { typeHandling } from './tema-modell';

const temaLogikk = {
    'finnJobb1': {
        alternativ: [ '0101' ],
        handling: typeHandling.SKJUL
    },
    'finnJobb2': {
        alternativ: [ '0103' ],
        handling: typeHandling.SKJUL
    },
    'finnJobb3': {
        alternativ: [ '0604', '0703' ],
        handling: typeHandling.SKJUL
    },
    'finnJobb4': {
        alternativ: [ '0107' ],
        handling: typeHandling.SKJUL
    },
    'finnJobb5': {
        alternativ: [ '0104' ],
        handling: typeHandling.SKJUL
    },
    'finnJobb6': {
        alternativ: [ '0603' ],
        handling: typeHandling.SKJUL
    },
    'finnJobb7': {
        alternativ: [ '0102' ],
        handling: typeHandling.SKJUL
    },
    'finnJobb8': {
        sporsmalId: 3,
        alternativ: [ '0302' ],
        handling: typeHandling.SKJUL
    },
    'soknadCV2': {
        alternativ: [ '1007', '1101', '1201', '1401' ],
        handling: typeHandling.VIS
    },
    'soknadCV5': {
        alternativ:  [ '1103', '1104', '1105' ],
        handling: typeHandling.VIS
    },
    'soknadCV6': {
        alternativ: [ '1004' ],
        handling: typeHandling.SKJUL
    },
    'intervju1': {
        alternativ: [ '1101', '1201' ],
        handling: typeHandling.SKJUL
    },
    'intervju2': {
        alternativ: [ '1101', '1201', '1501', '1502', '1601', '1602', '1701' ],
        handling: typeHandling.VIS
    },
    'intervju3': {
        alternativ: [ '1101', '1201' ],
        handling: typeHandling.VIS
    },
    'intervju4': {
        alternativ: [ '1101', '1201' ],
        handling: typeHandling.VIS
    },
    'intervju5': {
        alternativ: [ '1101', '1102', '1501', '1502', '1601', '1602', '1701' ],
        handling: typeHandling.VIS
    },
    'intervju6': {
        alternativ: [ '1603', '1604' ],
        handling: typeHandling.SKJUL
    },
    'intervju7': {
        alternativ: [ '1101', '1102', '1601', '1602', '1701' ],
        handling: typeHandling.VIS
    },
    'intervju8': {
        alternativ: [ '1202', '1203' ],
        handling: typeHandling.VIS
    },
    'intervju9': {
        alternativ: [ '1301' ],
        handling: typeHandling.VIS
    },
    'hverdagJobbsok2': {
        alternativ: [ '1201', '1202' ],
        handling: typeHandling.VIS
    },
    'hverdagJobbsok3': {
        alternativ: [ '1807' ],
        handling: typeHandling.SKJUL
    },
    'hverdagJobbsok4': {
        alternativ: [ '1803' ],
        handling: typeHandling.SKJUL
    },
    'begynnSelv1': {
        alternativ: [ '1101', '1901', '1902' ],
        handling: typeHandling.VIS
    },
    'begynnSelv4': {
        alternativ: [ '1803', '1805' ],
        handling: typeHandling.SKJUL
    },
    'begynnSelv7': {
        alternativ: [ '1805' ],
        handling: typeHandling.SKJUL
    },
    'begynnSelv8': {
        alternativ: [ '1803' ],
        handling: typeHandling.SKJUL
    },
    'begynnSelv12': {
        alternativ: [ '0203', '0204', '0205', '0206', '1806' ],
        handling: typeHandling.SKJUL
    },
    'begynnSelv13': {
        alternativ: [ '0302', '0903', '0904', '0905' ],
        handling: typeHandling.SKJUL
    },

};