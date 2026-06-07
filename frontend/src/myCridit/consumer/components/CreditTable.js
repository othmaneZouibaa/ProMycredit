import React from 'react';
import { Link } from 'react-router-dom';

const CreditTable = ({ credits }) => (
  <section className="dashboard-section">
    <div className="section-header">
      <h2>Credit Details</h2>
      <Link to="/consumer-panel/credits" style={{fontSize: '0.85rem', color: '#007bff', textDecoration: 'none'}}>View All</Link>
    </div>
    <table className="data-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Date</th>
          <th>Total</th>
          <th>Paid</th>
          <th>Remaining</th>
        </tr>
      </thead>
      <tbody>
        {credits.map(credit => (
          <tr key={credit.id}>
            <td>
              <strong>{credit.product}</strong>
              <div style={{fontSize: '0.75rem', color: '#666'}}>{credit.sellerName}</div>
            </td>
            <td>{credit.date}</td>
            <td>{credit.totalAmount.toLocaleString()} DH</td>
            <td>{credit.paidAmount.toLocaleString()} DH</td>
            <td className="danger">{(credit.totalAmount - credit.paidAmount).toLocaleString()} DH</td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

export default CreditTable;
