import * as xml2js from 'xml2js';
import { ActionType, Handling, HentRaadAction } from '../actions';
import { RaadModell } from './tema-modell';

const {HENT_RAAD_OK} = ActionType;

export interface TemaState {
    data: RaadModell;
}

export const initialState = {
        data: {
            steg: {
                understeg: [{
                    id: '',
                    tittel: '',
                    forsidetekst: '',
                    innhold: '',
                    ikon: '',
                    temaer: {
                        tema: [{
                            id: '',
                            tittel: '',
                            refid: '',
                            ingress: '',
                            aktiviteter: {
                                aktivitet: {
                                    id: '',
                                    tittel: '',
                                    innhold: '',
                                    tags: {
                                        tag: ['']
                                    },
                                    collapsable: true
                                }

                            }
                        }]
                    }
                }]
            }
        },
    }
;

//  Reducer
export default function reducer(state: TemaState = initialState, action: Handling): TemaState {
    switch (action.type) {
        case ActionType.HENT_RAAD_OK: {
            return {...state, data: action.data};
        }
        default:
            return state;
    }
}

export function hentRaad(raad: RaadModell): HentRaadAction {
    return {
        type: HENT_RAAD_OK,
        data: raad
    };
}

export function fetchRaad(): Promise<RaadModell> {
    function parseXml(text: string): Promise<RaadModell> {
        return new Promise((resolve, reject) => {
            xml2js.parseString(text, {explicitArray: false}, (err: string, res: RaadModell) => {
                resolve(res);
            });
        });
    }

    return fetch('https://appres-t4.nav.no/app/veiviserarbeidssoker/steg')
        .then((response) => response.text())
        .then(parseXml);
}
