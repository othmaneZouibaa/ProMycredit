import React from 'react';
import './ConsumerDashboard.css';
import { consumerData } from './data';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import CreditTable from './components/CreditTable';
import RecentPayments from './components/RecentPayments';
import ProfileCard from './components/ProfileCard';
import { useSelector } from 'react-redux';

const ConsumerDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { credits, payments } = consumerData;
  
  // Use user from auth if available, otherwise fallback to mock profile
  const profile = user ? {
    ...consumerData.profile,
    name: user.fullName || user.name,
    email: user.email,
    cin: user.cin || consumerData.profile.cin,
    phone: user.phone || consumerData.profile.phone
  } : consumerData.profile;

  // Calculate totals
  const totalCredit = credits.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalPaid = credits.reduce((acc, curr) => acc + curr.paidAmount, 0);
  const totalRemaining = totalCredit - totalPaid;

  return (
    <div className="consumer-dashboard">
      <Sidebar />

      <main className="consumer-main">
        <header className="dashboard-header">
          <div className="header-title">
            <h1>Welcome back, {profile.name.split(' ')[0]}!</h1>
            <p>Here's an overview of your current credit status.</p>
          </div>
        </header>

        <section className="stats-grid">
          <StatCard 
            label="Total Credit" 
            value={`${totalCredit.toLocaleString()} DH`} 
          />
          <StatCard 
            label="Paid Amount" 
            value={`${totalPaid.toLocaleString()} DH`} 
            variant="success"
          />
          <StatCard 
            label="Remaining Amount" 
            value={`${totalRemaining.toLocaleString()} DH`} 
            variant="danger"
          />
        </section>

        <div className="content-grid">
          <div className="left-column">
            <CreditTable credits={credits} />
            <RecentPayments payments={payments} credits={credits} />
          </div>

          <div className="right-column">
            <ProfileCard profile={profile} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConsumerDashboard;
