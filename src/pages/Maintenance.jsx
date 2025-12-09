import { useEffect, useState } from "react";
import { Calendar, Clock, User, AlertCircle, CheckCircle } from "lucide-react";

export function Maintenance() {
  const [upcoming, setUpcoming] = useState([]);
  const [overdue, setOverdue] = useState([]);
  const [calendar, setCalendar] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = "http://localhost:3001";

  useEffect(() => {
    async function fetchData() {
      try {
        const [up, ov, cal, tech] = await Promise.all([
          fetch(`${API}/upcomingMaintenance`).then(res => res.json()),
          fetch(`${API}/overdueMaintenance`).then(res => res.json()),
          fetch(`${API}/calendar`).then(res => res.json()),
          fetch(`${API}/technicians`).then(res => res.json())
        ]);

        setUpcoming(up);
        setOverdue(ov);
        setCalendar(cal);
        setTechnicians(tech);
      } catch (error) {
        console.error("Error loading maintenance data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p className="p-6 text-lg text-gray-600">Loading maintenance data...</p>;
  }

  return (
    <div className="px-6 py-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[28px]" style={{ color: "#1A2A4A" }}>
              Maintenance
            </h1>
            <p className="text-sm text-gray-500">
              Schedule and track weighbridge maintenance
            </p>
          </div>

          <button
            className="px-4 py-2 rounded-lg text-white"
            style={{ backgroundColor: "#25A4A8" }}
          >
            Schedule New Maintenance
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="mb-4 text-[20px]" style={{ color: "#1A2A4A" }}>
          December 2025
        </h2>

        <div className="grid grid-cols-10 gap-2">
          {calendar.map((day) => (
            <div
              key={day.id}
              className="p-3 rounded-lg text-center hover:shadow-md cursor-pointer transition-shadow"
              style={{
                backgroundColor: day.tasks > 0 ? "#F0F9FA" : "#F9FAFB",
                border: day.tasks > 0 ? "2px solid #25A4A8" : "1px solid #E5E7EB"
              }}
            >
              <div className="text-[18px]" style={{ color: "#1A2A4A" }}>
                {day.date}
              </div>
              <div className="text-[11px] text-gray-500 mb-2">{day.day}</div>

              {day.tasks > 0 && (
                <div
                  className="rounded-full mx-auto flex items-center justify-center"
                  style={{
                    width: "24px",
                    height: "24px",
                    backgroundColor: "#25A4A8",
                    color: "white",
                    fontSize: "12px"
                  }}
                >
                  {day.tasks}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming + Overdue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Maintenance */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle size={20} className="text-green-600" />
            <h2 className="text-[20px]" style={{ color: "#1A2A4A" }}>
              Upcoming Maintenance
            </h2>
          </div>

          <div className="space-y-3">
            {upcoming.map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-lg border hover:shadow-md transition-shadow"
                style={{ borderColor: "#E5E7EB" }}
              >
                <div className="flex justify-between mb-3">
                  <div>
                    <p className="text-[14px] font-medium" style={{ color: "#1A2A4A" }}>
                      {task.scaleId} • {task.location}
                    </p>
                    <p className="text-[13px] text-gray-600">{task.type}</p>
                  </div>

                  <div
                    className="px-2 py-1 rounded text-[11px]"
                    style={{ backgroundColor: "#D1FAE5", color: "#059669" }}
                  >
                    Scheduled
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gray-500" />
                    <span className="text-[12px] text-gray-500">{task.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-gray-500" />
                    <span className="text-[12px] text-gray-500">{task.time}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <User size={14} className="text-gray-500" />
                    <span className="text-[12px] text-gray-500">{task.technician}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overdue Maintenance */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle size={20} className="text-red-600" />
            <h2 className="text-[20px]" style={{ color: "#1A2A4A" }}>
              Overdue Maintenance
            </h2>
          </div>

          <div className="space-y-3">
            {overdue.map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-lg border-2 hover:shadow-md transition-shadow"
                style={{
                  borderColor: task.priority === "high" ? "#DC2626" : "#FFA500"
                }}
              >
                <div className="flex justify-between mb-3">
                  <div>
                    <p className="text-[14px] font-medium" style={{ color: "#1A2A4A" }}>
                      {task.scaleId} • {task.location}
                    </p>
                    <p className="text-[13px] text-gray-600">{task.type}</p>
                  </div>

                  <div
                    className="px-2 py-1 rounded text-[11px]"
                    style={{
                      backgroundColor: task.priority === "high" ? "#FEE2E2" : "#FED7AA",
                      color: task.priority === "high" ? "#DC2626" : "#EA580C",
                      textTransform: "uppercase"
                    }}
                  >
                    {task.priority}
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-wrap mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-red-600" />
                    <span className="text-[12px] text-red-600">
                      Due: {task.dueDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <AlertCircle size={14} className="text-red-600" />
                    <span className="text-[12px] text-red-600">
                      {task.daysOverdue} days overdue
                    </span>
                  </div>
                </div>

                <button
                  className="w-full px-3 py-2 rounded-lg text-white"
                  style={{ backgroundColor: "#25A4A8" }}
                >
                  Assign Technician
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technicians */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <h2 className="text-[20px] mb-4" style={{ color: "#1A2A4A" }}>
          Technician Availability
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {technicians.map((tech) => (
            <div
              key={tech.id}
              className="p-4 rounded-lg border"
              style={{ borderColor: "#E5E7EB" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#F0F4F8",
                    color: "#1A2A4A"
                  }}
                >
                  {tech.name.split(" ").map((n) => n[0]).join("")}
                </div>

                <div>
                  <p className="text-[14px]" style={{ color: "#1A2A4A" }}>
                    {tech.name}
                  </p>
                  <p className="text-[12px] text-gray-500">
                    {tech.tasks} assigned tasks
                  </p>
                </div>
              </div>

              <div
                className="px-2 py-1 rounded text-center text-[11px]"
                style={{
                  backgroundColor:
                    tech.status === "available" ? "#D1FAE5" : "#FED7AA",
                  color: tech.status === "available" ? "#059669" : "#EA580C"
                }}
              >
                {tech.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
