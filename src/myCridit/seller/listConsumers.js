import React, { useState } from 'react';
import './listConsumers.css';
import { useDispatch, useSelector } from 'react-redux';
import { rechercher, remove } from './listSlice';
import { Link, useNavigate } from 'react-router-dom';

const ListConsumers = () => {
    const consumers = useSelector((state) => state.list.list);
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSearch() {
        dispatch(rechercher({ name }));
    }

    function handleConfirmRemove(consumer) {
        if (window.confirm('Do you want to delete: ' + consumer.cin + ' ?')) {
            dispatch(remove(consumer.cin));
        }
    }

    return (
        <div>
            <main className="main">

                <div className="top-bar">
                    <span className="logout">Logout</span><br/><br/>
                    <div className='d-flex g-6'>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search by name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={() => handleSearch(name)}>Search</button>
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

                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>CIN</th>
                                <th>Phone</th>
                                <th>Product</th>
                                <th>Amount</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {consumers.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.cin}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.product}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.location}</td>
                                    <td>
                                        <button className="btn btn-edit">Edit</button>
                                        <button className="btn btn-delete" onClick={() => handleConfirmRemove(item)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </main>
        </div>
    )
}

export default ListConsumers;
