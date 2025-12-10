import React from "react";

export function MaintenanceHistory({ records }) {
  if (!records || records.length === 0)
    return <p className="text-gray-500 text-sm">No maintenance history available.</p>;

  return (
    <div className="space-y-3">
      {records.map((record, i) => (
        <div key={i} className="pb-3 border-b border-gray-100">
          <div className="text-sm text-gray-900">{record.type}</div>
          <div className="text-xs text-gray-500">{record.date} • {record.technician}</div>
          <span
            className={`inline-block px-2 py-0.5 text-xs rounded mt-1 ${
              record.status.toLowerCase() === "completed"
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {record.status}
          </span>
        </div>
      ))}
    </div>
  );
}
