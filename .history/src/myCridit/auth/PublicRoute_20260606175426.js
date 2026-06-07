import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (isAuthenticated && user) {
    const redirectPath = user.role === 'seller' ? '/seller-panel' : '/consumer-panel';
    return <Navigate to={redirectPath} replace />;
  }

  // If we have a token but user data is still being fetched, wait for it
  if (isAuthenticated && !user) {
    return <div className="text-center p-5">Checking session...</div>;
  }

  return <Outlet />;
};

export default PublicRoute;
