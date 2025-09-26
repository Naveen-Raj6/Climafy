import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";

const CurrentWeatherCard = ({ weather }) => {
  if (!weather) return null;

  const { main, weather: w, wind, sys, name } = weather;

  return (
    <Card sx={{ mb: 2, backgroundColor: "#ffffffcc" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>{name}, {sys.country}</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <img src={`https://openweathermap.org/img/wn/${w[0].icon}@2x.png`} alt={w[0].description} />
          <Box>
            <Typography variant="h4">{Math.round(main.temp)}°C</Typography>
            <Typography variant="subtitle1">Feels like: {Math.round(main.feels_like)}°C</Typography>
            <Typography variant="subtitle2">{w[0].main}</Typography>
          </Box>
        </Box>

        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <Typography>Humidity: {main.humidity}%</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Wind: {wind.speed} m/s</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Pressure: {main.pressure} hPa</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CurrentWeatherCard;
