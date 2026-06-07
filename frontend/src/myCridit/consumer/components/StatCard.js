import React from 'react';

const StatCard = ({ label, value, variant, icon }) => {
  return (
    <div className="stat-card-premium">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '8px' }}>{label}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)' }}>{value}</div>
        </div>
        {icon && (
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
            {icon}
          </div>
        )}
      </div>
      <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span style={{ fontSize: '0.75rem', color: variant === 'success' ? 'var(--success)' : variant === 'warning' ? 'var(--warning)' : 'var(--text-light)', fontWeight: '600' }}>
          {variant === 'success' ? '↑ On track' : variant === 'warning' ? '↓ Needs attention' : 'Stable'}
        </span>
      </div>
    </div>
  );
};

export default StatCard;
