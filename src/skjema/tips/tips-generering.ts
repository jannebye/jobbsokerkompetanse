import { BesvartSporsmal } from '../../ducks/sporsmal-duck';

export function visTipsEtterSporsmal(spmId: string, besvarteSporsmal: BesvartSporsmal[],
                                     avgitteSvar: string[]): string | undefined {
    switch (spmId) {
        case 'finn-spm-02':
            return tipsSokUtenforHjemsted(besvarteSporsmal, avgitteSvar);
        case 'finn-spm-03':
            return tipsPasserFlereJobber(besvarteSporsmal, avgitteSvar);
        case 'finn-spm-04':
            return tipsVikariatDeltid(besvarteSporsmal, avgitteSvar);
        case 'cv-spm-01':
            return tipsRegistrerCV(besvarteSporsmal, avgitteSvar);
        case 'cv-spm-03':
            return tipsTilpassCv(besvarteSporsmal, avgitteSvar);
        case 'soke-spm-01':
            return tipsOversiktSoknader(besvarteSporsmal, avgitteSvar);
        case 'soke-spm-02':
            return tipsForberedtIkkeIntervju(besvarteSporsmal, avgitteSvar);
        case 'soke-spm-03':
            return tipsIntervjuFokus(besvarteSporsmal, avgitteSvar);
        case 'soke-spm-04':
            return tipsSoknadSvarPaaAnnonsen(besvarteSporsmal, avgitteSvar);
        case 'intervju-spm-02':
            return tipsHvorforDeg(besvarteSporsmal, avgitteSvar);
        case 'intervju-spm-03':
            return tipsIntervjuTrygg(besvarteSporsmal, avgitteSvar);
        case 'intervju-spm-04':
            return tipsNettverk(besvarteSporsmal, avgitteSvar);
        default:
            return undefined;
    }
}

function manglerBesvarelse(svar: string[]): boolean {
    return svar.length === 0;

}

function erAlternativPaaEttvalgsSpmValgt(
    alternativId: string,
    avgitteSvar: string[]
): boolean {
    return avgitteSvar.some(alt => alt === alternativId);
}

