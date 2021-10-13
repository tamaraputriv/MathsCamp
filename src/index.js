import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
/*import { initializeParse } from '@parse/react';

initializeParse(
  'mathapp.b4a.io',
  'V9n8X7uIrcCMcJre0nqCFfnyaka6MwkvrN5vnBcv',
  'iTt0twJCFnn5sNxOXzNb7Ek9YC6mEKRQ98aoVey8'
);*/
import Parse from 'parse';

Parse.serverURL = 'https://mathapp.b4a.io';
Parse.initialize(
  'V9n8X7uIrcCMcJre0nqCFfnyaka6MwkvrN5vnBcv',
  'iTt0twJCFnn5sNxOXzNb7Ek9YC6mEKRQ98aoVey8'
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
