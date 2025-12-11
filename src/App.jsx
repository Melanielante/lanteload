import React from 'react';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router';
import { Dashboard } from './pages/Dashboard';
import { Scales } from './pages/Scales';
import { ScaleDetails } from './pages/ScaleDetails';
import Analytics from './pages/Analytics';
import { Maintenance } from './pages/Maintenance';
import { useNavigate } from 'react-router';

// Wrapper to pass navigation into Scales.jsx
function ScalesWrapper() {
  const navigate = useNavigate();
  
  return (
    <Scales 
      onViewScale={(id) => navigate(`/scales/${id}`)} 
    />
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

          {/* Scales list */}
          <Route path='/scales' element={<ScalesWrapper />} />

          {/* Scale details */}
          <Route path='/scales/:id' element={<ScaleDetails />} />

          {/* Analytics */}
          <Route path='/analytics' element={<Analytics />} />

          {/* Maintenance */}
          <Route path='/maintenance' element={<Maintenance />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
