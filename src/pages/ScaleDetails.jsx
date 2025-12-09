import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, MapPin, Phone, Mail, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Leaflet marker
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({ iconRetinaUrl: markerIcon2x, iconUrl: markerIcon, shadowUrl: markerShadow });

// Status Badge
function StatusBadge({ status }) {
  let bgColor, textColor;
  switch (status) {
    case "operational": bgColor = "#D1FAE5"; textColor = "#059669"; break;
    case "offline": bgColor = "#FEE2E2"; textColor = "#DC2626"; break;
    case "error": bgColor = "#FED7AA"; textColor = "#EA580C"; break;
    default: bgColor = "#E5E7EB"; textColor = "#6B7280";
  }
  return (
    <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: bgColor, color: textColor }}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export function ScaleDetails() {
  const { id } = useParams(); // use "id"
  const navigate = useNavigate();

  const [scale, setScale] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weightData, setWeightData] = useState([]);
  const [maintenanceHistory, setMaintenanceHistory] = useState([]);
  const [statusTimeline, setStatusTimeline] = useState([]);

  useEffect(() => {
    async function fetchScale() {
      try {
        const res = await fetch(`http://localhost:5000/scales/${id}`);
        if (!res.ok) throw new Error("Scale not found");
        const data = await res.json();
        setScale(data);

        setWeightData(Array.from({ length: 12 }, (_, i) => ({ time: `${i * 2}:00`, weight: Math.floor(Math.random() * 2000 + 3000) })));

        setMaintenanceHistory([
          { date: data.last_maintenance, type: "Routine Inspection", technician: "Melanie Akinyi", status: "Completed" },
          { date: "2025-10-15", type: "Calibration", technician: "Peter Okoth", status: "Completed" },
          { date: "2025-09-02", type: "Sensor Replacement", technician: "Kelly Odongo", status: "Completed" },
        ]);

        setStatusTimeline([
          { time: "10:45", status: "Operational", duration: "2h 15m" },
          { time: "08:30", status: "Maintenance", duration: "45m" },
          { time: "00:00", status: "Operational", duration: "8h 30m" },
        ]);

      } catch (err) {
        console.error("Error fetching scale:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchScale();
  }, [id]);

  if (loading) return <div className="px-6 py-6">Loading scale details...</div>;
  if (!scale) return <div className="px-6 py-6">Scale not found.</div>;

  return (
    <div className="px-6 py-6 max-w-[1600px] mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 mb-4" style={{ color: "#1A2A4A", fontSize: "14px" }}>
        <ArrowLeft size={18} /> Back to All Scales
      </button>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: "28px", color: "#1A2A4A" }}>{scale.scale_id}</h1>
          <StatusBadge status={scale.status} />
          <p style={{ fontSize: "14px", color: "#6B7280" }}>{scale.location_name}</p>
        </div>
        <button className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: "#25A4A8", fontSize: "14px" }}>Schedule Maintenance</button>
      </div>


      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT PANEL */}
        <div className="space-y-6">

          {/* Location & Contact */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-[#1A2A4A] mb-2">Location & Contact</h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-gray-500" />
                <div>
                  <div className="text-xs text-gray-500">Address</div>
                  <div className="text-sm text-gray-900">{scale.location_name}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={18} className="text-gray-500" />
                <div>
                  <div className="text-xs text-gray-500">Contact</div>
                  <div className="text-sm text-gray-900">+254 700 000 000</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={18} className="text-gray-500" />
                <div className="text-sm text-[#25A4A8]">support@example.com</div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar size={18} className="text-gray-500" />
                <div className="text-sm text-gray-900">Installed: 2024-03-15</div>
              </div>
            </div>
          </div>

          {/* Maintenance History */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-[#1A2A4A] mb-2">Maintenance History</h3>

            <div className="space-y-3">
              {maintenanceHistory.map((record, i) => (
                <div key={i} className="pb-3 border-b border-gray-100">
                  <div className="text-sm text-gray-900">{record.type}</div>
                  <div className="text-xs text-gray-500">{record.date} • {record.technician}</div>
                  <span className="inline-block px-2 py-0.5 text-green-700 bg-green-100 text-xs rounded mt-1">
                    {record.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="lg:col-span-2 space-y-6">

          {/* Weight Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-[#1A2A4A] mb-4">
              Weight Readings - Last 24 Hours
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="time" tick={{ fill: "#6B7280", fontSize: 12 }} />
                <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="weight" stroke="#25A4A8" strokeWidth={3} dot={{ fill: "#25A4A8" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Map */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-[#1A2A4A] mb-4">Exact Location</h3>

            <MapContainer
              center={[scale.latitude, scale.longitude]}
              zoom={13}
              style={{ height: "250px", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[scale.latitude, scale.longitude]}>
                <Popup>{scale.location_name}</Popup>
              </Marker>
            </MapContainer>
          </div>

        </div>
      </div>
    </div>
  );
}
