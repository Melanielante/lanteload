import React, { useEffect, useState } from "react";
import { Download, Filter } from "lucide-react";
import jsPDF from "jspdf";

// Status Badge
function StatusBadge({ status }) {
  let bgColor, textColor;
  switch (status) {
    case "operational":
      bgColor = "#D1FAE5"; textColor = "#059669"; break;
    case "offline":
      bgColor = "#FEE2E2"; textColor = "#DC2626"; break;
    case "error":
      bgColor = "#FED7AA"; textColor = "#EA580C"; break;
    default:
      bgColor = "#E5E7EB"; textColor = "#6B7280";
  }

  return (
    <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: bgColor, color: textColor }}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export function Scales({ onViewScale }) {
  const [scales, setScales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("All Status");

  useEffect(() => {
    async function fetchScales() {
      try {
        const res = await fetch("http://localhost:5000/scales");
        const data = await res.json();
        setScales(data);
      } catch (err) {
        console.error("Error fetching scales:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchScales();
  }, []);

  const filteredScales = scales.filter(
    (scale) => status === "All Status" || scale.status === status.toLowerCase()
  );

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Weighbridge Report", 14, 20);

    const tableColumn = ["Scale ID", "Location", "Status", "Last Weight", "Last Updated", "Last Maintenance"];
    const tableRows = filteredScales.map((scale) => [
      scale.scale_id,
      scale.location_name,
      scale.status,
      scale.last_weight_reading,
      scale.last_updated,
      scale.last_maintenance
    ]);

    let y = 30;
    doc.text(tableColumn.join(" | "), 14, y);
    y += 10;

    tableRows.forEach((row) => {
      doc.text(row.join(" | "), 14, y);
      y += 10;
    });

    doc.save("weighbridge-report.pdf");
  };

  if (loading) return <div className="px-6 py-6">Loading scales...</div>;

  return (
    <div className="px-6 py-6 max-w-[1600px] mx-auto">

      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h1 className="text-[28px] text-[#1A2A4A]">All Weighbridges</h1>
        <p className="text-sm text-gray-500">Manage and monitor all weighbridge installations</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-500" />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg text-sm"
            style={{ borderColor: "#E5E7EB", color: "#1A2A4A" }}
          >
            <option>All Status</option>
            <option>Operational</option>
            <option>Offline</option>
            <option>Error</option>
          </select>
        </div>

        <button
          onClick={exportPDF}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white"
          style={{ backgroundColor: "#25A4A8", fontSize: "14px" }}
        >
          <Download size={16} />
          Export PDF
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="border-b" style={{ borderColor: "#E5E7EB" }}>
              <th className="py-4 px-6 text-left text-sm text-[#1A2A4A]">Scale ID</th>
              <th className="py-4 px-6 text-left text-sm text-[#1A2A4A]">Location</th>
              <th className="py-4 px-6 text-left text-sm text-[#1A2A4A]">Status</th>
              <th className="py-4 px-6 text-right text-sm text-[#1A2A4A]">Last Weight</th>
              <th className="py-4 px-6 text-right text-sm text-[#1A2A4A]">Last Updated</th>
              <th className="py-4 px-6 text-right text-sm text-[#1A2A4A]">Last Maintenance</th>
              <th className="py-4 px-6 text-center text-sm text-[#1A2A4A]">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredScales.map((scale) => (
              <tr
                key={scale.id}
                className="border-b hover:bg-gray-50 cursor-pointer"
                style={{ borderColor: "#F3F4F6" }}
                onClick={() => onViewScale(scale.id)} // use id
              >
                <td className="py-4 px-6">{scale.scale_id}</td>
                <td className="py-4 px-6">{scale.location_name}</td>
                <td className="py-4 px-6"><StatusBadge status={scale.status} /></td>
                <td className="py-4 px-6 text-right">{scale.last_weight_reading} kg</td>
                <td className="py-4 px-6 text-right">{scale.last_updated}</td>
                <td className="py-4 px-6 text-right">{scale.last_maintenance}</td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewScale(scale.id);
                    }}
                    className="px-3 py-1.5 rounded-lg text-[#25A4A8] border border-[#25A4A8] text-sm"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
