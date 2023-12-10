import { ForecastFewDaysWeatherType } from "../../types";

export const getForecastWeather = async (
  location: string,
  forecastDaysAmount?: number,
  date?: string,
): Promise<ForecastFewDaysWeatherType> => {
  try {
    const endPoint = date
      ? `${process.env.REACT_APP_WEATHER_END_POINT}&q=${location}&dt=${date}`
      : `${process.env.REACT_APP_WEATHER_END_POINT}&q=${location}&days=${forecastDaysAmount}&aqi=no&alerts=no`;
    const res = await fetch(endPoint);
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error("The entered place name does not exist.");
  }
};
