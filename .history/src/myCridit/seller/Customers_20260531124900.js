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
  const [creditAmount, setCreditAmount] = useState(''); // Not used by backend yet
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
          totalAmount: parseFloat(amount)
        }));
      }
      
      alert("Consumer and credit added successfully!");
      navigate('/seller-panel/list-consumers');
    }
  }

  const isLoading = status === 'loading';

  return (
<div className="dashboard-container">
  <main className="main-content">
    <div className="topbar">
      <div className="breadcrumb">
        Dashboard / <strong>Add a Consumer</strong>
      </div>
      
      <div className="user-actions">
        <button className="icon-btn">🔔</button>
        <button className="icon-btn">⚙️</button>
        <div className="user-initial">S</div>
      </div></div><br/>

    <div className="add-form-card">
      <div className="form-header">
        <h2>Add a Consumer</h2>
        <p>Enter consumer details to record a new credit.</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="form-with-illustration">
        <form className="consumer-form" onSubmit={handleAdd}>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                placeholder="Full Name" 
                required 
                disabled={isLoading}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>CIN</label>
              <input 
                type="text" 
                placeholder="CIN" 
                required 
                disabled={isLoading}
                value={cin}
                onChange={(e) => setCin(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Purchased Product</label>
              <input 
                type="text" 
                placeholder="Purchased Product" 
                disabled={isLoading}
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input 
                type="tel" 
                placeholder="Phone" 
                disabled={isLoading}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Total Amount</label>
              <input 
                type="number" 
                placeholder="Credit Amount" 
                required 
                disabled={isLoading}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Amount Paid (optional)</label>
              <input 
                type="number" 
                placeholder="Amount Paid" 
                disabled={isLoading}
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
              />
            </div>

            <div className="form-group full-width">
              <label>Location / Address</label>
              <input 
                type="text" 
                placeholder="Location" 
                disabled={isLoading}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn-add" disabled={isLoading}>
            {isLoading ? 'ADDING...' : 'ADD'}
          </button>
        </form>

        <div className="illustration-side">
          <img src="../images/sara.jpg" alt="Consumer credit illustration" className="form-illustration"/> 
        </div>
      </div>
    </div>
  </main>
</div> )
}

export default Customers
