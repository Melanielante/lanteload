import React from "react";

export function StatusBadge({ status }) {
  let bgColor, textColor;
  switch (status.toLowerCase()) {
    case "operational":
      bgColor = "#D1FAE5"; textColor = "#059669"; break;
    case "offline":
      bgColor = "#FEE2E2"; textColor = "#DC2626"; break;
    case "maintenance":
    case "error":
      bgColor = "#FED7AA"; textColor = "#EA580C"; break;
    default:
      bgColor = "#E5E7EB"; textColor = "#6B7280";
  }

  return (
    <span
      className="px-2 py-1 rounded-full text-xs font-semibold"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {status.replace(/^\w/, c => c.toUpperCase())}
    </span>
  );
}
