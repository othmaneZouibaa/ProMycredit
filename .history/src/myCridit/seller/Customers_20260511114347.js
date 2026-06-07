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
    navigate('/seller-panel/list-consumers');
  }

  return (
<div className="dashboard-container">
 
  {/* <aside className="sidebar">
    <div className="logo">
      <span className="check">✓</span> MY CRIDITE
    </div>
    
    <nav className="sidebar-nav">
      <a href="#" className="nav-item active">
        <span className="icon">🏠</span> Dashboard
      </a>
      <a href="#" className="nav-item">
        <span className="icon">👥</span> List Consumers
      </a>
      <a href="#" className="nav-item">
        <span className="icon">📜</span> History
      </a>
      <a href="#" className="nav-item">
        <span className="icon">⚙️</span> Settings
      </a>
    </nav>
    
    <div className="sidebar-footer">
      <div className="user">
        <div className="avatar">A</div>
        <span>Ahmed</span>
      </div>
      <a href="#" className="logout">Logout</a>
    </div>
  </aside> */}

  <main className="main-content">
    {/* <header className="topbar"> */}
    <div className="topbar">
      <div className="breadcrumb">
        Dashboard / <strong>Add a Consumer</strong>
      </div>
      
      <div className="user-actions">
        <button className="icon-btn">🔔</button>
        <button className="icon-btn">⚙️</button>
        <div className="user-initial">A</div>
      </div></div><br/>
    {/* </header> */}

    <div className="stats-row">
      
      <div className="stat-card total">
        <div className="label">Total Credit</div>
        <div className="value">24,500 <small>MAD (DH)</small></div>
      </div>
      <div className="stat-card paid">
        <div className="label">Paid Amount</div>
        <div className="value success">5,100 <small>MAD (DH)</small></div>
      </div>
      <div className="stat-card unpaid">
        <div className="label">Unpaid Amount</div>
        <div className="value danger">19,400 <small>MAD (DH)</small></div>
      </div>
    </div>

    <div className="add-form-card">
      <div className="form-header">
        <h2>Add a Consumer</h2>
        <p>Enter consumer details to record a new credit.</p>
      </div>

      <div className="form-with-illustration">
        <form className="consumer-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Full Name" required />
            </div>
            <div className="form-group">
              <label>CIN</label>
              <input type="text" placeholder="CIN" required />
            </div>

            <div className="form-group">
              <label>Purchased Product</label>
              <input type="text" placeholder="Purchased Product" />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" placeholder="Phone" />
            </div>

            <div className="form-group">
              <label>Credit Amount</label>
              <input type="number" placeholder="Credit Amount" required />
            </div>
            <div className="form-group">
              <label>Amount Paid</label>
              <input type="number" placeholder="Amount Paid" />
            </div>

            <div className="form-group full-width">
              <label>Location</label>
              <input type="text" placeholder="Location" />
            </div>
          </div>

          <button type="submit" className="btn-add">ADD</button>
        </form>

        <div className="illustration-side">
         
          <img src="../images/sara.jpg" alt="Consumer credit illustration" className="form-illustration"/> 
        
          {/* <div className="placeholder-illu">
            <div className="character">🧑‍💼</div>
            <div className="money">💸</div>
            <div className="checklist">📋✓</div>
          // </div> */}
        </div>
      </div>
    </div>

    <div className="search-section">
      <h3>Looking for a consumer? Easily search by name or CIN:</h3>
      <div className="search-bar">
        <input type="text" placeholder="Search by name or CIN" />
        <button className="btn-search">SEARCH</button>
      </div>
    </div>
  </main>
</div> )
}

export default Customers
