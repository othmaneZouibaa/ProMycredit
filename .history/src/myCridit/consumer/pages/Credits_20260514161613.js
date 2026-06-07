import React from 'react';
import { consumerData } from '../data';
import StatusBadge from '../components/StatusBadge';

const Credits = () => {
  const { credits } = consumerData;

  return (
    <div className="credits-page">
      <div className="dashboard-section">
        <table className="data-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Date</th>
              <th>Total Amount</th>
              <th>Paid Amount</th>
              <th>Remaining</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {credits.map((credit) => (
              <tr key={credit.id}>
                <td>
                  <strong>{credit.product}</strong>
                  <div className="seller-name-sub">{credit.sellerName}</div>
                </td>
                <td>{credit.date}</td>
                <td>{credit.totalAmount.toLocaleString()} DH</td>
                <td>{credit.paidAmount.toLocaleString()} DH</td>
                <td className="danger">{credit.remainingAmount.toLocaleString()} DH</td>
                <td><StatusBadge status={credit.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Credits;
