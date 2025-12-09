<div class="app">

  <!-- ✅ SIDEBAR -->
  <aside class="sidebar">
    <h2 class="brand">MY CRIDITE</h2>
    <ul class="menu">
      <li>Tableau de bord</li>
      <li class="active">Gestion des clients</li>
      <li>Historique</li>
      <li>Paramètres</li>
    </ul>
  </aside>

  <!-- ✅ MAIN -->
  <main class="main">

    <!-- ✅ TOP BAR -->
    <div class="topbar">
      <input type="search" placeholder="Recherchez par nom, CIN, téléphone, produit...">
      <a href="#" class="logout">Déconnexion</a>
    </div>

    <!-- ✅ FORM -->
    <section class="panel">
      <h2>Ajouter un consommateur</h2>

      <form>
        <div class="form-row">
          <input type="text" placeholder="Nom et prénom">
        </div>

        <div class="form-row">
          <input type="text" placeholder="CIN">
          <input type="text" placeholder="Téléphone">
          <input type="text" placeholder="Montant">
        </div>

        <div class="form-row">
          <input type="text" placeholder="Produit acheté">
          <input type="text" placeholder="Montant du crédit">
          <input type="text" placeholder="Localisation">
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
              <button class="edit">Modifier</button>
              <button class="delete">Supprimer</button>
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
              <button class="edit">Modifier</button>
              <button class="delete">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>

    </section>

  </main>

</div>
