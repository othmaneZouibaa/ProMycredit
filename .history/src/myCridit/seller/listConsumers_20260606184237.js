import React, { useState, useEffect } from 'react';
import './listConsumers.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConsumers, addPayment, updateConsumer, deleteConsumer } from './listSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ListConsumers = () => {
    const { t } = useTranslation();
    const { list: consumers, status, error } = useSelector((state) => state.list);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedConsumer, setSelectedConsumer] = useState(null);
    const [paymentAmount, setPaymentAmount] = useState('');
    const [paymentNote, setPaymentNote] = useState('');
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    
    // Edit state
    const [showEditModal, setShowEditModal] = useState(false);
    const [editForm, setEditForm] = useState({ name: '', phone: '', cin: '', address: '' });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchConsumers());
    }, [dispatch]);

    function handleSearch() {
        dispatch(fetchConsumers(searchTerm));
    }

    const handleOpenPayment = (consumer) => {
        setSelectedConsumer(consumer);
        setPaymentAmount('');
        setPaymentNote('');
        setShowPaymentModal(true);
    };

    const handleOpenEdit = (consumer) => {
        setSelectedConsumer(consumer);
        setEditForm({
            name: consumer.name,
            phone: consumer.phone || '',
            cin: consumer.cin || '',
            address: consumer.address || ''
        });
        setShowEditModal(true);
    };

    const handleUpdateConsumer = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(updateConsumer({
            id: selectedConsumer.id,
            data: editForm
        }));

        if (updateConsumer.fulfilled.match(resultAction)) {
            setShowEditModal(false);
            dispatch(fetchConsumers());
        }
    };

    const handleDeleteConsumer = async (id, name) => {
        if (window.confirm(t('seller.delete_consumer_confirm', { name }))) {
            const resultAction = await dispatch(deleteConsumer(id));
            if (deleteConsumer.rejected.match(resultAction)) {
                alert(resultAction.payload);
            }
        }
    };

    const handleRegisterPayment = async (e) => {
        e.preventDefault();
        if (!paymentAmount || parseFloat(paymentAmount) <= 0) return;

        const resultAction = await dispatch(addPayment({
            consumerId: selectedConsumer.id,
            amount: parseFloat(paymentAmount),
            note: paymentNote
        }));

        if (addPayment.fulfilled.match(resultAction)) {
            alert(t('seller.payment_success'));
            setShowPaymentModal(false);
            dispatch(fetchConsumers()); // Refresh list
        }
    };

    const isLoading = status === 'loading';

    const getStatusBadge = (debt, item) => {
        // If there's at least one pending credit for this consumer
        // (We might need to pass this info from the backend or check the list)
        if (debt <= 0) return <span className="badge-modern success">{t('common.paid')}</span>;
        if (debt > 5000) return <span className="badge-modern danger">{t('seller.high_debt')}</span>;
        return <span className="badge-modern warning">{t('common.active')}</span>;
    };

    return (
        <div className="consumers-list-container">
            <div className="list-header-modern">
                <h1>{t('seller.consumers_list')}</h1>
                <div className="list-actions">
                    <button className="btn-modern primary" onClick={() => navigate('/seller-panel/customers')}>
                        <span>➕</span> {t('seller.add_consumer')}
                    </button>
                </div>
            </div>

            <div className="filter-bar-modern">
                <div className="search-wrapper-modern">
                    <span>🔍</span>
                    <input 
                        type="text" 
                        placeholder={t('seller.search_consumers')} 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                </div>
                <button className="btn-modern" onClick={handleSearch} disabled={isLoading}>
                    {isLoading ? t('common.loading') : t('common.search')}
                </button>
            </div>

            {error && <div className="alert alert-danger" style={{ marginBottom: '24px' }}>{error}</div>}

            <div className="table-card-modern">
                <table className="modern-table">
                    <thead>
                        <tr>
                            <th>{t('consumer.name')}</th>
                            <th>{t('auth.cin_label')}</th>
                            <th>{t('auth.phone_label')}</th>
                            <th>{t('seller.total_unpaid')}</th>
                            <th>{t('seller.score')}</th>
                            <th>{t('common.status')}</th>
                            <th>{t('common.actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {consumers.length > 0 ? (
                            consumers.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <div className="user-info-cell">
                                            <div className="user-avatar-small">{item.name.charAt(0)}</div>
                                            <strong>{item.name}</strong>
                                        </div>
                                    </td>
                                    <td>{item.cin || t('consumer.none')}</td>
                                    <td>{item.phone || t('consumer.none')}</td>
                                    <td>
                                        <span className={`debt-amount ${item.stats?.total_debt <= 0 ? 'zero' : ''}`}>
                                            {item.stats?.total_debt.toLocaleString()} {t('common.dh')}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '40px', height: '4px', background: '#E2E8F0', borderRadius: '2px', overflow: 'hidden' }}>
                                                <div style={{ width: `${item.trust_score}%`, height: '100%', background: item.trust_score > 70 ? 'var(--success)' : 'var(--warning)' }}></div>
                                            </div>
                                            <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>{item.trust_score}%</span>
                                        </div>
                                    </td>
                                    <td>{getStatusBadge(item.stats?.total_debt)}</td>
                                    <td>
                                        <div className="action-btns-cell">
                                            <button 
                                                className="icon-action-btn payment"
                                                title={t('seller.register_payment')}
                                                onClick={() => handleOpenPayment(item)}
                                                disabled={item.stats?.total_debt <= 0}
                                            >
                                                💰
                                            </button>
                                            <button 
                                                className="icon-action-btn edit" 
                                                title={t('common.edit')}
                                                onClick={() => handleOpenEdit(item)}
                                            >
                                                ✏️
                                            </button>
                                            <button 
                                                className="icon-action-btn delete" 
                                                title={t('common.delete')}
                                                onClick={() => handleDeleteConsumer(item.id, item.name)}
                                            >
                                                🗑️
                                            </button>
                                            <button className="icon-action-btn" title={t('common.view')} onClick={() => navigate(`/seller-panel/consumer/${item.id}`)}>
                                                👁️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
                                    {isLoading ? t('common.loading') : t('consumer.no_credits')}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Payment Modal Redesign */}
            {showPaymentModal && (
                <div className="modal-overlay-modern">
                    <div className="modal-content-modern">
                        <h3>{t('seller.register_payment')}</h3>
                        <p>{t('seller.register_payment_for', { name: selectedConsumer?.name })}</p>
                        
                        <div style={{ background: 'var(--bg-main)', padding: '16px', borderRadius: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{t('seller.total_unpaid')}</span>
                            <span style={{ fontWeight: '800', color: 'var(--danger)' }}>{selectedConsumer?.stats?.total_debt.toLocaleString()} {t('common.dh')}</span>
                        </div>

                        <form onSubmit={handleRegisterPayment}>
                            <div className="form-group-modern">
                                <label>{t('seller.amount_to_pay')} ({t('common.dh')})</label>
                                <input 
                                    type="number" 
                                    required 
                                    max={selectedConsumer?.stats?.total_debt}
                                    value={paymentAmount}
                                    onChange={(e) => setPaymentAmount(e.target.value)}
                                    placeholder="0.00"
                                    autoFocus
                                />
                            </div>
                            <div className="form-group-modern">
                                <label>{t('seller.note_optional')}</label>
                                <input 
                                    type="text" 
                                    value={paymentNote}
                                    onChange={(e) => setPaymentNote(e.target.value)}
                                    placeholder="..."
                                />
                            </div>
                            
                            <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                                <button type="submit" className="btn-modern primary" style={{ flex: 1, justifyContent: 'center' }} disabled={isLoading}>
                                    {isLoading ? t('common.loading') : t('seller.save_payment')}
                                </button>
                                <button type="button" className="btn-modern" style={{ background: '#F1F5F9' }} onClick={() => setShowPaymentModal(false)}>
                                    {t('common.cancel')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Consumer Modal */}
            {showEditModal && (
                <div className="modal-overlay-modern">
                    <div className="modal-content-modern">
                        <h3>{t('seller.edit_consumer')}</h3>
                        <p>{t('seller.edit_consumer_for', { name: selectedConsumer?.name })}</p>
                        
                        <form onSubmit={handleUpdateConsumer}>
                            <div className="form-group-modern">
                                <label>{t('auth.fullname_label')}</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                />
                            </div>
                            <div className="form-group-modern">
                                <label>{t('auth.phone_label')}</label>
                                <input 
                                    type="text" 
                                    value={editForm.phone}
                                    onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                                />
                            </div>
                            <div className="form-group-modern">
                                <label>{t('auth.cin_label')}</label>
                                <input 
                                    type="text" 
                                    value={editForm.cin}
                                    onChange={(e) => setEditForm({...editForm, cin: e.target.value})}
                                />
                            </div>
                            <div className="form-group-modern">
                                <label>{t('auth.address_label')}</label>
                                <textarea 
                                    value={editForm.address}
                                    onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                                    rows="3"
                                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', fontFamily: 'inherit' }}
                                ></textarea>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                                <button type="submit" className="btn-modern primary" style={{ flex: 1, justifyContent: 'center' }} disabled={isLoading}>
                                    {isLoading ? t('common.loading') : t('common.save')}
                                </button>
                                <button type="button" className="btn-modern" style={{ background: '#F1F5F9' }} onClick={() => setShowEditModal(false)}>
                                    {t('common.cancel')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ListConsumers;
