import React from 'react'
import './seller.css'
import { Link } from 'react-router-dom'
const AjouterConsommer = () => {
  return (
    <div className="dashboard">

  <aside className="sidebar1">
    <h2 className="logo">MY CREDIT</h2>
    
      

  <Link to="/customers">
    <button className="active">👥 Customers</button>
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
</div>

   
  </aside>
      
 
</div>
  )
}

export default AjouterConsommer
