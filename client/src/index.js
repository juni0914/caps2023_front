import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import '../src/components/map.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import setToken from './components/controller/setToken';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
// import dotenv from 'dotenv';

// dotenv.config();

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();