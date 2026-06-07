import React from 'react';
import { consumerData } from '../data';
import StatCard from '../components/StatCard';
import CreditTable from '../components/CreditTable';
import RecentPayments from '../components/RecentPayments';
import ProfileCard from '../components/ProfileCard';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { credits, payments } = consumerData;
  
  const profile = user ? {
    ...consumerData.profile,
    name: user.fullName || user.name,
    email: user.email,
  } : consumerData.profile;

  const totalCredit = credits.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalPaid = credits.reduce((acc, curr) => acc + curr.paidAmount, 0);
  const totalRemaining = totalCredit - totalPaid;

  return (
    <div className="dashboard-page">
      <section className="stats-grid">
        <StatCard label="Total Credit" value={`${totalCredit.toLocaleString()} DH`} />
        <StatCard label="Paid Amount" value={`${totalPaid.toLocaleString()} DH`} variant="success" />
        <StatCard label="Remaining Amount" value={`${totalRemaining.toLocaleString()} DH`} variant="danger" />
      </section>

      <div className="content-grid">
        <div className="left-column">
          <CreditTable credits={credits.slice(0, 2)} />
          <RecentPayments payments={payments.slice(0, 3)} credits={credits} />
        </div>
        <div className="right-column">
          <ProfileCard profile={profile} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
