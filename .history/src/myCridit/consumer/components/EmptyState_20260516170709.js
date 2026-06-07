import React from 'react';

const EmptyState = ({ icon, title, message }) => (
  <div className="empty-state">
    <div className="empty-icon">{icon}</div>
    <h4>{title}</h4>
    <p>{message}</p>
  </div>
);

export default EmptyState;
