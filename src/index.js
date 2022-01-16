import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { LoadScript } from '@react-google-maps/api';

import './index.css';
import App from './App';



ReactDOM.render(
  <React.StrictMode>
    <LoadScript googleMapsApiKey=''>
      <App />
    </LoadScript>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
