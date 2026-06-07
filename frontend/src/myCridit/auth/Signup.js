import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register, clearError } from '../seller/authSlice';
import { useTranslation } from 'react-i18next';
import './Auth.css';

const Signup = () => {
  const { t } = useTranslation();
  const [role, setRole] = useState('seller');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    storeName: '', // Seller only
    cin: '',       // Consumer only
    phone: ''      // Consumer only
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, status } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const resultAction = await dispatch(register({
      ...formData,
      role: role
    }));

    if (register.fulfilled.match(resultAction)) {
      alert(t('auth.success_reg'));
      navigate('/login');
    }
  };

  const isLoading = status === 'loading';

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{t('auth.create_account')}</h2>
          <p>{t('auth.signup_desc')}</p>
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
            <label>{t('auth.fullname_label')}</label>
            <input 
              name="fullName"
              type="text" 
              placeholder={t('auth.fullname_placeholder')} 
              required 
              disabled={isLoading}
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>{t('auth.email_label')}</label>
            <input 
              name="email"
              type="email" 
              placeholder={t('auth.email_placeholder')} 
              required 
              disabled={isLoading}
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>{t('auth.password_label')}</label>
            <input 
              name="password"
              type="password" 
              placeholder={t('auth.password_placeholder')} 
              required 
              disabled={isLoading}
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {role === 'seller' ? (
            <div className="form-group animate-in">
              <label>{t('auth.store_name_label')}</label>
              <input 
                name="storeName"
                type="text" 
                placeholder={t('auth.store_name_placeholder')} 
                required 
                disabled={isLoading}
                value={formData.storeName}
                onChange={handleChange}
              />
            </div>
          ) : (
            <div className="form-group animate-in">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label>{t('auth.cin_label')}</label>
                  <input 
                    name="cin"
                    type="text" 
                    placeholder={t('auth.cin_placeholder')} 
                    required 
                    disabled={isLoading}
                    value={formData.cin}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>{t('auth.phone_label')}</label>
                  <input 
                    name="phone"
                    type="tel" 
                    placeholder={t('auth.phone_placeholder_alt')} 
                    required 
                    disabled={isLoading}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          )}

          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? t('auth.creating_account') : t('auth.signup_btn')}
          </button>
        </form>

        <div className="auth-footer">
          {t('auth.have_account')} <Link to="/login">{t('auth.login_link')}</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
