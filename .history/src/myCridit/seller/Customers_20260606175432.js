// import React, { useState } from 'react'
// import './Customers1.css'
// import { useDispatch } from 'react-redux';
// import { ajouter } from './listSlice';
// import { useNavigate } from 'react-router-dom';

// const Customers = () => {
//   const [name, setName] = useState('');
//   const [cin, setCin] = useState('');
//   const [phone, setPhone] = useState('');
//   const [amount, setAmount] = useState('');
//   const [product, setProduct] = useState('');
//   const [creditAmount, setCreditAmount] = useState('');
//   const [location, setLocation] = useState('');
//   const dispatch = useDispatch();
//  const navigate = useNavigate();
//   const handleAdd = (e) => {
//     e.preventDefault(); 
//     dispatch(ajouter({
//       name: name,
//       cin: cin,
//       phone: phone,
//       amount: amount,
//       product: product,
//       creditAmount: creditAmount,
//       location: location
//     }));
//     navigate('/seller-panel/list-consumers');
//   }

//   return (
//     <div>
//       <div className="app">
//         <main className="main">
//           <section className="panel">
//             <h2>Add a Consumer</h2>

//             <form>
//               <div className="form-row">
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>

//               <div className="form-row">
//                 <input
//                   type="text"
//                   placeholder="CIN"
//                   value={cin}
//                   onChange={(e) => setCin(e.target.value)}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Phone"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Amount"
//                   value={amount}
//                   onChange={(e) => setAmount(e.target.value)}
//                 />
//               </div>

//               <div className="form-row">
//                 <input
//                   type="text"
//                   placeholder="Purchased Product"
//                   value={product}
//                   onChange={(e) => setProduct(e.target.value)}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Credit Amount"
//                   value={creditAmount}
//                   onChange={(e) => setCreditAmount(e.target.value)}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Location"
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                 />
//               </div>

//               <button type="submit" onClick={handleAdd}>Add</button>
//             </form>

//           </section>
//         </main>
//       </div>
//     </div>
//   )
// }

// export default Customers
import React, { useState } from 'react'
import './Customers1.css'
import { useDispatch, useSelector } from 'react-redux';
import { addConsumer, addCredit } from './listSlice';
import { useNavigate } from 'react-router-dom';

const Customers = () => {
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
      
      alert("Consumer and credit added successfully!");
      navigate('/seller-panel/list-consumers');
    }
  }

  const isLoading = status === 'loading';

  return (
    <div className="add-consumer-page-modern">
      <div className="dashboard-header-modern" style={{ marginBottom: '32px' }}>
        <h1>Add New Consumer</h1>
        <p>Register a new customer and issue their first credit installment.</p>
      </div>

      <div className="dashboard-content-grid">
        <div className="left-column">
          <div className="section-card">
            <form className="modern-form" onSubmit={handleAdd}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                <div className="form-group-modern">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Mohamed Amine" 
                    required 
                    disabled={isLoading}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group-modern">
                  <label>CIN Number</label>
                  <input 
                    type="text" 
                    placeholder="e.g. AB123456" 
                    required 
                    disabled={isLoading}
                    value={cin}
                    onChange={(e) => setCin(e.target.value)}
                  />
                </div>
                <div className="form-group-modern">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="e.g. 0612345678" 
                    required 
                    disabled={isLoading}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group-modern">
                  <label>Address / Location</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Casablanca, Maarif" 
                    disabled={isLoading}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ padding: '24px', background: 'var(--bg-main)', borderRadius: '16px', marginBottom: '32px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '16px', color: 'var(--primary)' }}>Initial Credit Details</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div className="form-group-modern">
                    <label>Product Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Samsung S24" 
                      required 
                      disabled={isLoading}
                      value={product}
                      onChange={(e) => setProduct(e.target.value)}
                    />
                  </div>
                  <div className="form-group-modern">
                    <label>Total Amount (DH)</label>
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
                  {isLoading ? 'Registering Consumer...' : 'Register Consumer & Credit'}
                </button>
                <button type="button" className="btn-modern" style={{ background: '#F1F5F9' }} onClick={() => navigate(-1)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="right-column">
          <div className="section-card" style={{ background: 'var(--primary-soft)', border: '1px dashed var(--primary)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '16px', color: 'var(--primary)' }}>Why verify CIN?</h3>
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
