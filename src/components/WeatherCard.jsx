import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ position: "absolute", top: 100, left: "50%", transform: "translateX(-50%)", zIndex: 1000 }}
    >
      <Card sx={{ minWidth: 300, backgroundColor: "rgba(255, 255, 255, 0.85)" }}>
        <CardContent>
          <Typography variant="h5">{weather.name}, {weather.sys.country}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
            <Typography variant="h4">{Math.round(weather.main.temp)}°C</Typography>
          </Box>
          <Typography>{weather.weather[0].description}</Typography>
          <Typography variant="body2">Humidity: {weather.main.humidity}%</Typography>
          <Typography variant="body2">Wind: {weather.wind.speed} m/s</Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WeatherCard;
