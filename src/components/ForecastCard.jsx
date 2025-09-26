import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const ForecastCard = ({ forecast }) => {
  const time = new Date(forecast.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <Card sx={{ minWidth: 100, mx: 1, backgroundColor: "rgba(255,255,255,0.8)" }}>
      <CardContent>
        <Typography variant="subtitle2">{time}</Typography>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img
            src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
            alt={forecast.weather[0].description}
          />
        </Box>
        <Typography variant="body2">{Math.round(forecast.main.temp)}°C</Typography>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;
