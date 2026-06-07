import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConsumerCredits } from '../consumerSlice';
import FintechCreditCard from '../components/CreditCard';

const Credits = () => {
  const { credits, status } = useSelector((state) => state.consumer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchConsumerCredits());
  }, [dispatch]);

  const isLoading = status === 'loading';

  return (
    <div className="credits-page-modern">
      {isLoading && credits.length === 0 ? (
        <div className="text-center p-5">Loading credits...</div>
      ) : credits.length > 0 ? (
        <div className="credits-grid">
          {credits.map((credit) => (
            <FintechCreditCard key={credit.id} credit={{
              ...credit,
              product: credit.product_name,
              sellerName: credit.seller_name,
              totalAmount: credit.total_amount,
              remainingAmount: credit.remaining_amount,
              paidAmount: credit.total_amount - credit.remaining_amount,
              lastPaymentDate: credit.last_payment_date || 'None'
            }} />
          ))}
        </div>
      ) : (
        <div className="text-center p-5">No credits found.</div>
      )}
    </div>
  );
};

export default Credits;
