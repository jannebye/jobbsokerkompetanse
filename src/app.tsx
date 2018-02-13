import * as React from 'react';
import { Provider } from 'react-redux';
import getStore from './store';
import Innhold from './innhold';
import IntlProvider from './Intl-provider';
import 'babel-polyfill';
import { setupMock } from './mocks/setup-mock';
import 'whatwg-fetch';
import { erLocalhost } from './mocks/utils';

if (process.env.REACT_APP_MOCK === 'true' || erLocalhost()) {
    setupMock();
}

const store = getStore();

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <IntlProvider>
                    <Innhold />
                </IntlProvider>
            </Provider>
        );
    }
}

export default App;
