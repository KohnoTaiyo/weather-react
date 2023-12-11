import "./Date.scss";

import { useEffect, useState } from "react";

import { BsFillSunriseFill, BsFillSunsetFill } from "react-icons/bs";
import { FaCloudRain, FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { useLocation, useNavigate } from "react-router-dom";

import { TopSection } from "../../components/TopSection/TopSection";
import { getForecastWeather } from "../../hooks/fetchers/fetchers";
import { formatDate } from "../../hooks/formatDate";
import { ForecastFewDaysWeatherType, StateParams } from "../../types";

function Date() {
  const routerParams = useLocation();
  const pathState = routerParams.state as StateParams | undefined;
  const [text, setText] = useState(pathState?.location || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [forecastWeather, setForecastWeather] = useState<ForecastFewDaysWeatherType | undefined>();
  const dayData = forecastWeather?.forecast.forecastday[0];
  const navigate = useNavigate();

  const fetchWeather = async () => {
    setIsLoading(true);
    try {
      const data = await getForecastWeather(text, 1, pathState?.date);
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sendPathParams: StateParams = { location: text };
    try {
      if (!text) throw new Error("Please enter a location.");
      setErrorMessage("");
      navigate("/", { state: sendPathParams });
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    }
  };

  useEffect(() => {
    if (!pathState?.location || !pathState.date) {
      navigate("/");
    }
    fetchWeather();
  }, []);

  return (
    <>
      <TopSection
        title={`${pathState?.location} at ${formatDate(pathState?.date || "")}`}
        value={text}
        onValueChange={setText}
        onSubmit={onSubmit}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        !errorMessage &&
        dayData && (
          <>
            <div className="condition">
              <img src={dayData.day.condition.icon} alt="" />
              <p className="condition__name">{dayData.day.condition.text}</p>
              <div className="condition__temp">
                <p>{`High: ${dayData.day.maxtemp_c}°C`}</p>
                <p>{`Low: ${dayData.day.mintemp_c}°C`}</p>
              </div>
            </div>
            <div className="status">
              <p className="status__text">
                <WiHumidity />
                {`Humidity: ${dayData.day.avghumidity}%`}
              </p>
              <p className="status__text">
                <FaWind />
                {`Max wind kph: ${dayData.day.maxwind_kph}km/h`}
              </p>
              <p className="status__text">
                <FaCloudRain />
                {`Chance of precipitation: ${dayData.day.daily_chance_of_rain}%`}
              </p>
              <p className="status__text">
                <BsFillSunriseFill />
                {`Sunrise: ${dayData.astro.sunrise}`}
              </p>
              <p className="status__text">
                <BsFillSunsetFill />
                {`Sunset: ${dayData.astro.sunset}`}
              </p>
            </div>
            <div className="time">
              {dayData.hour.map((item) => (
                <div className="time__item" key={item.time}>
                  <p>{item.time.slice(-5)}</p>
                  <img src={item.condition.icon} alt={item.condition.text} />
                  <p>{`${item.temp_c}°C`}</p>
                  <p>{`${item.chance_of_rain}%`}</p>
                </div>
              ))}
            </div>
          </>
        )
      )}
    </>
  );
}

export default Date;
