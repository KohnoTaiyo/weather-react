import "./Date.scss";

import { BsFillSunriseFill, BsFillSunsetFill } from "react-icons/bs";
import { FaCloudRain, FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";

import { ForecastFewDaysWeatherType } from "../../types";

function Date({ forecastWeather }: { forecastWeather: ForecastFewDaysWeatherType }) {
  const dayData = forecastWeather?.forecast.forecastday[0];

  return (
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
  );
}

export default Date;
