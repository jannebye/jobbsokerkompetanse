import * as React from 'react';
import { connect } from 'react-redux';
import { RaadModell, UtledetRaadModell } from './tema-modell';
import EkspanderbartPanel from 'nav-frontend-ekspanderbartpanel';
import { FormattedHTMLMessage } from 'react-intl';
import { AppState } from '../ducks/reducer';
import { isArray } from 'util';

interface StateProps {
    raad: RaadModell;
}

interface ParentProps {
    tema: UtledetRaadModell;
}

type TemaVisningProps = StateProps & ParentProps;

function TemaVisning({tema, raad}: TemaVisningProps) {
    const understeg = raad.steg.understeg;
    const temaer = understeg.map(k => k.temaer.tema).reduce((a, b) => a.concat(b), []);
    const riktigTema = temaer.find(t => t.refid === tema.refid);

    let aktivitet;
    if (riktigTema) {
        if (isArray(riktigTema.aktiviteter.aktivitet)) {
            aktivitet = riktigTema.aktiviteter.aktivitet.find(k => k.id === tema.id);
        }
        else {
            aktivitet = riktigTema.aktiviteter.aktivitet;
        }
    }

    return (
        <li className="enkelt__tema blokk-xs" key={tema.id}>
            <EkspanderbartPanel apen={false} tittel={tema.tekst}>
                <div>
                    {aktivitet &&
                        (
                            <div key={aktivitet.id}>
                                <h4>{aktivitet.tittel}</h4>
                                <p className="aktivitet">
                                    <FormattedHTMLMessage
                                        id={aktivitet.id}
                                        defaultMessage={
                                            aktivitet.innhold
                                        }
                                    />
                                </p>
                            </div>
                        )
                    }
                </div>
            </EkspanderbartPanel>
        </li>
    );
}

function mapStateToProps(state: AppState): StateProps {
    return {
        raad: state.tema.data
    };
}

export default connect(mapStateToProps)(TemaVisning);
