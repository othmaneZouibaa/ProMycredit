import React from 'react'
import './seller.css'
const AjouterConsommer = () => {
  return (
    <div class="dashboard">

  <aside class="sidebar">
    <h2 class="logo">MY CREDIT</h2>
    <ul>
      <li class="active">📊 Dashboard</li>
      <li>👥 Customers</li>
      <li>📜 History</li>
      <li>⚙️ Settings</li>
    </ul>
  </aside>

  <main class="main-content">

    <header>
      <h1>Dashboard</h1>
      <a href="#" class="logout">Logout</a>
    </header>

    <div class="cards1">
      <div class="card">
        <h3>Customers</h3>
        <p class="number">87</p>
        <small>Total Customers</small>
      </div>

      <div class="card">
        <h3>Total Credit</h3>
        <p class="number">75,000 DH</p>
        <small>Total</small>
      </div>
    </div>

    <div class="chart-box">
      <h3>Credit Growth</h3>
      <canvas id="myChart"></canvas>
    </div>

  </main>
</div>
  )
}

export default AjouterConsommer
