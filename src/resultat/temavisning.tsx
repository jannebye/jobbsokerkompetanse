import * as React from 'react';
import {RaadModell, UtledetRaadModell} from './raad-modell';
import { veiviserdata } from '../veiviserdata';
import { Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import {AppState} from "../ducks/reducer";

interface StateProps {
    raad: RaadModell;
}

interface ParentProps {
    tema: UtledetRaadModell;
}

type TemaVisningProps = StateProps & ParentProps;

function toggleEkspander(e: React.SyntheticEvent<HTMLButtonElement>) {
    const knapp = (e.target as HTMLElement).closest('.ekspanderbartPanel__hode');
    const panel = (e.target as HTMLElement).closest('.ekspenderbartPanel');
    if (panel && knapp) {
        if (panel.classList.contains('ekspanderbartPanel--lukket')) {
            panel.classList.remove('ekspanderbartPanel--lukket');
            panel.classList.add('ekspanderbartPanel--apen');
            knapp.setAttribute('aria-expanded', 'true');
        } else {
            panel.classList.remove('ekspanderbartPanel--apen');
            panel.classList.add('ekspanderbartPanel--lukket');
            knapp.setAttribute('aria-expanded', 'false');
        }
    }
}

function TemaVisning({tema, raad}: TemaVisningProps) {
    const temaer = raad.steg.map(k => k.temaer).reduce((a, b) => a.concat(b), []);
    const riktigTema = temaer.find(t => t.refid === tema.refid);
    const aktiviteter = riktigTema ? riktigTema.aktiviteter : [];

    let htmlInnhold = '';
    aktiviteter.map(a => (
        htmlInnhold += `<p>${a.innhold}</p>`
    ));

    return (
        <li className="enkelt__tema" key={tema.id}>
            <section className="ekspenderbartPanel ekspanderbartPanel--lukket">
                <button
                    className="ekspanderbartPanel__hode"
                    aria-expanded="false"
                    onClick={(event: React.SyntheticEvent<HTMLButtonElement>) => {
                        toggleEkspander(event);
                    }}
                >
                    <Innholdstittel tag="h1" className="ekspanderbartPanel__heading">
                        {riktigTema.tittel}
                    </Innholdstittel>
                    <Normaltekst>{riktigTema.ingress}</Normaltekst>
                    <span className="ekspanderbartPanel__indikator"/>
                </button>
                <div className="ekspanderbartPanel__innhold" dangerouslySetInnerHTML={{__html: htmlInnhold}}/>
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
