import React, { useState } from "react";
import { AppBar, Toolbar, Typography, TextField, Button, Box } from "@mui/material";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city) onSearch(city);
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        <Typography variant="h6">Climafy 🌤️</Typography>
        <Box sx={{ display: "flex", gap: 1, mt: { xs: 1, md: 0 } }}>
          <TextField
            size="small"
            label="Search city"
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            sx={{ backgroundColor: "#fff", borderRadius: 1 }}
          />
          <Button variant="contained" color="secondary" onClick={handleSearch}>
            Search
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default SearchBar;
