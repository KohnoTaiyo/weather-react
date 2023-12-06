type CurrentWeather = {
  condition: Condition;
  humidity: number;
  last_updated: string;
  temp_c: number;
  wind_kph: number;
};

type Condition = {
  text: string;
  icon: string;
};

type Location = {
  country: string;
  lat: number;
  localtime: string;
  localtime_epoch: number;
  lon: number;
  name: string;
  region: string;
  tz_id: string;
};

type ForecastFewDaysWeather = {
  forecastday: {
    astro: {
      sunrise: string;
      sunset: string;
    };
    date: string;
    day: ForecastDayWeather;
    hour: ForecastHourWeather[];
  }[];
};

type ForecastDayWeather = {
  avghumidity: number;
  condition: Condition;
  daily_chance_of_rain: number;
  daily_chance_of_snow: number;
  maxtemp_c: number;
  maxwind_kph: number;
  mintemp_c: number;
  totalsnow_cm: number;
};

type ForecastHourWeather = {
  chance_of_rain: number;
  chance_of_snow: number;
  condition: Condition;
  humidity: number;
  temp_c: number;
  time: string;
  wind_kph: number;
};

export type ForecastFewDaysWeatherType = {
  current: CurrentWeather;
  forecast: ForecastFewDaysWeather;
  location: Location;
};
