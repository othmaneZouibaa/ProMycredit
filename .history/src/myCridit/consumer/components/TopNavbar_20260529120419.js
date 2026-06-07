import React from 'react';
import { useSelector } from 'react-redux';

const TopNavbar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="top-navbar">
      <div className="navbar-left">
        <div className="navbar-search">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search transactions, credits, or sellers..." />
        </div>
      </div>
      
      <div className="navbar-right">
        <button className="icon-btn" title="Notifications">
          <span>🔔</span>
          <span className="notification-badge"></span>
        </button>
        
        <button className="icon-btn" title="Help Center">
          <span>❓</span>
        </button>

        <div className="user-profile-trigger">
          <div className="trigger-name">
            {user?.fullName?.split(' ')[0] || "Consumer"}
          </div>
          <div className="nav-avatar">
            {user?.fullName?.charAt(0) || "C"}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
