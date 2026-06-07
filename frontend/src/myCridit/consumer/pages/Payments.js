import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConsumerPayments } from '../consumerSlice';
import { useTranslation } from 'react-i18next';

const Payments = () => {
  const { t } = useTranslation();
  const { payments, status } = useSelector((state) => state.consumer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchConsumerPayments());
  }, [dispatch]);

  const isLoading = status === 'loading';

  return (
    <div className="payments-page-modern">
      <section className="fintech-card">
        <div className="section-header">
          <h2>{t('common.payments_history')}</h2>
        </div>
        <div className="transaction-list">
          {isLoading && payments.length === 0 ? (
            <div className="text-center p-5">{t('common.loading')}</div>
          ) : payments.length > 0 ? (
            payments.map((payment) => (
              <div key={payment.id} className="transaction-item">
                <div className="trans-info">
                  <h4>{payment.product_name || t('common.payment')}</h4>
                  <p>{payment.payment_date} • {payment.payment_method}</p>
                  {payment.confirmation_id && <p className="trans-note">ID: {payment.confirmation_id}</p>}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="trans-amount success">+{payment.amount.toLocaleString()} {t('common.dh')}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--success)', fontWeight: 'bold' }}>{t('common.paid').toUpperCase()}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-5">{t('consumer.no_credits')}</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Payments;
