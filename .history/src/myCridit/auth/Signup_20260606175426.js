import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register, clearError } from '../seller/authSlice';
import './Auth.css';

const Signup = () => {
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
      alert("Registration successful! Please login.");
      navigate('/login');
    }
  };

  const isLoading = status === 'loading';

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join MY CRIDITE to manage credits easily</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="role-selector">
          <div 
            className={`role-option ${role === 'seller' ? 'active' : ''}`}
            onClick={() => !isLoading && setRole('seller')}
          >
            Seller
          </div>
          <div 
            className={`role-option ${role === 'consumer' ? 'active' : ''}`}
            onClick={() => !isLoading && setRole('consumer')}
          >
            Consumer
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              name="fullName"
              type="text" 
              placeholder="Enter your full name" 
              required 
              disabled={isLoading}
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input 
              name="email"
              type="email" 
              placeholder="Enter your email" 
              required 
              disabled={isLoading}
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              name="password"
              type="password" 
              placeholder="Create a password" 
              required 
              disabled={isLoading}
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {role === 'seller' ? (
            <div className="form-group animate-in">
              <label>Store Name</label>
              <input 
                name="storeName"
                type="text" 
                placeholder="Enter your store name" 
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
                  <label>CIN</label>
                  <input 
                    name="cin"
                    type="text" 
                    placeholder="CIN" 
                    required 
                    disabled={isLoading}
                    value={formData.cin}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Phone</label>
                  <input 
                    name="phone"
                    type="tel" 
                    placeholder="+212 ..." 
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
            {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
