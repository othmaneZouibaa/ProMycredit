import React from 'react';

const EmptyState = ({ icon, title, message }) => (
  <div className="empty-state" style={{ textAlign: 'center', padding: '48px 24px', background: 'var(--bg-main)', borderRadius: '16px', border: '1px dashed var(--border)' }}>
    <div className="empty-icon" style={{ fontSize: '3rem', marginBottom: '16px', opacity: 0.5 }}>{icon}</div>
    <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '8px' }}>{title}</h4>
    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>{message}</p>
  </div>
);

export default EmptyState;
