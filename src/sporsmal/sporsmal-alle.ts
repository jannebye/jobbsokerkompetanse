import Sporsmal from './sporsmal-modell';

const spm: Sporsmal[] = [
    {
        id: 1,
        sporsmal: 'Hvor finner du ledige stillinger?',
        alternativer: [
            { id: '0101', tekst: 'På internett' },
            { id: '0102', tekst: 'På jobbmesser' },
            {
                id: '0103',
                tekst: 'Har registrert et abonnement på ledige stillinger'
            },
            {
                id: '0104',
                tekst: 'Følger bedrifter på Facebook, LinkedIn etc.'
            },
            { id: '0105', tekst: 'Bruker jobb-apper som indeed.no og jyb.no' },
            { id: '0106', tekst: 'Sjekker nettsidene til bedrifter' },
            { id: '0107', tekst: 'Bruker nettverket mitt' },
            { id: '0108', tekst: 'Blir "headhuntet" av arbeidsgivere' },
            { id: '0109', tekst: 'Gjennom bemanningsbyråer.' },
            { id: '0110', tekst: 'Kontakter arbeidsgivere direkte' },
            { id: '0111', tekst: 'Annet' }
        ],
        type: 'flervalg'
    },
    {
        id: 2,
        sporsmal: 'Hvor ser du etter jobber?',
        alternativer: [
            { id: '0201', tekst: 'I nærområdet mitt' },
            { id: '0202', tekst: 'Under én times reisevei' },
            { id: '0203', tekst: 'I flere fylker' },
            { id: '0204', tekst: 'I hele landet' },
            { id: '0205', tekst: 'I utlandet' },
            { id: '0206', tekst: 'Ingen begrensninger' }
        ],
        type: 'flervalg'
    },
    {
        id: 3,
        sporsmal: 'Søker du på flere type stillinger?',
        alternativer: [
            { id: '0301', tekst: 'Jeg søker bare én type stillinger' },
            { id: '0302', tekst: 'Jeg søker på litt forskjellig' },
            { id: '0303', tekst: 'Jeg søker på alt jeg kommer over' }
        ],
        type: 'ettvalg'
    },
    {
        id: 4,
        sporsmal: 'Hvilken type ansettelse ser du etter?',
        alternativer: [
            { id: '0401', tekst: 'Fast' },
            { id: '0402', tekst: 'Vikariat' },
            { id: '0403', tekst: 'Midlertidig' },
            { id: '0404', tekst: 'Tilkallingshjelp' },
            { id: '0405', tekst: 'Heltid' },
            { id: '0406', tekst: 'Deltid' }
        ],
        type: 'flervalg'
    },
    {
        id: 5,
        sporsmal: 'Hvor fornøyd er du med måten du leter etter jobb på?',
        alternativer: [
            { id: '0501', tekst: 'Svært fornøyd' },
            { id: '0502', tekst: 'Fornøyd' },
            { id: '0503', tekst: 'Kunne vært bedre' },
            { id: '0504', tekst: 'Misfornøyd' }
        ],
        type: 'ettvalg'
    },
    {
        id: 6,
        sporsmal: 'Hvor har du registrert CV-en din?',
        alternativer: [
            { id: '0601', tekst: 'nav.no' },
            { id: '0602', tekst: 'Finn.no' },
            { id: '0603', tekst: 'LinkedIn' },
            { id: '0604', tekst: 'Bemanningsbyråer ol.' },
            { id: '0605', tekst: 'På nettsidene til bedrifter' },
            { id: '0606', tekst: 'Jobb-apper' },
            { id: '0607', tekst: 'Andre steder' },
            { id: '0608', tekst: 'Jeg har ikke registrert CV-en min' }
        ],
        type: 'flervalg'
    },
    {
        id: 16,
        sporsmal: 'Hvor trygg er du i en intervjusituasjon?',
        alternativer: [
            { id: '1601', tekst: '1' },
            { id: '1602', tekst: '2' },
            { id: '1603', tekst: '3' },
            { id: '1604', tekst: '4' },
            { id: '1605', tekst: '5' }
        ],
        type: 'skala'
    }
];

export default spm;
