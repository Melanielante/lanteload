import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, MapPin, Phone, Mail, Calendar } from "lucide-react";
import { StatusBadge } from "../components/StatusBadge";
import { MaintenanceHistory } from "../components/MaintenanceHistory";
import { ScaleChart } from "../components/ScaleChart";
import { ScaleMap } from "../components/ScaleMap";

export function ScaleDetails() {
  const { scale_id } = useParams();
  const navigate = useNavigate();

  const [scale, setScale] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weightData, setWeightData] = useState([]);
  const [maintenanceHistory, setMaintenanceHistory] = useState([]);

  useEffect(() => {
    async function fetchScale() {
      try {
        const res = await fetch(`http://localhost:5000/scales/${scale_id}`);
        if (!res.ok) throw new Error("Scale not found");
        const data = await res.json();
        setScale(data);

        setWeightData(
          Array.from({ length: 12 }, (_, i) => ({
            time: `${i * 2}:00`,
            weight: Math.floor(Math.random() * 2000 + 3000),
          }))
        );

        setMaintenanceHistory([
          { date: data.last_maintenance, type: "Routine Inspection", technician: "Melanie Akinyi", status: "Completed" },
          { date: "2025-10-15", type: "Calibration", technician: "Peter Okoth", status: "Completed" },
          { date: "2025-09-02", type: "Sensor Replacement", technician: "Kelly Odongo", status: "Completed" },
        ]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchScale();
  }, [scale_id]);

  if (loading) return <div className="px-6 py-6">Loading scale details...</div>;
  if (!scale) return <div className="px-6 py-6">Scale not found.</div>;

  return (
    <div className="px-6 py-6 max-w-[1600px] mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 mb-4"
        style={{ color: "#1A2A4A", fontSize: "14px" }}
      >
        <ArrowLeft size={18} /> Back to All Scales
      </button>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: "28px", color: "#1A2A4A" }}>{scale.scale_id}</h1>
          <StatusBadge status={scale.status} />
          <p style={{ fontSize: "14px", color: "#6B7280" }}>{scale.location_name}</p>
        </div>
        <button
          className="px-4 py-2 rounded-lg text-white"
          style={{ backgroundColor: "#25A4A8", fontSize: "14px" }}
          onClick={() => navigate(`/scales/${scale_id}/schedule`)}
        >
          Schedule Maintenance
        </button>
      </div>

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
            <MaintenanceHistory records={maintenanceHistory} />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weight Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-[#1A2A4A] mb-4">Weight Readings - Last 24 Hours</h3>
            <ScaleChart data={weightData} />
          </div>

          {/* Map */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-[#1A2A4A] mb-4">Exact Location</h3>
            <ScaleMap
              latitude={scale.latitude}
              longitude={scale.longitude}
              locationName={scale.location_name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
