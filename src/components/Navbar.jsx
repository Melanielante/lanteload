import { 
  Scale, 
  LayoutDashboard, 
  Map, 
  TrendingUp, 
  Wrench, 
  Settings, 
  ChevronDown,
  User
} from 'lucide-react';

export function Navbar({ currentPage, onNavigate }) {

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'scales', label: 'Scales', icon: Scale },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-full bg-white shadow-sm">

      {/* TOP NAVBAR */}
      <div style={{ height: '70px' }}>
        <div className="h-full px-6 flex items-center justify-between max-w-[1400px] mx-auto">

          {/* Logo */}
          <div className="flex items-center">
            <div 
              className="bg-gradient-to-br rounded-lg flex items-center justify-center"
              style={{ 
                width: '48px', 
                height: '48px',
                background: 'linear-gradient(135deg, #1E88E5 0%, #1565C0 100%)'
              }}
            >
              <span className="text-white">WS</span>
            </div>
          </div>
          
          {/* Title */}
          <div className="flex-1 text-center">
            <h1 style={{ color: '#2E2E2E' }}>Weighing Scale Monitoring Dashboard</h1>
          </div>
          
          {/* User */}
          <div className="flex items-center gap-3">
            <span style={{ color: '#2E2E2E' }}>Admin</span>
            <div 
              className="rounded-full flex items-center justify-center"
              style={{ 
                width: '40px', 
                height: '40px',
                backgroundColor: '#E3F2FD'
              }}
            >
              <User size={20} style={{ color: '#1E88E5' }} />
            </div>
          </div>

        </div>
      </div>


      {/* NAVIGATION TABS */}
      <nav className="bg-white border-b shadow-sm" style={{ borderColor: '#E5E7EB' }}>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between max-w-[1600px] mx-auto">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div 
                className="flex items-center justify-center rounded-lg"
                style={{ 
                  width: '40px', 
                  height: '40px',
                  backgroundColor: '#1A2A4A'
                }}
              >
                <Scale size={22} color="#25A4A8" />
              </div>
              <span 
                className="tracking-tight"
                style={{ 
                  fontSize: '24px',
                  color: '#1A2A4A'
                }}
              >
                LanteLoad
              </span>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id || (currentPage === 'scale-details' && item.id === 'scales');
                
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
                    style={{
                      color: isActive ? '#25A4A8' : '#6B7280',
                      backgroundColor: isActive ? '#F0F9FA' : 'transparent',
                    }}
                  >
                    <Icon size={18} />
                    <span style={{ fontSize: '14px' }}>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Profile */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div style={{ fontSize: '14px', color: '#1A2A4A' }}>Admin User</div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>Operations Manager</div>
              </div>
              <div 
                className="rounded-full flex items-center justify-center"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#25A4A8',
                  color: 'white'
                }}
              >
                AU
              </div>
              <ChevronDown size={16} style={{ color: '#6B7280' }} />
            </div>

          </div>
        </div>
      </nav>

    </div>
  );
}
