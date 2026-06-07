import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../seller/authSlice';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const { user } = useSelector((state) => state.auth);
  const { stats, notifications, pendingCredits } = useSelector((state) => state.consumer);

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
          <span>{t('common.dashboard')}</span>
        </Link>
        <Link to="/consumer-panel/credits" className={`nav-link ${isActive('/consumer-panel/credits') ? 'active' : ''}`}>
          <span className="nav-icon">💳</span>
          <span>{t('common.my_credits')}</span>
        </Link>
        <Link to="/consumer-panel/pending-requests" className={`nav-link ${isActive('/consumer-panel/pending-requests') ? 'active' : ''}`}>
          <span className="nav-icon">📝</span>
          <span>{t('common.pending_requests')}</span>
          {pendingCredits.length > 0 && (
            <span className="badge-count" style={{ background: 'var(--warning)', color: 'white' }}>{pendingCredits.length}</span>
          )}
        </Link>
        <Link to="/consumer-panel/payments" className={`nav-link ${isActive('/consumer-panel/payments') ? 'active' : ''}`}>
          <span className="nav-icon">📜</span>
          <span>{t('common.payments_history')}</span>
        </Link>
        <Link to="/consumer-panel/notifications" className={`nav-link ${isActive('/consumer-panel/notifications') ? 'active' : ''}`}>
          <span className="nav-icon">🔔</span>
          <span>{t('common.notifications')}</span>
          {notifications.filter(n => !n.is_read).length > 0 && (
            <span className="badge-count">{notifications.filter(n => !n.is_read).length}</span>
          )}
        </Link>
        <div style={{ margin: '24px 16px 8px', fontSize: '0.7rem', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {t('common.account')}
        </div>
        <Link to="/consumer-panel/profile" className={`nav-link ${isActive('/consumer-panel/profile') ? 'active' : ''}`}>
          <span className="nav-icon">👤</span>
          <span>{t('common.profile')}</span>
        </Link>
        <Link to="/consumer-panel/settings" className={`nav-link ${isActive('/consumer-panel/settings') ? 'active' : ''}`}>
          <span className="nav-icon">⚙️</span>
          <span>{t('common.settings')}</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <div className="language-selector" style={{ padding: '0 12px 16px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <button onClick={() => changeLanguage('ar')} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>🇲🇦</button>
          <button onClick={() => changeLanguage('fr')} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>🇫🇷</button>
          <button onClick={() => changeLanguage('en')} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>🇺🇸</button>
        </div>
        <div className="sidebar-profile-card">
          <div className="mini-avatar">
            {displayName.charAt(0)}
          </div>
          <div className="profile-info-mini">
            <h4>{displayName.split(' ')[0]}</h4>
            <span className={`trust-badge-mini trust-${trustLevel.toLowerCase()}`}>
              {t(`common.trust_levels.${trustLevel.toLowerCase()}`)} {t('common.trust_levels.level')}
            </span>
          </div>
        </div>
        
        <button className="nav-link" onClick={handleLogout} style={{ marginTop: '12px', color: 'var(--danger)', background: 'none', border: 'none', width: '100%', textAlign: 'inherit', cursor: 'pointer' }}>
          <span className="nav-icon">🚪</span>
          <span>{t('common.sign_out')}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
