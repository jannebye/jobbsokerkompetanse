import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import { unregister } from './registerServiceWorker';
import polyfillClosest from './polyfill-closest';

polyfillClosest();

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);

unregister();
