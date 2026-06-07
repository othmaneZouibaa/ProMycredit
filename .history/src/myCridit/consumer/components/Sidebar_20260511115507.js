import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../seller/authSlice';

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <aside className="consumer-sidebar">
      <div className="sidebar-brand">
        MY CRIDITE
      </div>
      <nav className="sidebar-nav">
        <Link to="/consumer-panel" className="nav-link active">
          <span className="nav-icon">📊</span>
          <span>Dashboard</span>
        </Link>
        <Link to="/consumer-panel/credits" className="nav-link">
          <span className="nav-icon">💳</span>
          <span>My Credits</span>
        </Link>
        <Link to="/consumer-panel/history" className="nav-link">
          <span className="nav-icon">📜</span>
          <span>Payment History</span>
        </Link>
        <Link to="/consumer-panel/profile" className="nav-link">
          <span className="nav-icon">👤</span>
          <span>Profile</span>
        </Link>
        <Link to="/consumer-panel/settings" className="nav-link">
          <span className="nav-icon">⚙️</span>
          <span>Settings</span>
        </Link>
      </nav>
      <div className="sidebar-footer">
        <a href="#" className="nav-link" onClick={handleLogout}>
          <span className="nav-icon">🚪</span>
          <span>Logout</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
