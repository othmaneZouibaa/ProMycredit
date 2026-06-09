import React, { useState } from 'react';
import DebtProgressBar from './DebtProgressBar';
import { useDispatch } from 'react-redux';
import { submitPaymentRequest, fetchConsumerStats } from '../consumerSlice';
import { useTranslation } from 'react-i18next';

const CreditDetailsModal = ({ credit, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!credit) return null;

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || amount <= 0 || amount > credit.remainingAmount) return;

    setSubmitting(true);
    try {
      await dispatch(submitPaymentRequest({
        credit_id: credit.id,
        amount: parseFloat(amount),
        note: note
      })).unwrap();
      
      alert(t('consumer.request_success'));
      setShowRequestForm(false);
      setAmount('');
      setNote('');
      dispatch(fetchConsumerStats());
    } catch (err) {
      alert(err || 'Failed to submit request');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', background: 'var(--primary-soft)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
              💳
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0 }}>{credit.product}</h2>
              <span className="seller-tag">{credit.sellerName}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'var(--bg-main)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text-muted)' }}>×</button>
        </div>

        <div className="modal-body">
          {showRequestForm ? (
            <div className="payment-request-form" style={{ padding: '20px', background: 'var(--bg-main)', borderRadius: '12px' }}>
              <h3 style={{ marginBottom: '16px' }}>{t('consumer.request_payment')}</h3>
              <form onSubmit={handleSubmitRequest}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    {t('consumer.payment_amount')} (Max: {credit.remainingAmount} DH)
                  </label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    max={credit.remainingAmount}
                    placeholder="0.00"
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem' }}
                    required
                  />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    {t('consumer.payment_note')}
                  </label>
                  <textarea 
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder={t('consumer.payment_note')}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem', minHeight: '80px', resize: 'vertical' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    type="button" 
                    className="btn-primary-outline" 
                    style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', cursor: 'pointer' }}
                    onClick={() => setShowRequestForm(false)}
                    disabled={submitting}
                  >
                    {t('common.cancel')}
                  </button>
                  <button 
                    type="submit" 
                    className="btn-primary" 
                    style={{ flex: 2, padding: '12px', borderRadius: '8px', border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontWeight: '700' }}
                    disabled={submitting || !amount}
                  >
                    {submitting ? t('common.processing') : t('consumer.submit_request')}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <div style={{ background: 'var(--bg-main)', padding: '24px', borderRadius: 'var(--radius-lg)', marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>{t('consumer.remaining_balance')}</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)' }}>{credit.remainingAmount.toLocaleString()} DH</span>
                </div>
                <DebtProgressBar paid={credit.paidAmount} total={credit.totalAmount} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '32px' }}>
                <div style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>{t('common.total')}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800' }}>{credit.totalAmount.toLocaleString()} DH</div>
                </div>
                <div style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>{t('consumer.total_paid')}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--success)' }}>{credit.paidAmount.toLocaleString()} DH</div>
                </div>
                <div style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>{t('common.date')}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800' }}>{credit.date}</div>
                </div>
                <div style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>{t('common.status')}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--warning)' }}>{t(`common.${credit.status}`)}</div>
                </div>
              </div>

              <div className="section-header">
                <h3>{t('consumer.recent_credits')}</h3>
              </div>
              
              <div className="transaction-list">
                {/* Timeline items logic preserved but using i18n where possible */}
                {[...Array(credit.paidInstallments)].map((_, i) => (
                  <div key={i} className="transaction-item" style={{ borderLeft: '3px solid var(--success)', borderRadius: '0 8px 8px 0', background: 'var(--bg-main)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div className="trans-icon" style={{ background: 'var(--success-soft)', color: 'var(--success)' }}>✓</div>
                      <div className="trans-info">
                        <h4>Installment #{i + 1}</h4>
                        <p>Paid Successfully</p>
                      </div>
                    </div>
                    <div className="trans-amount success">+{ (credit.paidAmount / credit.paidInstallments).toLocaleString() } DH</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="modal-footer">
          {!showRequestForm && credit.remainingAmount > 0 && (
            <button 
              className="btn-primary" 
              style={{ background: 'var(--success)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', marginRight: 'auto' }} 
              onClick={() => setShowRequestForm(true)}
            >
              {t('consumer.request_payment')}
            </button>
          )}
          <button className="btn-primary-outline" style={{ padding: '12px 24px', borderRadius: '10px', fontWeight: '700', border: '1px solid var(--border)', cursor: 'pointer' }} onClick={onClose}>
            {t('common.close')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditDetailsModal;

