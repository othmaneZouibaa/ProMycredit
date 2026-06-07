import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../seller/authSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { stats, notifications } = useSelector((state) => state.consumer);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const isActive = (path) => location.pathname === path;

  const getTrustLevel = (score) => {
    if (score >= 90) return 'Gold';
    if (score >= 70) return 'Silver';
    return 'Bronze';
  };

  const trustLevel = getTrustLevel(stats.trust_score);
  const displayName = user?.name || user?.fullName || 'User';

  return (
    <aside className="consumer-sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">MC</div>
        <span className="brand-name">MY CRIDITE</span>
      </div>

      <nav className="sidebar-nav">
        <Link to="/consumer-panel" className={`nav-link ${isActive('/consumer-panel') ? 'active' : ''}`}>
          <span className="nav-icon">📊</span>
          <span>Dashboard</span>
        </Link>
        <Link to="/consumer-panel/credits" className={`nav-link ${isActive('/consumer-panel/credits') ? 'active' : ''}`}>
          <span className="nav-icon">💳</span>
          <span>My Credits</span>
        </Link>
        <Link to="/consumer-panel/payments" className={`nav-link ${isActive('/consumer-panel/payments') ? 'active' : ''}`}>
          <span className="nav-icon">📜</span>
          <span>Payments History</span>
        </Link>
        <Link to="/consumer-panel/notifications" className={`nav-link ${isActive('/consumer-panel/notifications') ? 'active' : ''}`}>
          <span className="nav-icon">🔔</span>
          <span>Notifications</span>
          {notifications.filter(n => !n.is_read).length > 0 && (
            <span className="badge-count">{notifications.filter(n => !n.is_read).length}</span>
          )}
        </Link>
        <div style={{ margin: '24px 16px 8px', fontSize: '0.7rem', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Account
        </div>
        <Link to="/consumer-panel/profile" className={`nav-link ${isActive('/consumer-panel/profile') ? 'active' : ''}`}>
          <span className="nav-icon">👤</span>
          <span>My Profile</span>
        </Link>
        <Link to="/consumer-panel/settings" className={`nav-link ${isActive('/consumer-panel/settings') ? 'active' : ''}`}>
          <span className="nav-icon">⚙️</span>
          <span>Settings</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-profile-card">
          <div className="mini-avatar">
            {displayName.charAt(0)}
          </div>
          <div className="profile-info-mini">
            <h4>{displayName.split(' ')[0]}</h4>
            <span className={`trust-badge-mini trust-${trustLevel.toLowerCase()}`}>
              {trustLevel} Level
            </span>
          </div>
        </div>
        
        <a href="#" className="nav-link" onClick={handleLogout} style={{ marginTop: '12px', color: 'var(--danger)' }}>
          <span className="nav-icon">🚪</span>
          <span>Sign Out</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
