import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConsumerStats, fetchConsumerCredits, fetchConsumerPayments } from '../consumerSlice';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t, i18n } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  const { stats, credits, payments, status } = useSelector((state) => state.consumer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchConsumerStats());
    dispatch(fetchConsumerCredits());
    dispatch(fetchConsumerPayments());
  }, [dispatch]);

  const isLoading = status === 'loading';
  
  const profile = {
    name: user?.name || 'User',
    email: user?.email || 'N/A',
    cin: user?.cin || 'N/A',
    phone: user?.phone || 'N/A',
    address: user?.address || 'N/A',
    avatar: (user?.name || 'U').charAt(0),
    memberSince: user?.created_at ? new Date(user.created_at).toLocaleDateString(i18n.language === 'ar' ? 'ar-MA' : 'fr-FR', { month: 'long', year: 'numeric' }) : 'N/A',
    trustScore: stats.trust_score || 0
  };

  const getTrustLevel = (score) => {
    if (score >= 90) return 'Gold';
    if (score >= 70) return 'Silver';
    return 'Bronze';
  };

  const trustLevel = getTrustLevel(profile.trustScore);

  return (
    <div className="profile-page-fintech">
      <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        <div className="left-column">
          <div className="fintech-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid var(--border-light)' }}>
              <div className="nav-avatar" style={{ width: '100px', height: '100px', fontSize: '2.5rem' }}>
                {profile.avatar}
              </div>
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-main)', margin: '0 0 4px', letterSpacing: '-1px' }}>{profile.name}</h2>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span className={`trust-badge-mini trust-${trustLevel.toLowerCase()}`} style={{ fontSize: '0.8rem', padding: '4px 12px' }}>
                    {t(`common.trust_levels.${trustLevel.toLowerCase()}`)} {t('consumer.member')}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{t('consumer.since')} {profile.memberSince}</span>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '8px' }}>{t('auth.fullname_label')}</label>
                <div style={{ padding: '12px 16px', background: 'var(--bg-main)', borderRadius: '10px', fontSize: '1rem', fontWeight: '600' }}>{profile.name}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '8px' }}>{t('auth.email_label')}</label>
                <div style={{ padding: '12px 16px', background: 'var(--bg-main)', borderRadius: '10px', fontSize: '1rem', fontWeight: '600' }}>{profile.email}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '8px' }}>{t('auth.phone_label')}</label>
                <div style={{ padding: '12px 16px', background: 'var(--bg-main)', borderRadius: '10px', fontSize: '1rem', fontWeight: '600' }}>{profile.phone}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '8px' }}>{t('auth.cin_label')}</label>
                <div style={{ padding: '12px 16px', background: 'var(--bg-main)', borderRadius: '10px', fontSize: '1rem', fontWeight: '600' }}>{profile.cin}</div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '8px' }}>{t('auth.address_label')}</label>
                <div style={{ padding: '12px 16px', background: 'var(--bg-main)', borderRadius: '10px', fontSize: '1rem', fontWeight: '600' }}>{profile.address}</div>
              </div>
            </div>
            
            <button className="view-details-btn" style={{ marginTop: '40px', padding: '12px 24px' }}>{t('consumer.edit_profile')}</button>
          </div>
        </div>
        
        <div className="right-column" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div className="fintech-card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '24px' }}>{t('consumer.account_status')}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('consumer.active_credits')}</span>
                <span style={{ fontWeight: '700' }}>{isLoading ? '...' : credits.filter(c => c.status !== 'paid').length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('consumer.completed_payments')}</span>
                <span style={{ fontWeight: '700' }}>{isLoading ? '...' : payments.length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('consumer.identity_status')}</span>
                <span style={{ color: 'var(--success)', fontWeight: '800', fontSize: '0.8rem', background: 'var(--success-soft)', padding: '2px 8px', borderRadius: '4px' }}>{t('consumer.verified')}</span>
              </div>
            </div>
          </div>

          <div className="fintech-card" style={{ background: 'var(--primary)', color: 'white' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '12px' }}>Security</h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '24px', lineHeight: '1.5' }}>Your account is protected with two-factor authentication.</p>
            <button style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '10px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', width: '100%' }}>Manage Security</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
