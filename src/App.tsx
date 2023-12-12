import "./App.scss";

import { useCallback, useEffect, useState } from "react";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { TextBox } from "./components/TextBox/TextBox";
import { getForecastWeather } from "./hooks/fetchers/fetchers";
import { formatDate } from "./hooks/formatDate";
import Date from "./page/Date/Date";
import Home from "./page/Home/Home";
import { ForecastFewDaysWeatherType, StateParams } from "./types";

const INITIAL_LOCATION = "New York";

function App() {
  const routerParams = useLocation();
  const pathState = routerParams.state as StateParams | undefined;
  const searchLocation = pathState?.location || INITIAL_LOCATION;
  const [text, setText] = useState(searchLocation);
  const [errorMessage, setErrorMessage] = useState("");
  const [forecastWeather, setForecastWeather] = useState<ForecastFewDaysWeatherType | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchWeather = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getForecastWeather(text, 5, pathState?.date);
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
  }, [pathState, text]);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        if (!text) throw new Error("Please enter a location.");
        setErrorMessage("");
        if (pathState?.date) {
          const sendPathParams: StateParams = { location: text };
          navigate("/", { state: sendPathParams });
        } else {
          await fetchWeather();
        }
      } catch (err) {
        if (err instanceof Error) {
          setErrorMessage(err.message);
        }
        setForecastWeather(undefined);
      }
    },
    [pathState, text],
  );

  useEffect(() => {
    if (!pathState?.date) {
      navigate("/");
    }
    fetchWeather();
  }, [pathState?.date]);

  return (
    <main className="app">
      <h1>{pathState?.date ? `${pathState?.location} at ${formatDate(pathState?.date || "")}` : "Weather Forecast"}</h1>
      <form onSubmit={onSubmit}>
        <TextBox value={text} onChange={setText} />
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : !errorMessage && forecastWeather ? (
        <Routes>
          <Route path="/" element={<Home forecastWeather={forecastWeather} />} />
          <Route path="/:location" element={<Date forecastWeather={forecastWeather} />} />
        </Routes>
      ) : (
        <p>No data</p>
      )}
    </main>
  );
}

export default App;
