import React from 'react';

const TrustScore = ({ score }) => {
  const getScoreColor = () => {
    if (score >= 90) return '#10b981'; // Green
    if (score >= 70) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  };

  const getTrustLevel = () => {
    if (score >= 90) return 'Gold Level';
    if (score >= 70) return 'Silver Level';
    return 'Bronze Level';
  };

  return (
    <div className="trust-score-widget">
      <div className="score-header">
        <h4 style={{ fontWeight: '700' }}>Trust Score</h4>
        <div className="tooltip-trigger" style={{ cursor: 'help', opacity: 0.5 }}>ⓘ
          <div className="tooltip-content" style={{ display: 'none' }}>
            Based on your repayment history and active credit management.
          </div>
        </div>
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
            strokeWidth="3"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="21" className="percentage" fill="var(--text-main)" style={{ fontSize: '9px', fontWeight: '800' }}>{score}</text>
        </svg>
      </div>
      <div className={`trust-badge-mini ${score >= 90 ? 'trust-gold' : 'trust-bronze'}`} style={{ marginTop: '4px' }}>
        {getTrustLevel()}
      </div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '12px', lineHeight: '1.4' }}>
        You are in the top 5% of reliable consumers. Keep it up!
      </p>
    </div>
  );
};

export default TrustScore;
