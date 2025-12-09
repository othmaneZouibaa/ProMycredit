import React from 'react'
import './seller.css'
import { Link } from 'react-router-dom'
import Dashboard from './Customers'
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
      <d
 
</div>
  )
}

export default AjouterConsommer
