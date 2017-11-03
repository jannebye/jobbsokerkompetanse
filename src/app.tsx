import * as React from 'react';
import { Provider } from 'react-redux';
import getStore from './store';
import Innhold from './innhold';

const store = getStore();

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                    <div className="content">
                        <div className="limit">
                            <Innhold/>
                        </div>
                    </div>
            </Provider>
        );
    }
}

export default App;
