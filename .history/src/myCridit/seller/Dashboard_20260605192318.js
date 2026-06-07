import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDashboardStats, deleteCredit, updateCredit } from './dashboardSlice'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Dashboard = () => {
  const { t } = useTranslation();
  const { stats, recentCredits, recentPayments, pendingCredits, topDebtors, status, error } = useSelector((state) => state.dashboard);
  const { user: currentSeller } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [editingCredit, setEditingCredit] = useState(null);
  const [editForm, setEditForm] = useState({ product_name: '', total_amount: '' });
  const [selectedCredit, setSelectedCredit] = useState(null);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this credit? This action cannot be undone.')) {
      await dispatch(deleteCredit(id));
      dispatch(fetchDashboardStats()); // Refresh stats after deletion
    }
  };

  const handleEditClick = (credit) => {
    setEditingCredit(credit);
    setEditForm({
      product_name: credit.product_name,
      total_amount: credit.total_amount
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await dispatch(updateCredit({ id: editingCredit.id, data: editForm }));
    setEditingCredit(null);
    dispatch(fetchDashboardStats()); // Refresh stats after update
  };

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
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'space-between', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => setSelectedCredit(credit)}>
                          <h4>New Credit Issued</h4>
                          <span className={`badge-modern ${
                            credit.status === 'pending' ? 'warning' : 
                            credit.status === 'accepted' ? 'success' : 
                            credit.status === 'rejected' ? 'danger' : 'primary'
                          }`} style={{ fontSize: '0.6rem', padding: '2px 6px' }}>
                            {credit.status}
                          </span>
                        </div>
                        <div className="credit-actions" style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            onClick={() => handleEditClick(credit)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button 
                            onClick={() => handleDelete(credit.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
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

          {/* Debt Aging Chart Section */}
          <div className="section-card" style={{ marginTop: '32px' }}>
            <div className="section-header-modern">
              <h2>Debt Aging Analysis</h2>
              <span className="badge-modern primary">Overview</span>
            </div>
            <div className="aging-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginTop: '16px' }}>
              <div className="aging-item" style={{ padding: '16px', borderRadius: '12px', background: 'var(--success-soft)', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: '700', marginBottom: '4px' }}>ON TIME</p>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>{stats.debt_aging?.on_time.toLocaleString()} <small style={{ fontSize: '0.7rem' }}>DH</small></h3>
              </div>
              <div className="aging-item" style={{ padding: '16px', borderRadius: '12px', background: 'var(--warning-soft)', border: '1px solid rgba(245, 158, 11, 0.1)' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--warning)', fontWeight: '700', marginBottom: '4px' }}>1-30 DAYS</p>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>{stats.debt_aging?.['1_30_days'].toLocaleString()} <small style={{ fontSize: '0.7rem' }}>DH</small></h3>
              </div>
              <div className="aging-item" style={{ padding: '16px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                <p style={{ fontSize: '0.75rem', color: '#dc2626', fontWeight: '700', marginBottom: '4px' }}>31-60 DAYS</p>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>{stats.debt_aging?.['31_60_days'].toLocaleString()} <small style={{ fontSize: '0.7rem' }}>DH</small></h3>
              </div>
              <div className="aging-item" style={{ padding: '16px', borderRadius: '12px', background: 'var(--danger-soft)', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--danger)', fontWeight: '700', marginBottom: '4px' }}>60+ DAYS</p>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>{stats.debt_aging?.['60_plus_days'].toLocaleString()} <small style={{ fontSize: '0.7rem' }}>DH</small></h3>
              </div>
            </div>
          </div>
        </div>

        <div className="right-column">
          {/* Top Debtors Section */}
          <div className="section-card" style={{ marginBottom: '32px' }}>
            <div className="section-header-modern">
              <h2>Top Debtors</h2>
              <Link to="/seller-panel/list-consumers" className="view-all-link">Full List</Link>
            </div>
            <div className="debtors-list" style={{ marginTop: '16px' }}>
              {topDebtors && topDebtors.length > 0 ? (
                topDebtors.map(debtor => (
                  <div key={debtor.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border-light)' }}>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '700' }}>{debtor.name}</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>Score:</span>
                        <span style={{ fontSize: '0.75rem', fontWeight: '800', color: debtor.trust_score > 70 ? 'var(--success)' : 'var(--warning)' }}>{debtor.trust_score}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--danger)' }}>{debtor.total_debt.toLocaleString()} DH</div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="empty-state">No major debts recorded.</p>
              )}
            </div>
          </div>

          {pendingCredits && pendingCredits.length > 0 && (
            <div className="section-card" style={{ marginBottom: '32px', border: '1px solid var(--warning)' }}>
              <div className="section-header-modern">
                <h2 style={{ color: 'var(--warning)' }}>Pending Confirmations</h2>
                <span className="badge-modern warning">{pendingCredits.length}</span>
              </div>
              <div className="activity-list">
                {pendingCredits.map(credit => (
                  <div key={`pending-${credit.id}`} className="activity-item">
                    <div className="activity-icon" style={{ background: 'var(--warning-soft)' }}>⏳</div>
                    <div className="activity-details">
                      <h4>{credit.product_name}</h4>
                      <p>{credit.consumer?.name} • Awaiting response</p>
                    </div>
                    <div className="activity-amount" style={{ color: 'var(--text-light)' }}>{credit.total_amount.toLocaleString()} DH</div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
      {/* Edit Credit Modal */}
      {editingCredit && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
          <div className="modal-content" style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '100%', maxWidth: '400px' }}>
            <h2 style={{ marginBottom: '24px' }}>Edit Credit</h2>
            <form onSubmit={handleUpdate}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Product Name</label>
                <input 
                  type="text" 
                  value={editForm.product_name}
                  onChange={(e) => setEditForm({...editForm, product_name: e.target.value})}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Total Amount (DH)</label>
                <input 
                  type="number" 
                  value={editForm.total_amount}
                  onChange={(e) => setEditForm({...editForm, total_amount: e.target.value})}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}
                  required
                />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" style={{ flex: 1, padding: '12px', borderRadius: '8px', background: 'var(--primary)', color: 'white', border: 'none', fontWeight: '700', cursor: 'pointer' }}>Save Changes</button>
                <button type="button" onClick={() => setEditingCredit(null)} style={{ flex: 1, padding: '12px', borderRadius: '8px', background: 'var(--bg-main)', border: '1px solid var(--border)', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
