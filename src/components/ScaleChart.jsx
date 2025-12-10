import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function ScaleChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="time" tick={{ fill: "#6B7280", fontSize: 12 }} />
        <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Line type="monotone" dataKey="weight" stroke="#25A4A8" strokeWidth={3} dot={{ fill: "#25A4A8" }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
