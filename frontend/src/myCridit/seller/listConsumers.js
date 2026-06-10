import React, { useState, useEffect } from 'react';
import './listConsumers.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConsumers, updateConsumer, deleteConsumer } from './listSlice';
import { updateCredit } from './dashboardSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ListConsumers = () => {
    const { t } = useTranslation();
    const { list: consumers, status, error } = useSelector((state) => state.list);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedConsumer, setSelectedConsumer] = useState(null);
    
    // Edit state
    const [showEditModal, setShowEditModal] = useState(false);
    const [editForm, setEditForm] = useState({ name: '', phone: '', cin: '', address: '' });
    const [editCredits, setEditCredits] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchConsumers());
    }, [dispatch]);

    function handleSearch() {
        dispatch(fetchConsumers(searchTerm));
    }

    const handleOpenEdit = (consumer) => {
        setSelectedConsumer(consumer);
        setEditForm({
            name: consumer.name,
            phone: consumer.phone || '',
            cin: consumer.cin || '',
            address: consumer.address || ''
        });
        setEditCredits(consumer.credits ? consumer.credits.map(c => ({
            id: c.id,
            product_name: c.product_name,
            total_amount: c.total_amount
        })) : []);
        setShowEditModal(true);
    };

    const handleUpdateConsumer = async (e) => {
        e.preventDefault();
        
        try {
            // Update Consumer Info
            await dispatch(updateConsumer({
                id: selectedConsumer.id,
                data: editForm
            })).unwrap();

            // Update associated credits if any
            for (const credit of editCredits) {
                const originalCredit = selectedConsumer.credits.find(c => c.id === credit.id);
                
                // Compare values as numbers to avoid string vs number issues
                const hasProductChanged = originalCredit.product_name !== credit.product_name;
                const hasAmountChanged = parseFloat(originalCredit.total_amount) !== parseFloat(credit.total_amount);

                if (originalCredit && (hasProductChanged || hasAmountChanged)) {
                    await dispatch(updateCredit({
                        id: credit.id,
                        data: {
                            product_name: credit.product_name,
                            total_amount: parseFloat(credit.total_amount)
                        }
                    })).unwrap();
                }
            }

            alert(t('common.success'));
            setShowEditModal(false);
            dispatch(fetchConsumers());
        } catch (error) {
            alert(error || t('common.error'));
        }
    };

    const handleDeleteConsumer = async (id, name) => {
        if (window.confirm(t('seller.delete_consumer_confirm', { name }))) {
            const resultAction = await dispatch(deleteConsumer(id));
            if (deleteConsumer.fulfilled.match(resultAction)) {
                alert(t('common.success') || 'Deleted successfully');
            } else if (deleteConsumer.rejected.match(resultAction)) {
                alert(resultAction.payload);
            }
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
                            <th>{t('common.product')}</th>
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
                                    <td>
                                        {item.credits && item.credits.length > 0 ? (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{item.credits[0].product_name}</span>
                                                <div style={{ width: '80px', height: '4px', background: '#E2E8F0', borderRadius: '2px', overflow: 'hidden' }}>
                                                    <div style={{ 
                                                        width: `${Math.min(100, (parseFloat(item.credits[0].paid_amount) / parseFloat(item.credits[0].total_amount)) * 100)}%`, 
                                                        height: '100%', 
                                                        background: 'var(--success)' 
                                                    }}></div>
                                                </div>
                                                {item.credits.length > 1 && (
                                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                                        +{item.credits.length - 1} {t('common.more')}
                                                    </span>
                                                )}
                                            </div>
                                        ) : (
                                            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{t('common.none')}</span>
                                        )}
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
                                    rows="2"
                                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', fontFamily: 'inherit' }}
                                ></textarea>
                            </div>

                            {editCredits.length > 0 && (
                                <div style={{ marginTop: '24px', padding: '16px', background: 'var(--bg-main)', borderRadius: '16px' }}>
                                    <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '16px', color: 'var(--primary)' }}>
                                        {t('common.my_credits')}
                                    </h4>
                                    {editCredits.map((credit, index) => (
                                        <div key={credit.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: index === editCredits.length - 1 ? 0 : '16px' }}>
                                            <div className="form-group-modern" style={{ marginBottom: 0 }}>
                                                <label style={{ fontSize: '0.75rem' }}>{t('common.product')}</label>
                                                <input 
                                                    type="text" 
                                                    value={credit.product_name}
                                                    onChange={(e) => {
                                                        const newCredits = [...editCredits];
                                                        newCredits[index].product_name = e.target.value;
                                                        setEditCredits(newCredits);
                                                    }}
                                                    style={{ padding: '8px 12px' }}
                                                />
                                            </div>
                                            <div className="form-group-modern" style={{ marginBottom: 0 }}>
                                                <label style={{ fontSize: '0.75rem' }}>{t('common.amount')} (DH)</label>
                                                <input 
                                                    type="number" 
                                                    value={credit.total_amount}
                                                    onChange={(e) => {
                                                        const newCredits = [...editCredits];
                                                        newCredits[index].total_amount = e.target.value;
                                                        setEditCredits(newCredits);
                                                    }}
                                                    style={{ padding: '8px 12px' }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            
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
