import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

/**
 * A route guard for public routes that redirects authenticated users
 * away from routes like login and register when they're already logged in
 */
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Show loading indicator while auth state is being determined
    return <div className="p-4">Loading...</div>;
  }

  if (isAuthenticated) {
    // Redirect to previous location or home if already authenticated
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return children;
};

export default PublicRoute;
