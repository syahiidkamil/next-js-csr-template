import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

/**
 * A route guard that only allows admin users to access the route
 * Redirects to home page if user is not an admin
 */
const AdminRoute = ({ children }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    // Show loading indicator while auth state is being determined
    return <div className="p-4">Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Check if user is an admin
  if (!user || user.role !== "admin") {
    // Redirect to home if not an admin
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
