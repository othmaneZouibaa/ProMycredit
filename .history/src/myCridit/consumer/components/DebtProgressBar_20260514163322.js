import React from 'react';

const DebtProgressBar = ({ paid, total }) => {
  const percentage = Math.min(Math.round((paid / total) * 100), 100);
  
  const getBarColor = () => {
    if (percentage === 100) return '#2ecc71';
    if (percentage > 50) return '#f1c40f';
    return '#3498db';
  };

  return (
    <div className="debt-progress-container">
      <div className="progress-labels">
        <span>{percentage}% Paid</span>
        <span>{total - paid} DH Left</span>
      </div>
      <div className="progress-track">
        <div 
          className="progress-fill" 
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
