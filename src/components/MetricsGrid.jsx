import { Scale, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export function MetricsGrid({ metrics }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <div
            key={metric.title || metric.label}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            {/* Icon */}
            <div className="flex items-start justify-between mb-4">
              <div
                className="rounded-lg flex items-center justify-center"
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: metric.bgColor || '#F0F4F8',
                }}
              >
                <Icon size={24} style={{ color: metric.color || '#1A2A4A' }} />
              </div>
            </div>

            {/* Metrics Info */}
            <div>
              <div
                style={{
                  fontSize: '32px',
                  color: '#1A2A4A',
                  lineHeight: '1',
                  marginBottom: '8px',
                }}
              >
                {metric.value}
              </div>
              <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>
                {metric.title || metric.label}
              </div>
              {metric.change && (
                <div style={{ fontSize: '12px', color: '#25A4A8' }}>{metric.change}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
