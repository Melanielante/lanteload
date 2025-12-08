import { Link, useLocation } from "react-router";
import { 
  Scale, LayoutDashboard, Map, TrendingUp, 
  Wrench, Settings, ChevronDown 
} from "lucide-react";

export default function Navbar() {
  const { pathname } = useLocation();

  const navItems = [
    { id: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "/scales", label: "Scales", icon: Scale },
    { id: "/map", label: "Map", icon: Map },
    { id: "/analytics", label: "Analytics", icon: TrendingUp },
    { id: "/maintenance", label: "Maintenance", icon: Wrench },
    { id: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between max-w-[1600px] mx-auto">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div 
            className="flex items-center justify-center rounded-lg"
            style={{ width: 40, height: 40, backgroundColor: "#1A2A4A" }}
          >
            <Scale size={22} color="#25A4A8" />
          </div>
          <span style={{ fontSize: 24, color: "#1A2A4A" }}>LanteLoad</span>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.id;

            return (
              <Link
                key={item.id}
                to={item.id}
                className="flex items-center gap-2 px-4 py-2 rounded-lg"
                style={{
                  color: isActive ? "#25A4A8" : "#6B7280",
                  backgroundColor: isActive ? "#F0F9FA" : "transparent",
                }}
              >
                <Icon size={18} />
                <span style={{ fontSize: 14 }}>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div style={{ fontSize: 14, color: "#1A2A4A" }}>Admin User</div>
            <div style={{ fontSize: 12, color: "#6B7280" }}>Operations Manager</div>
          </div>
          <div 
            className="rounded-full flex items-center justify-center"
            style={{
              width: 40,
              height: 40,
              backgroundColor: "#25A4A8",
              color: "white",
            }}
          >
            AU
          </div>
          <ChevronDown size={16} style={{ color: "#6B7280" }} />
        </div>

      </div>
    </nav>
  );
}
