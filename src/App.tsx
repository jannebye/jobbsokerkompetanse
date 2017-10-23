import * as React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import getStore from './store';
import Innhold from './Innhold';

const logo = require('./logo.svg');
const store = getStore();

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                    </div>
                    <Innhold/>
                </div>
            </Provider>
        );
    }
}

export default App;
