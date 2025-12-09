import React from 'react'
import './seller.css'
import { Link } from 'react-router-dom'
const AjouterConsommer = () => {
  return (
    <div className="dashboard">

  <aside className="sidebar1">
    <h2 className="logo">MY CREDIT</h2>
    <ul>
      <Link><button>👥 Customers</button></Link>
      <Link><button>📜 History</button></Link>
      <Link><button>📊 Dashboard</button></Link>
      <Link><button>⚙️ Settings</button></Link>
    </ul>
  </aside>
      
 
</div>
  )
}

export default AjouterConsommer
