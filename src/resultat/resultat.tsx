import * as React from 'react';
import { AppState } from '../ducks/reducer';
import BesvarelseModell from '../svar/svar-modell';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import alleSporsmal from '../sporsmal/sporsmal-alle';
import { fasteTemaer, leggesTilTemaer } from './tema';
import temaLogikk from './tema-mapping';
import { TemaModell } from './tema-modell';
import TemaVisning from './temavisning';
import InnholdsContainer from './innholdscontainer';

function temaSkalBehandles(tema: TemaModell, alternativId: string) {
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

    // return resultat.splice(0, 4);  // TODO: Denne skal brukes
    return resultat; // Kun for at fag skal få teste
}

interface StateProps {
    besvarteSporsmal: BesvarelseModell[];
}

interface ResultatProps {
    startPaNytt: () => void;
}

type Props = StateProps & ResultatProps;

function Resultat({ besvarteSporsmal, startPaNytt }: Props) {
    // sorterSvar(besvarteSporsmal);
    const resultat = genererTema(besvarteSporsmal);
    return (
        <div className="resultatside">
            <FormattedMessage id="din-besvarelse" />:
            <ul className="resultatliste">
                {besvarteSporsmal.map(spm => (
                    <li className="sporsmal__besvarelse">
                        <FormattedMessage id={spm.sporsmalId} tagName="h3"/>
                        <h4>
                            {
                                alleSporsmal.find(
                                    spom => spom.id === spm.sporsmalId
                                )!.id
                            }
                        </h4>
                        <p>
                            <FormattedMessage id="dine-svar" />:{' '}
                        </p>
                        <ul>
                            {spm.svarAlternativer.map(alt => (
                                <li key={alt.id}><FormattedMessage id={alt.id} /></li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            <h1 className="overskrift__tema">
                <FormattedMessage id="overskrift-raad" />
            </h1>
            <ul className="temaliste">
                {resultat.map(tema => (
                    <TemaVisning
                        tema={tema}
                    /> ))}
            </ul>
            <section className="resultat__info blokk-m">
            <p className="resultat__infotekst">
                Dine råd er lagret, og du kan finne dem igjen på Ditt Nav. Du kan også svare på spørsmålene på nytt,
                om du ønsker
            </p>
            <button
                className="knapp knapp__startigjen"
                onClick={() => startPaNytt()}
            >
                Start på nytt
            </button>
            </section>
            <InnholdsContainer
                overskrift="veiviser-overskrift"
                innhold="veiviser-innhold"
                link={'https://tjenester.nav.no/veiviserarbeidssoker/?situasjon=mistet-jobben'}
            />
        </div>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    besvarteSporsmal: state.svar.data
});

export default connect(mapStateToProps)(Resultat);
