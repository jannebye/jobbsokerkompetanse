exports.links = [
    {
        link: 'https://jobbsokerkompetanse-t6.nais.oera-q.local/jobbsokerkompetanse/',
        options: {
            browser: "firefox",
            chain: [
                { waitFor: '#root' },
                { clickOn: '.knapp--hoved' },
                { waitFor: '#sp-finn-spm-01' },
                { clickOn: '.alternativer .alternativ > #finn-svar-0101 + label' }
            ]
        }
    }
];
