export function RecentActivityTable({ scales, onViewScale }) {
  return (
    <div className="bg-white shadow rounded-xl overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Scale ID</th>
            <th className="p-3">Location</th>
            <th className="p-3">Last Reading</th>
            <th className="p-3">Status</th>
            <th className="p-3">Last Updated</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {scales.map((s) => (
            <tr key={s.scale_id} className="border-b hover:bg-gray-50">
              <td className="p-3">{s.scale_id}</td>
              <td className="p-3">{s.location_name}</td>
              <td className="p-3">{s.last_weight_reading}</td>
              <td className="p-3">{s.status}</td>
              <td className="p-3">{new Date(s.last_updated).toLocaleString()}</td>
              <td className="p-3">
                <button onClick={() => onViewScale(s.scale_id)} className="text-blue-600 hover:underline">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
