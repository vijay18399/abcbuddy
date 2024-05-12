import React from 'react';
import ReactDOM from 'react-dom/client';
import './reset.css';
import './index.css';
import App from './App';
import AppProviders from './providers/AppProviders';
import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <AppProviders>
     <App />
   </AppProviders>
  </React.StrictMode>
);

reportWebVitals();
