import React, { ChangeEvent, useState } from 'react';
import config from '../../config/config';
import { City } from '../../models/types';
import './Search.css';

const Search = ({ onSelectItem }: { onSelectItem: (city: City) => void }) => {
  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<City[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClick = async () => {
    const { apiKey } = config.OpenWeather;
    const limit = 5;
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit}&appid=${apiKey}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const cities = await response.json();

      setSearchResults(
        cities.map((city: any) => ({
          name: city.name,
          state: city.state,
          country: city.country,
          lat: city.lat,
          lon: city.lon,
        })),
      );
    } catch (error) {
      console.log(error);
    }

    // fetch(`${url}`)
    //   .then((r) => r.json())
    //   .then((cities) => {
    //     setSearchResults(
    //       cities.map((city: any) => ({
    //         name: city.name,
    //         state: city.state,
    //         country: city.country,
    //         lat: city.lat,
    //         lon: city.lon,
    //       })),
    //     );
    //   });
  };

  const onSelect = (city: City) => {
    onSelectItem(city);
    setSearchResults([]);
  };

  return (
    <div className="search-container">
      <div className="input-container">
        <input
          type="text"
          data-testid="search-input"
          onChange={handleChange}
          placeholder="Enter city name (e.g. Melbourne, New York)"
        />
        <button data-testid="search-button" onClick={handleClick}>
          Search
        </button>
      </div>

      {searchResults.length > 0 && (
        <div data-testid="search-results" className="search-results">
          {searchResults.map((city) => (
            <div className="search-result" key={`${city.lat}-${city.lon}`} onClick={() => onSelect(city)}>
              <span className="city-name">
                {city.name}, {city.state}
              </span>
              <span className="city-location">
                {city.lat}, {city.lon}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
