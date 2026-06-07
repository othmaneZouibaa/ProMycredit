import React from 'react';
import { useSelector } from 'react-redux';

const TopNavbar = ({ title }) => {
  const { user } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => ({ notifications: [] })); // Placeholder for real notifications state

  return (
    <nav className="top-navbar">
      <div className="navbar-left">
        <div className="navbar-search">
          <span style={{ position: 'absolute', left: '14px', top: '10px', color: 'var(--text-muted)' }}>🔍</span>
          <input type="text" placeholder="Search transactions, credits..." />
        </div>
      </div>
      
      <div className="navbar-right">
        <div className="notification-bell">
          <span>🔔</span>
          <span className="bell-badge">2</span>
        </div>
        
        <div className="user-dropdown">
          <div className="mini-avatar" style={{ fontWeight: 'bold' }}>
            {user?.fullName?.charAt(0) || user?.name?.charAt(0) || "C"}
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-main)' }}>
              {user?.fullName || user?.name || "Consumer"}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Consumer Account</div>
          </div>
          <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginLeft: '4px' }}>▼</span>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
