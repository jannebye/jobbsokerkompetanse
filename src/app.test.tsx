import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import {FetchStub, stubFetch} from "./test/fetch-test-utils";
import steg from './tekster/steg-xml';

it('renders without crashing', () => {
    stubFetch(new FetchStub().addResponse('https://appres.nav.no/app/veiviserarbeidssoker/steg', new Response(steg)));

    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});
