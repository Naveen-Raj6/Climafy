import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherMap from "./components/WeatherMap";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import axios from "axios";
import { Box, Typography } from "@mui/material";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [coords, setCoords] = useState(null);
  const [forecast, setForecast] = useState([]);
  const apiKey = import.meta.env.VITE_CLIMAFY_API_KEY;

  const handleSearch = async (city) => {
    try {
      // Current Weather
      const resWeather = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: { q: city, units: "metric", appid: apiKey },
      });
      setWeather(resWeather.data);
      setCoords({ lat: resWeather.data.coord.lat, lon: resWeather.data.coord.lon });

      // Forecast (next 12 hours)
      const resForecast = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
        params: { q: city, units: "metric", appid: apiKey },
      });
      setForecast(resForecast.data.list.slice(0, 12)); // next 12 periods (~36 hours)
    } catch (err) {
      console.error("Error fetching weather:", err);
      setWeather(null);
      setCoords(null);
      setForecast([]);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <SearchBar onSearch={handleSearch} />
      {coords && <WeatherMap lat={coords.lat} lon={coords.lon} />}
      {weather && <WeatherCard weather={weather} />}
      {forecast.length > 0 && (
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            position: "absolute",
            bottom: 20,
            left: 0,
            right: 0,
            px: 2,
            zIndex: 1000,
          }}
        >
          {forecast.map((f, idx) => (
            <ForecastCard key={idx} forecast={f} />
          ))}
        </Box>
      )}
    </div>
  );
};

export default App;
