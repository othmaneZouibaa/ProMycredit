import React from 'react';

const DebtProgressBar = ({ paid, total }) => {
  const percentage = Math.min(Math.round((paid / total) * 100), 100);
  
  return (
    <div className="debt-progress-wrapper" style={{ margin: '12px 0' }}>
      <div className="progress-bar-bg" style={{ height: '8px', background: 'var(--border-light)', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
        <div 
          className="progress-bar-fill" 
          style={{ 
            width: `${percentage}%`,
            height: '100%',
            background: 'var(--primary)',
            borderRadius: '10px',
            transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 0 10px rgba(37, 99, 235, 0.2)'
          }}
        ></div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>{percentage}%</span> Repaid
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>{(total - paid).toLocaleString()} DH</span> Remaining
        </div>
      </div>
    </div>
  );
};

export default DebtProgressBar;
