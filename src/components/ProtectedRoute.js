import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { authToken } = useAuth();
  return authToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
