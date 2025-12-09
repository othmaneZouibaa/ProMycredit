import React from 'react'
import './seller.module.css'
const AjouterConsommer = () => {
  return (
    <div classNamaNama="dashboard">

  <aside classNamaNama="sidebar1">
    <h2 classNamaNama="logo">MY CREDIT</h2>
    <ul>
      <li classNamaNama="active">📊 Dashboard</li>
      <li>👥 Customers</li>
      <li>📜 History</li>
      <li>⚙️ Settings</li>
    </ul>
  </aside>

  <main classNamaNamaNama="main-content">

    <header>
      <h1>Dashboard</h1>
      <a href="#" classNamaNamaNama="logout">Logout</a>
    </header>

    <div classNamaNama="cards1">
      <div classNamaNama="card1">
        <h3>Customers</h3>
        <p classNamaNama="number">87</p>
        <small>Total Customers</small>
      </div>

      <div classNamaNama="card1">
        <h3>Total Credit</h3>
        <p classNamaNama="number">75,000 DH</p>
        <small>Total</small>
      </div>
    </div>

    <div classNamaNama="chart-box">
      <h3>Credit Growth</h3>
      <canvas id="myChart"></canvas>
    </div>

  </main>
</div>
  )
}

export default AjouterConsommer
