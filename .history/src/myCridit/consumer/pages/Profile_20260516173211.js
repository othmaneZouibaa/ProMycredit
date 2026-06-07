import React from 'react';
import { useSelector } from 'react-redux';
import { consumerData } from '../data';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  
  const profile = user ? {
    ...consumerData.profile,
    name: user.fullName || user.name,
    email: user.email,
    cin: user.cin || consumerData.profile.cin,
    phone: user.phone || consumerData.profile.phone,
    address: user.address || consumerData.profile.address
  } : consumerData.profile;

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
                  <span className={`trust-badge-mini trust-${profile.trustLevel.toLowerCase()}`} style={{ fontSize: '0.8rem', padding: '4px 12px' }}>
                    {profile.trustLevel} Member
                  </span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Since {profile.memberSince}</span>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '8px' }}>Full Name</label>
                <div style={{ padding: '12px 16px', background: 'var(--bg-main)', borderRadius: '10px', fontSize: '1rem', fontWeight: '600' }}>{profile.name}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '8px' }}>Email Address</label>
                <div style={{ padding: '12px 16px', background: 'var(--bg-main)', borderRadius: '10px', fontSize: '1rem', fontWeight: '600' }}>{profile.email}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '8px' }}>Phone Number</label>
                <div style={{ padding: '12px 16px', background: 'var(--bg-main)', borderRadius: '10px', fontSize: '1rem', fontWeight: '600' }}>{profile.phone}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '8px' }}>CIN Number</label>
                <div style={{ padding: '12px 16px', background: 'var(--bg-main)', borderRadius: '10px', fontSize: '1rem', fontWeight: '600' }}>{profile.cin}</div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '8px' }}>Permanent Address</label>
                <div style={{ padding: '12px 16px', background: 'var(--bg-main)', borderRadius: '10px', fontSize: '1rem', fontWeight: '600' }}>{profile.address}</div>
              </div>
            </div>
            
            <button className="view-details-btn" style={{ marginTop: '40px', padding: '12px 24px' }}>Edit Profile Information</button>
          </div>
        </div>
        
        <div className="right-column" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div className="fintech-card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '24px' }}>Account Status</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Active Credits</span>
                <span style={{ fontWeight: '700' }}>{consumerData.credits.filter(c => c.status !== 'paid').length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Completed Payments</span>
                <span style={{ fontWeight: '700' }}>{consumerData.payments.length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Identity Status</span>
                <span style={{ color: 'var(--success)', fontWeight: '800', fontSize: '0.8rem', background: 'var(--success-soft)', padding: '2px 8px', borderRadius: '4px' }}>VERIFIED</span>
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
