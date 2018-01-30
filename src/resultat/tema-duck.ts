import * as xml2js from 'xml2js';
import { ActionType, Handling, HentRaadAction } from '../actions';
import { RaadModell, TemaModell } from './tema-modell';

const {HENT_RAAD_OK} = ActionType;

export interface RaadState {
    data: RaadModell;
}

export const initialState: RaadState = {
        data: {
            steg: [{
                id: '',
                tittel: '',
                forsidetekst: '',
                innhold: '',
                ikon: '',
                    temaer: [{
                        id: '',
                        tittel: '',
                        refid: '',
                        ingress: '',
                            aktiviteter: [{
                                id: '',
                                tittel: '',
                                innhold: '',
                                tags: {
                                    tag: ['']
                                },
                                collapsable: true
                            }]
                    }]
            }]
        },
    }
;

//  Reducer
export default function reducer(state: RaadState = initialState, action: Handling): RaadState {
    switch (action.type) {
        case ActionType.HENT_RAAD_OK: {
            return {...state, data: sanitize(action.data)};
        }
        default:
            return state;
    }
}

function sanitize(raad: TemaModell): RaadModell {
    return {steg: raad.steg.understeg.map(u => {
        return { ...u, temaer: u.temaer.tema.map(t => {
            const aktiviteter =
                Array.isArray(t.aktiviteter.aktivitet) ? t.aktiviteter.aktivitet : [t.aktiviteter.aktivitet];
            return { ...t, aktiviteter: aktiviteter};
        })};
    })};
}

export function hentRaad(raad: TemaModell): HentRaadAction {
    return {
        type: HENT_RAAD_OK,
        data: raad
    };
}

export function fetchRaad(): Promise<TemaModell> {
    function parseXml(text: string): Promise<TemaModell> {
        return new Promise((resolve, reject) => {
            xml2js.parseString(text, {explicitArray: false}, (err: string, res: TemaModell) => {
                if(err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }

    return fetch('https://appres.nav.no/app/veiviserarbeidssoker/steg')
        .then(sjekkStatuskode)
        .then((response) => response.text())
        .then(parseXml);
}

class FetchError extends Error {
    public response: Response;

    constructor(message: string, response: Response) {
        super(message);
        this.response = response;
    }
}

export function sjekkStatuskode(response: any) {
    if (response.status >= 200 && response.status < 300 && response.ok) {
        return response;
    }
    if (response.status === 401) {
        window.location.href = 'feilsider/401.html';// eslint-disable-line no-undef
    }
    return Promise.reject(new FetchError(response.statusText, response));
}
