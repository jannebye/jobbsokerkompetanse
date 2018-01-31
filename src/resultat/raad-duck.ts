import * as xml2js from 'xml2js';
import { ActionType, Handling, HentTemaAction } from '../actions';
import { TemaModell } from './tema-modell';
import { RaadInitialState, RaadModell } from './raad-modell';

const {HENT_TEMA_OK} = ActionType;

export interface RaadState {
    data: RaadModell;
}

export const initialState: RaadState = {
    data: RaadInitialState
};

//  Reducer
export default function reducer(state: RaadState = initialState, action: Handling): RaadState {
    switch (action.type) {
        case ActionType.HENT_TEMA_OK: {
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

export function hentRaad(raad: TemaModell): HentTemaAction {
    return {
        type: HENT_TEMA_OK,
        data: raad
    };
}

export function fetchTema(): Promise<TemaModell> {
    function parseXml(text: string): Promise<TemaModell> {
        return new Promise((resolve, reject) => {
            xml2js.parseString(text, {explicitArray: false}, (err: string, res: TemaModell) => {
                if (err) {
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

    constructor(reason: string, response: Response) {
        super(reason);
        this.response = response;
    }
}

export function sjekkStatuskode(response: Response) {
    if (response.status >= 200 && response.status < 300 && response.ok) {
        return response;
    }
    const error = new FetchError(response.statusText || response.type, response);
    throw error;
}
