import React from 'react'
i
const Customers = () => {
  return (
    <div>
       <main className="main-content">

    <header1>
      <h1>Dashboard</h1>
      <a href="#" className="logout">Logout</a>
    </header1>

    <div className="cards1">
      <div className="card1">
        <h3>Customers</h3>
        <p className="number">00</p>
        <small>Total Customers</small>
      </div>

      <div className="card1">
        <h3>Total Credit</h3>
        <p className="number">00,000 DH</p>
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

export default Customers
