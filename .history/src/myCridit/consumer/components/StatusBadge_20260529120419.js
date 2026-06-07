import React from 'react';

const StatusBadge = ({ status }) => {
  const styles = {
    paid: { backgroundColor: '#d4edda', color: '#155724', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' },
    partial: { backgroundColor: '#fff3cd', color: '#856404', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' },
    unpaid: { backgroundColor: '#f8d7da', color: '#721c24', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }
  };

  const label = status.charAt(0).toUpperCase() + status.slice(1);
  const style = styles[status] || styles.unpaid;

  return <span style={style}>{label}</span>;
};

export default StatusBadge;
