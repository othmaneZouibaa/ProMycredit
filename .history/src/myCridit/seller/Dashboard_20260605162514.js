import React, { useEffect } from 'react'
import './Dashboard.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDashboardStats } from './dashboardSlice'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const { stats, recentCredits, recentPayments, pendingCredits, status, error } = useSelector((state) => state.dashboard);
  const { user: currentSeller } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const isLoading = status === 'loading';

  // Calculate recovery rate
  const recoveryRate = stats.total_issued_amount > 0 
    ? Math.round((stats.total_collected_amount / stats.total_issued_amount) * 100) 
    : 0;

  return (
    <div className="seller-dashboard-container">
      <div className="dashboard-header-modern">
        <h1>Welcome back, {currentSeller?.name?.split(' ')[0] || 'Seller'}</h1>
        <p>Here's what's happening with your credits today.</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="stats-grid-modern">
        <div className="stat-card-modern">
          <div className="stat-header">
            <div className="stat-icon-wrapper primary">👥</div>
            <div className="stat-trend success">Active</div>
          </div>
          <div className="stat-label">Total Consumers</div>
          <div className="stat-value">{isLoading ? '...' : stats.total_consumers}</div>
        </div>

        <div className="stat-card-modern">
          <div className="stat-header">
            <div className="stat-icon-wrapper warning">💳</div>
            <div className="stat-trend">Total</div>
          </div>
          <div className="stat-label">Total Credits Issued</div>
          <div className="stat-value">{isLoading ? '...' : stats.total_issued_amount.toLocaleString()} <small>DH</small></div>
        </div>

        <div className="stat-card-modern">
          <div className="stat-header">
            <div className="stat-icon-wrapper success">📈</div>
            <div className="stat-trend success">+{recoveryRate}%</div>
          </div>
          <div className="stat-label">Total Collected</div>
          <div className="stat-value">{isLoading ? '...' : stats.total_collected_amount.toLocaleString()} <small>DH</small></div>
        </div>

        <div className="stat-card-modern">
          <div className="stat-header">
            <div className="stat-icon-wrapper danger">📉</div>
            <div className="stat-trend danger">Outstanding</div>
          </div>
          <div className="stat-label">Total Unpaid</div>
          <div className="stat-value">{isLoading ? '...' : stats.total_unpaid_amount.toLocaleString()} <small>DH</small></div>
        </div>
      </div>

      <div className="dashboard-content-grid">
        <div className="left-column">
          <div className="section-card">
            <div className="section-header-modern">
              <h2>Recent Activity</h2>
              <Link to="/seller-panel/list-consumers" className="view-all-link">View All</Link>
            </div>
            
            <div className="activity-list">
              {recentPayments && recentPayments.length > 0 ? (
                recentPayments.map(payment => (
                  <div key={`pay-${payment.id}`} className="activity-item">
                    <div className="activity-icon" style={{ background: 'var(--success-soft)' }}>💰</div>
                    <div className="activity-details">
                      <h4>Payment Received</h4>
                      <p>{payment.consumer_name} • {new Date(payment.payment_date).toLocaleDateString()}</p>
                    </div>
                    <div className="activity-amount plus">+{payment.amount.toLocaleString()} DH</div>
                  </div>
                ))
              ) : null}

              {recentCredits && recentCredits.length > 0 ? (
                recentCredits.map(credit => (
                  <div key={`cred-${credit.id}`} className="activity-item">
                    <div className="activity-icon" style={{ background: 'var(--primary-soft)' }}>💳</div>
                    <div className="activity-details">
                      <h4>New Credit Issued</h4>
                      <p>{credit.consumer_name} • {credit.product_name}</p>
                    </div>
                    <div className="activity-amount minus">-{credit.total_amount.toLocaleString()} DH</div>
                  </div>
                ))
              ) : (
                !isLoading && <p className="empty-state">No recent activity found.</p>
              )}
            </div>
          </div>
        </div>

        <div className="right-column">
          <div className="section-card">
            <div className="section-header-modern">
              <h2>Quick Actions</h2>
            </div>
            <div className="quick-actions-grid">
              <Link to="/seller-panel/customers" className="action-btn">
                <span>👤</span>
                Add Consumer
              </Link>
              <Link to="/seller-panel/customers" className="action-btn">
                <span>💳</span>
                Create Credit
              </Link>
              <Link to="/seller-panel/list-consumers" className="action-btn">
                <span>💰</span>
                Register Payment
              </Link>
              <Link to="/seller-panel/dashboard" className="action-btn">
                <span>📊</span>
                Reports
              </Link>
            </div>
          </div>

          <div className="section-card" style={{ marginTop: '32px', background: 'var(--primary)', color: 'white' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '12px' }}>Recovery Goal</h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '20px' }}>You've recovered {recoveryRate}% of your total issued credits this month.</p>
            <div className="progress-bar-bg" style={{ height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', overflow: 'hidden' }}>
              <div className="progress-bar-fill" style={{ width: `${recoveryRate}%`, height: '100%', background: 'white' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
