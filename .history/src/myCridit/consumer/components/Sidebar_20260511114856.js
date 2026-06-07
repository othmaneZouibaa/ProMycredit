import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
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
      <Link to="/" className="nav-link">
        <span className="nav-icon">🚪</span>
        <span>Logout</span>
      </Link>
    </div>
  </aside>
);

export default Sidebar;
