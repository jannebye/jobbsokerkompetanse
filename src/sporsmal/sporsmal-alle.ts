import Sporsmal from './sporsmal-modell';

const spm: Sporsmal[] = [ {
    id: 1,
    sporsmal: 'Hvor finner du ledige stillinger?',
    alternativer: [
        'På internett',
        'På jobbmesser',
        'Har registrert et abonnement på ledige stillinger',
        'Følger bedrifter på Facebook, LinkedIn etc.',
        'Bruker jobb-apper som indeed.no og jyb.no',
        'Sjekker nettsidene til bedrifter',
        'Bruker nettverket mitt',
        'Blir "headhuntet" av arbeidsgivere',
        'Gjennom bemanningsbyråer.',
        'Kontakter arbeidsgivere direkte',
        'Annet'
    ],
    type: 'flervalg',
}, {
    id: 2,
    sporsmal: 'Hvor ser du etter jobber?',
    alternativer: [
        'I nærområdet mitt',
        'Under én times reisevei',
        'I flere fylker',
        'I hele landet',
        'I utlandet',
        'Ingen begrensninger'
    ],
    type: 'flervalg'
}, {
    id: 3,
    sporsmal: 'Søker du på flere type stillinger?',
    alternativer: [
        'Jeg søker bare én type stillinger',
        'Jeg søker på litt forskjellig',
        'Jeg søker på alt jeg kommer over'
    ],
    type: 'ettvalg'
}, {
    id: 4,
    sporsmal: 'Hvilken type ansettelse ser du etter?',
    alternativer: [
        'Fast',
        'Vikariat',
        'Midlertidig',
        'Tilkallingshjelp',
        'Heltid',
        'Deltid'
    ],
    type: 'flervalg'
}, {
    id: 5,
    sporsmal: 'Hvor fornøyd er du med måten du leter etter jobb på?',
    alternativer: [
        'Svært fornøyd',
        'Fornøyd',
        'Kunne vært bedre',
        'Misfornøyd'
    ],
    type: 'ettvalg'
}, {
    id: 6,
    sporsmal: 'Hvor har du registrert CV-en din?',
    alternativer: [
        'nav.no',
        'Finn.no',
        'LinkedIn',
        'Bemanningsbyråer ol.',
        'På nettsidene til bedrifter',
        'Jobb-apper',
        'Andre steder',
        'Jeg har ikke registrert CV-en min'
    ],
    type: 'flervalg'
}, {
    id: 16,
    sporsmal: 'Hvor trygg er du i en intervjusituasjon?',
    alternativer: [
        '1',
        '2',
        '3',
        '4',
        '5'
    ],
    type: 'skala'
}];

export default spm;
