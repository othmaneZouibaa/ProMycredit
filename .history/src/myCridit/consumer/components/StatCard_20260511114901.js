import React from 'react';

const StatCard = ({ label, value, variant }) => (
  <div className="stat-card">
    <div className="stat-label">{label}</div>
    <div className={`stat-value ${variant || ''}`}>{value}</div>
  </div>
);

export default StatCard;
