import { useEffect, useState } from "react";
import { Calendar, TrendingUp, TrendingDown } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Analytics() {
  const [weightVolumeData, setWeightVolumeData] = useState([]);
  const [downtimeData, setDowntimeData] = useState([]);
  const [errorRateData, setErrorRateData] = useState([]);
  const [kpiData, setKpiData] = useState([]);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch("http://localhost:5000/analytics");
        if (!res.ok) throw new Error("Failed to fetch analytics");

        const data = await res.json();

        setWeightVolumeData(data.weightVolume || []);
        setDowntimeData(data.downtime || []);
        setErrorRateData(data.systemStatus || []);
        setKpiData(data.kpis || []);
      } catch (error) {
        console.log("Analytics fetch error:", error);
      }
    }

    fetchAnalytics();
  }, []);

  return (
    <div className="px-6 py-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 style={{ color: "#1A2A4A", fontSize: "28px", marginBottom: "4px" }}>
              Analytics
            </h1>
            <p style={{ color: "#6B7280", fontSize: "14px" }}>
              Performance insights and trends
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 px-4 py-2 border rounded-lg"
              style={{ borderColor: "#E5E7EB" }}
            >
              <Calendar size={16} style={{ color: "#6B7280" }} />
              <select className="border-0 outline-none bg-transparent" style={{ color: "#1A2A4A" }}>
                <option>Last 7 Months</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>Last Year</option>
              </select>
            </div>

            <select
              className="px-4 py-2 border rounded-lg"
              style={{ borderColor: "#E5E7EB", color: "#1A2A4A" }}
            >
              <option>All Regions</option>
              <option>North</option>
              <option>South</option>
              <option>East</option>
              <option>West</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {kpiData.map((kpi) => (
          <div key={kpi.title} className="bg-white rounded-xl shadow-sm p-6">
            <div style={{ fontSize: "13px", color: "#6B7280", marginBottom: "8px" }}>
              {kpi.title}
            </div>
            <div className="flex items-end justify-between">
              <div style={{ fontSize: "28px", color: "#1A2A4A" }}>{kpi.value}</div>
              <div
                className="flex items-center gap-1"
                style={{
                  color: kpi.trend === "up" ? "#059669" : "#DC2626",
                }}
              >
                {kpi.trend === "up" ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                <span style={{ fontSize: "13px" }}>{kpi.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weight Volume */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="mb-4" style={{ color: "#1A2A4A", fontSize: "18px" }}>
            Total Weight Volume Over Time
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weightVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fill: "#6B7280" }} />
              <YAxis
                tick={{ fill: "#6B7280" }}
                tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`}
              />
              <Tooltip />
              <Bar dataKey="volume" fill="#25A4A8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Downtime */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="mb-4" style={{ color: "#1A2A4A", fontSize: "18px" }}>
            Downtime Analysis
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={downtimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="scale" tick={{ fill: "#6B7280" }} />
              <YAxis tick={{ fill: "#6B7280" }} />
              <Tooltip />
              <Bar dataKey="hours" fill="#DC2626" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* System Status Pie */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="mb-4" style={{ color: "#1A2A4A", fontSize: "18px" }}>
            System Status Distribution
          </h3>

          <div className="flex items-center justify-between">
            <ResponsiveContainer width="60%" height={250}>
              <PieChart>
                <Pie
                  data={errorRateData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {errorRateData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-3 w-[35%]">
              {errorRateData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="rounded"
                      style={{ width: "12px", height: "12px", backgroundColor: item.color }}
                    />
                    <span style={{ fontSize: "13px", color: "#6B7280" }}>{item.name}</span>
                  </div>
                  <span style={{ fontSize: "14px", color: "#1A2A4A" }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
