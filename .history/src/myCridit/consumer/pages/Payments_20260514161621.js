import React from 'react';
import { consumerData } from '../data';

const Payments = () => {
  const { payments, credits } = consumerData;

  return (
    <div className="payments-page">
      <div className="dashboard-section">
        <table className="data-table">
          <thead>
            <tr>
              <th>Payment Date</th>
              <th>Amount</th>
              <th>Product</th>
              <th>Method</th>
              <th>Note</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => {
              const credit = credits.find(c => c.id === payment.creditId);
              return (
                <tr key={payment.id}>
                  <td>{payment.date}</td>
                  <td className="success">+{payment.amount.toLocaleString()} DH</td>
                  <td>{credit?.product || "N/A"}</td>
                  <td>{payment.method}</td>
                  <td>{payment.note}</td>
                  <td><span className="status-completed">{payment.status}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
