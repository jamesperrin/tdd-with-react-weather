import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import WeatherApplication from './WeatherApplication';
import { Server } from 'miragejs';
import { createMockServer } from '../mocks/createMockServer';

let server: any = Server;

describe('Weather Application', () => {
  beforeEach(() => {
    server = createMockServer();
    server.logging = false;
    return server;
  });

  afterEach(() => {
    server.shutdown();
  });

  it('renders title', () => {
    render(<WeatherApplication />);
    const titleElement = screen.getByText(/Weather Application/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('shows search results', async () => {
    // userEvent v14 - Needs to be invoked before render methods.
    // const user = userEvent.setup();

    render(<WeatherApplication />);

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    // userEvent v13
    await userEvent.type(input, 'Melbourne');
    await userEvent.click(button);

    // userEvent v14
    // await user.type(input, 'Melbourne');
    // await user.click(button);

    await waitFor(() => expect(screen.getAllByText(/Melbourne/i).length).toEqual(5));
  });

  it('show search results details', async () => {
    render(<WeatherApplication />);

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    // userEvent v13
    await userEvent.type(input, 'Melbourne');
    await userEvent.click(button);

    await waitFor(() => expect(screen.getAllByText(/Melbourne/i).length).toEqual(5));
    expect(screen.getByText(/-37.8141705, 144.9655616/i)).toBeInTheDocument();
  });

  it('adds search results to my weather list', async () => {
    render(<WeatherApplication />);

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    // userEvent v13
    await userEvent.type(input, 'Melbourne');
    await userEvent.click(button);

    await waitFor(() => expect(screen.getAllByText(/Melbourne/i).length).toEqual(5));

    const selected = screen.getAllByText(/Melbourne/i)[3];
    await userEvent.click(selected);

    expect(screen.queryByTestId('search-results')).not.toBeInTheDocument();
    expect(within(screen.getByTestId('my-weather-list')).getByText(/Melbourne/i)).toBeInTheDocument();
  });
});
