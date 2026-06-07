import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPendingCredits, acceptCredit, rejectCredit } from '../consumerSlice';

const PendingCredits = () => {
  const { pendingCredits, status, error } = useSelector((state) => state.consumer);
  const [processingId, setProcessingId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPendingCredits());
  }, [dispatch]);

  const handleAccept = async (id) => {
    if (window.confirm('Are you sure you want to accept this credit request?')) {
      setProcessingId(id);
      try {
        const result = await dispatch(acceptCredit(id)).unwrap();
        if (result) {
          dispatch(fetchPendingCredits());
        }
      } catch (err) {
        alert(err || 'Failed to accept credit');
      } finally {
        setProcessingId(null);
      }
    }
  };

  const handleReject = async (id) => {
    if (window.confirm('Are you sure you want to reject this credit request?')) {
      setProcessingId(id);
      try {
        await dispatch(rejectCredit(id)).unwrap();
        dispatch(fetchPendingCredits());
      } catch (err) {
        alert(err || 'Failed to reject credit');
      } finally {
        setProcessingId(null);
      }
    }
  };

  const isLoading = status === 'loading';

  return (
    <div className="pending-credits-page">
      <div className="section-header" style={{ marginBottom: '24px' }}>
        <h2>Pending Credit Requests</h2>
        <p>Review and confirm credits issued by sellers.</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="pending-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {isLoading && pendingCredits.length === 0 ? (
          <div className="text-center p-5">Loading requests...</div>
        ) : pendingCredits.length > 0 ? (
          pendingCredits.map((credit) => (
            <div key={credit.id} className="fintech-card" style={{ borderLeft: '4px solid var(--warning)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '4px' }}>{credit.product_name}</h3>
                  <span className="seller-tag" style={{ background: 'var(--primary-soft)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700' }}>
                    Seller: {credit.seller?.name || 'Unknown Shop'}
                  </span>
                  <div style={{ marginTop: '12px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Requested on: {new Date(credit.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)' }}>{credit.total_amount.toLocaleString()} DH</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: '600' }}>TOTAL AMOUNT</div>
                </div>
              </div>

              <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => handleAccept(credit.id)}
                  style={{ 
                    flex: 1, 
                    background: 'var(--success)', 
                    color: 'white', 
                    border: 'none', 
                    padding: '12px', 
                    borderRadius: '12px', 
                    fontWeight: '700', 
                    cursor: 'pointer' 
                  }}
                >
                  Accept Credit
                </button>
                <button 
                  onClick={() => handleReject(credit.id)}
                  style={{ 
                    flex: 1, 
                    background: 'var(--bg-main)', 
                    color: 'var(--danger)', 
                    border: '1px solid var(--danger)', 
                    padding: '12px', 
                    borderRadius: '12px', 
                    fontWeight: '700', 
                    cursor: 'pointer' 
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state text-center p-5" style={{ background: 'white', borderRadius: '20px', border: '1px solid var(--border)' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '16px' }}>📝</span>
            <p style={{ color: 'var(--text-muted)' }}>No pending credit requests at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingCredits;
