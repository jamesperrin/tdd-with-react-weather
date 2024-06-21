import React, { useEffect, useState } from 'react';
import config from '../../config/config';
import { City } from '../../models/types';
import { Weather, emptyWeather } from '../../models/Weather';

const WeatherCard = ({ city }: { city: City }) => {
  const [weather, setWeather] = useState<Weather>(emptyWeather);

  useEffect(() => {
    const getWeather = async () => {
      const { apiKey } = config.OpenWeather;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setWeather(new Weather(data));
      } catch (error) {
        console.log(error);
      }
    };

    getWeather();
  }, [city]);

  return (
    <div className={`weather-container ${weather.main}`}>
      <h3>
        {city.name}, {city.state}
      </h3>
      <div className="details">
        <p className="temperature">{weather.temperature}</p>
      </div>
      <div className="weather">
        <p className="weather-category">{weather.main}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
