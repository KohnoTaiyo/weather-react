import { useCallback, useEffect, useState } from "react";

import "./App.scss";

import { Route, Routes } from "react-router-dom";

import { TextBox } from "./components/TextBox";
import { getForecastWeather } from "./hooks/fetchers";
import Home from "./page/Home/Home";
import { ForecastFewDaysWeatherType } from "./types";

const FORECAST_DAYS_AMOUNT = 5;
const INITIAL_LOCATION = "New York";

function App() {
  const [text, setText] = useState(INITIAL_LOCATION);
  const [errorMessage, setErrorMessage] = useState("");
  const [forecastWeather, setForecastWeather] = useState<ForecastFewDaysWeatherType | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeather = useCallback(async () => {
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
  }, [text]);

  useEffect(() => {
    fetchWeather();
  }, []);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
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
    },
    [text],
  );

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
          <Routes>
            <Route path="/" element={forecastWeather ? <Home forecastWeather={forecastWeather} /> : <p>No Data</p>} />
          </Routes>
        )
      )}
    </main>
  );
}

export default App;
