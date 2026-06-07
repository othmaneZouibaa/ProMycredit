import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConsumerStats } from '../consumerSlice';
import TrustScore from '../components/TrustScore';
import '../ConsumerDashboard.css';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();
  const { stats, recentCredits, status } = useSelector((state) => state.consumer);
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
          <p>{t('consumer.debt_free_desc')}</p>
          <div className="debt-free-actions">
            <button className="btn-primary">{t('common.view_all')}</button>
            <button className="btn-outline">{t('common.payments_history')}</button>
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
          <div className="stat-icon" style={{ fontSize: '1.5rem', marginBottom: '12px' }}>📈</div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{t('consumer.repayment_rate')}</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>{stats.debt_progress_percentage}%</h3>
          <span className="stat-trend success" style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: '600' }}>↑ {t('common.improving')}</span>
        </div>
      </div>

      <div className="dashboard-main-content">
        <div className="content-left">
          <div className="section-card-fintech">
            <div className="section-header">
              <h3>{t('consumer.recent_credits')}</h3>
              <button className="text-button">{t('common.view_all')}</button>
            </div>
            <div className="recent-activity-list">
              {recentCredits.length > 0 ? (
                recentCredits.map(credit => (
                  <div key={credit.id} className="activity-item-fintech">
                    <div className="activity-icon-box">💳</div>
                    <div className="activity-details">
                      <h4>{credit.product_name}</h4>
                      <p>{credit.seller?.name || t('auth.seller')}</p>
                    </div>
                    <div className="activity-amount">
                      <div className="amount-value">-{credit.remaining_amount} {t('common.dh')}</div>
                      <div className={`status-pill ${credit.status}`}>{t(`common.status.${credit.status}`)}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state-mini">{t('consumer.no_credits')}</div>
              )}
            </div>
          </div>
        </div>

        <div className="content-right">
          <div className="section-card-fintech">
            <div className="section-header">
              <h3>{t('consumer.trust_analysis')}</h3>
            </div>
            <TrustScore score={stats.trust_score} />
            <div className="trust-tips">
              <div className="tip-item">
                <span className="tip-bullet">✓</span>
                <p>{t('consumer.tip_on_time')}</p>
              </div>
              <div className="tip-item">
                <span className="tip-bullet">✓</span>
                <p>{t('consumer.tip_communication')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
