import { isUndefined } from 'util';
import { BesvartSporsmal } from '../../ducks/sporsmal-duck';

export function visTipsEtterSporsmal(spmId: string, besvarteSporsmal: BesvartSporsmal[]): string | undefined {
    switch (spmId) {
        case 'finn-spm-02':
            return tipsSokUtenforHjemsted(besvarteSporsmal);
        case 'finn-spm-03':
            return tipsPasserFlereJobber(besvarteSporsmal);
        case 'finn-spm-04':
            return tipsVikariatDeltid(besvarteSporsmal);
        case 'cv-spm-01':
            return tipsRegistrerCV(besvarteSporsmal);
        case 'cv-spm-03':
            return tipsTilpassCv(besvarteSporsmal);
        case 'soke-spm-01':
            return tipsOversiktSoknader(besvarteSporsmal);
        case 'soke-spm-02':
            return tipsForberedtIkkeIntervju(besvarteSporsmal);
        case 'soke-spm-03':
            return tipsIntervjuFokus(besvarteSporsmal);
        case 'soke-spm-04':
            return tipsSoknadSvarPaaAnnonsen(besvarteSporsmal);
        case 'intervju-spm-02':
            return tipsHvorforDeg(besvarteSporsmal);
        case 'intervju-spm-03':
            return tipsIntervjuTrygg(besvarteSporsmal);
        case 'intervju-spm-04':
            return tipsNettverk(besvarteSporsmal);
        default:
            return undefined;
    }
}

function manglerBesvarelse(besvarelse: BesvartSporsmal | undefined): boolean {
    return !!(isUndefined(besvarelse) || besvarelse.svar.length === 0);

}

function erAlternativPaaEttvalgsSpmValgt(
    alternativId: string,
    besvarelse: BesvartSporsmal
): boolean {
    return besvarelse.svar.some(alt => alt === alternativId);
}

/* Returnerer tipsId hvis alternativ 1 og/eller 2 er svart på spm 2, og ingen andre */
export function tipsSokUtenforHjemsted(
    besvarteSporsmal: BesvartSporsmal[]
): string | undefined {
    const besvarelse2 = besvarteSporsmal.find(
        besvarelse => besvarelse.spmId === 'finn-spm-02'
    );
    if (manglerBesvarelse(besvarelse2)) {
        return undefined;
    } else if (
        besvarelse2!.svar.filter(
            alt => alt !== 'finn-svar-0201' && alt !== 'finn-svar-0202'
        ).length === 0
    ) {
        return 'sok-utenfor-hjemsted';
    } else {
        return undefined;
    }
}

/* Returnerer tipsId hvis alternativ 1 er valgt på spm 3 */
export function tipsPasserFlereJobber(
    besvarteSporsmal: BesvartSporsmal[]
): string | undefined {
    const besvarelse3 = besvarteSporsmal.find(
        besvarelse => besvarelse.spmId === 'finn-spm-03'
    );
    if (manglerBesvarelse(besvarelse3)) {
        return undefined;
    } else if (
        besvarelse3!.svar.some(alt => alt === 'finn-svar-0301')
    ) {
        return 'passer-flere-jobber';
    } else {
        return undefined;
    }
}

/* Returnerer tipsId hvis alternativ 1 og/eller 5 er valgt på spm 4, og ingen andre */
export function tipsVikariatDeltid(
    besvarteSporsmal: BesvartSporsmal[]
): string | undefined {
    const besvarelse4 = besvarteSporsmal.find(
        besvarelse => besvarelse.spmId === 'finn-spm-04'
    );
    if (manglerBesvarelse(besvarelse4)) {
        return undefined;
    } else if (
        besvarelse4!.svar.filter(
            alt => alt !== 'finn-svar-0401' && alt !== 'finn-svar-0405'
        ).length === 0
    ) {
        return 'vikariat-deltid';
    } else {
        return undefined;
    }
}

/* Returnerer tipsId hvis det er valgt 2 eller færre alternativ på spm 6 */
export function tipsRegistrerCV(
    besvarteSporsmal: BesvartSporsmal[]
): string | undefined {
    const besvarelse6 = besvarteSporsmal.find(
        besvarelse => besvarelse.spmId === 'cv-spm-01'
    );
    if (manglerBesvarelse(besvarelse6)) {
        return undefined;
    } else if (besvarelse6!.svar.length <= 2) {
        return 'registrer-CV';
    } else {
        return undefined;
    }
}

/* Returnerer tipsId hvis alternativ 3 er valgt på spm 8, og alternativ 2 eller 3 på spm 3 */
export function tipsTilpassCv(
    besvarteSporsmal: BesvartSporsmal[]
): string | undefined {
    const besvarelse8 = besvarteSporsmal.find(
        besvarelse => besvarelse.spmId === 'cv-spm-03'
    );
    const besvarelse3 = besvarteSporsmal.find(
        besvarelse => besvarelse.spmId === 'finn-spm-03'
    );
    if (manglerBesvarelse(besvarelse8) || manglerBesvarelse(besvarelse3)) {
        return undefined;
    } else if (
        erAlternativPaaEttvalgsSpmValgt('cv-svar-0303', besvarelse8!) &&
        !erAlternativPaaEttvalgsSpmValgt('finn-svar-0301', besvarelse3!)
    ) {
        return 'tilpass-cv';
    } else {
        return undefined;
    }
}

/* Returnerer tipsId hvis alternativ 2, 3, 4 eller 5 er valgt på spm 11 */
export function tipsOversiktSoknader(
    besvarteSporsmal: BesvartSporsmal[]
): string | undefined {
    const besvarelse11 = besvarteSporsmal.find(
        besvarelse => besvarelse.spmId === 'soke-spm-01'
    );
    if (manglerBesvarelse(besvarelse11)) {
        return undefined;
    } else if (
        !erAlternativPaaEttvalgsSpmValgt('soke-svar-0101', besvarelse11!)
    ) {
        return 'oversikt-soknader';
    } else {
        return undefined;
    }
}

