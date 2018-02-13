import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import { FetchStub, stubFetch } from './test/fetch-test-utils';
import steg from './tekster/steg-json';
import { API } from './resultat/raad-duck';

it('renders without crashing', () => {
    stubFetch(new FetchStub().addResponse(API.stegUrl, new Response(steg)));

    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});
