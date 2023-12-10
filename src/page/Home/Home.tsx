import { ForecastFewDaysWeatherType } from "../../types";

const formatDate = (date: string) => date.slice(5).replace("-", "/");

function Home({ forecastWeather}: { forecastWeather: ForecastFewDaysWeatherType}) {
  const { current, forecast, location } = forecastWeather || {};
  const locationName = [location?.name, location?.region, location?.country].filter(Boolean).join(", ");

  return (
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
  );
}

export default Home;