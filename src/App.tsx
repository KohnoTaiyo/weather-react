import "./App.scss";

function App() {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };

  const mock = [
    {
      date: "12/6",
      icon: "https:////cdn.weatherapi.com/weather/64x64/day/176.png",
    },
    {
      date: "12/7",
      icon: "https:////cdn.weatherapi.com/weather/64x64/day/176.png",
    },
    {
      date: "12/8",
      icon: "https:////cdn.weatherapi.com/weather/64x64/day/176.png",
    },
    {
      date: "12/9",
      icon: "https:////cdn.weatherapi.com/weather/64x64/day/176.png",
    },
    {
      date: "12/10",
      icon: "https:////cdn.weatherapi.com/weather/64x64/day/176.png",
    },
  ];

  return (
    <main className="app">
      <h1>Weather Forecast</h1>
      <form onSubmit={onSubmit} className="form">
        <input type="text" className="form__input" placeholder="location" />
        <input type="submit" value="Search" className="form__submit" />
      </form>
      <h3>Weather in Tokyo at 2023-12-05 22:40</h3>
      <div className="current">
        <img src="https://cdn.weatherapi.com/weather/64x64/night/296.png" className="current_icon" alt="" />
        <p className="current__name">Light rain</p>
        <p className="current__temp">
          <span className="current__tempMain">12</span>°C
        </p>
        <div>
          <p>Humidity: 71%</p>
          <p>Wind: 13kph</p>
        </div>
        <div>
          <p>Sunrise: 06:35 AM</p>
          <p>Sunset: 04:27 PM</p>
        </div>
      </div>
      <h3>5days weather</h3>
      <ul className="forecast">
        {mock.map((item) => (
          <li key={item.date} className="forecast__item">
            <p className="forecast__itemDate">{item.date}</p>
            <img src={item.icon} alt="" />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
