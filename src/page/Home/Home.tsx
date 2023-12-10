import "./Home.scss";

import { useCallback, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { TextBox } from "../../components/TextBox/TextBox";
import { getForecastWeather } from "../../hooks/fetchers";
import { ForecastFewDaysWeatherType } from "../../types";

const formatDate = (date: string) => date.slice(5).replace("-", "/");

const FORECAST_DAYS_AMOUNT = 5;
const INITIAL_LOCATION = "New York";

function Home() {
  const [text, setText] = useState(INITIAL_LOCATION);
  const [errorMessage, setErrorMessage] = useState("");
  const [forecastWeather, setForecastWeather] = useState<ForecastFewDaysWeatherType | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const { current, forecast, location } = forecastWeather || {};
  const locationName = [location?.name, location?.region, location?.country].filter(Boolean).join(", ");

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

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <>
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
                <h3>Next 5days weather</h3>
                <ul className="forecast">
                  {forecast.forecastday.map((item) => (
                    <Link to={`/${item.date}`} key={item.date}>
                      <li className="forecast__item">
                        <p className="forecast__itemDate">{formatDate(item.date)}</p>
                        <img src={item.day.condition.icon} alt="" />
                        <p className="forecast__itemName">{item.day.condition.text}</p>
                      </li>
                    </Link>
                  ))}
                </ul>
              </>
            )}
          </>
        )
      )}
    </>
  );
}

export default Home;
