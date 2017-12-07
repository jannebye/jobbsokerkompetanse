import * as React from 'react';
import { TemaModell } from './tema-modell';
import EkspanderbartPanel from 'nav-frontend-ekspanderbartpanel';
import { temaer } from '../alle-temaer';
import { FormattedHTMLMessage } from 'react-intl';

interface AktivitetModell {
    id: string;
    tittel: string;
    innhold: {['__cdata']: string};
}

interface TemaProps {
    tema: TemaModell;
}

function TemaVisning({tema}: TemaProps) {
    const kategorier = temaer.steg.understeg;
    const temaeer = kategorier.map(k => k.temaer.tema);
    const riktigTema = temaeer.find(t => t.some(tt => tt.id === tema.id)!);
    let aktiviteter: AktivitetModell[] = []; // tslint:disable-line:no-any
    if (riktigTema !== undefined) {
        aktiviteter = riktigTema!.find(k => k.id === tema.id)!.aktiviteter!.aktivitet;
    }
    return (
        <li className="enkelt__tema blokk-xs">
        <EkspanderbartPanel
            apen={false}
            tittel={tema.tekst}
        >
        <div>
            {aktiviteter.length !== 0 && aktiviteter.map((aktivitet) => (
                <div>
                    <h4>{aktivitet.tittel}</h4>
                    <p className="aktivitet">
                        <FormattedHTMLMessage id={aktivitet.id} defaultMessage={aktivitet.innhold.__cdata} />
                    </p>
                </div>
            ))}
        </div>
        </EkspanderbartPanel>
        </li>

    );
}

export default TemaVisning;