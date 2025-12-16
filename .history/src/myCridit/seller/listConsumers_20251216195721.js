import React, { useState } from 'react'
import './listConsumers.css'
import { useDispatch, useSelector } from 'react-redux';
import { rechercher } from './listSlice';
import { Link, useNavigate } from 'react-router-dom';
const ListConsumers = () => {
    const cl = useSelector((state) => state.list.list);
    const [name, setName] = useState('')
     const dispatch = useDispatch();
     const navigate = useNavigate();
    function handlrecherch(){
      dispatch(rechercher({name}))
       
    }
  return (
    <div>
      <main className="main">
        
        {/* Top Bar */}
        <div className="top-bar">
            <span className="logout">Déconnexion</span><br/><br/>
            <div className='d-flex g-6'>
                   <input
            type="text"
            className="search-input"
            placeholder="Recherchez par nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="btn btn-primary" onClick={() => handlrecherch(name)}>Rechercher</button>
            </div>
       
          
        </div>

        {/* Header */}
        <div className="header">
          <h2>Liste des consommateurs</h2>
          <Link to={'/seller-panel/Customers'}><button className="btn btn-primary">
            Ajouter un consommateur
          </button></Link>
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
                {cl.map((item,index)=>(
                    <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.cin}</td>
                    <td>{item.phone}</td>
                    <td>{item.product}</td>
                    <td>{item.amount}</td>  
                    <td>{item.location}</td>
                    <td>
                      <button className="btn btn-edit">Modifier</button>
                      <button className="btn btn-delete">Supprimer</button>
                    </td>
                  </tr>
                ))}
              
            </tbody>
          </table>
        </div>

      </main>
    </div>
  )
}

export default ListConsumers
