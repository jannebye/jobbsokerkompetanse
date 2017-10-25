import Sporsmal from './sporsmal-modell';

const spm: Sporsmal[] = [{
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
    type: 'flervalg'
}, {
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
},
    {sporsmal: 'Søker du på flere type stillinger?',
        alternativer: [
            'Jeg søker bare én type stillinger',
            'Jeg søker på litt forskjellig',
            'Jeg søker på alt jeg kommer over'
        ],
        type: 'ettvalg'
    } ];

export default spm;
