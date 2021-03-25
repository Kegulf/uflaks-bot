import { HTTPError } from 'discord.js';
import fetch from 'node-fetch';
import {
  ValidPlace,
  ValidPlaces,
  WeatherMetaData,
  WeatherTimeEntry,
  WeatherApiResponseBody,
} from '../models/weather.types';


export class WeatherApiProxy {
  public static validPlaces: ValidPlaces = {
    'badevika': { lat: '60.514045', lon: '5.244073' },
    'flaktveit': { lat: '60.463289', lon: '5.362458' },
    'haltejohansvika': { lat: '60.508001', lon: '5.230166' },
    'hetlevik': { lat: '60.347773', lon: '5.224741' },
    'herdla': { lat: '60.576015', lon: '4.949677' },
    'lynghaugparken': { lat: '60.355218', lon: '5.293409' },
    'tellevik': { lat: '60.518744', lon: '5.285010' },
  };
  
  private static baseUrl = 'https://api.met.no/weatherapi/locationforecast/2.0';
  private static attribution = {
    title: 'Værdata fra Yr',
    thumbnail: 'https://theysaidso.com/branding/theysaidso.png',
    footer: 'Powered by weather data from Yr.no',
    href: 'https://www.yr.no/',
  }

  static async getWeatherData(
    place: ValidPlace = { lat: '50.5', lon: '0' }
  ): Promise<{ meta: WeatherMetaData, timeseries: WeatherTimeEntry[] }> {
    const { GITHUB_REPO, APP_VERSION, AUTHOR_EMAIL } = process.env;

    const userAgentString = `uflaks-bot/${APP_VERSION}, ${AUTHOR_EMAIL} ${GITHUB_REPO}`;
    const apiUrl = `${this.baseUrl}/compact?lat=${place?.lat}&lon=${place?.lon}`;

    const response = await fetch(
      apiUrl,
      { headers: { 'User-Agent': userAgentString } },
    );

    const json: WeatherApiResponseBody = await response.json();

    if (json.error) {
      throw new HTTPError(
        json.error.message,
        'HTTPError',
        json.error.code,
        'GET',
        'QuotesApiProxy',
      );
    }

    const { meta, timeseries } = json.properties;
    return { meta, timeseries };
  }
}
