import React from 'react';

const CelebrationState = () => {
  return (
    <div className="celebration-container" style={{ textAlign: 'center', padding: '80px 20px', background: 'var(--white)', borderRadius: '24px', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-light)', maxWidth: '600px', margin: '40px auto' }}>
      <div className="celebration-icon" style={{ fontSize: '5rem', marginBottom: '24px', animation: 'bounce 2s infinite' }}>🎉</div>
      <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '16px', letterSpacing: '-1px' }}>You are Debt-Free!</h2>
      <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '32px' }}>
        Congratulations! All your credits have been fully paid. <br /> 
        Enjoy your financial freedom and keep managing your budget wisely.
      </p>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <button className="btn-primary" style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', transition: 'var(--transition)' }}>
          Explore New Products
        </button>
        <button className="btn-primary-outline" style={{ background: 'transparent', color: 'var(--primary)', border: '2px solid var(--primary)', padding: '16px 32px', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>
          View History
        </button>
      </div>
    </div>
  );
};

export default CelebrationState;
