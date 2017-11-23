import * as React from 'react';
import {Provider} from 'react-redux';
import getStore from './store';
import Innhold from './innhold';
import IntlProvider from './intl-provider';

const store = getStore();

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <IntlProvider>
                    <div className="content">
                        <div className="limit">
                            <Innhold/>
                        </div>
                    </div>
                </IntlProvider>
            </Provider>
        );
    }
}

export default App;
