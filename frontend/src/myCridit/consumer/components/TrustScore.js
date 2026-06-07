import React from 'react';

const TrustScore = ({ score }) => {
  const getScoreColor = () => {
    if (score >= 90) return 'var(--success)';
    if (score >= 70) return 'var(--warning)';
    return 'var(--danger)';
  };

  const getTrustLevel = () => {
    if (score >= 90) return 'Gold';
    if (score >= 70) return 'Silver';
    return 'Bronze';
  };

  const level = getTrustLevel();

  return (
    <div className="trust-score-widget" style={{ textAlign: 'center' }}>
      <div className="section-header" style={{ justifyContent: 'center', marginBottom: '24px' }}>
        <h2 style={{ margin: 0 }}>Trust Score</h2>
        <div className="tooltip-trigger" style={{ cursor: 'help', color: 'var(--text-light)', marginLeft: '8px' }} title="Based on your repayment history and active credit management.">ⓘ</div>
      </div>
      
      <div className="circular-progress-container">
        <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
          <path 
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="var(--border-light)"
            strokeWidth="3"
          />
          <path 
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={getScoreColor()}
            strokeWidth="3"
            strokeDasharray={`${score}, 100`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 1s ease-in-out' }}
          />
        </svg>
        <div className="score-display">
          <div className="score-number">{score}</div>
          <div className="score-label">Points</div>
        </div>
      </div>

      <div className={`trust-badge-mini trust-${level.toLowerCase()}`} style={{ fontSize: '0.8rem', padding: '6px 16px' }}>
        {level} Status
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '20px', lineHeight: '1.6' }}>
        {score >= 90 
          ? "Excellent! You have a premium trust level. You can access higher credit limits."
          : score >= 70
          ? "Good progress! Maintain your payments to reach Gold status."
          : "Keep paying on time to improve your trust score and unlock features."
        }
      </p>
    </div>
  );
};

export default TrustScore;
