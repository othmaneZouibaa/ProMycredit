import React from 'react';
import './ConsumerDashboard.css';
import { consumerData } from './data';
import { Link } from 'react-router-dom';

const ConsumerDashboard = () => {
  const { profile, credits, payments } = consumerData;

  // Calculate totals
  const totalCredit = credits.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalPaid = credits.reduce((acc, curr) => acc + curr.paidAmount, 0);
  const totalRemaining = totalCredit - totalPaid;

  return (
    <div className="consumer-dashboard">
      {/* Sidebar Navigation */}
      <aside className="consumer-sidebar">
        <div className="sidebar-brand">
          MY CRIDITE
        </div>
        <nav className="sidebar-nav">
          <Link to="/consumer-panel" className="nav-link active">
            <span className="nav-icon">📊</span>
            <span>Dashboard</span>
          </Link>
          <Link to="/consumer-panel/credits" className="nav-link">
            <span className="nav-icon">💳</span>
            <span>My Credits</span>
          </Link>
          <Link to="/consumer-panel/history" className="nav-link">
            <span className="nav-icon">📜</span>
            <span>Payment History</span>
          </Link>
          <Link to="/consumer-panel/profile" className="nav-link">
            <span className="nav-icon">👤</span>
            <span>Profile</span>
          </Link>
          <Link to="/consumer-panel/settings" className="nav-link">
            <span className="nav-icon">⚙️</span>
            <span>Settings</span>
          </Link>
        </nav>
        <div className="sidebar-footer">
          <Link to="/" className="nav-link">
            <span className="nav-icon">🚪</span>
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="consumer-main">
        <header className="dashboard-header">
          <div className="header-title">
            <h1>Welcome back, {profile.name.split(' ')[0]}!</h1>
            <p>Here's an overview of your current credit status.</p>
          </div>
          <div className="header-actions">
            {/* Could add a notification bell here */}
          </div>
        </header>

        {/* Statistics Cards */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Credit</div>
            <div className="stat-value">{totalCredit.toLocaleString()} DH</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Paid Amount</div>
            <div className="stat-value success">{totalPaid.toLocaleString()} DH</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Remaining Amount</div>
            <div className="stat-value danger">{totalRemaining.toLocaleString()} DH</div>
          </div>
        </section>

        <div className="content-grid">
          <div className="left-column">
            {/* Credit Details Table */}
            <section className="dashboard-section">
              <div className="section-header">
                <h2>Credit Details</h2>
                <Link to="/consumer-panel/credits" style={{fontSize: '0.85rem', color: '#007bff', textDecoration: 'none'}}>View All</Link>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Remaining</th>
                  </tr>
                </thead>
                <tbody>
                  {credits.map(credit => (
                    <tr key={credit.id}>
                      <td>
                        <strong>{credit.product}</strong>
                        <div style={{fontSize: '0.75rem', color: '#666'}}>{credit.sellerName}</div>
                      </td>
                      <td>{credit.date}</td>
                      <td>{credit.totalAmount.toLocaleString()} DH</td>
                      <td>{credit.paidAmount.toLocaleString()} DH</td>
                      <td className="danger">{(credit.totalAmount - credit.paidAmount).toLocaleString()} DH</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* Recent Payments Section */}
            <section className="dashboard-section">
              <div className="section-header">
                <h2>Recent Payments</h2>
                <Link to="/consumer-panel/history" style={{fontSize: '0.85rem', color: '#007bff', textDecoration: 'none'}}>View History</Link>
              </div>
              <ul className="payment-list">
                {payments.map(payment => (
                  <li key={payment.id} className="payment-item">
                    <div className="payment-info">
                      <h4>Payment for {credits.find(c => c.id === payment.creditId)?.product}</h4>
                      <p>{payment.date} • {payment.method}</p>
                    </div>
                    <div className="payment-amount">
                      +{payment.amount.toLocaleString()} DH
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="right-column">
            {/* Consumer Profile Card */}
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConsumerDashboard;
