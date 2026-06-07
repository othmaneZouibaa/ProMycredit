import React from 'react';
import { Link } from 'react-router-dom';

const RecentPayments = ({ payments, credits }) => (
  <section className="dashboard-section">
    <div className="section-header">
      <h2>Recent Payments</h2>
      <Link to="/consumer-panel/history" style={{fontSize: '0.85rem', color: '#007bff', textDecoration: 'none'}}>View History</Link>
    </div>
    <ul className="payment-list">
      {payments.map(payment => (
        <li key={payment.id} className="payment-item">
          <div className="payment-info">
            <h4>Payment for {credits.find(c => c.id === payment.creditId)?.product}</h4>
            <p>{payment.date} • {payment.method}</p>
          </div>
          <div className="payment-amount">
            +{payment.amount.toLocaleString()} DH
          </div>
        </li>
      ))}
    </ul>
  </section>
);

export default RecentPayments;
