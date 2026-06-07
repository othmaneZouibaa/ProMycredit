import { Link } from 'react-router-dom';
import './Acc.css';
import { useTranslation } from 'react-i18next';

const Accueil = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-wrapper">
      <header className="header1">
        <div className="header-left">
          <div className="brand-logo-main">MC</div>
          <span className="brand-name-main">MY CREDITE</span>
          <ul className="nav-list">
            <li><Link to="/"><strong>{t('home.nav_home')}</strong></Link></li>
            <li><a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}><strong>{t('home.nav_features')}</strong></a></li>
            <li><a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}><strong>{t('home.nav_how_it_works')}</strong></a></li>
            <li><a href="#trust-score" onClick={(e) => { e.preventDefault(); scrollToSection('trust-score'); }}><strong>{t('home.nav_trust')}</strong></a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}><strong>{t('home.nav_contact')}</strong></a></li>
          </ul>
        </div>

        <div className="header-right">
          <div className="lang-switcher-home">
            <button onClick={() => changeLanguage('ar')} className={i18n.language === 'ar' ? 'active' : ''}>MA</button>
            <button onClick={() => changeLanguage('fr')} className={i18n.language === 'fr' ? 'active' : ''}>FR</button>
            <button onClick={() => changeLanguage('en')} className={i18n.language === 'en' ? 'active' : ''}>US</button>
          </div>
          <Link to="/login"><button className="btn-light">{t('home.login')}</button></Link>
          <Link to="/signup"><button className="btn-primary">{t('home.signup')}</button></Link>
        </div>
      </header>

      <section className="hero">
        <div className="hero-container">
          <div className="hero-left">
            <div className="hero-text">
              <span className="hero-badge">{t('home.hero_badge')}</span>
              <h1>{t('home.hero_title')}</h1>
              <p>{t('home.hero_subtitle')}</p>
            </div>

            <div className="cards-wrapper">
              <div className="card-modern">
                <div className="card-icon">🏬</div>
                <h3>{t('home.seller_card_title')}</h3>
                <p>{t('home.seller_card_desc')}</p>
                <Link to="/seller-panel" className="card-btn-modern">{t('home.cta_seller')}</Link>
              </div>

              <div className="card-modern">
                <div className="card-icon">👤</div>
                <h3>{t('home.consumer_card_title')}</h3>
                <p>{t('home.consumer_card_desc')}</p>
                <Link to="/consumer-panel" className="card-btn-modern">{t('home.cta_consumer')}</Link>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-image-wrapper">
              <img src="./images/Hero2.png" alt="MY CRIDITE" className="hero-image-main" />
              <div className="floating-stat">
                <span className="stat-icon">🛡️</span>
                <div>
                  <p>{t('consumer.trust_score')}</p>
                  <strong>{t('home.secured_badge')}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="section-title">
          <h2>{t('home.features_title')}</h2>
          <div className="title-underline"></div>
        </div>
        
        <div className="features-grid">
          <div className="feature-card-modern">
            <div className="feature-icon">💳</div>
            <h3>{t('home.feature_1_title')}</h3>
            <p>{t('home.feature_1_desc')}</p>
          </div>
          <div className="feature-card-modern">
            <div className="feature-icon">🔍</div>
            <h3>{t('home.feature_2_title')}</h3>
            <p>{t('home.feature_2_desc')}</p>
          </div>
          <div className="feature-card-modern">
            <div className="feature-icon">🛡️</div>
            <h3>{t('home.feature_3_title')}</h3>
            <p>{t('home.feature_3_desc')}</p>
          </div>
        </div>
      </section>

      <section className="how-it-works" id="how-it-works" style={{ padding: '100px 5%', background: '#f8fafc' }}>
        <div className="section-title">
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800' }}>{t('home.nav_how_it_works')}</h2>
          <div className="title-underline"></div>
        </div>
        <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', maxWidth: '1200px', margin: '48px auto' }}>
          {[
            { step: '1', title: t('home.step_1_title'), desc: t('home.step_1_desc') },
            { step: '2', title: t('home.step_2_title'), desc: t('home.step_2_desc') },
            { step: '3', title: t('home.step_3_title'), desc: t('home.step_3_desc') },
            { step: '4', title: t('home.step_4_title'), desc: t('home.step_4_desc') }
          ].map((item, idx) => (
            <div key={idx} className="step-card" style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{ width: '50px', height: '50px', background: 'var(--primary-home)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontWeight: '800', fontSize: '1.2rem' }}>{item.step}</div>
              <h4 style={{ marginBottom: '12px', fontWeight: '700' }}>{item.title}</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted-home)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer" id="contact">
        <div className="footer-container">
          <div className="footer-section">
            <div className="footer-brand">
              <div className="brand-logo-main small">MC</div>
              <h3>MY CREDITE</h3>
            </div>
            <p>{t('home.footer_desc')}</p>
          </div>

          <div className="footer-section">
            <h4>{t('home.footer_links')}</h4>
            <ul>
              <li><Link to="/">{t('home.nav_home')}</Link></li>
              <li><Link to="/login">{t('home.seller_login')}</Link></li>
              <li><Link to="/login">{t('home.consumer_login')}</Link></li>
              <li><Link to="/signup">{t('home.signup')}</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>{t('home.footer_contact')}</h4>
            <p>📍 {t('home.footer_address')}</p>
            <p>📧 mycredite2025@gmail.com</p>
            <p>📞 +212 653 699 312</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t('home.footer_copy')}</p>
        </div>
      </footer>
    </div>
  );
};

export default Accueil;