import React, { useEffect, useState } from 'react';
import { Search, Download, Filter } from 'lucide-react';

// Simple StatusBadge component
function StatusBadge({ status }) {
  let bgColor, textColor;
  switch (status) {
    case 'operational':
      bgColor = '#D1FAE5';
      textColor = '#059669';
      break;
    case 'offline':
      bgColor = '#FEE2E2';
      textColor = '#DC2626';
      break;
    case 'error':
      bgColor = '#FED7AA';
      textColor = '#EA580C';
      break;
    default:
      bgColor = '#E5E7EB';
      textColor = '#6B7280';
  }

  return (
    <span
      className="px-2 py-1 rounded-full text-xs font-semibold"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export function Scales({ onViewScale }) {
  const [scales, setScales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScales() {
      try {
        const res = await fetch('http://localhost:5000/scales');
        const data = await res.json();
        setScales(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching scales:', err);
        setLoading(false);
      }
    }

    fetchScales();
  }, []);

  if (loading) return <div className="px-6 py-6">Loading scales...</div>;

  return (
    <div className="px-6 py-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h1 style={{ color: '#1A2A4A', fontSize: '28px', marginBottom: '4px' }}>All Weighbridges</h1>
        <p style={{ color: '#6B7280', fontSize: '14px' }}>Manage and monitor all weighbridge installations</p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search */}
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={18} style={{ color: '#6B7280' }} />
              <input
                type="text"
                placeholder="Search by scale ID or location..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{
                  borderColor: '#E5E7EB',
                  color: '#1A2A4A',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          {/* Region Filter */}
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ borderColor: '#E5E7EB', color: '#1A2A4A', fontSize: '14px' }}>
            <option>All Regions</option>
            <option>North</option>
            <option>South</option>
            <option>East</option>
            <option>West</option>
          </select>

          {/* Status Filter */}
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{ borderColor: '#E5E7EB', color: '#1A2A4A', fontSize: '14px' }}>
            <option>All Status</option>
            <option>Operational</option>
            <option>Offline</option>
            <option>Error</option>
          </select>

          {/* Export Button */}
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors"
            style={{ backgroundColor: '#25A4A8', fontSize: '14px' }}>
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="border-b" style={{ borderColor: '#E5E7EB' }}>
                <th className="text-left py-4 px-6" style={{ color: '#1A2A4A', fontSize: '13px' }}>Scale ID</th>
                <th className="text-left py-4 px-6" style={{ color: '#1A2A4A', fontSize: '13px' }}>Location Name</th>
                <th className="text-left py-4 px-6" style={{ color: '#1A2A4A', fontSize: '13px' }}>Status</th>
                <th className="text-right py-4 px-6" style={{ color: '#1A2A4A', fontSize: '13px' }}>Last Weight Reading</th>
                <th className="text-right py-4 px-6" style={{ color: '#1A2A4A', fontSize: '13px' }}>Last Updated</th>
                <th className="text-right py-4 px-6" style={{ color: '#1A2A4A', fontSize: '13px' }}>Last Maintenance</th>
                <th className="text-center py-4 px-6" style={{ color: '#1A2A4A', fontSize: '13px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {scales.map((scale) => (
                <tr
                  key={scale.scale_id}
                  className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
                  style={{ borderColor: '#F3F4F6' }}
                  onClick={() => onViewScale(scale.scale_id)}
                >
                  <td className="py-4 px-6" style={{ color: '#1A2A4A', fontSize: '14px' }}>{scale.scale_id}</td>
                  <td className="py-4 px-6" style={{ color: '#1A2A4A', fontSize: '14px' }}>{scale.location_name}</td>
                  <td className="py-4 px-6"><StatusBadge status={scale.status} /></td>
                  <td className="py-4 px-6 text-right" style={{ color: '#1A2A4A', fontSize: '14px' }}>
                    {scale.last_weight_reading} {scale.last_weight_reading !== '---' && scale.last_weight_reading !== 'ERROR' ? 'kg' : ''}
                  </td>
                  <td className="py-4 px-6 text-right" style={{ color: '#6B7280', fontSize: '13px' }}>{scale.last_updated}</td>
                  <td className="py-4 px-6 text-right" style={{ color: '#6B7280', fontSize: '13px' }}>{scale.last_maintenance}</td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={(e) => { e.stopPropagation(); onViewScale(scale.scale_id); }}
                      className="px-3 py-1.5 rounded-lg transition-colors"
                      style={{ color: '#25A4A8', fontSize: '13px', border: '1px solid #25A4A8' }}
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
    </div>
  );
}
