import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import SearchBar from "./components/SearchBar";
import WeatherMap from "./components/WeatherMap";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import ForecastTabs from "./components/ForecastTabs";
import axios from "axios";

const DEFAULT_COORDS = { lat: 20.5937, lon: 78.9629 }; // India center

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [coords, setCoords] = useState(DEFAULT_COORDS);
  const apiKey = import.meta.env.VITE_CLIMAFY_API_KEY;

  const handleSearch = async (cityName) => {
    try {
      // Current weather
      const resWeather = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: { q: cityName, units: "metric", appid: apiKey },
      });
      setCurrentWeather(resWeather.data);
      setCoords({ lat: resWeather.data.coord.lat, lon: resWeather.data.coord.lon });

      // Forecast
      const resForecast = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
        params: { q: cityName, units: "metric", appid: apiKey },
      });
      setForecast(resForecast.data.list.slice(0, 12));
    } catch (err) {
      console.error("Error fetching weather:", err);
      setCurrentWeather(null);
      setForecast([]);
      setCoords(DEFAULT_COORDS);
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", width: "100vw" }}>
      <SearchBar onSearch={handleSearch} />



      <Box sx={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Left Panel - 30% */}
        <Box sx={{ width: '30%', minWidth: 300, maxWidth: 500, p: 2, overflowY: 'auto', backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {currentWeather && <CurrentWeatherCard weather={currentWeather} />}
          {forecast.length > 0 && <ForecastTabs forecast={forecast} />}
        </Box>

        {/* Right Panel - 70% */}
        <Box sx={{ width: '70%', height: '100%', minHeight: 0 }}>
          <WeatherMap coords={coords} forecastCities={currentWeather ? [currentWeather] : []} />
        </Box>
      </Box>
    </Box>
  );
};

export default App;
