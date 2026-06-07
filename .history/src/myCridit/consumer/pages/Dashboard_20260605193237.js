import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConsumerStats } from '../consumerSlice';
import TrustScore from '../components/TrustScore';
import '../ConsumerDashboard.css';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();
  const { stats, recentCredits, status, error } = useSelector((state) => state.consumer);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchConsumerStats());
  }, [dispatch]);

  const isLoading = status === 'loading';

  const isDebtFree = !isLoading && stats.total_remaining_debt === 0 && (stats.pending_credits_count || 0) === 0 && recentCredits.length > 0;

  if (isDebtFree) {
    return (
      <div className="debt-free-container">
        <div className="debt-free-card">
          <div className="celebration-icon">🎉</div>
          <h1>{t('consumer.debt_free')}</h1>
          <p>Congratulations! All your credits have been fully paid. Enjoy your financial freedom and keep managing your budget wisely.</p>
          <div className="debt-free-actions">
            <button className="btn-primary">EXPLORE NEW PRODUCTS</button>
            <button className="btn-outline">VIEW HISTORY</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* 1. Welcome & Summary Section */}
      <header className="dashboard-header">
        <div className="welcome-text">
          <h1>{t('common.welcome')}, {user?.fullName?.split(' ')[0]} 👋</h1>
          <div className="smart-alert success">
            <span className="alert-icon">🎉</span>
            <p><strong>{t('consumer.great_progress')}, {user?.fullName?.split(' ')[0]}!</strong> {t('consumer.paid_off_text', { percent: stats.debt_progress_percentage })}</p>
          </div>
        </div>
        <div className="header-actions">
          <div className="search-bar">
            <input type="text" placeholder={t('common.search')} />
            <span className="search-icon">🔍</span>
          </div>
        </div>
      </header>

      <div className="dashboard-grid">
        <div className="main-column">
          {/* 2. Main Balance Card */}
          <section className="balance-card">
            <div className="balance-content">
              <div className="balance-main">
                <p className="balance-label">{t('consumer.remaining_balance')}</p>
                <h2 className="balance-amount">{stats.total_remaining_debt.toLocaleString()} {t('common.dh')}</h2>
                <div className="balance-meta">
                  <span>📊 {t('consumer.total_paid')}: {stats.total_paid_amount.toLocaleString()} {t('common.dh')}</span>
                  <span>📅 {t('consumer.next_due')}: {stats.next_due_date || t('consumer.none')}</span>
                </div>
              </div>
              <div className="balance-visual">
                <div className="health-card">
                  <div className="health-header">
                    <span>{t('consumer.financial_health')}</span>
                    <span className="health-icon">📊</span>
                  </div>
                  <div className="health-body">
                    <div className="health-status">{t('consumer.analyzing')}</div>
                    <div className="health-progress">
                      <div className="progress-bar" style={{ width: '65%' }}></div>
                    </div>
                    <p>{t('consumer.analyzing_patterns')}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Stats Quick Grid */}
          <div className="stats-quick-grid">
            <div className="quick-stat-card">
              <div className="stat-icon">🛡️</div>
              <div className="stat-info">
                <p>{t('consumer.trust_score')}</p>
                <h3>{stats.trust_score}%</h3>
                <span className="stat-trend success">↑ {t('common.stable')}</span>
              </div>
            </div>
            <div className="quick-stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-info">
                <p>{t('consumer.total_paid')}</p>
                <h3>{stats.total_paid_amount.toLocaleString()} {t('common.dh')}</h3>
                <span className="stat-trend success">↑ {t('common.on_track')}</span>
              </div>
            </div>
            <div className="quick-stat-card">
              <div className="stat-icon">🛒</div>
              <div className="stat-info">
                <p>{t('consumer.recent_credits')}</p>
                <h3>{recentCredits.length}</h3>
                <span className="stat-trend warning">↓ {t('common.needs_attention')}</span>
              </div>
            </div>
          </div>

          {/* 4. Recent Credits Table */}
          <section className="fintech-card">
            <div className="section-header">
              <h2>{t('consumer.recent_credits')}</h2>
              <button className="view-all-btn">{t('common.view_all')}</button>
            </div>
            <div className="credits-table-wrapper">
              <table className="credits-table">
                <thead>
                  <tr>
                    <th>{t('common.product')}</th>
                    <th>{t('common.status')}</th>
                    <th>{t('common.amount')}</th>
                    <th>{t('common.date')}</th>
                    <th>{t('common.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCredits.length > 0 ? (
                    recentCredits.map((credit) => (
                      <tr key={credit.id}>
                        <td>
                          <div className="product-info">
                            <div className="product-icon">📦</div>
                            <div>
                              <p className="product-name">{credit.product_name}</p>
                              <p className="seller-name">{credit.seller_name}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`status-badge status-${credit.status}`}>
                            {credit.status.toUpperCase()}
                          </span>
                        </td>
                        <td>
                          <p className="amount-main">{credit.total_amount.toLocaleString()} {t('common.dh')}</p>
                          <p className="amount-sub">{credit.remaining_amount.toLocaleString()} {t('common.dh')} left</p>
                        </td>
                        <td>{credit.due_date || 'N/A'}</td>
                        <td>
                          <button className="view-details-btn">{t('common.view')}</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="empty-state">{t('consumer.no_credits')}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="right-column">
          {/* Trust Score Analysis Section */}
          <section className="fintech-card" style={{ marginBottom: '24px' }}>
            <div className="section-header">
              <h2>{t('consumer.trust_analysis')}</h2>
              <span className={`status-${stats.trust_analysis?.status.toLowerCase()}`}>{t(`consumer.${stats.trust_analysis?.status.toLowerCase().replace(' ', '_')}`)}</span>
            </div>
            <div className="tips-list" style={{ marginTop: '16px' }}>
              {stats.trust_analysis?.tips.map((tip, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  gap: '12px', 
                  marginBottom: '12px', 
                  padding: '12px', 
                  background: 'var(--primary-soft)', 
                  borderRadius: '12px',
                  fontSize: '0.85rem'
                }}>
                  <span>💡</span>
                  <p style={{ margin: 0, color: 'var(--primary)', fontWeight: '600' }}>{tip}</p>
                </div>
              ))}
            </div>
            <div className="factors-grid" style={{ marginTop: '20px' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-light)', marginBottom: '12px' }}>{t('consumer.key_factors')}</p>
              {stats.trust_analysis?.factors.map((factor, index) => (
                <div key={index} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                    <span>{factor.label}</span>
                    <span style={{ fontWeight: '700' }}>{factor.value}%</span>
                  </div>
                  <div style={{ height: '4px', background: 'var(--border-light)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${factor.value}%`, 
                      height: '100%', 
                      background: factor.impact === 'high' ? 'var(--success)' : 'var(--primary)' 
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Trust Score Visualization */}
          <TrustScore score={stats.trust_score} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
