import React from 'react';

const SmartAlert = ({ notification }) => {
  const getIcon = () => {
    switch(notification.type) {
      case 'payment': return '✅';
      case 'reminder': return '🔔';
      default: return 'ℹ️';
    }
  };

  return (
    <div className={`smart-alert ${notification.isRead ? 'read' : 'unread'}`}>
      <span className="alert-icon">{getIcon()}</span>
      <div className="alert-content">
        <p className="alert-message">{notification.message}</p>
        <span className="alert-date">{notification.date}</span>
      </div>
      {!notification.isRead && <span className="unread-dot"></span>}
    </div>
  );
};

export default SmartAlert;
