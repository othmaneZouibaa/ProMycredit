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
    
      

  <Link to="/customers">
    <button>👥 Customers</button>
  </Link>

  <Link to="/history">
    <button>📜 History</button>
  </Link>

  <Link to="/dashboard">
    <button>📊 Dashboard</button>
  </Link>

  <Link to="/settings">
    <button>⚙️ Settings</button>
  </Link>


   
  </aside>
      <div>
       <Routes> 
          <Route path="/seller-panel" element={<Dashboard />}/>
          <Route path="/customers" element={<Customers />}/>
       </Routes>
      </div>
 
</div>
  )
}

export default AjouterConsommer
