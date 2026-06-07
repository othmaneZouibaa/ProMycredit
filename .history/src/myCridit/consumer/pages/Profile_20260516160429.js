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
    <div className="profile-page">
      <div className="content-grid">
        <div className="left-column">
          <div className="dashboard-section profile-main-info">
            <div className="profile-header-large">
              <div className="profile-avatar-large">{profile.avatar}</div>
              <div className="profile-title-large">
                <h2>{profile.name}</h2>
                <p>Member since {profile.memberSince}</p>
              </div>
            </div>
            
            <div className="profile-details-grid">
              <div className="detail-group">
                <label>Full Name</label>
                <div className="detail-value">{profile.name}</div>
              </div>
              <div className="detail-group">
                <label>Email Address</label>
                <div className="detail-value">{profile.email}</div>
              </div>
              <div className="detail-group">
                <label>Phone Number</label>
                <div className="detail-value">{profile.phone}</div>
              </div>
              <div className="detail-group">
                <label>CIN</label>
                <div className="detail-value">{profile.cin}</div>
              </div>
              <div className="detail-group full-width">
                <label>Home Address</label>
                <div className="detail-value">{profile.address}</div>
              </div>
            </div>
            
            <button className="btn-primary-outline">Edit Profile Information</button>
          </div>
        </div>
        
        <div className="right-column">
          <div className="dashboard-section account-summary">
            <h3>Account Summary</h3>
            <div className="summary-item">
              <span>Total Active Credits</span>
              <strong>{consumerData.credits.filter(c => c.status !== 'paid').length}</strong>
            </div>
            <div className="summary-item">
              <span>Completed Payments</span>
              <strong>{consumerData.payments.length}</strong>
            </div>
            <div className="summary-item">
              <span>Identity Verified</span>
              <strong className="success">Yes</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
