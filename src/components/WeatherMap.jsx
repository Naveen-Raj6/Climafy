import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const WeatherMap = ({ lat, lon }) => {
  const mapRef = useRef(null);
  const apiKey = import.meta.env.VITE_CLIMAFY_API_KEY;

  useEffect(() => {
    if (!lat || !lon || !mapRef.current) return;

    mapRef.current.innerHTML = ""; // cleanup

    const map = L.map(mapRef.current).setView([lat, lon], 10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Cloud overlay
    L.tileLayer(`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
      opacity: 0.5,
    }).addTo(map);

    return () => map.remove();
  }, [lat, lon, apiKey]);

  return <div ref={mapRef} style={{ height: "100vh", width: "100vw" }} />;
};

export default WeatherMap;
