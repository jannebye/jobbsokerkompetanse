/* tslint:disable*/
import * as fetchMock from 'fetch-mock';
import { respondWith } from './utils';
import steg from '../tekster/steg-json';
import {API} from "../resultat/raad-duck";

export function setupMock() {
    console.log('### MOCK ENABLED! ###');
    (fetchMock as any)._mock();

    fetchMock.get(API.stegUrl, respondWith(steg));
}
