import * as React from 'react';
import { RaadModell, UtledetRaadModell } from './raad-modell';
import { Systemtittel, Ingress } from 'nav-frontend-typografi';
import { AppState } from '../ducks/reducer';
import { connect } from 'react-redux';

interface StateProps {
    raad: RaadModell;
}

interface ParentProps {
    utledetRaad: UtledetRaadModell;
}

type TemaVisningProps = StateProps & ParentProps;

function toggleEkspander(e: React.SyntheticEvent<HTMLButtonElement>) {
    const knapp = (e.target as HTMLElement).closest('.artikkelpanel__hode');
    const panel = (e.target as HTMLElement).closest('.artikkelpanel');
    if (panel && knapp) {
        if (panel.classList.contains('artikkelpanel--lukket')) {
            panel.classList.remove('artikkelpanel--lukket');
            panel.classList.add('artikkelpanel--apen');
            knapp.setAttribute('aria-expanded', 'true');
        } else {
            panel.classList.remove('artikkelpanel--apen');
            panel.classList.add('artikkelpanel--lukket');
            knapp.setAttribute('aria-expanded', 'false');
        }
    }
}

function TemaVisning({utledetRaad, raad}: TemaVisningProps) {
    const temaer = raad.steg.map(k => k.temaer).reduce((a, b) => a.concat(b), []);
    const riktigTema = temaer.find(t => t.refid === utledetRaad.refid);
    const aktiviteter = riktigTema ? riktigTema.aktiviteter : [];

    let htmlInnhold = '';
    if (aktiviteter.length !== 0) {
        aktiviteter.map(a => (
            htmlInnhold += `<h2 class="typo-undertittel">${a.tittel}</h2><p>${a.innhold}</p>`
        ));
    }

    return (
        <li className="enkelt__raad" key={utledetRaad.id}>
            <section className="artikkelpanel artikkelpanel--lukket">
                <button
                    className="artikkelpanel__hode"
                    aria-expanded="false"
                    onClick={(event: React.SyntheticEvent<HTMLButtonElement>) => {
                        toggleEkspander(event);
                    }}
                >
                    <Systemtittel tag="h1" className="artikkelpanel__heading">
                        {riktigTema ? riktigTema.tittel : ''}
                    </Systemtittel>
                    <Ingress>{riktigTema ? riktigTema.ingress : ''}</Ingress>
                </button>
                <div className="artikkelpanel__innhold" dangerouslySetInnerHTML={{__html: htmlInnhold}}/>
                <div className="indikator-wrap">
                    <span className="artikkelpanel__indikator"/>
                </div>
            </section>
        </li>
    );
}

function mapStateToProps(state: AppState): StateProps {
    return {
        raad: state.raad.data
    };
}

export default connect(mapStateToProps)(TemaVisning);
