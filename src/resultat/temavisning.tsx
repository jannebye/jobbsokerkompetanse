import * as React from 'react';
import { TemaModell } from './tema-modell';
import EkspanderbartPanel from 'nav-frontend-ekspanderbartpanel';
import { temaer } from '../alle-temaer';

// interface AktModell {
//     id: string;
//     tittal: string;
//     collapsable?: string;
//     innhold: any; // tslint:disable-line:no-any
//     tags?: any; // tslint:disable-line:no-any
// }
//
// interface AktivitetModell {
//     aktivitet: AktModell[];
// }
//
// interface TemaIVeisviserModell {
//     id: string;
//     title: string;
//     ingress: any; // tslint:disable-line:no-any
//     aktiviteter?: AktivitetModell;
//
// }

// function finnKategori() {
//
// }

interface TemaProps {
    tema: TemaModell;
}

function TemaVisning({tema}: TemaProps) {
    const kategorier = temaer.steg.understeg;
    const temaeer = kategorier.map(k => k.temaer.tema);
    // console.log(temaeer);
    const riktigTema = temaeer.find(t => t.some(tt => tt.id === tema.id)!);
    let aktiviteter: any = []; // tslint:disable-line:no-any
    if (riktigTema !== undefined) {
        aktiviteter = riktigTema!.find(k => k.id === tema.id)!.aktiviteter!.aktivitet;
        console.log(aktiviteter);
    }
    // const vetkje = temaeer.map(t => t.map(tt => tt.aktiviteter!.aktivitet));
    // console.log(vetkje);
    // if (temaer.steg.understeg.filter(us => us.temaer.tema.find(t => t.id === tema.id));

    // console.log(temaIVeiviser.map(t => t.map(a => a)!));
    return (
        <li>
        <EkspanderbartPanel
            apen={false}
            tittel={tema.tekst}
            tittelProps="systemtittel"
        >
        <div>
            {aktiviteter.length !== 0 && aktiviteter.map((aktivitet: any) => ( // tslint:disable-line:no-any
                <div>
                    <h4>{aktivitet.tittel}</h4>
                <p>{aktivitet.innhold.__cdata}</p>
                </div>
            ))}
        </div>
        </EkspanderbartPanel>
        </li>

    );
}

export default TemaVisning;