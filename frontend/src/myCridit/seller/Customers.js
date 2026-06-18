
import React, { useState } from 'react'
import './Customers1.css'
import { useDispatch, useSelector } from 'react-redux';
import { addConsumer, addCredit } from './listSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Customers = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [cin, setCin] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [product, setProduct] = useState('');
  const [location, setLocation] = useState('');
  
  const { status, error } = useSelector((state) => state.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault(); 
    
    // Step 1: Add Consumer
    const consumerResult = await dispatch(addConsumer({
      name,
      cin,
      phone,
      address: location
    }));

    if (addConsumer.fulfilled.match(consumerResult)) {
      const consumer = consumerResult.payload;
      
      // Step 2: Add Credit (if amount is provided)
      if (amount && product) {
        await dispatch(addCredit({
          consumerId: consumer.id,
          productName: product,
          total_amount: parseFloat(amount)
        }));
      }
      
      alert(t('seller.success_add_consumer'));
      navigate('/seller-panel/list-consumers');
    }
  }

  const isLoading = status === 'loading';

  return (
    <div className="add-consumer-page-modern">
      <div className="dashboard-header-modern" style={{ marginBottom: '32px' }}>
        <h1>{t('seller.add_new_consumer')}</h1>
        <p>{t('seller.register_consumer_desc')}</p>
      </div>

      <div className="dashboard-content-grid">
        <div className="left-column">
          <div className="section-card">
            <form className="modern-form" onSubmit={handleAdd}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                <div className="form-group-modern">
                  <label>{t('auth.fullname_label')}</label>
                  <input 
                    type="text" 
                    placeholder={t('auth.fullname_placeholder')} 
                    required 
                    disabled={isLoading}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group-modern">
                  <label>{t('auth.cin_label')}</label>
                  <input 
                    type="text" 
                    placeholder={t('auth.cin_placeholder')} 
                    required 
                    disabled={isLoading}
                    value={cin}
                    onChange={(e) => setCin(e.target.value)}
                  />
                </div>
                <div className="form-group-modern">
                  <label>{t('auth.phone_label')}</label>
                  <input 
                    type="tel" 
                    placeholder={t('auth.phone_placeholder_alt')} 
                    required 
                    disabled={isLoading}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group-modern">
                  <label>{t('auth.address_label')}</label>
                  <input 
                    type="text" 
                    placeholder={t('auth.address_placeholder')} 
                    disabled={isLoading}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ padding: '24px', background: 'var(--bg-main)', borderRadius: '16px', marginBottom: '32px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '16px', color: 'var(--primary)' }}>{t('seller.initial_credit_details')}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div className="form-group-modern">
                    <label>{t('common.product')}</label>
                    <input 
                      type="text" 
                      placeholder="..." 
                      required 
                      disabled={isLoading}
                      value={product}
                      onChange={(e) => setProduct(e.target.value)}
                    />
                  </div>
                  <div className="form-group-modern">
                    <label>{t('common.amount')} ({t('common.dh')})</label>
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      required 
                      disabled={isLoading}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {error && <div className="alert alert-danger" style={{ marginBottom: '24px' }}>{error}</div>}

              <div style={{ display: 'flex', gap: '16px' }}>
                <button type="submit" className="btn-modern primary" style={{ padding: '14px 32px' }} disabled={isLoading}>
                  {isLoading ? t('seller.registering_consumer') : t('seller.register_consumer_btn')}
                </button>
                <button type="button" className="btn-modern" style={{ background: '#F1F5F9' }} onClick={() => navigate(-1)}>
                  {t('common.cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="right-column">
          <div className="section-card" style={{ background: 'var(--primary-soft)', border: '1px dashed var(--primary)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '16px', color: 'var(--primary)' }}>{t('seller.why_verify_cin')}</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '16px' }}>
              Verification of the National Identity Card (CIN) helps maintain a secure environment and build a reliable trust score for each consumer.
            </p>
            <ul style={{ fontSize: '0.875rem', color: 'var(--text-muted)', paddingLeft: '20px', lineHeight: '2' }}>
              <li>Reduces risk of fraud</li>
              <li>Enables credit history tracking</li>
              <li>Improves recovery rate</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Customers
