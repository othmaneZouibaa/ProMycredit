import React from 'react';
import { consumerData } from '../data';

const Payments = () => {
  const { payments, credits } = consumerData;

  return (
    <div className="payments-page-modern">
      <section className="fintech-card">
        <div className="section-header">
          <h2>Payment History</h2>
        </div>
        <div className="transaction-list">
          {payments.map((payment) => {
            const credit = credits.find(c => c.id === payment.creditId);
            return (
              <div key={payment.id} className="transaction-item">
                <div className="trans-info">
                  <h4>{credit?.product || "Purchase"}</h4>
                  <p>{payment.date} • {payment.method}</p>
                  {payment.note && <p className="trans-note">Note: {payment.note}</p>}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="trans-amount success">+{payment.amount.toLocaleString()} DH</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--success)', fontWeight: 'bold' }}>{payment.status}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Payments;
