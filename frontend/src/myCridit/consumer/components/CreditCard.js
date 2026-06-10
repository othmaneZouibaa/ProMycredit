import React from 'react';
import { useTranslation } from 'react-i18next';

const FintechCreditCard = ({ credit, onClick }) => {
  const { t } = useTranslation();
  
  const repaidPercentage = Math.round((credit.paid_amount / credit.total_amount) * 100);
  
  return (
    <div className="credit-card-saas" onClick={onClick}>
      <div className="card-top">
        <div>
          <h3>{credit.product_name}</h3>
          <span className="seller-tag">
            <i className="fas fa-store"></i> {t('consumer.credits.seller')}: {credit.seller_name || 'N/A'}
          </span>
        </div>
        <span className={`status-badge status-${credit.status}`}>
          {t(`common.status.${credit.status}`)}
        </span>
      </div>

      <div className="card-details">
        <div className="detail-item">
          <span>{t('consumer.credits.total_value')}</span>
          <strong>{credit.total_amount.toLocaleString()} DH</strong>
        </div>
        <div className="detail-item">
          <span>{t('consumer.credits.purchased_on')}</span>
          <strong>{new Date(credit.created_at).toLocaleDateString()}</strong>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-labels">
          <span>{repaidPercentage}% {t('consumer.credits.repaid')}</span>
          <span className="remaining-text">
            {credit.remaining_amount.toLocaleString()} DH {t('consumer.credits.remaining')}
          </span>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${repaidPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="credit-footer-fintech">
        <span>{t('consumer.credits.last_payment')}</span>
        <span>{credit.last_payment_date ? new Date(credit.last_payment_date).toLocaleDateString() : t('common.none')}</span>
      </div>
    </div>
  );
};

export default FintechCreditCard;
