import React from 'react';
import { consumerData } from '../data';
import FintechCreditCard from '../components/CreditCard';

const Credits = () => {
  const { credits } = consumerData;

  return (
    <div className="credits-page-modern">
      <div className="credits-grid">
        {credits.map((credit) => (
          <FintechCreditCard key={credit.id} credit={credit} />
        ))}
      </div>
    </div>
  );
};

export default Credits;
