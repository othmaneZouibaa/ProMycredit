import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Async thunk for fetching a single consumer with details
export const fetchConsumerDetails = createAsyncThunk(
    'list/fetchConsumerDetails',
    async (consumerId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/seller/consumers/${consumerId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch consumer details');
        }
    }
);

const ConsumerDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [consumerData, setConsumerData] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                console.log('Fetching consumer data for id:', id);
                const response = await api.get(`/seller/consumers/${id}`);
                console.log('Response data:', response.data);
                setConsumerData(response.data);
            } catch (error) {
                console.error('Error fetching consumer details:', error.response || error);
                alert(t('common.error') + ': ' + (error.response?.data?.message || error.message));
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id, t]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                {t('common.loading')}...
            </div>
        );
    }

    if (!consumerData) {
        return (
            <div style={{ padding: '32px' }}>
                <p>{t('consumer.no_credits')}</p>
                <button className="btn-modern" onClick={() => navigate(-1)}>
                    {t('common.back')}
                </button>
            </div>
        );
    }

    const consumer = consumerData.consumer;
    const credits = consumerData.credits || [];
    const payments = consumerData.payments || [];

    return (
        <div className="consumers-list-container" style={{ paddingTop: '24px' }}>
            <div className="list-header-modern">
                <button 
                    className="btn-modern" 
                    onClick={() => navigate(-1)}
                    style={{ marginRight: '16px', background: '#F1F5F9' }}
                >
                    ← {t('common.back')}
                </button>
                <div>
                    <h1>{t('seller.consumer_details')}</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('seller.viewing_consumer', { name: consumer.name })}</p>
                </div>
            </div>

            {/* Consumer Info Card */}
            <div className="section-card" style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '24px', color: 'var(--text-main)' }}>
                    {t('seller.personal_info')}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                    <div className="form-group-modern" style={{ marginBottom: '0' }}>
                        <label>{t('auth.fullname_label')}</label>
                        <input type="text" value={consumer.name} disabled style={{ background: 'var(--bg-main)' }} />
                    </div>
                    <div className="form-group-modern" style={{ marginBottom: '0' }}>
                        <label>{t('auth.cin_label')}</label>
                        <input type="text" value={consumer.cin || t('common.none')} disabled style={{ background: 'var(--bg-main)' }} />
                    </div>
                    <div className="form-group-modern" style={{ marginBottom: '0' }}>
                        <label>{t('auth.phone_label')}</label>
                        <input type="text" value={consumer.phone || t('common.none')} disabled style={{ background: 'var(--bg-main)' }} />
                    </div>
                    <div className="form-group-modern" style={{ marginBottom: '0' }}>
                        <label>{t('auth.address_label')}</label>
                        <input type="text" value={consumer.address || t('common.none')} disabled style={{ background: 'var(--bg-main)' }} />
                    </div>
                </div>
            </div>

            {/* Credits List */}
            <div className="section-card" style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '24px', color: 'var(--text-main)' }}>
                    {t('common.my_credits')}
                </h3>
                {credits.length > 0 ? (
                    <div className="table-card-modern">
                        <table className="modern-table">
                            <thead>
                                <tr>
                                    <th>{t('common.product')}</th>
                                    <th>{t('common.amount')}</th>
                                    <th>{t('common.paid')}</th>
                                    <th>{t('seller.remaining')}</th>
                                    <th>{t('common.status')}</th>
                                    <th>{t('common.date')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {credits.map(credit => {
                                    const total = parseFloat(credit.total_amount) || 0;
                                    const paid = parseFloat(credit.paid_amount) || 0;
                                    const remaining = total - paid;
                                    return (
                                        <tr key={credit.id}>
                                            <td>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                    <strong>{credit.product_name || 'N/A'}</strong>
                                                    <div style={{ width: '100px', height: '6px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                                                        <div style={{ 
                                                            width: `${Math.min(100, (paid / total) * 100)}%`, 
                                                            height: '100%', 
                                                            background: 'var(--success)' 
                                                        }}></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{total.toLocaleString()} DH</td>
                                            <td style={{ color: 'var(--success)' }}>{paid.toLocaleString()} DH</td>
                                            <td style={{ color: remaining > 0 ? 'var(--danger)' : 'var(--success)' }}>{remaining.toLocaleString()} DH</td>
                                            <td>
                                                <span className={`badge-modern ${
                                                    credit.status === 'paid' ? 'success' : 
                                                    credit.status === 'partial' ? 'primary' : 
                                                    credit.status === 'pending' ? 'warning' : 
                                                    credit.status === 'rejected' ? 'danger' : 'warning'
                                                }`}>
                                                    {credit.status ? t(`common.status.${credit.status}`) : credit.status}
                                                </span>
                                            </td>
                                            <td>{credit.created_at ? new Date(credit.created_at).toLocaleDateString() : 'N/A'}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '24px' }}>{t('consumer.no_credits')}</p>
                )}
            </div>

            {/* Payments History */}
            <div className="section-card">
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '24px', color: 'var(--text-main)' }}>
                    {t('common.payments_history')}
                </h3>
                {payments.length > 0 ? (
                    <div className="table-card-modern">
                        <table className="modern-table">
                            <thead>
                                <tr>
                                    <th>{t('common.date')}</th>
                                    <th>{t('common.amount')}</th>
                                    <th>{t('seller.note_optional')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map(payment => (
                                    <tr key={payment.id}>
                                        <td>{payment.created_at ? new Date(payment.created_at).toLocaleDateString() : 'N/A'}</td>
                                        <td><strong style={{ color: 'var(--success)' }}>{(parseFloat(payment.amount) || 0).toLocaleString()} DH</strong></td>
                                        <td>{payment.note || t('common.none')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '24px' }}>{t('seller.no_payments')}</p>
                )}
            </div>
        </div>
    );
};

export default ConsumerDetail;