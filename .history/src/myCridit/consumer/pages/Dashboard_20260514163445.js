import React from 'react';
import { consumerData } from '../data';
import { useSelector } from 'react-redux';
import DebtProgressBar from '../components/DebtProgressBar';
import SmartAlert from '../components/SmartAlert';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { credits, notifications, activityFeed, profile } = consumerData;
  
  const totalRemaining = credits.reduce((acc, curr) => acc + curr.remainingAmount, 0);
  const totalPaid = credits.reduce((acc, curr) => acc + curr.paidAmount, 0);
  const totalDebt = totalRemaining + totalPaid;

  return (
    <div className="dashboard-page-fintech">
      {/* 1. Global Debt Summary - Clarity First */}
      <section className="global-debt-summary">
        <div className="summary-content">
          <h3>Total Remaining Balance</h3>
          <div className="summary-amount">{totalRemaining.toLocaleString()} DH</div>
          <p style={{ marginTop: '10px', opacity: 0.8 }}>
            Total credit limit utilized: {totalDebt.toLocaleString()} DH
          </p>
        </div>
        <div className="summary-trust">
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>Trust Score</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{profile.trustScore}</div>
        </div>
      </section>

      <div className="content-grid">
        <div className="left-column">
          {/* 2. Active Credits with Visual Progress */}
          <section className="dashboard-section">
            <div className="section-header">
              <h2>My Active Credits</h2>
              <button className="btn-primary-outline" style={{ fontSize: '0.75rem' }}>View History</button>
            </div>
            {credits.filter(c => c.status !== 'paid').map(credit => (
              <div key={credit.id} style={{ marginBottom: '20px', padding: '15px', background: '#f8fafc', borderRadius: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <strong>{credit.product}</strong>
                  <span className="seller-badge">{credit.sellerName}</span>
                </div>
                <DebtProgressBar paid={credit.paidAmount} total={credit.totalAmount} />
              </div>
            ))}
          </section>

          {/* 3. Recent Activity Timeline - Audit Trail */}
          <section className="dashboard-section">
            <div className="section-header">
              <h2>Recent Activity</h2>
            </div>
            <div className="activity-timeline">
              {activityFeed.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-date">{activity.date}</div>
                  <div className="activity-details">
                    <h4>{activity.action}</h4>
                    <p>{activity.amount.toLocaleString()} DH toward {activity.target}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="right-column">
          {/* 4. Smart Alerts / Notifications */}
          <section className="dashboard-section">
            <div className="section-header">
              <h2>Smart Alerts</h2>
              {notifications.some(n => !n.isRead) && <span className="badge-new">New</span>}
            </div>
            <div className="alerts-container">
              {notifications.map(notif => (
                <SmartAlert key={notif.id} notification={notif} />
              ))}
            </div>
          </section>

          {/* 5. Quick Profile Context */}
          <section className="dashboard-section profile-card-mini" style={{ textAlign: 'center' }}>
            <div className="profile-avatar-large" style={{ margin: '0 auto 15px', width: '60px', height: '60px', fontSize: '1.5rem' }}>
              {profile.avatar}
            </div>
            <h4>{user?.fullName || profile.name}</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>{profile.cin}</p>
            <hr style={{ margin: '15px 0', opacity: 0.1 }} />
            <div style={{ fontSize: '0.85rem', color: '#1e293b' }}>
              <p>📍 {profile.address}</p>
              <p>📞 {profile.phone}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
