import React from 'react'
import './seller.css'
const AjouterConsommer = () => {
  return (
    <div>
      <div class="dashboard">

  <aside class="sidebar">
    <h2 class="logo">MY CRIDITE</h2>
    <ul>
      <li class="active">📊 Tableau de bord</li>
      <li>👥 Gestion des clients</li>
      <li>📜 Historique</li>
      <li>⚙️ Paramètres</li>
    </ul>
  </aside>

 
  <main class="main-content">

    <header>
      <h1>Tableau de bord</h1>
      <a href="#" class="logout">Déconnexion</a>
    </header>

    <div class="cards">
      <div class="card">
        <h3>Les clients</h3>
        <p class="number">87</p>
        <small>Clients</small>
      </div>

      <div class="card">
        <h3>Crédit total</h3>
        <p class="number">75 000 DH</p>
        <small>Total</small>
      </div>
    </div>

    <div class="chart-box">
      <h3>Évolution du crédit</h3>
      <canvas id="myChart"></canvas>
    </div>

  </main>
</div>
    </div>
  )
}

export default AjouterConsommer
