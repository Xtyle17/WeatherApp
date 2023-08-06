import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const api_key = import.meta.env.VITE_WEATHER_API_KEY;

  const api_key2 = "9972daadd2fd4f57825b8f03799d7fb1";
  const [city, setCity] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [weather, setWeather] = useState([]);

  const weather_data = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

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
    <>
      <Forms city={city} setCity={setCity} />
      <WeatherData weather={weather} />
    </>
  );
}

export default App;
