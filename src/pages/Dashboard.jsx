import React, { useEffect, useState, useMemo } from "react";
import { Calendar, MapPin, Filter, Scale, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { MetricsGrid } from "../components/MetricsGrid";
import { InteractiveMap } from "../components/InteractiveMap";
import { RecentActivityTable } from "../components/RecentActivityTable";
import { useNavigate } from "react-router";

export function Dashboard() {
  const navigate = useNavigate();
  const [scales, setScales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState("All Regions");
  const [status, setStatus] = useState("All Status");
  const [dateRange, setDateRange] = useState("Last 7 Days");

  useEffect(() => {
    async function fetchScales() {
      try {
        const res = await fetch("http://localhost:5000/scales");
        const data = await res.json();
        setScales(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching scales:", err);
        setLoading(false);
      }
    }

    fetchScales();
  }, []);

  const filteredScales = useMemo(() => {
    return scales.filter((scale) => {
      const regionMatch = region === "All Regions" || scale.location_name === region;
      const statusMatch = status === "All Status" || scale.status === status.toLowerCase();
      return regionMatch && statusMatch;
    });
  }, [region, status, scales]);

  // Metrics for MetricsGrid with icons & colors
  const metrics = useMemo(() => {
    const total = filteredScales.length;
    const operational = filteredScales.filter((s) => s.status === "operational").length;
    const offline = filteredScales.filter((s) => s.status === "offline").length;
    const error = filteredScales.filter((s) => s.status === "error").length;

    return [
      {
        title: "Total Scales Installed",
        value: total,
        change: "+4 this month",
        icon: Scale,
        color: "#1A2A4A",
        bgColor: "#F0F4F8",
      },
      {
        title: "Operational Scales",
        value: operational,
        change: `${operational ? ((operational / total) * 100).toFixed(1) : 0}% uptime`,
        icon: CheckCircle,
        color: "#059669",
        bgColor: "#D1FAE5",
      },
      {
        title: "Offline Scales",
        value: offline,
        change: `-2 from yesterday`,
        icon: XCircle,
        color: "#DC2626",
        bgColor: "#FEE2E2",
      },
      {
        title: "Scales with Errors",
        value: error,
        change: "Requires attention",
        icon: AlertTriangle,
        color: "#EA580C",
        bgColor: "#FED7AA",
      },
    ];
  }, [filteredScales]);

  const handleViewScale = (scaleId) => navigate(`/scales/${scaleId}`);

  if (loading) return <div>Loading scales...</div>;

  return (
    <div className="px-6 py-6 max-w-[1600px] mx-auto">
      {/* Header & Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 style={{ color: "#1A2A4A", fontSize: "28px", marginBottom: "4px" }}>Dashboard</h1>
            <p style={{ color: "#6B7280", fontSize: "14px" }}>
              Real-time weighbridge monitoring and analytics
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Date Range Filter */}
            <div className="flex items-center gap-2 px-4 py-2 border rounded-lg" style={{ borderColor: "#E5E7EB" }}>
              <Calendar size={16} style={{ color: "#6B7280" }} />
              <select
                className="border-0 outline-none bg-transparent"
                style={{ color: "#1A2A4A", fontSize: "14px" }}
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>Custom Range</option>
              </select>
            </div>

            {/* Region Filter */}
            <div className="flex items-center gap-2 px-4 py-2 border rounded-lg" style={{ borderColor: "#E5E7EB" }}>
              <MapPin size={16} style={{ color: "#6B7280" }} />
              <select
                className="border-0 outline-none bg-transparent"
                style={{ color: "#1A2A4A", fontSize: "14px" }}
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option>All Regions</option>
                <option>Nairobi</option>
                <option>Mombasa</option>
                <option>Kisumu</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2 px-4 py-2 border rounded-lg" style={{ borderColor: "#E5E7EB" }}>
              <Filter size={16} style={{ color: "#6B7280" }} />
              <select
                className="border-0 outline-none bg-transparent"
                style={{ color: "#1A2A4A", fontSize: "14px" }}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>All Status</option>
                <option>Operational</option>
                <option>Offline</option>
                <option>Error</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <MetricsGrid metrics={metrics} />

      {/* Map Section */}
      <div className="mt-6">
        <InteractiveMap scales={filteredScales} onViewScale={handleViewScale} />
      </div>

      {/* Recent Activity */}
      <div className="mt-6">
        <RecentActivityTable scales={filteredScales} onViewScale={handleViewScale} />
      </div>
    </div>
  );
}
