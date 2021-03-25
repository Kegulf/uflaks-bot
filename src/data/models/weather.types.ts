export type ValidPlace = {
  lat: string,
  lon: string,
}

export type ValidPlaces = {
  [key: string]: ValidPlace,
} 

export type WeatherGeometry = {
  type: string,
  coordinates: number[],
}

export type WeatherDataUnits = {
  air_pressure_at_sea_level: string,
  air_temperature: string,
  cloud_area_fraction: string,
  precipitation_amount: string,
  relative_humidity: string,
  wind_from_direction: string,
  wind_speed: string,
}

export type WeatherMetaData = {
  updated_at: string,
  units: WeatherDataUnits,
}

export type FullWeatherDetails = {
  air_pressure_at_sea_level: number,
  air_temperature: number,
  cloud_area_fraction: number,
  relative_humidity: number,
  wind_from_direction: number,
  wind_speed: number,
}

export type NextXHoursForecast = {
  summary: {
    symbol_code: string
  },
  details: {
    precipitation_amount: number
  }
}

export type WeatherTimeEntry = {
  time: string,
  data: {
    instant: {
      details: FullWeatherDetails,
    },
    next_1_hours: NextXHoursForecast,
    next_6_hours: NextXHoursForecast,
    next_12_hours: NextXHoursForecast,
  }
}

export type WeatherProperties = {
  meta: WeatherMetaData,
  timeseries: WeatherTimeEntry[],
}

export type WeatherApiResponseBody = {
  error?: {
    code: number;
    message: string;
  }
  success: {
    total: number;
  };
  type: string,
  geometry: WeatherGeometry,
  properties: WeatherProperties,
}