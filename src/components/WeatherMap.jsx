import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const cityIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const WeatherMap = ({ coords, forecastCities }) => {
  const mapRef = useRef(null);
  const apiKey = import.meta.env.VITE_CLIMAFY_API_KEY;

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.innerHTML = "";

    const map = L.map(mapRef.current, {
      center: [coords.lat, coords.lon],
      zoom: 15,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    const layers = {
      Clouds: L.tileLayer(`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`, { opacity: 0.5 }),
      Rain: L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`, { opacity: 0.5 }),
      Temp: L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`, { opacity: 0.5 }),
      Wind: L.tileLayer(`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${apiKey}`, { opacity: 0.5 }),
      Pressure: L.tileLayer(`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${apiKey}`, { opacity: 0.5 }),
    };

    L.control.layers(layers, null, { collapsed: false }).addTo(map);
    layers.Clouds.addTo(map);

    forecastCities?.forEach((city) => {
      if (city.coord) {
        L.marker([city.coord.lat, city.coord.lon], { icon: cityIcon })
          .addTo(map)
          .bindPopup(`
            <b>${city.name}</b><br/>
            ${city.weather[0].description}<br/>
            Temp: ${Math.round(city.main.temp)}°C
          `);
      }
    });

    return () => map.remove();
  }, [coords, forecastCities, apiKey]);

  return <div ref={mapRef} style={{ height: "100%", width: "100%" }} />;
};

export default WeatherMap;
