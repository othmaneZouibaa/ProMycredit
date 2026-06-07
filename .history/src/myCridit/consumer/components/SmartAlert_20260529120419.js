import React from 'react';

const SmartAlert = ({ notification }) => {
  const getIcon = () => {
    switch(notification.type) {
      case 'payment': return '💰';
      case 'reminder': return '🔔';
      case 'success': return '🎉';
      default: return 'ℹ️';
    }
  };

  return (
    <div className={`smart-alert type-${notification.type}`}>
      <div className="smart-alert-icon">
        {getIcon()}
      </div>
      <div className="smart-alert-content">
        <h4>{notification.title}</h4>
        <p>{notification.message}</p>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>{notification.date}</span>
          <div className="alert-actions">
            {notification.type === 'reminder' && (
              <button className="btn-alert-action" style={{ background: 'var(--warning)', color: 'white' }}>
                Pay Now
              </button>
            )}
            {notification.type === 'payment' && (
              <button className="btn-alert-action" style={{ background: 'var(--success)', color: 'white' }}>
                View Receipt
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartAlert;
