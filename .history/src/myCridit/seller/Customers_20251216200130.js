import React from 'react'
import './Customers1.css'
const Customers = () => {
  const [name, setName] =useState('');
  const [cin, setCin] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount]  =useState('');
  const [product, setProduct] =useState('');
  const [creditAmount, setCreditAmount] =useState('');
  const [location, setLocation] =useState('');

  return (
    <div>
      <div className="app">



  <main className="main">

   


    <section className="panel">
      <h2>Ajouter un consommateur</h2>

      <form>
        <div className="form-row">
          <input type="text" placeholder="Nom et prénom" onChange={(e)=>setName(e)}/>
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

     
    </section>

  </main>

</div>

    </div>
  )
}

export default Customers
