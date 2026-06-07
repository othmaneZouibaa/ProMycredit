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
  const { error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      ...formData,
      id: Date.now().toString(),
      role: role
    };
    
    // Check if email already exists locally before dispatching
    const existingUsers = JSON.parse(localStorage.getItem("my_cridit_users") || "[]");
    const emailExists = existingUsers.some(u => u.email.toLowerCase() === formData.email.toLowerCase());
    
    if (emailExists) {
      alert("User already exists with this email.");
      return;
    }

    dispatch(register(userData));
    alert("Registration successful! Please login.");
    navigate('/login');
  };

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
            <label>Full Name</label>
            <input 
              name="fullName"
              type="text" 
              placeholder="Enter your full name" 
              required 
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
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {role === 'seller' && (
            <div className="form-group">
              <label>Store Name</label>
              <input 
                name="storeName"
                type="text" 
                placeholder="Enter your store name" 
                required 
                value={formData.storeName}
                onChange={handleChange}
              />
            </div>
          )}

          {role === 'consumer' && (
            <>
              <div className="form-group">
                <label>CIN</label>
                <input 
                  name="cin"
                  type="text" 
                  placeholder="Enter your CIN" 
                  required 
                  value={formData.cin}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  name="phone"
                  type="tel" 
                  placeholder="Enter your phone number" 
                  required 
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Password</label>
            <input 
              name="password"
              type="password" 
              placeholder="Create a password" 
              required 
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="auth-btn">SIGN UP</button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
