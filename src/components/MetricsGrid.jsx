export function MetricsGrid({ metrics }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {metrics.map((m) => (
        <div key={m.label} className="bg-white shadow rounded-xl p-4">
          <div className="text-sm text-gray-500">{m.label}</div>
          <div className="text-2xl font-bold">{m.value}</div>
        </div>
      ))}
    </div>
  );
}
