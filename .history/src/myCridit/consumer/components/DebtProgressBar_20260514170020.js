import React from 'react';

const DebtProgressBar = ({ paid, total }) => {
  const percentage = Math.min(Math.round((paid / total) * 100), 100);
  
  const getBarColor = () => {
    if (percentage === 100) return 'var(--success)';
    if (percentage > 50) return 'var(--warning)';
    return 'var(--primary)';
  };

  return (
    <div className="progress-container">
      <div className="progress-info">
        <span>{percentage}% Repaid</span>
        <span>{ (total - paid).toLocaleString() } DH Left</span>
      </div>
      <div className="progress-bar-bg">
        <div 
          className="progress-bar-fill" 
          style={{ 
            width: `${percentage}%`,
            backgroundColor: getBarColor()
          }}
        ></div>
      </div>
    </div>
  );
};

export default DebtProgressBar;
