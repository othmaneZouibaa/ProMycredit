import React from 'react';

const StatCard = ({ label, value, variant }) => {
  const variantClass = variant ? `highlight-${variant}` : '';
  
  return (
    <div className={`stat-card-fintech ${variantClass}`}>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </div>
  );
};

export default StatCard;
