import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchPendingCredits, fetchNotifications, fetchConsumerStats } from '../consumerSlice';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import '../ConsumerDashboard.css'; // We'll update this CSS later

const ConsumerLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPendingCredits());
    dispatch(fetchNotifications());
    dispatch(fetchConsumerStats());
  }, [dispatch]);
  
  // Map path to title
  const getTitle = () => {
    const path = location.pathname;
    if (path.includes('credits')) return 'My Credits';
    if (path.includes('payments')) return 'Payment History';
    if (path.includes('notifications')) return 'Notifications';
    if (path.includes('profile')) return 'My Profile';
    if (path.includes('settings')) return 'Settings';
    return 'Dashboard';
  };

  return (
    <div className="consumer-panel-layout">
      <Sidebar />
      <div className="panel-content-wrapper">
        <TopNavbar title={getTitle()} />
        <main className="panel-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ConsumerLayout;
