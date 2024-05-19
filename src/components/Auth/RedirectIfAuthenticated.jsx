import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const RedirectIfAuthenticated = () => {
  const { user } = useContext(AuthContext);
  console.log("Checking RedirectIfAuthenticated")
  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RedirectIfAuthenticated;
