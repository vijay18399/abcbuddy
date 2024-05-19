import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);
  console.log("Checking ProtectedRoute")
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
