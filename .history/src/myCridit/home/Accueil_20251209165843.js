import { Link } from 'react-router-dom';
import './Acc.css';
const Accueil=()=>{
    return(
        <div>
               
    <header className="header1">
        <div className="header-left">
          <img src="./images/logo.png" className="logo" />
          <ul className="nav-list">
            <li><Link to="/"><strong>Home</strong></Link></li>
            <li><Link to="/about"><strong>About</strong></Link></li>
            <li><Link to="/Services"><strong>Services</strong></Link></li>
            <li><Link to="/contact"><strong>Contact</strong></Link></li>
          </ul>
        </div>

        <div className="header-right">
          <button className="btn-light">Login</button>
          <button className="btn-primary">Sign Up</button>
        </div>
    </header>

    <section className="hero">
      <div className="hero-container">
        <div className="hero-left">
      
          <div className="hero-text">
            <h1>
          Manage Your <br />
          Credit Transactions With<br />
          Confidence
            </h1>
           <p>
          Track, organize, and secure your credit dealings easily on MY CREDITE.
          </p>
          </div>

        <div className="cards-wrapper">
          <div className="card">
            <h3>Seller Dashboard</h3>
            <p>Manage your clients, track credits, and secure your transactions.</p>
            <Link to="/seller-panel" className="card-btn">Go to Seller Panel</Link>
          </div>

        <div className="card">
          <h3>Consumer Dashboard</h3>
          <p>View your payment history, pending credits, and transactions clearly.</p>
          <Link to="/consumer-panel" className="card-btn"> Go to Consumer Panel</Link>
        </div>
      </div>
    </div>

    <div className="hero-right">
      <img src="./images/Hero2.png" alt="MY CRIDITE Illustration" className="hero-image" />
    </div>

  </div>
</section>
   <section className='pr'>
      <h1>Welcome to MY CREDITE</h1>
            <div class="feature">
              <div class="icon">💳</div>
                <h2>Credit Management</h2>
                <p>Record and track your credits without loss.</p>
             </div>
              <div class="feature">
              <div class="icon">🔍</div>
                <h2>Quick Search</h2>
                <p>Find your clients or sellers instantly.</p>
              </div>
      <div class="feature">
        <div class="icon">🛡️</div>
          <h2>Secure Payment</h2>
          <p>Make your payments directly on the site.</p>
      </div>
  </section>
   <footer class="footer">
      <div class="footer-container">
        <div class="footer-section">
          <h3>MY CREDITE</h3>
          <p>Simplifying and securing the credit process for sellers and consumers.</p>
        </div>

      <div class="footer-section">
        <h4>Quick Links</h4>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/seller-login">Seller Login</Link></li>
          <li><Link to="/consumer-login">Consumer Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>Contact</h4>
        <p>Email: mycredite2025@gmail.com</p>
        <p>Phone: +212 653 699 312</p>
      </div>
    </div>

      <div class="footer-bottom">
        <p>© 2025 MY CRIDITE. All rights reserved.</p>
      </div>
</footer>
        </div>
    )
}
export default Accueil