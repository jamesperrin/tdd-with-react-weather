import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import WeatherApplication from './components/WeatherApplication';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <WeatherApplication />
  </React.StrictMode>,
);
