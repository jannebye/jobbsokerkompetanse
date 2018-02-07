import * as React from 'react';
import { AppState } from '../ducks/reducer';
import { BesvarelseModell } from '../svar/svar-modell';
import { connect } from 'react-redux';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import { fasteTemaer, leggesTilTemaer } from './tema';
import temaLogikk from './tema-mapping';
import { RaadModell } from './raad-modell';
import TemaVisning from './temavisning';
import InnholdsContainer from './innholdscontainer';
import { Ingress, Sidetittel } from 'nav-frontend-typografi';

function temaSkalBehandles(tema: RaadModell, alternativId: string) {
    if (temaLogikk[tema.ref]) {
        if (
            temaLogikk[tema.ref].alternativ.find(function (alt: string) {
                return alt === alternativId;
            })
        ) {
            return true;
        }
    }
    return false;
}

function getAlleSvarteAlternativer(besvarelse: BesvarelseModell[]) {
    return besvarelse.reduce(
        (acc, svar) => [...acc, ...svar.svarAlternativer.map(a => a.id)],
        []
    );
}

function genererTema(fullfortBesvarelse: BesvarelseModell[]) {
    const valgteAlternativ = getAlleSvarteAlternativer(fullfortBesvarelse);

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
    besvarteSporsmal: BesvarelseModell[];
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
                        <TemaVisning raad={raad} key={raad.id}/>
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
    besvarteSporsmal: state.svar.data
});

export default connect(mapStateToProps)(Resultat);
