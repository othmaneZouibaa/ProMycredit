import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConsumerStats, fetchNotifications } from '../consumerSlice';
import StatCard from '../components/StatCard';
import SmartAlert from '../components/SmartAlert';
import TrustScore from '../components/TrustScore';
import FinancialHealth from '../components/FinancialHealth';
import CelebrationState from '../components/CelebrationState';
import DebtProgressBar from '../components/DebtProgressBar';
import CreditDetailsModal from '../components/CreditDetailsModal';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { stats, recentCredits, notifications, status, error } = useSelector((state) => state.consumer);
  const [selectedCredit, setSelectedCredit] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchConsumerStats());
    dispatch(fetchNotifications());
  }, [dispatch]);

  const isLoading = status === 'loading';
  
  const isDebtFree = !isLoading && stats.total_remaining_debt === 0 && recentCredits.length > 0;

  if (isDebtFree) {
    return (
      <div className="dashboard-page-fintech">
        <CelebrationState />
      </div>
    );
  }

  return (
    <div className="dashboard-page-fintech">
      {/* Motivational Header */}
      <div className="motivational-box">
        <span style={{ fontSize: '1.5rem' }}>🎉</span>
        <div>
          <strong>Great progress, {user?.fullName?.split(' ')[0]}!</strong>
          <span style={{ marginLeft: '8px', opacity: 0.9 }}>
            You've successfully paid off {stats.debt_progress_percentage}% of your total credits. Keep it up!
          </span>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* 1. Global Debt Summary Banner */}
      <section className="global-summary-banner">
        <div className="summary-main">
          <p>TOTAL REMAINING BALANCE</p>
          <h1>{isLoading ? '...' : stats.total_remaining_debt.toLocaleString()} DH</h1>
          <div className="summary-meta">
            <span>📊 Total Paid: {isLoading ? '...' : stats.total_paid_amount.toLocaleString()} DH</span>
            <span>📅 Next Due: {isLoading ? '...' : (stats.next_due_date || 'None')}</span>
          </div>
        </div>
        <div className="summary-trust">
          <FinancialHealth health={stats.trust_score > 70 ? 'Excellent' : 'Good'} />
        </div>
      </section>

      {/* 2. Key Statistics Grid */}
      <section className="stats-grid">
        <StatCard 
          label="Trust Score" 
          value={`${isLoading ? '...' : stats.trust_score}%`} 
          icon="🛡️"
        />
        <StatCard 
          label="Paid Amount" 
          value={`${isLoading ? '...' : stats.total_paid_amount.toLocaleString()} DH`} 
          variant="success" 
          icon="📈"
        />
        <StatCard 
          label="Recent Credits" 
          value={`${isLoading ? '...' : recentCredits.length}`} 
          variant="warning" 
          icon="💳"
        />
      </section>

      <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        <div className="left-column">
          
          {/* 3. Recent Credits Section */}
          <section className="fintech-card">
            <div className="section-header">
              <h2>Recent Credits</h2>
              <button className="view-details-btn">View All History</button>
            </div>
            {recentCredits.length > 0 ? (
              recentCredits.map(credit => (
                <div key={credit.id} className="credit-item-card">
                  <div className="credit-header">
                    <div className="credit-info">
                      <h4>{credit.product_name}</h4>
                      <span className="seller-tag">{credit.seller_name}</span>
                    </div>
                    <button 
                      className="view-details-btn"
                      onClick={() => setSelectedCredit(credit)}
                    >
                      Details
                    </button>
                  </div>
                  <DebtProgressBar 
                    paid={credit.total_amount - credit.remaining_amount} 
                    total={credit.total_amount} 
                  />
                  <div className="credit-footer">
                    <span>Status: <strong className={`status-${credit.status}`}>{credit.status.toUpperCase()}</strong></span>
                    <span>Remaining: <strong>{credit.remaining_amount.toLocaleString()} DH</strong></span>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">No active credits found.</div>
            )}
          </section>
        </div>

        <div className="right-column">
          {/* 4. Trust Score Visualization */}
          <TrustScore score={stats.trust_score} />
          
          {/* 5. Quick Alerts */}
          <section className="fintech-card" style={{ marginTop: '24px' }}>
            <div className="section-header">
              <h2>Smart Alerts</h2>
            </div>
            {notifications.length > 0 ? (
              notifications.slice(0, 3).map(note => (
                <SmartAlert 
                  key={note.id}
                  notification={note}
                />
              ))
            ) : (
              <SmartAlert 
                type={stats.next_due_date ? "warning" : "success"}
                title={stats.next_due_date ? "Upcoming Payment" : "All Clear"}
                message={stats.next_due_date 
                  ? `Your next payment for a credit is due on ${stats.next_due_date}.` 
                  : "You don't have any urgent payments due."}
              />
            )}
          </section>
        </div>
      </div>

      {selectedCredit && (
        <CreditDetailsModal 
          credit={selectedCredit} 
          onClose={() => setSelectedCredit(null)} 
        />
      )}
    </div>
  );};

export default Dashboard;
