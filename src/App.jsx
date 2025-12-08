import React from 'react'
import { MainLayout } from './components/MainLayout'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router'
import { Dashboard } from './pages/Dashboard'
import { Scales } from './pages/Scales'
import { Map } from './pages/Map'
import { Analytics } from './pages/Analytics'
import { Maintenance } from './pages/Maintenance'
import { Settings } from './pages/Settings'


function App() {
  
  return (
    
    <div>
      <Navbar />
      
      <div>
        <Routes>
          <Route path='/' element={<Dashboard /> } />
          <Route path='/dashboard' element={<Dashboard /> } />
          <Route path='/scales' element={<Scales /> } />
          <Route path='/map' element={<Map /> } />
          <Route path='/analytics' element={<Analytics /> } />
          <Route path='/maintenance' element={<Maintenance /> } />
          <Route path='/settings' element={<Settings /> } />

        </Routes>
      </div>
    </div>

    
  )
}

export default App
