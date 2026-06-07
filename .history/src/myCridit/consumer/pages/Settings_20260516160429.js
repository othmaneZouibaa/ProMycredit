import React, { useState } from 'react';
import { consumerData } from '../data';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(consumerData.settings.darkMode);
  const [notifications, setNotifications] = useState(consumerData.settings.notifications);

  const toggleNotification = (type) => {
    setNotifications({ ...notifications, [type]: !notifications[type] });
  };

  return (
    <div className="settings-page">
      <div className="content-grid">
        <div className="left-column">
          <section className="dashboard-section">
            <h3>Account Settings</h3>
            <div className="settings-group">
              <h4>Change Password</h4>
              <div className="form-group">
                <label>Current Password</label>
                <input type="password" placeholder="••••••••" />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input type="password" placeholder="New password" />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input type="password" placeholder="Confirm new password" />
              </div>
              <button className="btn-primary">Update Password</button>
            </div>
          </section>

          <section className="dashboard-section">
            <h3>Preferences</h3>
            <div className="setting-toggle-item">
              <div className="toggle-info">
                <strong>Dark Mode</strong>
                <p>Switch between light and dark themes.</p>
              </div>
              <label className="switch">
                <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                <span className="slider round"></span>
              </label>
            </div>
          </section>
        </div>

        <div className="right-column">
          <section className="dashboard-section">
            <h3>Notifications</h3>
            <div className="notification-item">
              <span>Email Notifications</span>
              <input type="checkbox" checked={notifications.email} onChange={() => toggleNotification('email')} />
            </div>
            <div className="notification-item">
              <span>SMS Notifications</span>
              <input type="checkbox" checked={notifications.sms} onChange={() => toggleNotification('sms')} />
            </div>
            <div className="notification-item">
              <span>Push Notifications</span>
              <input type="checkbox" checked={notifications.push} onChange={() => toggleNotification('push')} />
            </div>
            <button className="btn-secondary" style={{width: '100%', marginTop: '15px'}}>Save Preferences</button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
