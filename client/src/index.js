import React from 'react';
import { render } from 'react-dom';
import './style.css';
import App from './components/App.jsx';
import registerServiceWorker from './registerServiceWorker';

render(<App />, document.getElementById('root'));
registerServiceWorker();
