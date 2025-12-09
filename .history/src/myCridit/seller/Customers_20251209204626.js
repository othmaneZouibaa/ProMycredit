import React from 'react'
import './'
const Dashboard = () => {
  return (
    <div>
      <div className="app">



  <main className="main">

    <div className="topbar">
      <input type="search" placeholder="Recherchez par nom, CIN, téléphone, produit..."/>
      <a href="#" className="logout">Déconnexion</a>
    </div>


    <section className="panel">
      <h2>Ajouter un consommateur</h2>

      <form>
        <div className="form-row">
          <input type="text" placeholder="Nom et prénom"/>
        </div>

        <div className="form-row">
          <input type="text" placeholder="CIN"/>
          <input type="text" placeholder="Téléphone"/>
          <input type="text" placeholder="Montant"/>
        </div>

        <div className="form-row">
          <input type="text" placeholder="Produit acheté"/>
          <input type="text" placeholder="Montant du crédit"/>
          <input type="text" placeholder="Localisation"/>
        </div>

        <button type="submit">Ajouter</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>CIN</th>
            <th>Téléphone</th>
            <th>Produit</th>
            <th>Montant</th>
            <th>Localisation</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Ahmed Ali</td>
            <td>A812345</td>
            <td>0612345678</td>
            <td>TV Samsung</td>
            <td>1500 DH</td>
            <td>Fès - Narjis</td>
            <td>
              <button className="edit">Modifier</button>
              <button className="delete">Supprimer</button>
            </td>
          </tr>

          <tr>
            <td>Fatima</td>
            <td>HJ67890</td>
            <td>0578123456</td>
            <td>Machine à laver</td>
            <td>300 DH</td>
            <td>Meknes - Hamria</td>
            <td>
              <button className="edit">Modifier</button>
              <button className="delete">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>

    </section>

  </main>

</div>

    </div>
  )
}

export default Dashboard
