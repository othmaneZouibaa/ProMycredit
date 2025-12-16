import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './myCridit/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store }>
  <BrowserRouter>
    <App />
 </BrowserRouter>
</Provider>
);

