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
    <div className={`smart-alert ${notification.isRead ? 'read' : 'unread'} type-${notification.type}`}>
      <span className="alert-icon">{getIcon()}</span>
      <div className="alert-content">
        <h5 style={{ margin: '0 0 5px', fontSize: '0.85rem', fontWeight: 'bold' }}>{notification.title}</h5>
        <p className="alert-message" style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>{notification.message}</p>
        <span className="alert-date">{notification.date}</span>
      </div>
      {!notification.isRead && <span className="unread-dot"></span>}
    </div>
  );
};

export default SmartAlert;
