import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConsumerCredits } from '../consumerSlice';
import FintechCreditCard from '../components/CreditCard';
import CreditDetailsModal from '../components/CreditDetailsModal';
import { useTranslation } from 'react-i18next';

const Credits = () => {
  const { t } = useTranslation();
  const { credits, status } = useSelector((state) => state.consumer);
  const dispatch = useDispatch();
  const [selectedCredit, setSelectedCredit] = useState(null);

  useEffect(() => {
    dispatch(fetchConsumerCredits());
  }, [dispatch]);

  const isLoading = status === 'loading';

  return (
    <div className="credits-page-modern">
      {isLoading && credits.length === 0 ? (
        <div className="text-center p-5">{t('common.loading')}</div>
      ) : credits.length > 0 ? (
        <div className="credits-grid">
          {credits.map((credit) => (
            <FintechCreditCard 
              key={credit.id} 
              onClick={() => setSelectedCredit({
                ...credit,
                product: credit.product_name,
                sellerName: credit.seller_name,
                totalAmount: credit.total_amount,
                remainingAmount: credit.remaining_amount,
                paidAmount: credit.total_amount - credit.remaining_amount,
                lastPaymentDate: credit.last_payment_date || t('consumer.none')
              })}
              credit={{
                ...credit,
                product: credit.product_name,
                sellerName: credit.seller_name,
                totalAmount: credit.total_amount,
                remainingAmount: credit.remaining_amount,
                paidAmount: credit.total_amount - credit.remaining_amount,
                lastPaymentDate: credit.last_payment_date || t('consumer.none')
              }} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-5">{t('consumer.no_credits')}</div>
      )}

      {selectedCredit && (
        <CreditDetailsModal 
          credit={selectedCredit} 
          onClose={() => setSelectedCredit(null)} 
        />
      )}
    </div>
  );
};

export default Credits;
