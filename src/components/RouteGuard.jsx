import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const token = localStorage.getItem('behaveguard_token');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('behaveguard_token');
  // Simple check for now, in a real app check role in token
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};
