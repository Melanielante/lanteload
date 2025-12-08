import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default icon shadow

// Create colored div icon
const getDivIconByStatus = (status) => {
  const color =
    status === "operational"
      ? "#28a745" // green
      : status === "offline"
      ? "#dc3545" // red
      : "#ffc107"; // yellow

  return L.divIcon({
    html: `<div style="
      background-color: ${color};
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 2px rgba(0,0,0,0.5);
    "></div>`,
    className: "", // remove default class
    iconSize: [16, 16],
    iconAnchor: [8, 8], // center of circle
    popupAnchor: [0, -10],
  });
};

export function InteractiveMap({ onViewScale }) {
  const [scales, setScales] = useState([]);

  // Fetch scales from JSON Server
  const fetchScales = async () => {
    try {
      const res = await fetch("http://localhost:5000/scales");
      const data = await res.json();
      setScales(data);
    } catch (err) {
      console.error("Error fetching scales:", err);
    }
  };

  useEffect(() => {
    fetchScales();
    const interval = setInterval(fetchScales, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={[-1.2921, 36.8219]} zoom={6} className="leaflet-container">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
      />

      {scales.map((scale) => (
        <Marker
          key={scale.scale_id}
          position={[scale.latitude, scale.longitude]}
          icon={getDivIconByStatus(scale.status)}
        >
          <Popup>
            <div>
              <strong>{scale.location_name}</strong>
              <p>Last Maintenance: {scale.last_maintenance}</p>
              <p>Status: {scale.status}</p>
              <p>Last Reading: {scale.last_weight_reading}</p>
              <button
                className="mt-2 px-2 py-1 bg-blue-500 text-white rounded"
                onClick={() => onViewScale(scale.scale_id)}
              >
                View Scale
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
