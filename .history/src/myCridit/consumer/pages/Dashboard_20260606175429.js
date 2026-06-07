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
    <div className="dashboard-page-fintech">
      {/* 1. Welcome & Summary Section */}
      <header className="dashboard-header">
        <div className="welcome-text">
          <h1>{t('common.welcome')}, {user?.name?.split(' ')[0]} 👋</h1>
          <div className="motivational-box">
            <span className="alert-icon">🎉</span>
            <p style={{ margin: 0 }}>
              <strong>{t('consumer.great_progress')}, {user?.name?.split(' ')[0]}!</strong> {t('consumer.paid_off_text', { percent: stats.debt_progress_percentage })}
            </p>
          </div>
        </div>
        <div className="header-actions">
          <div className="navbar-search">
            <input type="text" placeholder={t('common.search')} />
            <span className="search-icon">🔍</span>
          </div>
        </div>
      </header>

      {/* 2. Main Balance Card */}
      <section className="global-summary-banner">
        <div className="summary-main">
          <p>{t('consumer.remaining_balance')}</p>
          <h1>{stats.total_remaining_debt.toLocaleString()} {t('common.dh')}</h1>
          <div className="summary-meta">
            <span>📊 {t('consumer.total_paid')}: {stats.total_paid_amount.toLocaleString()} {t('common.dh')}</span>
            <span>📅 {t('consumer.next_due')}: {stats.next_due_date || t('consumer.none')}</span>
          </div>
        </div>
        <div className="summary-trust">
          <div className="health-card" style={{ background: 'transparent', padding: 0, boxShadow: 'none', border: 'none' }}>
            <div className="health-header" style={{ color: 'white' }}>
              <span>{t('consumer.financial_health')}</span>
              <span className="health-icon">📊</span>
            </div>
            <div className="health-body">
              <div className="health-status" style={{ color: 'white', opacity: 0.9 }}>{t('consumer.analyzing')}</div>
              <div className="health-progress" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <div className="progress-bar" style={{ width: '65%', background: 'var(--success)' }}></div>
              </div>
              <p style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>{t('consumer.analyzing_patterns')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stats Quick Grid */}
      <div className="stats-grid">
        <div className="stat-card-premium">
          <div className="stat-icon" style={{ fontSize: '1.5rem', marginBottom: '12px' }}>🛡️</div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{t('consumer.trust_score')}</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>{stats.trust_score}%</h3>
          <span className="stat-trend success" style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: '600' }}>↑ {t('common.stable')}</span>
        </div>
        <div className="stat-card-premium">
          <div className="stat-icon" style={{ fontSize: '1.5rem', marginBottom: '12px' }}>💰</div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{t('consumer.total_paid')}</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>{stats.total_paid_amount.toLocaleString()} {t('common.dh')}</h3>
          <span className="stat-trend success" style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: '600' }}>↑ {t('common.on_track')}</span>
        </div>
        <div className="stat-card-premium">
          <div className="stat-icon" style={{ fontSize: '1.5rem', marginBottom: '12px' }}>🛒</div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{t('consumer.recent_credits')}</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>{recentCredits.length}</h3>
          <span className="stat-trend warning" style={{ fontSize: '0.75rem', color: 'var(--warning)', fontWeight: '600' }}>↓ {t('common.needs_attention')}</span>
        </div>
      </div>

      <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        <div className="left-column">
          {/* 4. Recent Credits Table */}
          <section className="fintech-card">
            <div className="section-header">
              <h2>{t('consumer.recent_credits')}</h2>
              <button className="view-details-btn">{t('common.view_all')}</button>
            </div>
            <div className="credits-table-wrapper" style={{ overflowX: 'auto' }}>
              <table className="credits-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('common.product')}</th>
                    <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('common.status')}</th>
                    <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('common.amount')}</th>
                    <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('common.date')}</th>
                    <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('common.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCredits.length > 0 ? (
                    recentCredits.map((credit) => (
                      <tr key={credit.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '16px 0' }}>
                          <div className="product-info" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div className="product-icon" style={{ width: '32px', height: '32px', background: 'var(--bg-main)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📦</div>
                            <div>
                              <p className="product-name" style={{ margin: 0, fontWeight: '700', fontSize: '0.9rem' }}>{credit.product_name}</p>
                              <p className="seller-name" style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{credit.seller_name}</p>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '16px 0' }}>
                          <span className={`status-${credit.status}`}>
                            {credit.status.toUpperCase()}
                          </span>
                        </td>
                        <td style={{ padding: '16px 0' }}>
                          <p className="amount-main" style={{ margin: 0, fontWeight: '700', fontSize: '0.9rem' }}>{credit.total_amount.toLocaleString()} {t('common.dh')}</p>
                          <p className="amount-sub" style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{credit.remaining_amount.toLocaleString()} {t('common.dh')} left</p>
                        </td>
                        <td style={{ padding: '16px 0', fontSize: '0.85rem' }}>{credit.due_date || 'N/A'}</td>
                        <td style={{ padding: '16px 0' }}>
                          <button className="view-details-btn">{t('common.view')}</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="empty-state" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>{t('consumer.no_credits')}</td>
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
                  <p style={{ margin: 0, color: 'var(--primary)', fontWeight: '600' }}>
                    {typeof tip === 'string' ? tip : t(`consumer.${tip.key}`, tip.params)}
                  </p>
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
