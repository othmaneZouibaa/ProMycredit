import React from 'react';
import DebtProgressBar from './DebtProgressBar';

const CreditDetailsModal = ({ credit, onClose }) => {
  if (!credit) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="section-header">
          <h2>Credit Details</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
        </div>

        <div className="fintech-card" style={{ background: 'var(--bg-main)', border: 'none', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h1 style={{ margin: '0', fontSize: '1.5rem' }}>{credit.product}</h1>
              <span className="seller-tag">{credit.sellerName}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Remaining Balance</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--danger)' }}>{credit.remainingAmount.toLocaleString()} DH</div>
            </div>
          </div>
          <DebtProgressBar paid={credit.paidAmount} total={credit.totalAmount} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
          <div className="detail-item">
            <span>Total Credit</span>
            <strong>{credit.totalAmount.toLocaleString()} DH</strong>
          </div>
          <div className="detail-item">
            <span>Total Paid</span>
            <strong>{credit.paidAmount.toLocaleString()} DH</strong>
          </div>
          <div className="detail-item">
            <span>Purchase Date</span>
            <strong>{credit.date}</strong>
          </div>
          <div className="detail-item">
            <span>Last Payment</span>
            <strong>{credit.lastPaymentDate || 'None'}</strong>
          </div>
        </div>

        <div className="section-header">
          <h3>Payment Timeline</h3>
        </div>
        <div className="transaction-list">
          {/* Mock timeline based on installments */}
          {[...Array(credit.paidInstallments)].map((_, i) => (
            <div key={i} className="transaction-item">
              <div className="trans-info">
                <h4>Installment #{i + 1}</h4>
                <p>April {10 + i}, 2026 • Completed</p>
              </div>
              <div className="trans-amount success">+{ (credit.paidAmount / credit.paidInstallments).toLocaleString() } DH</div>
            </div>
          ))}
          {credit.remainingAmount > 0 && (
            <div className="transaction-item" style={{ opacity: 0.5, borderStyle: 'dashed' }}>
              <div className="trans-info">
                <h4>Upcoming Installment</h4>
                <p>Expected: June 05, 2026</p>
              </div>
              <div className="trans-amount" style={{ color: 'var(--text-muted)' }}>{ (credit.remainingAmount / (credit.installments - credit.paidInstallments)).toLocaleString() } DH</div>
            </div>
          )}
        </div>

        <button className="btn-primary" style={{ width: '100%', marginTop: '32px', padding: '16px' }} onClick={onClose}>
          Close Details
        </button>
      </div>
    </div>
  );
};

export default CreditDetailsModal;
