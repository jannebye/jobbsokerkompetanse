import * as React from 'react';
import { Provider } from 'react-redux';
import getStore from './store';
import Innhold from './innhold';
import IntlProvider from './Intl-provider';

const store = getStore();

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <IntlProvider>
                    <Innhold/>
                </IntlProvider>
            </Provider>
        );
    }
}

export default App;
