import React from 'react';
import { useSelector } from 'react-redux';

const TopNavbar = ({ title }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="top-navbar">
      <div className="navbar-left">
        <h2>{title}</h2>
      </div>
      <div className="navbar-right">
        <div className="search-box">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="notifications">
          <span>🔔</span>
        </div>
        <div className="user-profile-mini">
          <span>{user?.fullName || "Consumer"}</span>
          <div className="mini-avatar">{user?.fullName?.charAt(0) || "C"}</div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
