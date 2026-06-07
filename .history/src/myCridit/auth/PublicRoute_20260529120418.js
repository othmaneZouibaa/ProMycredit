import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    const redirectPath = user.role === 'seller' ? '/seller-panel' : '/consumer-panel';
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
