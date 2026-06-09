import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaymentRequests } from '../consumerSlice';
import { useTranslation } from 'react-i18next';
import StatusBadge from '../components/StatusBadge';

const PaymentRequests = () => {
  const { t } = useTranslation();
  const { paymentRequests, status } = useSelector((state) => state.consumer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPaymentRequests());
  }, [dispatch]);

  const isLoading = status === 'loading';

  return (
    <div className="payment-requests-page" style={{ padding: '24px' }}>
      <div className="section-header-modern" style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>{t('consumer.pending_payment_requests')}</h2>
      </div>

      <div className="requests-grid" style={{ display: 'grid', gap: '16px' }}>
        {isLoading && paymentRequests.length === 0 ? (
          <div className="text-center p-5">{t('common.loading')}</div>
        ) : paymentRequests.length > 0 ? (
          paymentRequests.map((request) => (
            <div key={request.id} className="section-card" style={{ padding: '20px', background: 'white', borderRadius: '16px', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', background: 'var(--bg-main)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                  💰
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700' }}>{request.credit?.product_name}</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {t('common.date')}: {new Date(request.created_at).toLocaleDateString()}
                  </p>
                  {request.note && (
                    <p style={{ margin: '4px 0 0', fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--text-light)' }}>
                      "{request.note}"
                    </p>
                  )}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '4px' }}>
                  {parseFloat(request.amount).toLocaleString()} DH
                </div>
                <StatusBadge status={request.status} />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-5" style={{ background: 'var(--bg-main)', borderRadius: '16px', color: 'var(--text-muted)' }}>
            {t('consumer.no_payment_requests')}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentRequests;
