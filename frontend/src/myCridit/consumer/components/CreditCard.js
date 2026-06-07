import React from 'react';
import DebtProgressBar from './DebtProgressBar';
import StatusBadge from './StatusBadge';

const FintechCreditCard = ({ credit }) => {
  return (
    <div className="credit-card-saas">
      <div className="card-top">
        <div>
          <h3>{credit.product}</h3>
          <span className="seller-tag">{credit.sellerName}</span>
        </div>
        <StatusBadge status={credit.status} />
      </div>

      <div className="card-details">
        <div className="detail-item">
          <span>Purchased On</span>
          <strong>{credit.date}</strong>
        </div>
        <div className="detail-item">
          <span>Total Value</span>
          <strong>{credit.totalAmount.toLocaleString()} DH</strong>
        </div>
      </div>

      <DebtProgressBar paid={credit.paidAmount} total={credit.totalAmount} />

      <div className="credit-footer-fintech">
        <span>Last Payment: {credit.lastPaymentDate || 'No payments yet'}</span>
      </div>
    </div>
  );
};

export default FintechCreditCard;
