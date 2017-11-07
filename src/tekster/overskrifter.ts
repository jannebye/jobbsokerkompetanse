export interface OverskriftModell {
    header: string;
    tekst: string;
}

const cvOverskrift = {
    header: 'CV-en',
    tekst: 'CV-en skal fortelle hvem du er, hva slags utdanning du har og hva du har gjort. Hvor god er CV-en din?'
};

const finnJobbOverskrift = {
    header: 'Finn jobber',
    tekst: 'Der er mange måter å finne ledige jobber på. Hvordan leter du?'
};

const sokeErfaringOverskrift = {
    header: 'Søke jobber',
    tekst: 'Hva er din erfaring som jobbsøker?'
};

const intervjuOverskrift = {
    header: 'Intervjuet',
    tekst: 'I intervjuet skal du overbevise om at du passer inn i bedriften og at du er et trygt valg.' +
        'Hvilke erfaringer har du med jobbintervju?'
};

export default {
    cvOverskrift,
    finnJobbOverskrift,
    sokeErfaringOverskrift,
    intervjuOverskrift
};
