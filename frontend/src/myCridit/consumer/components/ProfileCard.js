import React from 'react';

const ProfileCard = ({ profile }) => (
  <section className="dashboard-section profile-card">
    <div className="profile-avatar">
      {profile.avatar}
    </div>
    <h3 className="profile-name">{profile.name}</h3>
    <p className="profile-info">Consumer ID: {profile.id}</p>
    
    <div className="profile-details">
      <div className="detail-item">
        <span className="detail-label">CIN</span>
        <strong>{profile.cin}</strong>
      </div>
      <div className="detail-item">
        <span className="detail-label">Phone</span>
        <strong>{profile.phone}</strong>
      </div>
      <div className="detail-item">
        <span className="detail-label">Email</span>
        <strong>{profile.email}</strong>
      </div>
      <div className="detail-item">
        <span className="detail-label">Address</span>
        <strong>{profile.address}</strong>
      </div>
    </div>
    
    <button style={{
      marginTop: '20px',
      width: '100%',
      padding: '10px',
      backgroundColor: '#f8f9fa',
      border: '1px solid #ddd',
      borderRadius: '4px',
      cursor: 'pointer'
    }}>
      Edit Profile
    </button>
  </section>
);

export default ProfileCard;
