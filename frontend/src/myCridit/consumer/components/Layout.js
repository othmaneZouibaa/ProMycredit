import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchPendingCredits, fetchNotifications, fetchConsumerStats } from '../consumerSlice';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import '../ConsumerDashboard.css'; // We'll update this CSS later

const ConsumerLayout = () => {
  const { t } = useTranslation();
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
    if (path.includes('credits')) return t('common.my_credits');
    if (path.includes('pending-requests')) return t('common.pending_requests');
    if (path.includes('payments')) return t('common.payments_history');
    if (path.includes('notifications')) return t('common.notifications');
    if (path.includes('profile')) return t('common.profile');
    if (path.includes('settings')) return t('common.settings');
    return t('common.dashboard');
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
