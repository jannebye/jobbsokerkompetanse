import * as React from 'react';
import { RaadModell } from './raad-modell';
import { veiviserdata } from '../veiviserdata';
import { Systemtittel, Ingress } from 'nav-frontend-typografi';

interface AktivitetModell {
    id: string;
    tittel: string;
    innhold: string;
}

interface TemaModell {
    id: string;
    refid?: string;
    tittel: string;
    ingress: string;
    aktiviteter?: AktivitetModell[];
}

interface RaadProps {
    raad: RaadModell;
}

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

function TemaVisning({raad}: RaadProps) {
    const understeg = veiviserdata.steg.understeg;
    const temagrupper = understeg.map(u => u.temaer);
    const riktiggruppe = temagrupper.find(t => t.some(tt => tt.id === raad.id)!);

    let tema: TemaModell = {
        id: '',
        refid: '',
        tittel: '',
        ingress: '',
        aktiviteter: [{id: '', tittel: '', innhold: ''}]
    };
    let aktiviteter: AktivitetModell[] = []; // tslint:disable-line:no-any
    if (riktiggruppe !== undefined) {
        const riktigtema = riktiggruppe.find(t => t.id === raad.id);
        if (riktigtema !== undefined) {
            tema = riktigtema;
        }
        aktiviteter = riktiggruppe.find(t => t.id === raad.id)!.aktiviteter!;
    }

    let htmlInnhold = '';
    if (aktiviteter.length !== 0) {
        aktiviteter.map(a => (
            htmlInnhold += `<h2 class="typo-undertittel">${a.tittel}</h2><p>${a.innhold}</p>`
        ));
    }

    return (
        <li className="enkelt__raad" key={raad.id}>
            <section className="ekspenderbartPanel ekspanderbartPanel--lukket">
                <button
                    className="ekspanderbartPanel__hode"
                    aria-expanded="false"
                    onClick={(event: React.SyntheticEvent<HTMLButtonElement>) => {
                        toggleEkspander(event);
                    }}
                >
                    <Systemtittel tag="h1" className="ekspanderbartPanel__heading">
                        {tema.tittel}
                    </Systemtittel>
                    <Ingress>{tema.ingress}</Ingress>
                    <div className="ekspanderbartPanel__innhold" dangerouslySetInnerHTML={{__html: htmlInnhold}}/>
                    <div className="indikator-wrap">
                        <span className="ekspanderbartPanel__indikator"/>
                    </div>
                </button>
            </section>
        </li>
    );
}

export default TemaVisning;
