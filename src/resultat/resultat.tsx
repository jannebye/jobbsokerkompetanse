import * as React from 'react';
import { AppState } from '../ducks/reducer';
import { connect } from 'react-redux';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import { fasteTemaer, leggesTilTemaer } from './tema';
import temaLogikk from './tema-mapping';
import { UtledetRaadModell } from './raad-modell';
import TemaVisning from './temavisning';
import InnholdsContainer from './innholdscontainer';
import { Ingress, Sidetittel } from 'nav-frontend-typografi';
import { BesvartSporsmal } from '../ducks/sporsmal-duck';

function temaSkalBehandles(tema: UtledetRaadModell, alternativId: string) {
    if (temaLogikk[tema.ref]) {
        if (
            temaLogikk[tema.ref].alternativ.find(function(alt: string) {
                return alt === alternativId;
            })
        ) {
            return true;
        }
    }
    return false;
}

function getAlleSvarteAlternativer(besvarteSporsmal: BesvartSporsmal[]) {
    return besvarteSporsmal.reduce(
        (acc, svar) => [...acc, ...svar.svar.map(a => a)],
        []
    );
}

function genererTema(besvarteSporsmal: BesvartSporsmal[]) {
    const valgteAlternativ = getAlleSvarteAlternativer(besvarteSporsmal);

    const resultatFaste = fasteTemaer.filter(
        tema =>
            !valgteAlternativ.find(alternativ =>
                temaSkalBehandles(tema, alternativ)
            )
    );

    const resultatLeggesTil = leggesTilTemaer.filter(tema =>
        valgteAlternativ.find(alternativ => temaSkalBehandles(tema, alternativ))
    );

    const resultat = resultatFaste
        .concat(resultatLeggesTil)
        .sort((temaA, temaB) => temaA.prioritet - temaB.prioritet);

    return resultat.splice(0, 4);
}

interface StateProps {
    besvarteSporsmal: BesvartSporsmal[];
}

type Props = StateProps;

export function Resultat({besvarteSporsmal}: Props) {
    const resultat = genererTema(besvarteSporsmal);
    return (
        <div className="limit">
            <div className="resultat">
                <Sidetittel className="resultat__overskrift" tag="h1">
                    <FormattedHTMLMessage id="overskrift-raad"/>
                </Sidetittel>
                <Ingress className="resultat__ingress">
                    <FormattedHTMLMessage id="ingress-raad"/>
                </Ingress>
                <ul className="resultat__raadliste">
                    {resultat.map(raad => (
                        <TemaVisning utledetRaad={raad} key={raad.id}/>
                    ))}
                </ul>
                <FormattedMessage id="veiviser-link">
                    {(tekst: string) => (
                        <InnholdsContainer
                            overskrift="veiviser-overskrift"
                            innhold="veiviser-innhold"
                            link={tekst}
                        />
                    )}
                </FormattedMessage>
            </div>
        </div>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    besvarteSporsmal: state.sporsmal.besvarteSporsmal
});

export default connect(mapStateToProps)(Resultat);
