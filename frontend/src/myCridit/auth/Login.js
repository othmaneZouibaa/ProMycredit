import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, clearError } from '../seller/authSlice';
import { useTranslation } from 'react-i18next';
import './Auth.css';

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user, error, status } = useSelector((state) => state.auth);

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

  const isLoading = status === 'loading';

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{t('auth.welcome_back')}</h2>
          <p>{t('auth.login_desc')}</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="role-selector">
          <div 
            className={`role-option ${role === 'seller' ? 'active' : ''}`}
            onClick={() => !isLoading && setRole('seller')}
          >
            {t('auth.seller')}
          </div>
          <div 
            className={`role-option ${role === 'consumer' ? 'active' : ''}`}
            onClick={() => !isLoading && setRole('consumer')}
          >
            {t('auth.consumer')}
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t('auth.email_label')}</label>
            <input 
              type="email" 
              placeholder={t('auth.email_placeholder')} 
              required 
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>{t('auth.password_label')}</label>
            <input 
              type="password" 
              placeholder={t('auth.password_placeholder')} 
              required 
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label className="remember-me">
              <input 
                type="checkbox" 
                checked={rememberMe}
                disabled={isLoading}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              {t('auth.remember_me')}
            </label>
            <Link to="/forgot-password" style={{ fontSize: '0.85rem', color: '#0056b3', textDecoration: 'none' }}>
              {t('auth.forgot_password')}
            </Link>
          </div>

          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? t('auth.logging_in') : t('auth.login_btn')}
          </button>
        </form>

        <div className="auth-footer">
          {t('auth.no_account')} <Link to="/signup">{t('auth.signup_link')}</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
