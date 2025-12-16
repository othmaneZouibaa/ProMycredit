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
const handleAjout=(e)=>{
            
            dispatch (ajouter({name}))
            navigate('/');
        }
  return (
    <div>
      <div className="app">



  <main className="main">

   


    <section className="panel">
      <h2>Ajouter un consommateur</h2>

      <form>
        <div className="form-row">
          <input type="text" placeholder="Nom et prénom"value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>

        <div className="form-row">
          <input type="text" placeholder="CIN" value={cin} onChange={(e)=>setCin(e.target.value)}/>
          <input type="text" placeholder="Téléphone" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
          <input type="text" placeholder="Montant" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
        </div>

        <div className="form-row">
          <input type="text" placeholder="Produit acheté" value={product} onChange={(e)=>setProduct(e.target.value) }/>
          <input type="text" placeholder="Montant du crédit" value={creditAmount} onChange={(e)=>setCreditAmount(e.target.value)}/>
          <input type="text" placeholder="Localisation" value={location} onChange={(e)=>setLocation(e.target.value)}/>
        </div>

        <button type="submit" onClick={handleAjout}>Ajouter</button>
      </form>

     
    </section>

  </main>

</div>

    </div>
  )
}

export default Customers
