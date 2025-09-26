import React, { useState } from "react";
import { Card, CardContent, Typography, Box, Tabs, Tab } from "@mui/material";

const ForecastCard = ({ forecast }) => {
  const [tab, setTab] = useState(0);
  const handleChange = (e, newValue) => setTab(newValue);

  const time = new Date(forecast.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <Card sx={{ minWidth: 150, mx: 0.5, backgroundColor: "#ffffffcc" }}>
      <CardContent>
        <Typography variant="subtitle2">{time}</Typography>
        <Tabs value={tab} onChange={handleChange} variant="fullWidth" textColor="primary" indicatorColor="primary">
          <Tab label="Overview" />
          <Tab label="Humidity" />
          <Tab label="Wind" />
          <Tab label="Precipitation" />
        </Tabs>

        <Box sx={{ mt: 1 }}>
          {tab === 0 && (
            <Box sx={{ textAlign: "center" }}>
              <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} alt={forecast.weather[0].description} />
              <Typography>{Math.round(forecast.main.temp)}°C</Typography>
              <Typography variant="caption">{forecast.weather[0].main}</Typography>
            </Box>
          )}
          {tab === 1 && <Typography>Humidity: {forecast.main.humidity}%</Typography>}
          {tab === 2 && <Typography>Wind: {forecast.wind.speed} m/s</Typography>}
          {tab === 3 && (
            <Typography>
              Precipitation: {forecast.rain?.["3h"] ? `${forecast.rain["3h"]} mm` : "0 mm"}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;
