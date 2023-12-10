import { useEffect, useState } from "react";

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
  const [forecastWeather, setForecastWeather] = useState<ForecastFewDaysWeatherType | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  console.log({ forecastWeather });
  console.log({ pathState });

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

  if (!pathState?.location || !pathState.date) {
    return null;
  }

  return (
    <>
      <TopSection
        title={`${pathState.location} at ${formatDate(pathState.date)}`}
        value={text}
        onValueChange={setText}
        onSubmit={onSubmit}
      />
      {isLoading ? <p>Loading...</p> : !errorMessage && <></>}
    </>
  );
}

export default Date;