/* Returnerer tipsId hvis alternativ 1 og/eller 2 er svart på spm 2, og ingen andre */
export function tipsSokUtenforHjemsted(
    besvarteSporsmal: BesvartSporsmal[],
    avgitteSvar: string[],
): string | undefined {
    if (manglerBesvarelse(avgitteSvar)) {
        return undefined;
    } else if (
        avgitteSvar.filter(
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
    besvarteSporsmal: BesvartSporsmal[],
    avgitteSvar: string[],
): string | undefined {
    if (manglerBesvarelse(avgitteSvar)) {
        return undefined;
    } else if (
        avgitteSvar.some(alt => alt === 'finn-svar-0301')
    ) {
        return 'passer-flere-jobber';
    } else {
        return undefined;
    }
}

/* Returnerer tipsId hvis alternativ 1 og/eller 5 er valgt på spm 4, og ingen andre */
export function tipsVikariatDeltid(
    besvarteSporsmal: BesvartSporsmal[],
    avgitteSvar: string[],
): string | undefined {
    if (manglerBesvarelse(avgitteSvar)) {
        return undefined;
    } else if (
        avgitteSvar.filter(
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
    besvarteSporsmal: BesvartSporsmal[],
    avgitteSvar: string[],
): string | undefined {
    if (manglerBesvarelse(avgitteSvar)) {
        return undefined;
    } else if (avgitteSvar.length <= 2) {
        return 'registrer-CV';
    } else {
        return undefined;
    }
}

/* Returnerer tipsId hvis alternativ 3 er valgt på spm 8, og alternativ 2 eller 3 på spm 3 */
export function tipsTilpassCv(
    besvarteSporsmal: BesvartSporsmal[],
    avgitteSvar: string[],
): string | undefined {
    const besvarelse3 = besvarteSporsmal.find(
        besvarelse => besvarelse.spmId === 'finn-spm-03'
    );
    if (manglerBesvarelse(avgitteSvar) || manglerBesvarelse(besvarelse3!.svar)) {
        return undefined;
    } else if (
        erAlternativPaaEttvalgsSpmValgt('cv-svar-0303', avgitteSvar) &&
        !erAlternativPaaEttvalgsSpmValgt('finn-svar-0301', besvarelse3!.svar)
    ) {
        return 'tilpass-cv';
    } else {
        return undefined;
    }
}

/* Returnerer tipsId hvis alternativ 2, 3, 4 eller 5 er valgt på spm 11 */
export function tipsOversiktSoknader(
    besvarteSporsmal: BesvartSporsmal[],
    avgitteSvar: string[],
): string | undefined {
    if (manglerBesvarelse(avgitteSvar)) {
        return undefined;
    } else if (
        !erAlternativPaaEttvalgsSpmValgt('soke-svar-0101', avgitteSvar)
    ) {
        return 'oversikt-soknader';
    } else {
        return undefined;
    }
}

/* Returnerer tipsId hvis alternativ 1 er valgt på spm 12, og alternativ 4 eller 5 er valgt på spm 11 */
export function tipsForberedtIkkeIntervju(
    besvarteSporsmal: BesvartSporsmal[],
    avgitteSvar: string[],
): string | undefined {
    const besvarelse11 = besvarteSporsmal.find(
        besvarelse => besvarelse.spmId === 'soke-spm-01'
    );
    if (manglerBesvarelse(avgitteSvar) || manglerBesvarelse(besvarelse11!.svar)) {
        return undefined;
    } else if (
        erAlternativPaaEttvalgsSpmValgt('soke-svar-0201', avgitteSvar) &&
        (erAlternativPaaEttvalgsSpmValgt('soke-svar-0104', besvarelse11!.svar) ||
            erAlternativPaaEttvalgsSpmValgt('soke-svar-0105', besvarelse11!.svar))
    ) {
        return 'forberedt-ikke-intervju';
    } else {
        return undefined;
    }
}

/* Returnerer tipsId hvis alternativ 1 er valgt på spm 13, og alternativ 3 er valgt på spm 12 */
export function tipsIntervjuFokus(
    besvarteSporsmal: BesvartSporsmal[],
    avgitteSvar: string[],
): string | undefined {
    const besvarelse12 = besvarteSporsmal.find(
        besvarelse => besvarelse.spmId === 'soke-spm-02'
    );
    if (manglerBesvarelse(avgitteSvar) || manglerBesvarelse(besvarelse12!.svar)) {
        return undefined;
    } else if (
        erAlternativPaaEttvalgsSpmValgt('soke-svar-0301', avgitteSvar) &&
        erAlternativPaaEttvalgsSpmValgt('soke-svar-0203', besvarelse12!.svar)
    ) {
        return 'intervju-fokus';
    } else {
        return undefined;
    }
}

/* Returnerer tipsId hvis alternativ 1 er valgt på spm 14 */
export function tipsSoknadSvarPaaAnnonsen(
    besvarteSporsmal: BesvartSporsmal[],
    avgitteSvar: string[],
): string | undefined {
    if (manglerBesvarelse(avgitteSvar)) {
        return undefined;
    } else if (
        erAlternativPaaEttvalgsSpmValgt('soke-svar-0401', avgitteSvar)
    ) {
        return 'soknad-svar-paa-annonsen';
    } else {
        return undefined;
    }
}

/* Returnerer tipsId uavhengig av valgt alternativ på spm 16*/
export function tipsHvorforDeg(
    besvarteSporsmal: BesvartSporsmal[],
    avgitteSvar: string[],
): string | undefined {
    if (manglerBesvarelse(avgitteSvar)) {
        return undefined;
    } else {
        return 'intervju-hvorfor-deg';
    }
}

/* Returner tipsId hvis alternativ 1 eller 2 er valgt på spm 17, og 1 eller 2 på spm 16, og 1 eller 2 på spm 15 */
export function tipsIntervjuTrygg(
    besvarteSporsmal: BesvartSporsmal[],
    avgitteSvar: string[],
): string | undefined {
    const besvarelse16 = besvarteSporsmal.find(
        besvarelse => besvarelse.spmId === 'intervju-spm-02'
    );
    const besvarelse15 = besvarteSporsmal.find(
        besvarelse => besvarelse.spmId === 'intervju-spm-01'
    );
    if (
        manglerBesvarelse(avgitteSvar) ||
        manglerBesvarelse(besvarelse16!.svar) ||
        manglerBesvarelse(besvarelse15!.svar)
    ) {
        return undefined;
    } else if (
        (erAlternativPaaEttvalgsSpmValgt('intervju-svar-0301', avgitteSvar) ||
            erAlternativPaaEttvalgsSpmValgt(
                'intervju-svar-0302',
                avgitteSvar
            )) &&
        (erAlternativPaaEttvalgsSpmValgt('intervju-svar-0201', besvarelse16!.svar) ||
            erAlternativPaaEttvalgsSpmValgt(
                'intervju-svar-0202',
                besvarelse16!.svar
            )) &&
        (erAlternativPaaEttvalgsSpmValgt('intervju-svar-0101', besvarelse15!.svar) ||
            erAlternativPaaEttvalgsSpmValgt(
                'intervju-svar-0102',
                besvarelse15!.svar
            ))
    ) {
        return 'intervju-trygg';
    } else {
        return undefined;
    }
}

/* Returnerer tipsId hvis alternativ 9 er valgt på spørsmål 18 */
export function tipsNettverk(
    besvarteSporsmal: BesvartSporsmal[],
    avgitteSvar: string[],
): string | undefined {
    if (manglerBesvarelse(avgitteSvar)) {
        return undefined;
    } else if (
        erAlternativPaaEttvalgsSpmValgt('intervju-svar-0409', avgitteSvar)
    ) {
        return 'nettverk';
    } else {
        return undefined;
    }
}