/* Returnerer tipsId hvis alternativ 1 er valgt på spm 12, og alternativ 4 eller 5 er valgt på spm 11 */
export function tipsForberedtIkkeIntervju(
    besvarteSporsmal: BesvartSporsmal[]
): string | undefined {
    const besvarelse12 = besvarteSporsmal.find(
        besvarelse => besvarelse.spmId === 'soke-spm-02'
    );
    const besvarelse11 = besvarteSporsmal.find(
        besvarelse => besvarelse.spmId === 'soke-spm-01'
    );
    if (manglerBesvarelse(besvarelse12) || manglerBesvarelse(besvarelse11)) {
        return undefined;
    } else if (
        erAlternativPaaEttvalgsSpmValgt('soke-svar-0201', besvarelse12!) &&
        (erAlternativPaaEttvalgsSpmValgt('soke-svar-0104', besvarelse11!) ||
            erAlternativPaaEttvalgsSpmValgt('soke-svar-0105', besvarelse11!))
    ) {
        return 'forberedt-ikke-intervju';
    } else {
        return undefined;
    }
}

/* Returnerer tipsId hvis alternativ 1 er valgt på spm 13, og alternativ 3 er valgt på spm 12 */
export function tipsIntervjuFokus(
    besvarteSporsmal: BesvartSporsmal[]
): string | undefined {
    const besvarelse13 = besvarteSporsmal.find(
        besvarelse => besvarelse.spmId === 'soke-spm-03'
    );
    const besvarelse12 = besvarteSporsmal.find(
        besvarelse => besvarelse.spmId === 'soke-spm-02'
    );
    if (manglerBesvarelse(besvarelse13) || manglerBesvarelse(besvarelse12)) {
        return undefined;
    } else if (
        erAlternativPaaEttvalgsSpmValgt('soke-svar-0301', besvarelse13!) &&
        erAlternativPaaEttvalgsSpmValgt('soke-svar-0203', besvarelse12!)
    ) {
        return 'intervju-fokus';
    } else {
        return undefined;
    }
}

/* Returnerer tipsId hvis alternativ 1 er valgt på spm 14 */
export function tipsSoknadSvarPaaAnnonsen(
    besvarteSporsmal: BesvartSporsmal[]
): string | undefined {
    const besvarelse14 = besvarteSporsmal.find(
        besvarelse => besvarelse.spmId === 'soke-spm-04'
    );
    if (manglerBesvarelse(besvarelse14)) {
        return undefined;
    } else if (
        erAlternativPaaEttvalgsSpmValgt('soke-svar-0401', besvarelse14!)
    ) {
        return 'soknad-svar-paa-annonsen';
    } else {
        return undefined;
    }
}

/* Returnerer tipsId uavhengig av valgt alternativ på spm 16*/
export function tipsHvorforDeg(
    besvarteSporsmal: BesvartSporsmal[]
): string | undefined {
    const besvarelse16 = besvarteSporsmal.find(
        besvarelse => besvarelse.spmId === 'intervju-spm-02'
    );
    if (manglerBesvarelse(besvarelse16)) {
        return undefined;
    } else {
        return 'intervju-hvorfor-deg';
    }
}

/* Returner tipsId hvis alternativ 1 eller 2 er valgt på spm 17, og 1 eller 2 på spm 16, og 1 eller 2 på spm 15 */
export function tipsIntervjuTrygg(
    besvarteSporsmal: BesvartSporsmal[]
): string | undefined {
    const besvarelse17 = besvarteSporsmal.find(
        besvarelse => besvarelse.spmId === 'intervju-spm-03'
    );
    const besvarelse16 = besvarteSporsmal.find(
        besvarelse => besvarelse.spmId === 'intervju-spm-02'
    );
    const besvarelse15 = besvarteSporsmal.find(
        besvarelse => besvarelse.spmId === 'intervju-spm-01'
    );
    if (
        manglerBesvarelse(besvarelse17) ||
        manglerBesvarelse(besvarelse16) ||
        manglerBesvarelse(besvarelse15)
    ) {
        return undefined;
    } else if (
        (erAlternativPaaEttvalgsSpmValgt('intervju-svar-0301', besvarelse17!) ||
            erAlternativPaaEttvalgsSpmValgt(
                'intervju-svar-0302',
                besvarelse17!
            )) &&
        (erAlternativPaaEttvalgsSpmValgt('intervju-svar-0201', besvarelse16!) ||
            erAlternativPaaEttvalgsSpmValgt(
                'intervju-svar-0202',
                besvarelse16!
            )) &&
        (erAlternativPaaEttvalgsSpmValgt('intervju-svar-0101', besvarelse15!) ||
            erAlternativPaaEttvalgsSpmValgt(
                'intervju-svar-0102',
                besvarelse15!
            ))
    ) {
        return 'intervju-trygg';
    } else {
        return undefined;
    }
}

/* Returnerer tipsId hvis alternativ 9 er valgt på spørsmål 18 */
export function tipsNettverk(
    besvarteSporsmal: BesvartSporsmal[]
): string | undefined {
    const besvarelse18 = besvarteSporsmal.find(
        besvarelse => besvarelse.spmId === 'intervju-spm-04'
    );
    if (manglerBesvarelse(besvarelse18)) {
        return undefined;
    } else if (
        erAlternativPaaEttvalgsSpmValgt('intervju-svar-0409', besvarelse18!)
    ) {
        return 'nettverk';
    } else {
        return undefined;
    }
}
