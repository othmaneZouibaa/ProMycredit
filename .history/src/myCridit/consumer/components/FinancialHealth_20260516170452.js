import React from 'react';

const FinancialHealth = ({ health }) => {
  const getHealthMeta = () => {
    switch(health) {
      case 'Healthy': return { color: '#10b981', label: 'Good', icon: '🌟' };
      case 'Warning': return { color: '#f59e0b', label: 'Warning', icon: '⚠️' };
      case 'Critical': return { color: '#ef4444', label: 'Critical', icon: '🚨' };
      default: return { color: '#64748b', label: 'Neutral', icon: '➖' };
    }
  };

  const meta = getHealthMeta();

  return (
    <div className="financial-health-card">
      <div className="health-header">
        <span>Financial Health</span>
        <span className="health-icon">{meta.icon}</span>
      </div>
      <div className="health-status" style={{ color: meta.color }}>
        {meta.label}
      </div>
      <div className="health-meter">
        <div className="meter-bg">
          <div className="meter-fill" style={{ width: health === 'Healthy' ? '100%' : health === 'Warning' ? '50%' : '20%', backgroundColor: meta.color }}></div>
        </div>
      </div>
      <p className="health-desc">
        {health === 'Healthy' ? 'You are managing your credits perfectly!' : 'Consider paying off some small balances.'}
      </p>
    </div>
  );
};

export default FinancialHealth;
