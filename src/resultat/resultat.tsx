import * as React from 'react';
import { AppState } from '../ducks/reducer';
import BesvarelseModell from '../svar/svar-modell';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import alleSporsmal from '../sporsmal/sporsmal-alle';
import { sorterSvar } from '../svar/svar-selector';
import { fasteTemaer, leggesTilTemaer } from './tema';
import temaLogikk from './tema-mapping';
import { TemaModell } from './tema-modell';
import TemaVisning from "./temavisning";

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
    sorterSvar(besvarteSporsmal);
    const resultat = genererTema(besvarteSporsmal);
    return (
        <div className="resultatside">
            <FormattedMessage id="din-besvarelse" />:
            <ul className="resultatliste">
                {besvarteSporsmal.map(spm => (
                    <li className="sporsmal__besvarelse">
                        <h3>Spørsmål {spm.sporsmalId}:</h3>
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
                                <li key={alt.id}>{alt.id}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            <h3 className="overskrift__tema">
                <FormattedMessage id="overskrift-raad" />
            </h3>
            <ul className="temaliste">
                {resultat.map(tema => (
                    <TemaVisning
                        tema={tema}
                    /> ))}
            </ul>
            <button
                className="knapp knapp--hoved"
                onClick={() => startPaNytt()}
            >
                Ta testen på nytt
            </button>
        </div>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    besvarteSporsmal: state.svar.data
});

export default connect(mapStateToProps)(Resultat);
