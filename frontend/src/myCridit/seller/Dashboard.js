import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDashboardStats, deleteCredit, updateCredit, fetchSellerPaymentRequests, approvePaymentRequest, rejectPaymentRequest } from './dashboardSlice'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Dashboard = () => {
  const { t } = useTranslation();
  const { stats, recentCredits, recentPayments, pendingCredits, topDebtors, paymentRequests, status, error } = useSelector((state) => state.dashboard);
  const { user: currentSeller } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [editingCredit, setEditingCredit] = useState(null);
  const [editForm, setEditForm] = useState({ product_name: '', total_amount: '' });

  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchSellerPaymentRequests());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm(t('seller.delete_confirm'))) {
      try {
        await dispatch(deleteCredit(id)).unwrap();
        dispatch(fetchDashboardStats()); // Refresh stats after deletion
        alert(t('common.success') || 'Deleted successfully');
      } catch (err) {
        alert(err || t('common.error'));
      }
    }
  };

  const handleApprovePayment = async (id) => {
    if (window.confirm(t('seller.approve_confirm'))) {
      await dispatch(approvePaymentRequest(id)).unwrap();
      dispatch(fetchDashboardStats()); // Refresh stats
      dispatch(fetchSellerPaymentRequests()); // Refresh requests
    }
  };

  const handleRejectPayment = async (id) => {
    if (window.confirm(t('seller.reject_confirm'))) {
      await dispatch(rejectPaymentRequest(id)).unwrap();
      dispatch(fetchSellerPaymentRequests());
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
    try {
      await dispatch(updateCredit({ id: editingCredit.id, data: editForm })).unwrap();
      setEditingCredit(null);
      dispatch(fetchDashboardStats()); // Refresh stats after update
      alert(t('common.success'));
    } catch (err) {
      alert(err || t('common.error'));
    }
  };

  const isLoading = status === 'loading';

  // Calculate recovery rate
  const recoveryRate = stats.total_issued_amount > 0 
    ? Math.round((stats.total_collected_amount / stats.total_issued_amount) * 100) 
    : 0;

  return (
    <div className="seller-dashboard-container">
      <div className="dashboard-header-modern">
        <h1>{t('common.welcome')}, {currentSeller?.name?.split(' ')[0] || t('auth.seller')}</h1>
        <p>{t('seller.recent_activity')}</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="stats-grid-modern">
        <div className="stat-card-modern">
          <div className="stat-header">
            <div className="stat-icon-wrapper primary">👥</div>
            <div className="stat-trend success">{t('common.active')}</div>
          </div>
          <div className="stat-label">{t('seller.total_consumers')}</div>
          <div className="stat-value">{isLoading ? '...' : stats.total_consumers}</div>
        </div>

        <div className="stat-card-modern">
          <div className="stat-header">
            <div className="stat-icon-wrapper warning">💳</div>
            <div className="stat-trend">{t('common.total')}</div>
          </div>
          <div className="stat-label">{t('seller.total_issued')}</div>
          <div className="stat-value">{isLoading ? '...' : stats.total_issued_amount.toLocaleString()} <small>{t('common.dh')}</small></div>
        </div>

        <div className="stat-card-modern">
          <div className="stat-header">
            <div className="stat-icon-wrapper success">📈</div>
            <div className="stat-trend success">+{recoveryRate}%</div>
          </div>
          <div className="stat-label">{t('seller.total_collected')}</div>
          <div className="stat-value">{isLoading ? '...' : stats.total_collected_amount.toLocaleString()} <small>{t('common.dh')}</small></div>
        </div>

        <div className="stat-card-modern">
          <div className="stat-header">
            <div className="stat-icon-wrapper danger">📉</div>
            <div className="stat-trend danger">{t('seller.outstanding')}</div>
          </div>
          <div className="stat-label">{t('seller.total_unpaid')}</div>
          <div className="stat-value">{isLoading ? '...' : stats.total_unpaid_amount.toLocaleString()} <small>{t('common.dh')}</small></div>
        </div>
      </div>

      <div className="dashboard-content-grid">
        <div className="left-column">
          <div className="section-card">
            <div className="section-header-modern">
              <h2>{t('seller.recent_activity')}</h2>
              <Link to="/seller-panel/list-consumers" className="view-all-link">{t('common.view_all')}</Link>
            </div>
            
            <div className="activity-list">
              {recentPayments && recentPayments.length > 0 ? (
                recentPayments.map(payment => (
                  <div key={`pay-${payment.id}`} className="activity-item">
                    <div className="activity-icon" style={{ background: 'var(--success-soft)' }}>💰</div>
                    <div className="activity-details">
                      <h4>{t('seller.payment_received')}</h4>
                      <p>{payment.consumer_name} • {new Date(payment.payment_date).toLocaleDateString()}</p>
                    </div>
                    <div className="activity-amount plus">+{payment.amount.toLocaleString()} {t('common.dh')}</div>
                  </div>
                ))
              ) : null}

              {recentCredits && recentCredits.length > 0 ? (
                recentCredits.map(credit => (
                  <div key={`cred-${credit.id}`} className="activity-item">
                    <div className="activity-icon" style={{ background: 'var(--primary-soft)' }}>💳</div>
                    <div className="activity-details">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'space-between', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                          <h4>{t('seller.new_credit_issued')}</h4>
                          <span className={`badge-modern ${
                            credit.status === 'paid' ? 'success' : 
                            credit.status === 'partial' ? 'primary' : 
                            credit.status === 'pending' ? 'warning' : 
                            credit.status === 'rejected' ? 'danger' : 'warning'
                          }`} style={{ fontSize: '0.6rem', padding: '2px 6px' }}>
                            {t(`common.status.${credit.status}`)}
                          </span>
                        </div>
                        <div className="credit-actions" style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            onClick={() => handleEditClick(credit)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
                            title={t('common.edit')}
                          >
                            ✏️
                          </button>
                          <button 
                            onClick={() => handleDelete(credit.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
                            title={t('common.delete')}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      <p>{credit.consumer_name} • {credit.product_name}</p>
                      <div className="credit-summary-mini" style={{ display: 'flex', gap: '12px', marginTop: '4px', fontSize: '0.75rem' }}>
                        <span style={{ color: 'var(--success)' }}>{t('common.paid')}: {credit.paid_amount?.toLocaleString()} {t('common.dh')}</span>
                        <span style={{ color: credit.remaining_amount > 0 ? 'var(--danger)' : 'var(--success)' }}>{t('seller.remaining')}: {credit.remaining_amount?.toLocaleString()} {t('common.dh')}</span>
                      </div>
                    </div>
                    <div className="activity-amount minus">-{credit.total_amount.toLocaleString()} {t('common.dh')}</div>
                  </div>
                ))
              ) : (
                !isLoading && <p className="empty-state">{t('seller.no_activity')}</p>
              )}
            </div>
          </div>

          {/* Payment Requests Section */}
          <div className="section-card" style={{ marginTop: '32px' }}>
            <div className="section-header-modern">
              <h2>{t('consumer.pending_payment_requests')}</h2>
              <span className="badge-modern warning">{paymentRequests.filter(r => r.status === 'pending').length}</span>
            </div>
            <div className="activity-list">
              {paymentRequests && paymentRequests.filter(r => r.status === 'pending').length > 0 ? (
                paymentRequests.filter(r => r.status === 'pending').map(request => (
                  <div key={`req-${request.id}`} className="activity-item">
                    <div className="activity-icon" style={{ background: 'var(--warning-soft)' }}>⌛</div>
                    <div className="activity-details">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'space-between', width: '100%' }}>
                        <h4>{t('seller.payment_request_from', { name: request.consumer?.name })}</h4>
                        <div className="request-actions" style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            onClick={() => handleApprovePayment(request.id)}
                            style={{ background: 'var(--success)', color: 'white', border: 'none', padding: '4px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '700' }}
                          >
                            {t('seller.approve_payment')}
                          </button>
                          <button 
                            onClick={() => handleRejectPayment(request.id)}
                            style={{ background: 'var(--danger)', color: 'white', border: 'none', padding: '4px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '700' }}
                          >
                            {t('seller.reject_payment')}
                          </button>
                        </div>
                      </div>
                      <p>{request.credit?.product_name} • {parseFloat(request.amount).toLocaleString()} {t('common.dh')}</p>
                      {request.note && <p style={{ fontStyle: 'italic', fontSize: '0.8rem', marginTop: '4px' }}>"{request.note}"</p>}
                    </div>
                  </div>
                ))
              ) : (
                <p className="empty-state">{t('consumer.no_payment_requests')}</p>
              )}
            </div>
          </div>

          {/* Debt Aging Chart Section */}
          <div className="section-card" style={{ marginTop: '32px' }}>
            <div className="section-header-modern">
              <h2>{t('seller.debt_aging')}</h2>
              <span className="badge-modern primary">{t('seller.reports')}</span>
            </div>
            <div className="aging-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginTop: '16px' }}>
              <div className="aging-item" style={{ padding: '16px', borderRadius: '12px', background: 'var(--success-soft)', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: '700', marginBottom: '4px' }}>{t('seller.on_time')}</p>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>{stats.debt_aging?.on_time.toLocaleString()} <small style={{ fontSize: '0.7rem' }}>{t('common.dh')}</small></h3>
              </div>
              <div className="aging-item" style={{ padding: '16px', borderRadius: '12px', background: 'var(--warning-soft)', border: '1px solid rgba(245, 158, 11, 0.1)' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--warning)', fontWeight: '700', marginBottom: '4px' }}>{t('seller.overdue_1_30')}</p>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>{stats.debt_aging?.['1_30_days'].toLocaleString()} <small style={{ fontSize: '0.7rem' }}>{t('common.dh')}</small></h3>
              </div>
              <div className="aging-item" style={{ padding: '16px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                <p style={{ fontSize: '0.75rem', color: '#dc2626', fontWeight: '700', marginBottom: '4px' }}>{t('seller.overdue_31_60')}</p>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>{stats.debt_aging?.['31_60_days'].toLocaleString()} <small style={{ fontSize: '0.7rem' }}>{t('common.dh')}</small></h3>
              </div>
              <div className="aging-item" style={{ padding: '16px', borderRadius: '12px', background: 'var(--danger-soft)', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--danger)', fontWeight: '700', marginBottom: '4px' }}>{t('seller.overdue_60_plus')}</p>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>{stats.debt_aging?.['60_plus_days'].toLocaleString()} <small style={{ fontSize: '0.7rem' }}>{t('common.dh')}</small></h3>
              </div>
            </div>
          </div>
        </div>

        <div className="right-column">
          {/* Top Debtors Section */}
          <div className="section-card" style={{ marginBottom: '32px' }}>
            <div className="section-header-modern">
              <h2>{t('seller.top_debtors')}</h2>
              <Link to="/seller-panel/list-consumers" className="view-all-link">{t('seller.full_list')}</Link>
            </div>
            <div className="debtors-list" style={{ marginTop: '16px' }}>
              {topDebtors && topDebtors.length > 0 ? (
                topDebtors.map(debtor => (
                  <div key={debtor.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border-light)' }}>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '700' }}>{debtor.name}</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>{t('seller.score')}:</span>
                        <span style={{ fontSize: '0.75rem', fontWeight: '800', color: debtor.trust_score > 70 ? 'var(--success)' : 'var(--warning)' }}>{debtor.trust_score}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--danger)' }}>{debtor.total_debt.toLocaleString()} {t('common.dh')}</div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="empty-state">{t('seller.no_activity')}</p>
              )}
            </div>
          </div>

          {pendingCredits && pendingCredits.length > 0 && (
            <div className="section-card" style={{ marginBottom: '32px', border: '1px solid var(--warning)' }}>
              <div className="section-header-modern">
                <h2 style={{ color: 'var(--warning)' }}>{t('seller.pending_confirmations')}</h2>
                <span className="badge-modern warning">{pendingCredits.length}</span>
              </div>
              <div className="activity-list">
                {pendingCredits.map(credit => (
                  <div key={`pending-${credit.id}`} className="activity-item">
                    <div className="activity-icon" style={{ background: 'var(--warning-soft)' }}>⏳</div>
                    <div className="activity-details">
                      <h4>{credit.product_name}</h4>
                      <p>{credit.consumer?.name} • {t('seller.awaiting_response')}</p>
                    </div>
                    <div className="activity-amount" style={{ color: 'var(--text-light)' }}>{credit.total_amount.toLocaleString()} {t('common.dh')}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="section-card">
            <div className="section-header-modern">
              <h2>{t('seller.quick_actions')}</h2>
            </div>
            <div className="quick-actions-grid">
              <Link to="/seller-panel/customers" className="action-btn">
                <span>👤</span>
                {t('seller.add_consumer')}
              </Link>
              <Link to="/seller-panel/customers" className="action-btn">
                <span>💳</span>
                {t('seller.create_credit')}
              </Link>
              <Link to="/seller-panel/dashboard" className="action-btn">
                <span>📊</span>
                {t('seller.reports')}
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
        <div className="modal-overlay-modern">
          <div className="modal-content-modern">
            <h3>{t('common.edit')} {t('my_credits')}</h3>
            <form onSubmit={handleUpdate}>
              <div className="form-group-modern">
                <label>{t('common.product')}</label>
                <input 
                  type="text" 
                  value={editForm.product_name}
                  onChange={(e) => setEditForm({...editForm, product_name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group-modern">
                <label>{t('common.amount')} ({t('common.dh')})</label>
                <input 
                  type="number" 
                  value={editForm.total_amount}
                  onChange={(e) => setEditForm({...editForm, total_amount: e.target.value})}
                  required
                  min="0.01"
                  step="0.01"
                />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                <button type="submit" className="btn-modern primary" style={{ flex: 1 }}>
                  {t('common.save')}
                </button>
                <button type="button" className="btn-modern" style={{ background: '#F1F5F9' }} onClick={() => setEditingCredit(null)}>
                  {t('common.cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
