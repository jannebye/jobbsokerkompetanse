import { isUndefined } from 'util';
import BesvarelseModell from '../../svar/svar-modell';

export function visTipsEtterSpørsmål(sporsmalId: string, fullBesvarelse: BesvarelseModell[]) {
    switch (sporsmalId) {
        case 'finn-spm-02':
            return tipsSokUtenforHjemsted(fullBesvarelse);
        case 'finn-spm-03':
            return tipsPasserFlereJobber(fullBesvarelse);
        case 'finn-spm-04':
            return tipsVikariatDeltid(fullBesvarelse);
        case 'cv-spm-01':
            return tipsRegistrerCV(fullBesvarelse);
        case 'cv-spm-03':
            return tipsTilpassCv(fullBesvarelse);
        case 'soke-spm-01':
            return tipsOversiktSoknader(fullBesvarelse);
        case 'soke-spm-02':
            return tipsForberedtIkkeIntervju(fullBesvarelse);
        case 'soke-spm-03':
            return tipsIntervjuFokus(fullBesvarelse);
        case 'soke-spm-04':
            return tipsSoknadSvarPaaAnnonsen(fullBesvarelse);
        case 'intervju-spm-03':
            return tipsIntervjuTrygg(fullBesvarelse);
        case 'intervju-spm-04':
            return tipsNettverk(fullBesvarelse);
        default: return undefined;
    }
}

function manglerBesvarelse(besvarelse: BesvarelseModell | undefined): boolean {
    if (isUndefined(besvarelse) || besvarelse.svarAlternativer.length === 0) {
        return true;
    }
    return false;
}

function erAlternativPaaEttvalgsSpmValgt(alternativId: string, besvarelse: BesvarelseModell): boolean {
    return besvarelse.svarAlternativer.some(alt => alt.id === alternativId);
}

/* Returnerer tipsId hvis alternativ 1 og/eller 2 er svart på spm 2, og ingen andre */
export function tipsSokUtenforHjemsted(fullBesvarelse: BesvarelseModell[]): (string | undefined) {
    const besvarelse2 = fullBesvarelse.find(besvarelse => besvarelse.sporsmalId === 'finn-spm-02');
    if (manglerBesvarelse(besvarelse2)) {
        return undefined;
    } else if (besvarelse2!.svarAlternativer
            .filter(alt => alt.id !== 'finn-svar-0201'
                && alt.id !== 'finn-svar-0202').length === 0) {
        return 'sok-utenfor-hjemsted';
    } else {
        return undefined;
    }
}

/* Returnerer tipsId hvis alternativ 1 er valgt på spm 3 */
export function tipsPasserFlereJobber(fullBesvarelse: BesvarelseModell[]): (string | undefined) {
    const besvarelse3 = fullBesvarelse.find(besvarelse => besvarelse.sporsmalId === 'finn-spm-03');
    if (manglerBesvarelse(besvarelse3)) {
        return undefined;
    } else if (besvarelse3!.svarAlternativer
            .some(alt => alt.id === 'finn-svar-0301')) {
        return 'sok-utenfor-hjemsted';
    } else {
        return undefined;
    }
}

/* Returnerer tipsId hvis alternativ 1 og/eller 5 er valgt på spm 4, og ingen andre */
export function tipsVikariatDeltid(fullBesvarelse: BesvarelseModell[]): (string | undefined) {
    const besvarelse4 = fullBesvarelse.find(besvarelse => besvarelse.sporsmalId === 'finn-spm-04');
    if (manglerBesvarelse(besvarelse4)) {
        return undefined;
    } else if (besvarelse4!.svarAlternativer
            .filter(alt => alt.id !== 'finn-svar-0401'
                && alt.id !== 'finn-svar-0405').length === 0) {
        return 'vikariat-deltid';
    } else {
        return undefined;
    }
}

/* Returnerer tipsId hvis det er valgt 2 eller færre alternativ på spm 6 */
export function tipsRegistrerCV(fullBesvarelse: BesvarelseModell[]): (string | undefined) {
    const besvarelse6 = fullBesvarelse.find(besvarelse => besvarelse.sporsmalId === 'cv-spm-01');
    if (manglerBesvarelse(besvarelse6)) {
        return undefined;
    } else if (besvarelse6!.svarAlternativer.length <= 2) {
        return 'vikariat-deltid';
    } else {
        return undefined;
    }
}

/* Returnerer tipsId hvis alternativ 3 er valgt på spm 8, og alternativ 2 eller 3 på spm 3 */
export function tipsTilpassCv(fullBesvarelse: BesvarelseModell[]): (string | undefined) {
    const besvarelse8 = fullBesvarelse.find(besvarelse => besvarelse.sporsmalId === 'cv-spm-03');
    const besvarelse3 = fullBesvarelse.find(besvarelse => besvarelse.sporsmalId === 'finn-spm-03');
    if (manglerBesvarelse(besvarelse8) || manglerBesvarelse(besvarelse3)) {
        return undefined;
    } else if (erAlternativPaaEttvalgsSpmValgt('cv-svar-0303', besvarelse8!) &&
        !erAlternativPaaEttvalgsSpmValgt('finn-svar-0301', besvarelse3!)) {
        return 'tilpass-cv';
    } else {
        return undefined;
    }
}

