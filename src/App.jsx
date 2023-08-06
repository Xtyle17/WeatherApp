import { useState, useEffect } from "react";

import "./App.css";

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
          weatherBckground = "../src/assets/cloudy.png";
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
      <div>
        <div>weather app</div>
        <form
          required
          onSubmit={(e) => {
            onSubmit(e);
          }}>
          <input
            autoFocus
            value={city}
            type="text"
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">submit</button>
        </form>
      </div>
    );
  };
  const WeatherData = ({ weather }) => {
    if (weather.main) {
      const { temp, feels_like } = weather.main;
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
          weatherMessage = "clody";
          weatherImage = "iasssdasd";
          break;
        case "Rain":
          weatherMessage = "rainy";
          weatherImage = "iasssdasd";
          break;
      }

      return (
        <>
          <p>TEMP:{Temp}°C</p>
          <p>Feels like:{Tempz}°C</p>
          <p>
            {weatherMessage}
            <img src={weatherImage} alt="" width={80} />
          </p>
          <p>{country}</p>
        </>
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
