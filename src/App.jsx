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
          weatherBckground = "../src/assets/cloud.jpg";
          break;
        case "Rain":
          weatherBckground = "../src/assets/rainy-bkgrnd.jpg";
          break;
        case "Haze":
          weatherBckground = "../src/assets/cloud.jpg";
          break;
        case "Thunderstorm":
          weatherBckground = "../src/assets/storm.jpg";
          break;
        case "Mist":
          weatherBckground = "../src/assets/mist.jpg";
          break;
        default:
          weatherBckground = "../src/assets/bckground-clear.png";
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
      const Temp = Math.round(temp - 273.15);
      const Tempz = Math.round(feels_like - 273.15);
      let weatherMessage = null;
      let weatherImage = null;
      let note = null;
      let note2 = null;
      let note3 = null;
      const tempClass = Tempz > 33 ? "temp-hot" : "temp-normal";
      const tempClass1 = Tempz < 25 ? "temp-cold" : "";

      switch (main) {
        case "Clear":
          weatherMessage = "Clear sky";
          weatherImage = "../3032746.png";
          note = "please stay indoors";
          note2 = "wear cool clothes";
          break;
        case "Clouds":
          weatherMessage = "Cloudy";
          weatherImage = "../src/assets/logo/clouded.png";
          note2 = "Please bring an umbrella";

          break;
        case "Rain":
          weatherMessage = "Rainy";
          weatherImage = "../src/assets/logo/rain.png";
          note2 = "Please bring an umbrella or raincoat";

          break;
        case "Haze":
          weatherMessage = "Haze";
          weatherImage = "../src/assets/logo/haze.png";
          note2 = "please use a cover";
          break;
        case "Mist":
          weatherMessage = "Mist";
          weatherImage = "../src/assets/logo/mist.png";
          note3 = "low visibility";
          break;
        case "Thunderstorm":
          weatherMessage = "Thunder Storm";
          weatherImage = "../src/assets/logo/storm.png";
          note3 = "avoid going outside";
          break;
        default:
          weatherMessage = "not in the switch-case";
      }

      return (
        <div className="data-wrapper">
          <div className="weather-data">
            <div className="loc">
              <p>{name},</p>
              <p className="country">{country}</p>
            </div>
            <div className="rw-1">
              <p className="temp">TEMP:{Temp}°C</p>
              <p className={`feels-like ${tempClass} ${tempClass1}`}>
                Feels like:{Tempz}°C
              </p>
            </div>
            <div className="rw-2">
              <div className="rw-2-child">
                <img src={weatherImage} alt="" width={50} className="img" />
                <p className="w-message">{weatherMessage}</p>
              </div>
              <p className="humid">Humidity:{humidity}%</p>
            </div>
          </div>

          <div className="notes">
            {Tempz > 33 && weatherMessage === "clear"
              ? "please stay indoors to avoid heatstroke"
              : ""}
            {main === "Clouds" || "Rainy" ? note2 : ""}
            {main === "Mist" || "Haze" ? note3 : ""}
          </div>
        </div>
      );
    } else {
      return <p>Type a City</p>;
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