/* Returnerer tipsId hvis alternativ 2, 3, 4 eller 5 er valgt på spm 11 */
export function tipsOversiktSoknader(fullBesvarelse: BesvarelseModell[]): (string | undefined) {
    const besvarelse11 = fullBesvarelse.find(besvarelse => besvarelse.sporsmalId === 'soke-spm-01');
    if (manglerBesvarelse(besvarelse11)) {
        return undefined;
    } else if (!erAlternativPaaEttvalgsSpmValgt('soke-svar-0101', besvarelse11!)) {
        return 'oversikt-soknader';
    } else {
        return undefined;
    }
}

/* Returnerer tipsId hvis alternativ 1 er valgt på spm 12, og alternativ 5 eller 6 er valgt på spm 11 */
export function tipsForberedtIkkeIntervju(fullBesvarelse: BesvarelseModell[]): (string | undefined) {
    const besvarelse12 = fullBesvarelse.find(besvarelse => besvarelse.sporsmalId === 'soke-spm-02');
    const besvarelse11 = fullBesvarelse.find(besvarelse => besvarelse.sporsmalId === 'soke-spm-01');
    if (manglerBesvarelse(besvarelse12) || manglerBesvarelse(besvarelse11)) {
        return undefined;
    } else if (erAlternativPaaEttvalgsSpmValgt('soke-svar-0201', besvarelse12!) &&
        erAlternativPaaEttvalgsSpmValgt('soke-svar-0105', besvarelse11!)) {
        return 'forberedt-ikke-intervju';
    } else {
        return undefined;
    }
}

/* Returnerer tipsId hvis alternativ 1 er valgt på spm 13, og alternativ 3 er valgt på spm 12 */
export function tipsIntervjuFokus(fullBesvarelse: BesvarelseModell[]): (string | undefined) {
    const besvarelse13 = fullBesvarelse.find(besvarelse => besvarelse.sporsmalId === 'soke-spm-03');
    const besvarelse12 = fullBesvarelse.find(besvarelse => besvarelse.sporsmalId === 'soke-spm-02');
    if (manglerBesvarelse(besvarelse13) || manglerBesvarelse(besvarelse12)) {
        return undefined;
    } else if (erAlternativPaaEttvalgsSpmValgt('soke-svar-0301', besvarelse13!) &&
        erAlternativPaaEttvalgsSpmValgt('soke-svar-0203', besvarelse12!)) {
        return 'intervju-fokus';
    } else {
        return undefined;
    }
}

/* Returnerer tipsId hvis alternativ 1 er valgt på spm 14 */
export function tipsSoknadSvarPaaAnnonsen(fullBesvarelse: BesvarelseModell[]): (string | undefined) {
    const besvarelse14 = fullBesvarelse.find(besvarelse => besvarelse.sporsmalId === 'soke-spm-04');
    if (manglerBesvarelse(besvarelse14)) {
        return undefined;
    } else if (erAlternativPaaEttvalgsSpmValgt('soke-svar-0401', besvarelse14!)) {
        return 'soknad-svar-paa-annonsen';
    } else {
        return undefined;
    }
}

/* Returner tipsId hvis alternativ 1 eller 2 er valgt på spm 17, og 1 eller 2 på spm 16, og 1 eller 2 på spm 15 */
export function tipsIntervjuTrygg(fullBesvarelse: BesvarelseModell[]): (string | undefined) {
    const besvarelse17 = fullBesvarelse.find(besvarelse => besvarelse.sporsmalId === 'intervju-spm-03');
    const besvarelse16 = fullBesvarelse.find(besvarelse => besvarelse.sporsmalId === 'intervju-spm-02');
    const besvarelse15 = fullBesvarelse.find(besvarelse => besvarelse.sporsmalId === 'intervju-spm-01');
    if (manglerBesvarelse(besvarelse17) || manglerBesvarelse(besvarelse16) || manglerBesvarelse(besvarelse15)) {
        return undefined;
    } else if ((erAlternativPaaEttvalgsSpmValgt('intervju-svar-0301', besvarelse17!) ||
            erAlternativPaaEttvalgsSpmValgt('intervju-svar-0302', besvarelse17!)) &&
        (erAlternativPaaEttvalgsSpmValgt('intervju-svar-0201', besvarelse16!) ||
            erAlternativPaaEttvalgsSpmValgt('intervju-svar-0202', besvarelse16!)) &&
        (erAlternativPaaEttvalgsSpmValgt('intervju-svar-0101', besvarelse15!) ||
            erAlternativPaaEttvalgsSpmValgt('intervju-svar-0102', besvarelse15!))) {
        return 'intervju-trygg';
    } else {
        return undefined;
    }
}

/* Returnerer tipsId hvis alternativ 9 er valgt på spørsmål 18 */
export function tipsNettverk(fullBesvarelse: BesvarelseModell[]): (string | undefined) {
    const besvarelse18 = fullBesvarelse.find(besvarelse => besvarelse.sporsmalId === 'intervju-spm-04');
    if (manglerBesvarelse(besvarelse18)) {
        return undefined;
    } else if (erAlternativPaaEttvalgsSpmValgt('intervju-svar-0409', besvarelse18!)) {
        return 'nettverk';
    } else {
        return undefined;
    }
}