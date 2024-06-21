import searchResults from './search-result.json';
import weatherResults from './weather-result.json';
import { createServer } from 'miragejs';

const createMockServer = () => {
  return createServer({
    routes() {
      this.urlPrefix = 'https://api.openweathermap.org';

      this.get('/geo/1.0/direct', () => {
        return searchResults;
      });

      this.get('/data/2.5/weather', () => {
        return weatherResults;
      });
    },
  });
};

export { createMockServer };
