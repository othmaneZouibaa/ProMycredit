import React from 'react'
import './seller.css'
import { Link, Outlet } from 'react-router-dom'

const AjouterConsommer = () => {
  return (
    <div className="dashboard">

  <aside className="sidebar1">
    <h2 className="logo">MY CREDIT</h2>
    
      

  <Link to="/seller-panel/customers">
    <button>👥 Customers</button>
  </Link>

  <Link to="/history">
    <button>📜 History</button>
  </Link>

  <Link to="/seller-panel/dashboard">
    <button>📊 Dashboard</button>
  </Link>

  <Link to="/settings">
    <button>⚙️ Settings</button>
  </Link>


   
  </aside>
      <div>
       <Outlet/>
      </div>
 
</div>
  )
}

export default AjouterConsommer
