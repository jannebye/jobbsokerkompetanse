import * as xml2js from 'xml2js';
import { Handling, ActionType, HentRaadAction } from '../actions';

const { HENT_RAAD_OK } = ActionType;

export interface TemaState {
    data: any;
}

export const initialState = {
    data: [],
};

//  Reducer
export default function reducer(state: TemaState = initialState, action: Handling): TemaState {
    switch (action.type) {
        case ActionType.HENT_RAAD_OK: {
            return { ...state, data: action.data };
        }
        default:
            return state;
    }
}

export function hentRaad(raad: any): HentRaadAction {
    return {
        type: HENT_RAAD_OK,
        data: raad
    };
}

export function fetchRaad(): Promise<string> {
    function parseXml(text: string): Promise<string> {
        return new Promise((resolve, reject) => {
            xml2js.parseString(text, {explicitArray: false}, (err: string, res: string) => {
                resolve(res);
            });
        });
    }

    return fetch('https://appres-t4.nav.no/app/veiviserarbeidssoker/steg')
        .then((response) => response.text())
        .then(parseXml);
}
