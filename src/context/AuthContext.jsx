import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is already logged in
    const storedAuth = localStorage.getItem('adminAuth');
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      setIsAuthenticated(true);
      setUser(authData.user);
    }
    setLoading(false);
  }, []);
  
  const login = (username, password) => {
    // Simple authentication (replace with actual API call)
    const adminUsername = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
    
    if (username === adminUsername && password === adminPassword) {
      const authData = {
        user: { username, role: 'admin' },
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('adminAuth', JSON.stringify(authData));
      setIsAuthenticated(true);
      setUser(authData.user);
      return { success: true };
    }
    
    return { success: false, message: 'Invalid username or password' };
  };
  
  const logout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    setUser(null);
  };
  
  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthContext;
