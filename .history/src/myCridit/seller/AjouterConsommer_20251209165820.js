import React from 'react'
import './seller.css'
const AjouterConsommer = () => {
  return (
    <div className="dashboard">

  <aside classNameName="sidebar1">
    <h2 className="logo">MY CREDIT</h2>
    <ul>
      <li className="active">📊 Dashboard</li>
      <li>👥 Customers</li>
      <li>📜 History</li>
      <li>⚙️ Settings</li>
    </ul>
  </aside>

  <main className="main-content">

    <header>
      <h1>Dashboard</h1>
      <a href="#" className="logout">Logout</a>
    </header>

    <div className="cards1">
      <div className="card1">
        <h3>Customers</h3>
        <p className="number">87</p>
        <small>Total Customers</small>
      </div>

      <div className="card1">
        <h3>Total Credit</h3>
        <p className="number">75,000 DH</p>
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

export default AjouterConsommer
