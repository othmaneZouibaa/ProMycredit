import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRole }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
