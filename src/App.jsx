import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const serviceCardsRef = useRef([])
  const portfolioItemsRef = useRef([])
  const aboutSectionsRef = useRef([])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    
    // Initialize intersection observers for scroll animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)
    
    // Observe service cards
    serviceCardsRef.current.forEach(card => {
      if (card) observer.observe(card)
    })
    
    // Observe portfolio items
    portfolioItemsRef.current.forEach(item => {
      if (item) observer.observe(item)
    })
    
    // Observe about sections
    aboutSectionsRef.current.forEach(section => {
      if (section) observer.observe(section)
    })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  const navItems = [
    { label: 'Ana Sayfa', href: '#home' },
    { label: 'Hizmetler', href: '#services' },
    { label: 'Projeler', href: '#portfolio' },
    { label: 'Hakkımızda', href: '#about' },
    { label: 'İletişim', href: '#contact' },
  ]

  const services = [
    {
      icon: '💡',
      title: 'Cephe Aydınlatma',
      description: 'Modern bina cephelerine özel LED aydınlatma çözümleri ile estetik ve enerji verimliliği.'
    },
    {
      icon: '🏢',
      title: 'Endüstriyel Aydınlatma',
      description: 'Fabrika, depo ve endüstriyel tesisler için profesyonel aydınlatma sistemleri.'
    },
    {
      icon: '🌳',
      title: 'Peyzaj Aydınlatma',
      description: 'Bahçe, park ve açık alanlar için doğa dostu LED aydınlatma çözümleri.'
    },
    {
      icon: '🛣️',
      title: 'Yol Aydınlatma',
      description: 'Şehir içi ve şehirlerarası yollar için güvenli ve ekonomik aydınlatma sistemleri.'
    },
    {
      icon: '⚡',
      title: 'Enerji Çözümleri',
      description: 'Yenilenebilir enerji kaynakları ile entegre aydınlatma sistemleri.'
    },
    {
      icon: '🤖',
      title: 'Akıllı Sistemler',
      description: 'IoT tabanlı akıllı aydınlatma kontrol ve yönetim sistemleri.'
    }
  ]

  const portfolioItems = [
    { id: 1, title: 'İstanbul Finans Merkezi', category: 'Cephe Aydınlatma', image: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 2, title: 'Ankara Otoyol Projesi', category: 'Yol Aydınlatma', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 3, title: 'İzmir Liman Aydınlatması', category: 'Endüstriyel', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 4, title: 'Bodrum Marina', category: 'Peyzaj', image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 5, title: 'Teknopark İstanbul', category: 'Akıllı Sistemler', image: 'https://images.unsplash.com/photo-1487956382158-bb926046304a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 6, title: 'AVM Cephe Aydınlatma', category: 'Cephe', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
  ]

  return (
    <>
      {/* Header */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <div className="logo">
            LINE<span>O</span>
          </div>
          
          <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </nav>
          
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-bg"></div>
        <div className="container">
          <div className="hero-content">
            <h1>
              Aydınlatma <span className="text-primary">Mühendisliğinde</span><br />
              Yenilikçi Çözümler
            </h1>
            <p>
              20 yılı aşkın tecrübemizle, Türkiye'nin önde gelen aydınlatma mühendisliği firması olarak 
              enerji verimli, çevre dostu ve estetik aydınlatma çözümleri sunuyoruz.
            </p>
            <div className="hero-buttons">
              <a href="#contact" className="btn btn-primary">Proje Talebi Gönder</a>
              <a href="#portfolio" className="btn btn-outline">Projelerimizi İnceleyin</a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section bg-darker">
        <div className="container">
          <div className="section-title">
            <h2>Hizmetlerimiz</h2>
            <p>Modern teknolojiler ve uzman ekibimizle sunduğumuz kapsamlı aydınlatma çözümleri</p>
          </div>
          
          <div className="services-grid">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card"
                ref={el => serviceCardsRef.current[index] = el}
              >
                <div className="service-icon">
                  <span>{service.icon}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section">
        <div className="container">
          <div className="section-title">
            <h2>Tamamlanan Projeler</h2>
            <p>Türkiye'nin dört bir yanında hayata geçirdiğimiz başarılı projelerimiz</p>
          </div>
          
          <div className="portfolio-grid">
            {portfolioItems.map((item, index) => (
              <div
                key={item.id}
                className="portfolio-item"
                ref={el => portfolioItemsRef.current[index] = el}
              >
                <img src={item.image} alt={item.title} className="portfolio-image" />
                <div className="portfolio-overlay">
                  <h4>{item.title}</h4>
                  <p className="text-primary">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section bg-darker">
        <div className="container">
          <div className="section-title">
            <h2>Hakkımızda</h2>
            <p>Lineo Aydınlatma Mühendisliği olarak vizyonumuz ve misyonumuz</p>
          </div>
          
          <div className="about-content">
            <div ref={el => aboutSectionsRef.current[0] = el}>
              <h3>20+ Yıllık Tecrübe</h3>
              <p>
                2003 yılından bu yana aydınlatma sektöründe faaliyet gösteren firmamız,
                Türkiye'nin en büyük aydınlatma projelerine imza atmıştır.
              </p>
              <p>
                Uzman mühendis kadromuz ve son teknoloji ekipmanlarımızla,
                müşterilerimize en kaliteli hizmeti sunmayı hedefliyoruz.
              </p>
              
              <div className="about-stats">
                <div className="stat-item">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Tamamlanan Proje</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Uzman Personel</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">20+</div>
                  <div className="stat-label">Yıllık Tecrübe</div>
                </div>
              </div>
            </div>
            
            <div ref={el => aboutSectionsRef.current[1] = el}>
              <h3>Neden Bizi Tercih Etmelisiniz?</h3>
              <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>✓</span>
                  <span>Enerji verimliliği odaklı çözümler</span>
                </li>
                <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>✓</span>
                  <span>Çevre dostu ve sürdürülebilir teknolojiler</span>
                </li>
                <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>✓</span>
                  <span>7/24 teknik destek ve bakım hizmeti</span>
                </li>
                <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>✓</span>
                  <span>Uluslararası standartlarda kalite kontrol</span>
                </li>
                <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>✓</span>
                  <span>Özelleştirilmiş proje çözümleri</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container">
          <div className="section-title">
            <h2>İletişim</h2>
            <p>Projeleriniz için ücretsiz keşif ve teklif talebinde bulunun</p>
          </div>
          
          <div className="contact-form">
            <form>
              <div className="form-group">
                <input type="text" className="form-input" placeholder="Adınız Soyadınız" required />
              </div>
              
              <div className="form-group">
                <input type="email" className="form-input" placeholder="E-posta Adresiniz" required />
              </div>
              
              <div className="form-group">
                <input type="tel" className="form-input" placeholder="Telefon Numaranız" />
              </div>
              
              <div className="form-group">
                <input type="text" className="form-input" placeholder="Proje Konusu" required />
              </div>
              
              <div className="form-group">
                <textarea className="form-input" placeholder="Proje Detayları" required></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Gönder
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer section">
        <div className="container">
          <div className="footer-content">
            <div>
              <div className="footer-logo">LINE<span className="text-primary">O</span></div>
              <p>
                Aydınlatma mühendisliğinde yenilikçi çözümler sunan, 
                Türkiye'nin önde gelen firmalarından biriyiz.
              </p>
              <div className="social-links">
                <a href="#" className="social-link">📘</a>
                <a href="#" className="social-link">📷</a>
                <a href="#" className="social-link">💼</a>
                <a href="#" className="social-link">📹</a>
              </div>
            </div>
            
            <div className="footer-links">
              <h4>Hızlı Bağlantılar</h4>
              <ul>
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="footer-links">
              <h4>İletişim Bilgileri</h4>
              <ul>
                <li>📍 İstanbul, Türkiye</li>
                <li>📞 +90 (212) 123 45 67</li>
                <li>📧 info@lineo.com.tr</li>
                <li>🕗 Pazartesi - Cuma: 09:00 - 18:00</li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2023 Lineo Aydınlatma Mühendisliği. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
