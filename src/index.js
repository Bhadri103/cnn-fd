import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/animate.css/animate.min.css';
import './index.css'

import '../node_modules/popper.js/dist/popper'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/select2/dist/js/select2';
import '../node_modules/slick-carousel/slick/slick'
   
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
