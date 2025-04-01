import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../lib/axios';
import { toast } from 'sonner';

// Create the auth context
const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  isAdmin: false,
  login: () => {},
  register: () => {},
  logout: () => {},
  loading: true,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component to wrap around components that need auth
export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initAuth = () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Verify token is valid and not expired
          try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            
            if (decoded.exp && decoded.exp < currentTime) {
              // Token is expired, clear storage
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              setUserState(null);
            } else {
              // Token is valid, get user from storage
              const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
              setUserState(storedUser);
            }
          } catch (error) {
            // Invalid token, clear storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUserState(null);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login user
  const login = async (credentials) => {
    try {
      const response = await axiosInstance.post('/api/auth/login', credentials);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUserState(user);
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return false;
    }
  };

  // Register user
  const register = async (userData) => {
    try {
      const response = await axiosInstance.post('/api/auth/register', userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUserState(user);
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return false;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserState(null);
    
    toast.success('Logged out successfully');
    return true;
  };

  // Determine if the user is authenticated
  const isAuthenticated = !!user;

  // Determine if the user is an admin
  const isAdmin = user ? user.role === 'admin' : false;

  // Context value
  const contextValue = {
    isAuthenticated,
    isAdmin,
    user,
    login,
    register,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
