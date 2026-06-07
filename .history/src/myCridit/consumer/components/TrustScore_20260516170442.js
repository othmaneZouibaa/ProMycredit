import React from 'react';

const TrustScore = ({ score }) => {
  const getScoreColor = () => {
    if (score >= 90) return '#10b981'; // Green
    if (score >= 70) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  };

  return (
    <div className="trust-score-widget">
      <div className="score-header">
        <h4>Trust Score</h4>
        <span className="info-icon" title="Your trust score is calculated based on payment regularity and credit history.">ⓘ</span>
      </div>
      <div className="score-circle-container">
        <svg viewBox="0 0 36 36" className="circular-chart">
          <path className="circle-bg"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path className="circle"
            strokeDasharray={`${score}, 100`}
            stroke={getScoreColor()}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="20.35" className="percentage" fill={getScoreColor()}>{score}</text>
        </svg>
      </div>
      <p className="score-label">Excellent Standing</p>
    </div>
  );
};

export default TrustScore;
