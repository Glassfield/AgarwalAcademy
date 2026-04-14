import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/common/Button';
import './AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const result = login(username, password);
    
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };
  
  return (
    <div className="admin-login-page">
      <Helmet>
        <title>Admin Login | Agarwal Academy</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Admin Login</h1>
            <p>Agarwal Academy Management Portal</p>
          </div>
          
          {error && (
            <div className="error-alert">
              <span className="error-icon">⚠️</span>
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
            >
              Login
            </Button>
          </form>
          
          <div className="login-footer">
            <p className="demo-credentials">
              <strong>Demo Credentials:</strong><br />
              Username: admin | Password: admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
