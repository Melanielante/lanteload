import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router'
import { Dashboard } from './pages/Dashboard'
import { Scales } from './pages/Scales'
import { ScaleDetails } from './pages/ScaleDetails'
import { Map } from './pages/Map'
import Analytics from './pages/Analytics'

import { Maintenance } from './pages/Maintenance'
import { Settings } from './pages/Settings'
import { useNavigate } from 'react-router'

// Wrapper to pass navigation into Scales.jsx
function ScalesWrapper() {
  const navigate = useNavigate();
  return (
    <Scales onViewScale={(id) => navigate(`/scales/${id}`)} />
  );
}

function App() {
  return (
    <div>
      <Navbar />

      <div>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/dashboard' element={<Dashboard />} />

          {/* Updated Route */}
          <Route path='/scales' element={<ScalesWrapper />} />

          <Route path='/scales/:id' element={<ScaleDetails />} />
          <Route path='/map' element={<Map />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/maintenance' element={<Maintenance />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
