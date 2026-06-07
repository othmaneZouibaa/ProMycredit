import React from 'react'
import './Dashboard.css'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const allConsumers = useSelector((state) => state.list.list);
  const currentSeller = useSelector((state) => state.auth.user);

  // Filter data for current seller
  const sellerConsumers = allConsumers.filter(c => c.sellerId === currentSeller.id);
  
  const totalCustomers = sellerConsumers.length;
  const totalCredit = sellerConsumers.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  return (
    <div>
       <main className="main-content">

    <header1>
      <h1>Dashboard for {currentSeller.name}</h1>
      <a href="#" className="logout">Logout</a>
    </header1>

    <div className="cards1">
      <div className="card1">
        <h3>Customers</h3>
        <p className="number">{totalCustomers.toString().padStart(2, '0')}</p>
        <small>Total Customers</small>
      </div>

      <div className="card1">
        <h3>Total Credit</h3>
        <p className="number">{totalCredit.toLocaleString()} DH</p>
        <small>Total</small>
      </div>
    </div>

    <div className="chart-box">
      <h3>Credit Growth</h3>
      <canvas id="myChart"></canvas>
    </div>

  </main>
    </div>
  )
}

export default Dashboard
