import "./Home.scss";

import { useCallback, useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import { TopSection } from "../../components/TopSection/TopSection";
import { getForecastWeather } from "../../hooks/fetchers/fetchers";
import { formatDate } from "../../hooks/formatDate";
import { ForecastFewDaysWeatherType, StateParams } from "../../types";

const FORECAST_DAYS_AMOUNT = 5;
const INITIAL_LOCATION = "New York";

function Home() {
  const routerParams = useLocation();
  const pathState = routerParams.state as StateParams;
  const searchLocation = pathState?.location || INITIAL_LOCATION;
  const [text, setText] = useState(searchLocation);
  const [errorMessage, setErrorMessage] = useState("");
  const [forecastWeather, setForecastWeather] = useState<ForecastFewDaysWeatherType | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const { current, forecast, location } = forecastWeather || {};
  const locationName = [location?.name, location?.region, location?.country].filter(Boolean).join(", ");
  const sendPathParams: StateParams = { location: location?.name, date: location?.localtime };

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
      <TopSection
        title="Weather Forecast"
        errorMessage={errorMessage}
        value={text}
        onValueChange={setText}
        onSubmit={onSubmit}
      />
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
                    <Link
                      to={{ pathname: `/${location?.name.replace(/\s+/g, "")}` }}
                      state={sendPathParams}
                      key={item.date}
                      className="forecast__item"
                    >
                      <li>
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
