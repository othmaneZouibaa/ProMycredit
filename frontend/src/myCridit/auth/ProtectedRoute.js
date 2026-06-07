import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ProtectedRoute = ({ allowedRole }) => {
  const { t } = useTranslation();
  const { isAuthenticated, user, status } = useSelector((state) => state.auth);

  // If we have a token but user info is still loading from API
  if (isAuthenticated && !user) {
    return <div className="text-center p-5">{t('common.loading')}</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user && user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
