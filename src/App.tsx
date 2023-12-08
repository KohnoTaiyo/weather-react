import { useEffect, useState } from "react";

import "./App.scss";

import { TextBox } from "./components/TextBox";
import { getForecastWeather } from "./hooks/fetchers";
import { ForecastFewDaysWeatherType } from "./types";

const FORECAST_DAYS_AMOUNT = 5;
const INITIAL_LOCATION = "New York";
const formatDate = (date: string) => date.slice(5).replace("-", "/");

function App() {
  const [text, setText] = useState(INITIAL_LOCATION);
  const [errorMessage, setErrorMessage] = useState("");
  const [forecastWeather, setForecastWeather] = useState<ForecastFewDaysWeatherType | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const { current, forecast, location } = forecastWeather || {};

  const fetchWeather = async () => {
    setIsLoading(true);
    try {
      const data = await getForecastWeather(text, FORECAST_DAYS_AMOUNT);
      setErrorMessage("");
      setForecastWeather(data);
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      }
      setForecastWeather(undefined);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!text) throw new Error("Please enter a location.");
      setErrorMessage("");
      await fetchWeather();
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    }
  };

  const locationName = [location?.name, location?.region, location?.country].filter(Boolean).join(", ");

  return (
    <main className="app">
      <h1>Weather Forecast</h1>
      <form onSubmit={onSubmit}>
        <TextBox value={text} onChange={setText} />
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        !errorMessage && (
          <>
            {location && <h3>{`Weather in ${locationName} at ${location.localtime}`}</h3>}
            {current && (
              <div className="current">
                <img
                  src={`https://${current.condition.icon}`}
                  className="current_icon"
                  alt={`${current.condition.text} Image`}
                />
                <p className="current__name">{current.condition.text}</p>
                <p className="current__temp">
                  <span className="current__tempMain">{current.temp_c}</span>°C
                </p>
                <p>{`Humidity: ${current.humidity}%`}</p>
                <p>{`Wind: ${current.wind_kph}kph`}</p>
              </div>
            )}
            {forecast && (
              <>
                <h3>5days weather</h3>
                <ul className="forecast">
                  {forecast.forecastday.map((item) => (
                    <li key={item.date} className="forecast__item">
                      <p className="forecast__itemDate">{formatDate(item.date)}</p>
                      <img src={item.day.condition.icon} alt="" />
                      <p className="forecast__itemName">{item.day.condition.text}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )
      )}
    </main>
  );
}

export default App;
