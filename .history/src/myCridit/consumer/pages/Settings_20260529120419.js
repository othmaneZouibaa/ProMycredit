import React, { useState } from 'react';
import { consumerData } from '../data';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(consumerData.settings.darkMode);
  const [notifications, setNotifications] = useState(consumerData.settings.notifications);

  const toggleNotification = (type) => {
    setNotifications({ ...notifications, [type]: !notifications[type] });
  };

  return (
    <div className="settings-page-fintech">
      <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        <div className="left-column">
          <section className="fintech-card" style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '24px' }}>Security Settings</h3>
            <div className="settings-group">
              <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '16px', color: 'var(--primary)' }}>Change Password</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px' }}>Current Password</label>
                  <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: '10px' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px' }}>New Password</label>
                    <input type="password" placeholder="New password" style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: '10px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px' }}>Confirm New Password</label>
                    <input type="password" placeholder="Confirm password" style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: '10px' }} />
                  </div>
                </div>
                <button className="btn-primary" style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', alignSelf: 'flex-start' }}>Update Password</button>
              </div>
            </div>
          </section>

          <section className="fintech-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '24px' }}>Display Preferences</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'var(--bg-main)', borderRadius: '12px' }}>
              <div>
                <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>Dark Mode</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>Switch between light and dark themes.</p>
              </div>
              <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
                <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} style={{ opacity: 0, width: 0, height: 0 }} />
                <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: darkMode ? 'var(--primary)' : '#ccc', transition: '.4s', borderRadius: '34px' }}></span>
                <span style={{ position: 'absolute', content: '""', height: '18px', width: '18px', left: darkMode ? '28px' : '4px', bottom: '3px', backgroundColor: 'white', transition: '.4s', borderRadius: '50%' }}></span>
              </label>
            </div>
          </section>
        </div>

        <div className="right-column">
          <section className="fintech-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '24px' }}>Notifications</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: '600' }}>Email Alerts</span>
                <input type="checkbox" checked={notifications.email} onChange={() => toggleNotification('email')} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: '600' }}>SMS Alerts</span>
                <input type="checkbox" checked={notifications.sms} onChange={() => toggleNotification('sms')} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: '600' }}>Push Notifications</span>
                <input type="checkbox" checked={notifications.push} onChange={() => toggleNotification('push')} />
              </div>
              <button className="view-details-btn" style={{ width: '100%', marginTop: '16px', padding: '12px' }}>Save Preferences</button>
            </div>
          </section>

          <div className="fintech-card" style={{ marginTop: '32px', background: 'var(--danger-soft)', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--danger)', marginBottom: '12px' }}>Danger Zone</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--danger)', opacity: 0.8, marginBottom: '20px', lineHeight: '1.5' }}>Permanently delete your account and all associated data.</p>
            <button style={{ background: 'var(--danger)', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', width: '100%' }}>Deactivate Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
