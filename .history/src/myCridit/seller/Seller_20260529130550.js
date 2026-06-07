import React from 'react'
import './seller.css'
import { Link, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from './authSlice'

const AjouterConsommer = () => {
  const dispatch = useDispatch();
  const currentSeller = useSelector((state) => state.auth.user);

  const switchSeller = () => {
    if (currentSeller.id === 's1') {
      dispatch(login({ id: 's2', name: 'Sara', email: 'sara@mycridit.com' }));
    } else {
      dispatch(login({ id: 's1', name: 'Ahmed', email: 'ahmed@mycridit.com' }));
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div className="dashboard">

  <aside className="sidebar1">
    <h2 className="logo">MY CREDIT</h2>
    
    <div className="seller-info" style={{ padding: '10px', color: 'white', borderBottom: '1px solid #444', marginBottom: '10px' }}>
      <strong>Logged as: {currentSeller.name || currentSeller.fullName}</strong>
      <button onClick={switchSeller} style={{ display: 'block', marginTop: '5px', fontSize: '10px', cursor: 'pointer' }}>
        Switch Seller (Demo)
      </button>
    </div>
    
      

  <Link to="/seller-panel/customers">
    <button>👥 Customers</button>
  </Link>
    <Link to="/seller-panel/list-consumers">
    <button>📋 List Consumers</button>
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

  <div className="sidebar-footer">
        <div className="user">
          <div className="avatar">{(currentSeller.name || currentSeller.fullName).charAt(0)}</div>
          <span>{currentSeller.name || currentSeller.fullName}</span>
        </div>
        <a href="#" className="logout" onClick={handleLogout}>Logout</a>
      </div>
   
  </aside>
      <div>
       <Outlet/>
      </div>
 
</div>
  )
}

export default AjouterConsommer
