import React from 'react'
import './seller.css'
import { Link, Route, Routes } from 'react-router-dom'
import Dashboard from './Customers'
import Customers from './Dashboard'
const AjouterConsommer = () => {
  return (
    <div className="dashboard">

  <aside className="sidebar1">
    <h2 className="logo">MY CREDIT</h2>
    
      <Link to="/dashboard">
    <button>📊 Dashboard</button>
  </Link>

  <Link to="/customers">
    <button>👥 Customers</button>
  </Link>


  

  <Link to="/history">
    <button>📜 History</button>
  </Link>


  <Link to="/settings">
    <button>⚙️ Settings</button>
  </Link>


   
  </aside>
      <div>
        <Routes>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          
        </Routes>
        <Customers />
      </div>
 
</div>
  )
}

export default AjouterConsommer
