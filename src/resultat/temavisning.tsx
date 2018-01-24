import * as React from 'react';
import { RaadModell } from './raad-modell';
import EkspanderbartPanel from 'nav-frontend-ekspanderbartpanel';
import { veiviserdata } from '../veiviserdata';
import { FormattedHTMLMessage } from 'react-intl';

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
    aktiviteter?: [AktivitetModell];
}

interface RaadProps {
    raad: RaadModell;
}

function TemaVisning({ raad }: RaadProps) {
    const understeg = veiviserdata.steg.understeg;
    const temagrupper = understeg.map(u => u.temaer);
    const riktiggruppe = temagrupper.find(t => t.some(tt => tt.id === raad.id)!);
    let tema: TemaModell;
    let aktiviteter: AktivitetModell[] = []; // tslint:disable-line:no-any
    if (riktiggruppe !== undefined) {
        tema = riktiggruppe.find(t => t.id === raad.id);
        aktiviteter = riktiggruppe.find(t => t.id === raad.id)!.aktiviteter!;
    }
    console.log('tema', tema);
    return (
        <li className="enkelt__tema blokk-xs" key={raad.id}>
            <EkspanderbartPanel apen={false} tittel={raad.tekst}>
                <div>
                    {aktiviteter.length !== 0 &&
                        aktiviteter.map(aktivitet => (
                            <div key={aktivitet.id}>
                                <h1>{tema.tittel}</h1>
                                <p className="aktivitet">
                                    <FormattedHTMLMessage
                                        id={aktivitet.id}
                                        defaultMessage={
                                            aktivitet.innhold
                                        }
                                    />
                                </p>
                            </div>
                        ))}
                </div>
            </EkspanderbartPanel>
        </li>
    );
}

export default TemaVisning;
