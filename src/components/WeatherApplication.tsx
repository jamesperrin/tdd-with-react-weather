import React, { useState } from 'react';
import './WeatherApplication.css';
import Search from './Search/Search';
import WeatherCard from './WeatherCard/WeatherCard';
import { createMockServer } from '../mocks/createMockServer';
import { City } from '../models/types';

if (process.env.NODE_ENV === 'development') {
  createMockServer();
}

function WeatherApplication() {
  const [selected, setSelected] = useState<City[]>([]);

  const selectCity = (city: City) => {
    setSelected([city, ...selected]);
  };

  return (
    <div className="app">
      <h1>Weather Application</h1>

      <Search onSelectItem={selectCity} />

      <div>
        <div data-testid="my-weather-list" className="cities-container">
          {selected.map((city: City) => (
            <WeatherCard key={`${city.lat}-${city.lon}`} city={city} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeatherApplication;
