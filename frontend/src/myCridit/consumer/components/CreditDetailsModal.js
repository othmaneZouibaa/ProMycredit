import React from 'react';
import DebtProgressBar from './DebtProgressBar';

const CreditDetailsModal = ({ credit, onClose }) => {
  if (!credit) return null;

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
          <div style={{ background: 'var(--bg-main)', padding: '24px', borderRadius: 'var(--radius-lg)', marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>Remaining Balance</span>
              <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)' }}>{credit.remainingAmount.toLocaleString()} DH</span>
            </div>
            <DebtProgressBar paid={credit.paidAmount} total={credit.totalAmount} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '32px' }}>
            <div style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>Total Credit</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800' }}>{credit.totalAmount.toLocaleString()} DH</div>
            </div>
            <div style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>Total Paid</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--success)' }}>{credit.paidAmount.toLocaleString()} DH</div>
            </div>
            <div style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>Date Issued</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800' }}>{credit.date}</div>
            </div>
            <div style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>Status</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--warning)' }}>Active</div>
            </div>
          </div>

          <div className="section-header">
            <h3>Payment Timeline</h3>
          </div>
          
          <div className="transaction-list">
            {[...Array(credit.paidInstallments)].map((_, i) => (
              <div key={i} className="transaction-item" style={{ borderLeft: '3px solid var(--success)', borderRadius: '0 8px 8px 0', background: 'var(--bg-main)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div className="trans-icon" style={{ background: 'var(--success-soft)', color: 'var(--success)' }}>✓</div>
                  <div className="trans-info">
                    <h4>Installment #{i + 1}</h4>
                    <p>May {10 + i}, 2026 • Paid Successfully</p>
                  </div>
                </div>
                <div className="trans-amount success">+{ (credit.paidAmount / credit.paidInstallments).toLocaleString() } DH</div>
              </div>
            ))}
            
            {credit.remainingAmount > 0 && (
              <div className="transaction-item" style={{ borderLeft: '3px solid var(--primary)', borderRadius: '0 8px 8px 0', background: 'var(--primary-soft)', opacity: 0.8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div className="trans-icon" style={{ background: 'var(--white)', color: 'var(--primary)' }}>⌛</div>
                  <div className="trans-info">
                    <h4>Next Installment</h4>
                    <p>Scheduled: June 05, 2026</p>
                  </div>
                </div>
                <div className="trans-amount" style={{ color: 'var(--primary)' }}>
                  { (credit.remainingAmount / (credit.installments - credit.paidInstallments || 1)).toLocaleString() } DH
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-primary-outline" style={{ padding: '12px 24px', borderRadius: '10px', fontWeight: '700', border: '1px solid var(--border)', cursor: 'pointer' }} onClick={onClose}>
            Download Statement
          </button>
          <button className="btn-primary" style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }} onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditDetailsModal;
