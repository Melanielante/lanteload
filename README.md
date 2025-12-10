# Weighing Scale Monitoring Dashboard

A web-based dashboard to monitor and visualize the status of digital weighing scales installed across different locations. The system provides real-time data, analytics, and maintenance tracking to ensure operational efficiency.

---

## Features

- **Dashboard Overview**  
  View all weighing scales with details like location, last maintenance, operational status, and recent weight readings.

- **Scales Management**  
  List all scales with filters by region or status, and navigate to detailed scale information.

- **Scale Details**  
  Inspect individual scale data, including recent weight readings, maintenance history, and operational status.

- **Analytics**  
  Visualize trends and performance using:
  - Weight volume over time
  - Downtime analysis
  - System status distribution (Operational / Offline / Error)
  - Key Performance Indicators (KPIs)

- **Maintenance Tracking**  
  Manage upcoming and overdue maintenance tasks, assign technicians, and prioritize critical repairs.

- **Interactive Map**  
  View all scale locations on a Leaflet map with clickable markers displaying scale information.

---

## Tech Stack

- **Frontend:** React, TailwindCSS, Recharts, Lucide Icons, Leaflet  
- **Backend (Mocked):** JSON Server (`db.json`)  
- **Development Tools:** Vite, Node.js, npm  

---

## Getting Started

### Prerequisites

- Node.js (v18+) and npm installed
- JSON Server for mock backend

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd weighing-scale-dashboard
2. Install dependencies:

npm install


3. Start JSON Server:

npx json-server --watch db.json --port 5000


4. Start the React app:

npm run dev


5. Open the app in your browser at http://localhost:5173

## Project Structure
src/
├─ pages/
│  ├─ Dashboard.jsx
│  ├─ Scales.jsx
│  ├─ ScaleDetails.jsx
│  ├─ Analytics.jsx
│  └─ Maintenance.jsx
├─ components/
│  └─ [Reusable components like Table, Charts, Filters]
├─ App.jsx
└─ main.jsx
db.json

JSON Sample Structure
{
  "scales": [
    {
      "scale_id": "SCL001",
      "location_name": "Nairobi",
      "latitude": -1.2921,
      "longitude": 36.8219,
      "last_maintenance": "2025-04-10",
      "status": "operational",
      "last_weight_reading": 1234.5,
      "last_updated": "2025-05-23T10:20:00"
    }
  ],
  "weightVolume": [
    { "id": 1, "month": "Jun", "volume": 1250000 }
  ],
  "downtime": [
    { "id": 1, "scale": "WB-001", "hours": 2.5 }
  ],
  "systemStatus": [
    { "id": 1, "name": "Operational", "value": 79, "color": "#059669" }
  ],
  "kpis": [
    { "id": 1, "title": "Total Weight Processed", "value": "11.06M kg", "change": "+12.3%", "trend": "up" }
  ]
}



## License

MIT License © 2025 Melanie Akinyi


