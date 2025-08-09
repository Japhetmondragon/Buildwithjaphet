import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from '../UI/Loader';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <Loader size="lg" className="min-h-screen flex items-center" />;
  }
  
  if (!user || !user.isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;