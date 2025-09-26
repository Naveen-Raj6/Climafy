import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Card, CardContent } from "@mui/material";

const ForecastTabs = ({ forecast }) => {
  const [tab, setTab] = useState(0);
  const handleChange = (e, newValue) => setTab(newValue);

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={handleChange}
        variant="fullWidth"
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Overview" />
        <Tab label="Humidity" />
        <Tab label="Wind" />
        <Tab label="Precipitation" />
      </Tabs>

      {/* Horizontal Scrollable Forecast */}
      <Box sx={{ display: "flex", overflowX: "auto", mt: 2, gap: 1 }}>
        {forecast.map((hour, idx) => (
          <Card key={idx} sx={{ minWidth: 120, flexShrink: 0, backgroundColor: "#ffffffcc" }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="subtitle2">
                {new Date(hour.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </Typography>

              {/* Tab content with icons */}
              {tab === 0 && (
                <>
                  <img
                    src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                    alt={hour.weather[0].description}
                  />
                  <Typography>{Math.round(hour.main.temp)}°C</Typography>
                  <Typography variant="caption">{hour.weather[0].main}</Typography>
                </>
              )}

              {tab === 1 && (
                <>
                  <img src="https://img.icons8.com/fluency/48/humidity.png" alt="humidity" width="40" />
                  <Typography>{hour.main.humidity}%</Typography>
                  <Typography variant="caption">Humidity</Typography>
                </>
              )}

              {tab === 2 && (
                <>
                  <img src="https://img.icons8.com/fluency/48/wind.png" alt="wind" width="40" />
                  <Typography>{hour.wind.speed} m/s</Typography>
                  <Typography variant="caption">Wind</Typography>
                </>
              )}

              {tab === 3 && (
                <>
                  <img src="https://img.icons8.com/fluency/48/rain.png" alt="precipitation" width="40" />
                  <Typography>{hour.rain?.["3h"] ? `${hour.rain["3h"]} mm` : "0 mm"}</Typography>
                  <Typography variant="caption">Precipitation</Typography>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ForecastTabs;
