import React from 'react';
import { consumerData } from '../data';
import StatusBadge from '../components/StatusBadge';
import DebtProgressBar from '../components/DebtProgressBar';

const Credits = () => {
  const { credits } = consumerData;

  return (
    <div className="credits-page-modern">
      <div className="credits-grid-modern">
        {credits.map((credit) => (
          <div key={credit.id} className="credit-card-fintech">
            <div className="credit-card-header">
              <div>
                <h4>{credit.product}</h4>
                <span className="seller-badge">{credit.sellerName}</span>
              </div>
              <StatusBadge status={credit.status} />
            </div>
            
            <div className="credit-details-fintech">
              <div className="detail-row">
                <span>Date Purchase</span>
                <strong>{credit.date}</strong>
              </div>
              <div className="detail-row">
                <span>Total Value</span>
                <strong>{credit.totalAmount.toLocaleString()} DH</strong>
              </div>
            </div>

            <DebtProgressBar paid={credit.paidAmount} total={credit.totalAmount} />
            
            <div className="credit-footer-fintech">
              <span>Last Payment: {credit.lastPaymentDate || 'None'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Credits;
