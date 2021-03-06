import { ActionType, Handling, HentTemaAction } from '../actions';
import { TemaModell } from '../resultat/tema-modell';
import { RaadInitialState, RaadModell } from '../resultat/raad-modell';

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
            const ingress = t.ingress.replace(/<[^>]*>/g, '');
            return { ...t, aktiviteter, ingress };
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
    return fetch(API.stegUrl)
        .then(sjekkStatuskode)
        .then((response) => response.json());
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
    throw new FetchError(response.statusText || response.type, response);
}

interface ApiProps {
    stegUrl: string;
}

export const API: ApiProps = {
    stegUrl: `${window.location.origin}/veilarbinnhold/api/enonic/app/veiviserarbeidssoker/steg`
};
