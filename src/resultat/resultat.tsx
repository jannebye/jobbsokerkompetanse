import * as React from 'react';
import { AppState } from '../ducks/reducer';
import { BesvarelseModell } from '../svar/svar-modell';
import { connect } from 'react-redux';
import { FormattedHTMLMessage } from 'react-intl';
import { fasteTemaer, leggesTilTemaer } from './tema';
import temaLogikk from './tema-mapping';
import { RaadModell } from './raad-modell';
import TemaVisning from './temavisning';
import InnholdsContainer from './innholdscontainer';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import KnappBase from 'nav-frontend-knapper';

function temaSkalBehandles(tema: RaadModell, alternativId: string) {
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

interface ResultatProps {
    startPaNytt: () => void;
}

type Props = StateProps & ResultatProps;

export function Resultat({ besvarteSporsmal, startPaNytt }: Props) {
    const resultat = genererTema(besvarteSporsmal);
    return (
        <div className="resultatside">
            <Sidetittel className="overskrift__tema" tag="h1">
                <FormattedHTMLMessage id="overskrift-raad" />
            </Sidetittel>
            <ul className="temaliste">
                {resultat.map(tema => (
                    <TemaVisning raad={tema} key={tema.id} />
                ))}
            </ul>
            <div className="resultat__info">
                <Normaltekst className="resultat__infotekst" tag="p">
                    <FormattedHTMLMessage id="tekst-er-lagret" />
                </Normaltekst>
                <KnappBase
                    type={'standard'}
                    className="knapp"
                    onClick={() => startPaNytt()}
                >
                    Start på nytt
                </KnappBase>
            </div>
            <InnholdsContainer
                overskrift="veiviser-overskrift"
                innhold="veiviser-innhold"
                link="veiviser-link"
            />
        </div>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    besvarteSporsmal: state.svar.data
});

export default connect(mapStateToProps)(Resultat);
