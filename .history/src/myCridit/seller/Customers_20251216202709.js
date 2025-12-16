import React, { useState } from 'react'
import './Customers1.css'
import { useDispatch } from 'react-redux';
import { ajouter } from './listSlice';
import { useNavigate } from 'react-router-dom';

const Customers = () => {
  const [name, setName] = useState('');
  const [cin, setCin] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [product, setProduct] = useState('');
  const [creditAmount, setCreditAmount] = useState('');
  const [location, setLocation] = useState('');
  const dispatch = useDispatch();
 const navigate = useNavigate();
  const handleAdd = (e) => {
    e.preventDefault(); 
    dispatch(ajouter({
      name: name,
      cin: cin,
      phone: phone,
      amount: amount,
      product: product,
      creditAmount: creditAmount,
      location: location
    }));
    n
  }

  return (
    <div>
      <div className="app">
        <main className="main">
          <section className="panel">
            <h2>Add a Consumer</h2>

            <form>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-row">
                <input
                  type="text"
                  placeholder="CIN"
                  value={cin}
                  onChange={(e) => setCin(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="form-row">
                <input
                  type="text"
                  placeholder="Purchased Product"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Credit Amount"
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <button type="submit" onClick={handleAdd}>Add</button>
            </form>

          </section>
        </main>
      </div>
    </div>
  )
}

export default Customers
