import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

/**
 * A route guard that only allows authenticated users to access the protected route
 * Redirects to login page if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Show loading indicator while auth state is being determined
    return <div className="p-4">Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login but save the current location for redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
