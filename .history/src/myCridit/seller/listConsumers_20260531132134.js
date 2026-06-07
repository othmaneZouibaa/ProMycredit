import React, { useState, useEffect } from 'react';
import './listConsumers.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConsumers, addPayment } from './listSlice';
import { Link, useNavigate } from 'react-router-dom';

const ListConsumers = () => {
    const { list: consumers, status, error } = useSelector((state) => state.list);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedConsumer, setSelectedConsumer] = useState(null);
    const [paymentAmount, setPaymentAmount] = useState('');
    const [paymentNote, setPaymentNote] = useState('');
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    
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

    const handleRegisterPayment = async (e) => {
        e.preventDefault();
        if (!paymentAmount || parseFloat(paymentAmount) <= 0) return;

        const resultAction = await dispatch(addPayment({
            consumerId: selectedConsumer.id,
            amount: parseFloat(paymentAmount),
            note: paymentNote
        }));

        if (addPayment.fulfilled.match(resultAction)) {
            alert('Payment registered successfully!');
            setShowPaymentModal(false);
            dispatch(fetchConsumers()); // Refresh list
        }
    };

    const isLoading = status === 'loading';

    return (
        <div>
            <main className="main">

                <div className="top-bar">
                    <span className="logout">Logout</span><br/><br/>
                    <div className='d-flex g-6'>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search by name, phone or CIN"
                            value={searchTerm}
                            disabled={isLoading}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button 
                            className="btn btn-primary" 
                            onClick={handleSearch}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Searching...' : 'Search'}
                        </button>
                    </div>
                </div>

                <div className="header">
                    <h2>Consumers List</h2>
                    <Link to={'/seller-panel/Customers'}>
                        <button className="btn btn-primary">
                            Add a Consumer
                        </button>
                    </Link>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>CIN</th>
                                <th>Phone</th>
                                <th>Total Debt</th>
                                <th>Trust Score</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {consumers.length > 0 ? (
                                consumers.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.cin || 'N/A'}</td>
                                        <td>{item.phone || 'N/A'}</td>
                                        <td>{item.stats?.total_debt.toLocaleString()} DH</td>
                                        <td>
                                            <span className={`badge ${item.trust_score > 70 ? 'bg-success' : 'bg-warning'}`}>
                                                {item.trust_score}%
                                            </span>
                                        </td>
                                        <td>{item.address || 'N/A'}</td>
                                        <td className="d-flex g-2">
                                            <button 
                                                className="btn btn-success" 
                                                onClick={() => handleOpenPayment(item)}
                                                disabled={item.stats?.total_debt <= 0}
                                            >
                                                Payment
                                            </button>
                                            <button className="btn btn-edit">Details</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        {isLoading ? 'Loading consumers...' : 'No consumers found.'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Payment Modal */}
                {showPaymentModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3>Register Payment for {selectedConsumer?.name}</h3>
                            <p>Remaining Debt: <strong>{selectedConsumer?.stats?.total_debt.toLocaleString()} DH</strong></p>
                            
                            <form onSubmit={handleRegisterPayment}>
                                <div className="form-group">
                                    <label>Amount (DH)</label>
                                    <input 
                                        type="number" 
                                        required 
                                        max={selectedConsumer?.stats?.total_debt}
                                        value={paymentAmount}
                                        onChange={(e) => setPaymentAmount(e.target.value)}
                                        placeholder="Enter amount"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Note (Optional)</label>
                                    <input 
                                        type="text" 
                                        value={paymentNote}
                                        onChange={(e) => setPaymentNote(e.target.value)}
                                        placeholder="e.g. Cash payment"
                                    />
                                </div>
                                <div className="modal-actions d-flex g-2">
                                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                        {isLoading ? 'Registering...' : 'Register Payment'}
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowPaymentModal(false)}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </main>
        </div>
    )
}

export default ListConsumers;
