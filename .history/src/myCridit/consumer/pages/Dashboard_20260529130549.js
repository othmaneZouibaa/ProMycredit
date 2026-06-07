import React, { useState } from 'react';
import { consumerData } from '../data';
import { useSelector } from 'react-redux';
import StatCard from '../components/StatCard';
import SmartAlert from '../components/SmartAlert';
import TrustScore from '../components/TrustScore';
import FinancialHealth from '../components/FinancialHealth';
import CelebrationState from '../components/CelebrationState';
import DebtProgressBar from '../components/DebtProgressBar';
import CreditDetailsModal from '../components/CreditDetailsModal';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { credits, notifications, activityFeed, profile, monthlySummary } = consumerData;
  const [selectedCredit, setSelectedCredit] = useState(null);
  
  const activeCredits = credits.filter(c => c.status !== 'paid');
  const isDebtFree = activeCredits.length === 0;

  const totalRemaining = credits.reduce((acc, curr) => acc + curr.remainingAmount, 0);
  const totalPaid = credits.reduce((acc, curr) => acc + curr.paidAmount, 0);
  const totalDebt = totalRemaining + totalPaid;

  const trustLevel = profile.trustLevel || (profile.trustScore >= 90 ? 'Gold' : profile.trustScore >= 70 ? 'Silver' : 'Bronze');

  if (isDebtFree && credits.length > 0) {
    return (
      <div className="dashboard-page-fintech">
        <CelebrationState />
      </div>
    );
  }

  return (
    <div className="dashboard-page-fintech">
      {/* Emotional UX Header */}
      <div className="motivational-box">
        <span style={{ fontSize: '1.5rem' }}>🎉</span>
        <div>
          <strong>Great progress, {user?.fullName?.split(' ')[0] || profile.name.split(' ')[0]}!</strong>
          <span style={{ marginLeft: '8px', opacity: 0.9 }}>You've successfully paid off {Math.round((totalPaid/totalDebt)*100)}% of your total credits. Keep it up!</span>
        </div>
      </div>

      {/* 1. Global Debt Summary Banner */}
      <section className="global-summary-banner">
        <div className="summary-main">
          <p>TOTAL REMAINING BALANCE</p>
          <h1>{totalRemaining.toLocaleString()} DH</h1>
          <div className="summary-meta">
            <span>📊 Total Debt: {totalDebt.toLocaleString()} DH</span>
            <span>📅 Next Due: {profile.nextPaymentDate}</span>
          </div>
        </div>
        <div className="summary-trust">
          <FinancialHealth health={profile.financialHealth} />
        </div>
      </section>

      {/* 2. Key Statistics Grid */}
      <section className="stats-grid">
        <StatCard 
          label="Monthly Budget" 
          value={`${profile.monthlyBudgetLimit.toLocaleString()} DH`} 
          icon="💰"
        />
        <StatCard 
          label="Paid This Month" 
          value={`${monthlySummary.totalPaidThisMonth.toLocaleString()} DH`} 
          variant="success" 
          icon="📈"
        />
        <StatCard 
          label="Active Credits" 
          value={`${activeCredits.length}`} 
          variant="warning" 
          icon="💳"
        />
      </section>

      <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        <div className="left-column">
          
          {/* 3. Active Progress Section */}
          <section className="fintech-card">
            <div className="section-header">
              <h2>Active Credits</h2>
              <button className="view-details-btn">View All History</button>
            </div>
            {activeCredits.length > 0 ? (
              activeCredits.map(credit => (
                <div key={credit.id} className="credit-item-card">
                  <div className="credit-header">
                    <div className="credit-info">
                      <h4>{credit.product}</h4>
                      <span className="seller-tag">{credit.sellerName}</span>
                    </div>
                    <button 
                      className="view-details-btn"
                      onClick={() => setSelectedCredit(credit)}
                    >
                      Details →
                    </button>
                  </div>
                  <DebtProgressBar paid={credit.paidAmount} total={credit.totalAmount} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span>Last payment: <strong>{credit.lastPaymentDate}</strong></span>
                    <span style={{ color: 'var(--primary)', fontWeight: '700' }}>Next: June 05</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state" style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📂</div>
                <h3 style={{ margin: '0 0 8px' }}>No Active Credits</h3>
                <p style={{ color: 'var(--text-muted)' }}>You don't have any active credits at the moment.</p>
              </div>
            )}
          </section>

          {/* 4. Recent Activity Timeline */}
          <section className="fintech-card">
            <div className="section-header">
              <h2>Recent Activity</h2>
            </div>
            <div className="transaction-list">
              {activityFeed.map(activity => (
                <div key={activity.id} className="transaction-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div className="trans-icon">
                      {activity.icon}
                    </div>
                    <div className="trans-info">
                      <h4>{activity.action}</h4>
                      <p>{activity.target} • {activity.date}</p>
                    </div>
                  </div>
                  <div className={`trans-amount ${activity.amount > 0 ? 'success' : ''}`}>
                    {activity.amount > 0 ? `+${activity.amount.toLocaleString()} DH` : 'Completed'}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="right-column" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* 5. Trust Score Widget */}
          <section className="fintech-card">
            <TrustScore score={profile.trustScore} />
          </section>

          {/* 6. Smart Alerts Section */}
          <section className="fintech-card">
            <div className="section-header">
              <h2>Smart Alerts</h2>
              {notifications.some(n => !n.isRead) && <span style={{ background: 'var(--danger)', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: '800' }}>NEW</span>}
            </div>
            <div className="alerts-container">
              {notifications.map(notif => (
                <SmartAlert key={notif.id} notification={notif} />
              ))}
            </div>
            <button className="view-details-btn" style={{ width: '100%', marginTop: '16px', textAlign: 'center' }}>Mark all as read</button>
          </section>

          {/* 7. Quick Profile Context */}
          <section className="fintech-card" style={{ textAlign: 'center', background: 'var(--primary-soft)', border: 'none' }}>
            <div className="nav-avatar" style={{ width: '80px', height: '80px', margin: '0 auto 16px', fontSize: '2rem' }}>
              {user?.fullName?.charAt(0) || profile.name.charAt(0) || "C"}
            </div>
            <h4 style={{ margin: '0 0 4px', fontWeight: '800', fontSize: '1.1rem' }}>{user?.fullName || profile.name}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '700', marginBottom: '20px' }}>{trustLevel} Member</p>
            
            <div style={{ textAlign: 'left', fontSize: '0.85rem', background: 'white', padding: '20px', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ opacity: 0.6, fontSize: '1.1rem' }}>📍</span> 
                <span style={{ color: 'var(--text-muted)' }}>{profile.address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ opacity: 0.6, fontSize: '1.1rem' }}>📞</span> 
                <span style={{ color: 'var(--text-muted)' }}>{profile.phone}</span>
              </div>
            </div>
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
  );
};

export default Dashboard;
