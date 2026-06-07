import React from 'react';

const FinancialHealth = ({ health }) => {
  const getHealthMeta = () => {
    switch(health) {
      case 'Healthy': return { color: 'var(--success)', label: 'Excellent', icon: '🌟', desc: 'You are managing your credits perfectly!' };
      case 'Warning': return { color: 'var(--warning)', label: 'Needs Attention', icon: '⚠️', desc: 'Consider paying off some small balances.' };
      case 'Critical': return { color: 'var(--danger)', label: 'Critical', icon: '🚨', desc: 'Your debt ratio is high. Contact us for help.' };
      default: return { color: 'var(--text-muted)', label: 'Analyzing', icon: '📊', desc: 'We are analyzing your payment patterns.' };
    }
  };

  const meta = getHealthMeta();

  return (
    <div className="financial-health-card" style={{ color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: '700', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px' }}>Financial Health</span>
        <span style={{ fontSize: '1.25rem' }}>{meta.icon}</span>
      </div>
      
      <div style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '12px', color: meta.color }}>
        {meta.label}
      </div>
      
      <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden', marginBottom: '16px' }}>
        <div 
          style={{ 
            width: health === 'Healthy' ? '100%' : health === 'Warning' ? '60%' : '30%', 
            height: '100%', 
            backgroundColor: meta.color,
            borderRadius: '10px',
            transition: 'width 1s ease'
          }}
        ></div>
      </div>
      
      <p style={{ fontSize: '0.8rem', opacity: 0.9, lineHeight: '1.5', margin: 0 }}>
        {meta.desc}
      </p>
    </div>
  );
};

export default FinancialHealth;
