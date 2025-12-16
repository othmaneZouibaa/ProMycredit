import React from 'react'
import './listConsumers.css'
const ListConsumers = () => {
  return (
    <div>
      <main className="main">
        
        {/* Top Bar */}
        <div className="top-bar">
            <span className="logout">Déconnexion</span><br/><br/>
            <div className='d-flex g'>
                   <input
            type="text"
            className="search-input"
            placeholder="Recherchez par nom, CIN, téléphone, produit..."
          />
          <button className="btn btn-primary">Rechercher</button>
            </div>
       
          
        </div>

        {/* Header */}
        <div className="header">
          <h2>Liste des consommateurs</h2>
          <button className="btn btn-primary">
            Ajouter un consommateur
          </button>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="table">
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
                <td>AB12345</td>
                <td>0612345678</td>
                <td>TV Samsung</td>
                <td>1500 DH</td>
                <td>Fès - Narjis</td>
                <td>
                  <button className="btn btn-edit">Modifier</button>
                  <button className="btn btn-delete">Supprimer</button>
                </td>
              </tr>

              <tr>
                <td>Fatima</td>
                <td>HJ67890</td>
                <td>0678123456</td>
                <td>Machine à laver</td>
                <td>300 DH</td>
                <td>Meknès - Hamria</td>
                <td>
                  <button className="btn btn-edit">Modifier</button>
                  <button className="btn btn-delete">Supprimer</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </main>
    </div>
  )
}

export default ListConsumers
