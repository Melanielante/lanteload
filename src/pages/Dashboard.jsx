import React, { useEffect, useState, useMemo } from "react";
import { Calendar, MapPin, Filter } from "lucide-react";
import { MetricsGrid } from "../dashboard/MetricsGrid";
import { InteractiveMap } from "../dashboard/InteractiveMap";
import { RecentActivityTable } from "../dashboard/RecentActivityTable";
import { useNavigate } from "react-router";

export function DashboardPage() {
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

  const metrics = useMemo(() => {
    const total = filteredScales.length;
    const operational = filteredScales.filter((s) => s.status === "operational").length;
    const offline = filteredScales.filter((s) => s.status === "offline").length;
    const error = filteredScales.filter((s) => s.status === "error").length;

    return [
      { label: "Total Scales", value: total },
      { label: "Operational", value: operational },
      { label: "Offline", value: offline },
      { label: "Error", value: error }
    ];
  }, [filteredScales]);

  const handleViewScale = (scaleId) => navigate(`/scales/${scaleId}`);

  if (loading) return <div>Loading scales...</div>;

  return (
    <div className="px-6 py-6 max-w-[1600px] mx-auto">
      {/* Your header, filters, metrics, map, table */}
      <MetricsGrid metrics={metrics} />
      <InteractiveMap scales={filteredScales} onViewScale={handleViewScale} />
      <RecentActivityTable scales={filteredScales} onViewScale={handleViewScale} />
    </div>
  );
}
