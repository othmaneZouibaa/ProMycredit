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
        <span>🎉</span>
        <span>Great progress, {user?.fullName?.split(' ')[0] || profile.name.split(' ')[0]}! You've paid off {Math.round((totalPaid/totalDebt)*100)}% of your total credits.</span>
      </div>

      {/* 1. Global Debt Summary Banner */}
      <section className="global-summary-banner">
        <div className="summary-main">
          <p>Total Remaining Balance</p>
          <h1>{totalRemaining.toLocaleString()} DH</h1>
          <div style={{ fontSize: '0.9rem', opacity: 0.8, display: 'flex', gap: '24px', marginTop: '12px' }}>
            <span>Total Debt: {totalDebt.toLocaleString()} DH</span>
            <span>Next Due: {profile.nextPaymentDate}</span>
          </div>
        </div>
        <div className="summary-trust" style={{ background: 'rgba(255,255,255,0.1)', padding: '24px', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
          <FinancialHealth health={profile.financialHealth} />
        </div>
      </section>

      {/* 2. Key Statistics Grid */}
      <section className="stats-grid">
        <StatCard label="Monthly Limit" value={`${profile.monthlyBudgetLimit.toLocaleString()} DH`} />
        <StatCard label="Paid This Month" value={`${monthlySummary.totalPaidThisMonth.toLocaleString()} DH`} variant="success" />
        <StatCard label="Active Items" value={`${activeCredits.length} Credits`} variant="warning" />
      </section>

      <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        <div className="left-column">
          
          {/* 3. Active Progress Section */}
          <section className="fintech-card">
            <div className="section-header">
              <h2>Active Credits</h2>
              <button className="view-details-btn">View all history</button>
            </div>
            {activeCredits.length > 0 ? (
              activeCredits.map(credit => (
                <div key={credit.id} className="credit-item-card">
                  <div className="credit-meta">
                    <div>
                      <h4 style={{ fontWeight: '700' }}>{credit.product}</h4>
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>Last payment: {credit.lastPaymentDate}</span>
                    <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Next: June 05</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📂</div>
                <p>No active credits to track.</p>
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
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                      {activity.icon}
                    </div>
                    <div className="trans-info">
                      <h4 style={{ fontWeight: '600' }}>{activity.action}</h4>
                      <p>{activity.target} • {activity.date}</p>
                    </div>
                  </div>
                  <div className={`trans-amount ${activity.amount > 0 ? 'success' : ''}`} style={{ fontWeight: '700' }}>
                    {activity.amount > 0 ? `+${activity.amount.toLocaleString()} DH` : 'Completed'}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="right-column">
          {/* 5. Trust Score Widget */}
          <section className="fintech-card" style={{ padding: '32px' }}>
            <TrustScore score={profile.trustScore} />
          </section>

          {/* 6. Smart Alerts Section */}
          <section className="fintech-card">
            <div className="section-header">
              <h2>Smart Alerts</h2>
              {notifications.some(n => !n.isRead) && <span className="badge-new">2 New</span>}
            </div>
            <div className="alerts-container">
              {notifications.map(notif => (
                <SmartAlert key={notif.id} notification={notif} />
              ))}
            </div>
            <button className="btn-primary-outline" style={{ width: '100%', marginTop: '16px', fontSize: '0.8rem' }}>Mark all as read</button>
          </section>

          {/* 7. Quick Profile Context */}
          <section className="fintech-card" style={{ textAlign: 'center', background: 'var(--primary-soft)', border: 'none' }}>
            <div className="profile-avatar-large" style={{ width: '72px', height: '72px', margin: '0 auto 16px', fontSize: '1.8rem', background: 'var(--primary)', color: 'white' }}>
              {profile.avatar}
            </div>
            <h4 style={{ margin: '0 0 4px', fontWeight: '800' }}>{user?.fullName || profile.name}</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '600', marginBottom: '16px' }}>Gold Member</p>
            <div style={{ textAlign: 'left', fontSize: '0.85rem', background: 'white', padding: '16px', borderRadius: '12px' }}>
              <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ opacity: 0.6 }}>📍</span> {profile.address}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ opacity: 0.6 }}>📞</span> {profile.phone}
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
