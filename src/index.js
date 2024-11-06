import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Get the root element where your app is rendered
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Only one <BrowserRouter> here, wrapping <App />
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
