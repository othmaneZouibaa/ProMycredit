import React from 'react'
import './seller.css'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './authSlice'
import { useTranslation } from 'react-i18next'

const SellerLayout = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user: currentSeller } = useSelector((state) => state.auth);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  if (!currentSeller) return null;

  const displayName = currentSeller.name || currentSeller.fullName;
  const isActive = (path) => location.pathname === path;

  return (
    <div className="dashboard">
      <aside className="sidebar-modern">
        <div className="sidebar-brand-modern">
          <div className="brand-logo-modern">MC</div>
          <span className="brand-name-modern">MY CRIDITE</span>
        </div>
        
        <nav className="sidebar-nav-modern">
          <Link to="/seller-panel/dashboard" className={`nav-link-modern ${isActive('/seller-panel/dashboard') ? 'active' : ''}`}>
            <span className="nav-icon-modern">📊</span>
            Dashboard
          </Link>
          <Link to="/seller-panel/list-consumers" className={`nav-link-modern ${isActive('/seller-panel/list-consumers') ? 'active' : ''}`}>
            <span className="nav-icon-modern">👥</span>
            Consumers List
          </Link>
          <Link to="/seller-panel/customers" className={`nav-link-modern ${isActive('/seller-panel/customers') ? 'active' : ''}`}>
            <span className="nav-icon-modern">➕</span>
            Add Credit
          </Link>
        </nav>

        <div className="sidebar-footer-modern">
          <div className="user-profile-card-modern">
            <div className="user-avatar-modern">{displayName.charAt(0)}</div>
            <div className="user-info-modern">
              <h4>{displayName}</h4>
              <span>Verified Seller</span>
            </div>
          </div>
          <button className="logout-btn-modern" onClick={handleLogout}>
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      <div className="main-content-wrapper">
        <nav className="top-navbar-modern">
          <div className="navbar-search-modern">
            <span>🔍</span>
            <input type="text" placeholder="Search for customers or credits..." />
          </div>
          <div className="navbar-actions-modern">
            <button className="icon-btn-modern">🔔</button>
            <button className="icon-btn-modern">⚙️</button>
          </div>
        </nav>
        <div className="panel-scroll-area">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default SellerLayout
