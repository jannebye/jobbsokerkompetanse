import * as React from 'react';
import { connect } from 'react-redux';
import { RaadModell, UtledetRaadModell } from './tema-modell';
import EkspanderbartPanel from 'nav-frontend-ekspanderbartpanel';
import { FormattedHTMLMessage } from 'react-intl';
import { AppState } from '../ducks/reducer';

interface StateProps {
    raad: RaadModell;
}

interface ParentProps {
    tema: UtledetRaadModell;
}

type TemaVisningProps = StateProps & ParentProps;

function TemaVisning({tema, raad}: TemaVisningProps) {
    const temaer = raad.steg.map(k => k.temaer).reduce((a, b) => a.concat(b), []);
    const riktigTema = temaer.find(t => t.refid === tema.refid);
    const aktiviteter = riktigTema ? riktigTema.aktiviteter : [];

    return (
        <li className="enkelt__tema blokk-xs" key={tema.id}>
            <EkspanderbartPanel apen={false} tittel={tema.tekst}>
                <div>
                    {aktiviteter.map(a => (
                            <div key={a.id}>
                                <h4>{a.tittel}</h4>
                                <p className="aktivitet">
                                    <FormattedHTMLMessage
                                        id={a.id}
                                        defaultMessage={
                                            a.innhold
                                        }
                                    />
                                </p>
                            </div>
                        ))
                    }
                </div>
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
