import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, clearError } from '../seller/authSlice';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.role === 'seller' ? '/seller-panel' : '/consumer-panel');
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password, role }));
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Login to your MY CRIDITE account</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="role-selector">
          <div 
            className={`role-option ${role === 'seller' ? 'active' : ''}`}
            onClick={() => setRole('seller')}
          >
            Seller
          </div>
          <div 
            className={`role-option ${role === 'consumer' ? 'active' : ''}`}
            onClick={() => setRole('consumer')}
          >
            Consumer
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label className="remember-me">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <Link to="/forgot-password" style={{ fontSize: '0.85rem', color: '#0056b3', textDecoration: 'none' }}>
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="auth-btn">LOGIN</button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
