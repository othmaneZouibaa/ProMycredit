import React, { useState, useEffect } from 'react';
import './listConsumers.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConsumers, addPayment, updateConsumer, deleteConsumer } from './listSlice';
import { Link, useNavigate } from 'react-router-dom';

const ListConsumers = () => {
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
        if (window.confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
            const resultAction = await dispatch(deleteConsumer(id));
            if (deleteConsumer.rejected.match(resultAction)) {
                alert(resultAction.payload);
            }
        }
    };

    const isLoading = status === 'loading';

    const getStatusBadge = (debt, item) => {
        // If there's at least one pending credit for this consumer
        // (We might need to pass this info from the backend or check the list)
        if (debt <= 0) return <span className="badge-modern success">Paid</span>;
        if (debt > 5000) return <span className="badge-modern danger">High Debt</span>;
        return <span className="badge-modern warning">Active</span>;
    };

    return (
        <div className="consumers-list-container">
            <div className="list-header-modern">
                <h1>Consumers List</h1>
                <div className="list-actions">
                    <button className="btn-modern primary" onClick={() => navigate('/seller-panel/customers')}>
                        <span>➕</span> Add New Consumer
                    </button>
                </div>
            </div>

            <div className="filter-bar-modern">
                <div className="search-wrapper-modern">
                    <span>🔍</span>
                    <input 
                        type="text" 
                        placeholder="Search by name, phone or CIN..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                </div>
                <button className="btn-modern" onClick={handleSearch} disabled={isLoading}>
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </div>

            {error && <div className="alert alert-danger" style={{ marginBottom: '24px' }}>{error}</div>}

            <div className="table-card-modern">
                <table className="modern-table">
                    <thead>
                        <tr>
                            <th>Consumer</th>
                            <th>Identity</th>
                            <th>Contact</th>
                            <th>Outstanding Debt</th>
                            <th>Trust Score</th>
                            <th>Status</th>
                            <th>Actions</th>
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
                                    <td>{item.cin || 'N/A'}</td>
                                    <td>{item.phone || 'N/A'}</td>
                                    <td>
                                        <span className={`debt-amount ${item.stats?.total_debt <= 0 ? 'zero' : ''}`}>
                                            {item.stats?.total_debt.toLocaleString()} DH
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
                                                title="Register Payment"
                                                onClick={() => handleOpenPayment(item)}
                                                disabled={item.stats?.total_debt <= 0}
                                            >
                                                💰
                                            </button>
                                            <button className="icon-action-btn" title="View Details">
                                                👁️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
                                    {isLoading ? 'Loading consumers data...' : 'No consumers found matching your criteria.'}
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
                        <h3>Register Payment</h3>
                        <p>Recording payment for <strong>{selectedConsumer?.name}</strong></p>
                        
                        <div style={{ background: 'var(--bg-main)', padding: '16px', borderRadius: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Current Debt</span>
                            <span style={{ fontWeight: '800', color: 'var(--danger)' }}>{selectedConsumer?.stats?.total_debt.toLocaleString()} DH</span>
                        </div>

                        <form onSubmit={handleRegisterPayment}>
                            <div className="form-group-modern">
                                <label>Payment Amount (DH)</label>
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
                                <label>Note or Reference</label>
                                <input 
                                    type="text" 
                                    value={paymentNote}
                                    onChange={(e) => setPaymentNote(e.target.value)}
                                    placeholder="e.g. Cash, Bank Transfer..."
                                />
                            </div>
                            
                            <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                                <button type="submit" className="btn-modern primary" style={{ flex: 1, justifyContent: 'center' }} disabled={isLoading}>
                                    {isLoading ? 'Processing...' : 'Confirm Payment'}
                                </button>
                                <button type="button" className="btn-modern" style={{ background: '#F1F5F9' }} onClick={() => setShowPaymentModal(false)}>
                                    Cancel
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
