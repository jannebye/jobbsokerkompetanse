import * as React from 'react';
import { RaadModell, UtledetRaadModell } from './raad-modell';
import { AppState } from '../ducks/reducer';
import { connect } from 'react-redux';
import EkspanderbartPanel from 'nav-frontend-ekspanderbartpanel';
import { FormattedHTMLMessage } from 'react-intl';

interface StateProps {
    raad: RaadModell;
}

interface ParentProps {
    utledetRaad: UtledetRaadModell;
}

type TemaVisningProps = StateProps & ParentProps;

function TemaVisning({utledetRaad, raad}: TemaVisningProps) {
    const temaer = raad.steg.map(k => k.temaer).reduce((a, b) => a.concat(b), []);
    const riktigTema = temaer.find(t => t.refid === utledetRaad.refid);
    const aktiviteter = riktigTema ? riktigTema.aktiviteter : [];

    const tittel = (
        <React.Fragment>
            <h2 className="typo-innholdstittel blokk-xxs">{riktigTema ? riktigTema.tittel : ''}</h2>
            <p className="typo-ingress">{riktigTema ? riktigTema.ingress : ''}</p>
        </React.Fragment>
    );

    return (
        <li className="enkelt__raad blokk-xs" key={utledetRaad.id}>
            <EkspanderbartPanel apen={false} tittel={tittel} className="artikkelpanel">
                    {aktiviteter.length !== 0 &&
                    aktiviteter.map(aktivitet => (
                        <article key={aktivitet.id}>
                            <h1 className="typo-element blokk-xxs">{riktigTema ? riktigTema.tittel : ''}</h1>
                            <FormattedHTMLMessage id={aktivitet.id} defaultMessage={aktivitet.innhold} />
                        </article>
                    ))}
            </EkspanderbartPanel>
        </li>
    );
}

function mapStateToProps(state: AppState): StateProps {
    return {
        raad: state.raad.data
    };
}

export default connect(mapStateToProps)(TemaVisning);
