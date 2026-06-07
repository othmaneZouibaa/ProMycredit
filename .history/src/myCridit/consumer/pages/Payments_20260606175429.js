import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConsumerPayments } from '../consumerSlice';

const Payments = () => {
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
          <h2>Payment History</h2>
        </div>
        <div className="transaction-list">
          {isLoading && payments.length === 0 ? (
            <div className="text-center p-5">Loading payment history...</div>
          ) : payments.length > 0 ? (
            payments.map((payment) => (
              <div key={payment.id} className="transaction-item">
                <div className="trans-info">
                  <h4>{payment.product_name || "Payment"}</h4>
                  <p>{payment.payment_date} • {payment.payment_method}</p>
                  {payment.confirmation_id && <p className="trans-note">ID: {payment.confirmation_id}</p>}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="trans-amount success">+{payment.amount.toLocaleString()} DH</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--success)', fontWeight: 'bold' }}>COMPLETED</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-5">No payments found.</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Payments;
