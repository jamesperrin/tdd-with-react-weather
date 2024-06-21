import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Server } from 'miragejs';
import { createMockServer } from '../../mocks/createMockServer';
import WeatherCard from './WeatherCard';

let server: any = Server;

describe('WeatherCard', () => {
  beforeEach(() => {
    server = createMockServer();
    server.logging = false;
    return server;
  });

  afterEach(() => {
    server.shutdown();
  });

  it('renders city name', () => {
    const city = {
      name: 'Melbourne',
      country: 'Australia',
      state: 'Victoria',
      lat: 0,
      lon: 0,
    };

    render(<WeatherCard city={city} />);
    const cityDisplayText = `${city.name}, ${city.state}`;
    expect(screen.getByText(cityDisplayText)).toBeInTheDocument();
  });

  it('renders placeholder when temperature in not available', () => {
    const city = {
      name: 'Melbourne',
      country: 'Australia',
      state: 'Victoria',
      lat: 0,
      lon: 0,
    };

    render(<WeatherCard city={city} />);
    expect(screen.getByText('-/-')).toBeInTheDocument();
  });

  it('renders city temperature', async () => {
    const city = {
      name: 'Melbourne',
      country: 'Australia',
      state: 'Victoria',
      lat: 0,
      lon: 0,
    };

    render(<WeatherCard city={city} />);

    // await waitFor(() => expect(screen.getByText('30°')).toBeInTheDocument());
    await screen.findByText('30°');
  });

  it('renders weather information', async () => {
    const city = {
      name: 'Melbourne',
      country: 'Australia',
      state: 'Victoria',
      lat: 0,
      lon: 0,
    };

    render(<WeatherCard city={city} />);
    await screen.findByText('clouds');
  });
});
