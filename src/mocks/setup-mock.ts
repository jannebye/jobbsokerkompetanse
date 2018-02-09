/* tslint:disable*/
import * as fetchMock from 'fetch-mock';
import { respondWith } from './utils';
import steg from '../tekster/steg-xml';

export function setupMock() {
    console.log('### MOCK ENABLED! ###');
    (fetchMock as any)._mock();

    fetchMock.get('https://appres.nav.no/app/veiviserarbeidssoker/steg', respondWith(steg));
}
