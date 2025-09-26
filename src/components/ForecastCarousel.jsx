import React from "react";
import { Box } from "@mui/material";
import ForecastCard from "./ForecastCard";

const ForecastCarousel = ({ forecast }) => {
  return (
    <Box sx={{ display: "flex", overflowX: "auto", py: 1 }}>
      {forecast.map((f, idx) => (
        <ForecastCard key={idx} forecast={f} />
      ))}
    </Box>
  );
};

export default ForecastCarousel;
