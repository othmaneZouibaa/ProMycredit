import React from 'react'
import './seller.css'
const AjouterConsommer = () => {
  return (
    <div classNama="dashboard">

  <aside classNamaName="sidebar1">
    <h2 classNama="logo">MY CREDIT</h2>
    <ul>
      <li classNama="active">📊 Dashboard</li>
      <li>👥 Customers</li>
      <li>📜 History</li>
      <li>⚙️ Settings</li>
    </ul>
  </aside>

  <main classNama="main-content">

    <header>
      <h1>Dashboard</h1>
      <a href="#" classNama="logout">Logout</a>
    </header>

    <div classNama="cards1">
      <div classNama="card1">
        <h3>Customers</h3>
        <p classNama="number">87</p>
        <small>Total Customers</small>
      </div>

      <div classNama="card1">
        <h3>Total Credit</h3>
        <p classNama="number">75,000 DH</p>
        <small>Total</small>
      </div>
    </div>

    <div classNama="chart-box">
      <h3>Credit Growth</h3>
      <canvas id="myChart"></canvas>
    </div>

  </main>
</div>
  )
}

export default AjouterConsommer
