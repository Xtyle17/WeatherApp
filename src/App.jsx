import { useState, useEffect } from "react";
import "./styles/style.css";

function App() {
  const api_key = import.meta.env.VITE_WEATHER_API_KEY;
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState([]);
  const [background, setBackground] = useState("");

  const weather_data = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  useEffect(() => {
    if (weather && weather.weather && weather.weather.length > 0) {
      const { main } = weather.weather[0];
      let weatherBckground = null;
      switch (main) {
        case "Clear":
          weatherBckground = "../src/assets/bckground-clear.jpg";
          break;
        case "Clouds":
          weatherBckground = "../src/assets/cloudy.png";
          break;
        case "Rain":
          weatherBckground = "../src/assets/rainy-bkgrnd.jpg";
          break;
        default:
          weatherBckground = "../src/assets/cloudy.png";
      }
      setBackground(weatherBckground);
    }
  }, [weather]);

  const onSubmit = (e) => {
    e.preventDefault();

    const fetchWeather = async () => {
      try {
        const respo = await fetch(weather_data);
        const data = await respo.json();

        setWeather(data);
        console.log(data);
        setCity("");
      } catch (err) {
        console.log(err);
      }
    };

    if (city) {
      fetchWeather();
    }
  };

  const Forms = ({ city, setCity }) => {
    return (
      <div className="form">
        <div className="App-title">WEATHER APP</div>
        <form
          required
          onSubmit={(e) => {
            onSubmit(e);
          }}>
          <input
            autoFocus
            value={city}
            type="text"
            placeholder="type city here"
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">submit</button>
        </form>
      </div>
    );
  };
  const WeatherData = ({ weather }) => {
    if (weather.main) {
      const { temp, feels_like, humidity } = weather.main;
      const name = weather.name;
      const { country } = weather.sys;
      const { main } = weather.weather[0];
      const Temp = (temp - 273.15).toFixed(2);
      const Tempz = (feels_like - 273.15).toFixed(2);
      let weatherMessage = null;
      let weatherImage = null;

      switch (main) {
        case "Clear":
          weatherMessage = "clear ssky";
          weatherImage = "../3032746.png";
          break;
        case "Clouds":
          weatherMessage = "cloudy";
          weatherImage = "../src/assets/logo/clouded.png";
          break;
        case "Rain":
          weatherMessage = "rainy";
          weatherImage = "../src/assets/logo/rain.png";
          break;
        default:
          weatherMessage = "not in the switch-case";
      }

      return (
        <div className="data-wrapper">
          <div className="weather-data">
            <div className="rw-1">
              <p className="temp">TEMP:{Temp}°C</p>
              <p className="feels-temp">Feels like:{Tempz}°C</p>
            </div>
            <div className="rw-2">
              <p className="humid"> humidity:{humidity}%</p>
              <p className="w-message">{weatherMessage}</p>
            </div>
            <img src={weatherImage} alt="" width={80} className="img" />
          </div>
          <div className="loc">
            <p>{name}</p>
            <p className="country">{country}</p>
          </div>
        </div>
      );
    } else {
      return <p>vacant</p>;
    }
  };
  return (
    <div
      className="container"
      style={{
        backgroundImage: background
          ? `url(${background})`
          : `url(../src/assets/bckground-clear.jpg)`,
      }}>
      <Forms city={city} setCity={setCity} />
      <WeatherData weather={weather} />
    </div>
  );
}

export default App;
