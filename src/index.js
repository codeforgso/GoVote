import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import registerServiceWorker from './registerServiceWorker';

import './css/dist/App.css';

render(<App />, document.getElementById('app'));
registerServiceWorker();
