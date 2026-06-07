import React from 'react';

const SmartAlert = ({ notification, type, title, message, date }) => {
  // Support both object prop (notification) or individual props
  const alertType = type || notification?.type;
  const alertTitle = title || notification?.title;
  const alertMessage = message || notification?.message;
  const alertDate = date || notification?.date;

  const getIcon = () => {
    switch(alertType) {
      case 'payment': return '💰';
      case 'reminder':
      case 'warning': return '🔔';
      case 'success': return '🎉';
      default: return 'ℹ️';
    }
  };

  if (!alertType && !notification) return null;

  return (
    <div className={`smart-alert type-${alertType}`}>
      <div className="smart-alert-icon">
        {getIcon()}
      </div>
      <div className="smart-alert-content">
        <h4>{alertTitle}</h4>
        <p>{alertMessage}</p>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {alertDate && <span style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>{alertDate}</span>}
          <div className="alert-actions">
            {(alertType === 'reminder' || alertType === 'warning') && (
              <button className="btn-alert-action" style={{ background: 'var(--warning)', color: 'white' }}>
                Pay Now
              </button>
            )}
            {alertType === 'payment' && (
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
