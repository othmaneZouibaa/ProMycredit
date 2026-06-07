import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const TopNavbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.consumer);
  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <nav className="top-navbar">
      <div className="navbar-left">
        <div className="navbar-search">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search transactions, credits, or sellers..." />
        </div>
      </div>
      
      <div className="navbar-right">
        <Link to="/consumer-panel/notifications" className="icon-btn" title="Notifications" style={{ textDecoration: 'none' }}>
          <span>🔔</span>
          {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
        </Link>
        
        <button className="icon-btn" title="Help Center">
          <span>❓</span>
        </button>

        <div className="user-profile-trigger">
          <div className="trigger-name">
            {user?.name?.split(' ')[0] || user?.fullName?.split(' ')[0] || "Consumer"}
          </div>
          <div className="nav-avatar">
            {(user?.name || user?.fullName || "C").charAt(0)}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
