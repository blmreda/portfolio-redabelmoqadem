import React, { useState, useEffect } from 'react';
import Skills from './component/Skills';
import Projects from './component/Projects';
import Contact from './component/Contact';
import './navbar.css';
import './App.css';

// Composant HomeSection
const HomeSection = ({ scrollToSection }) => {
  const [animatedStats, setAnimatedStats] = useState({
    projects: 0,
    experience: 0,
    satisfaction: 0
  });

  useEffect(() => {
    const animateNumbers = () => {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;

        setAnimatedStats({
          projects: Math.floor(50 * progress),
          experience: Math.floor(3 * progress),
          satisfaction: Math.floor(100 * progress)
        });

        if (step >= steps) {
          clearInterval(timer);
          setAnimatedStats({
            projects: 50,
            experience: 3,
            satisfaction: 100
          });
        }
      }, interval);

      return () => clearInterval(timer);
    };

    // Démarrer l'animation après 500ms
    const timeout = setTimeout(animateNumbers, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="home" className="home-section">
      <div className="home-container">
        <div className="home-content">
          {/* Côté gauche : Texte et informations */}
          <div className="home-text">
            <h1 className="home-title">
              <span className="title-line">Bienvenue sur mon</span>
              <span className="title-gradient">Portfolio</span>
            </h1>
            
            <p className="home-subtitle">
            Développeur Full Stack orienté performance et innovation, avec une expérience dans la conception, le développement et l’optimisation d’applications web modernes. Je m’investis dans chaque projet avec rigueur, créativité et un esprit de résolution de problèmes.
            </p>

            <div className="home-buttons">
              <button 
                className="home-btn primary"
                onClick={() => scrollToSection('projects')}
              >
                <span>🚀</span>
                <span>Voir mes projets</span>
              </button>
              
              <button 
                className="home-btn secondary"
                onClick={() => scrollToSection('contact')}
              >
                <span>✉️</span>
                <span>Me contacter</span>
              </button>
            </div>

            <div className="home-stats">
              <div className="stat-card">
                <div className="stat-number">{animatedStats.projects}+</div>
                <div className="stat-label">Projets réalisés</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-number">{animatedStats.experience}+</div>
                <div className="stat-label">Années d'expérience</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-number">{animatedStats.satisfaction}%</div>
                <div className="stat-label">Satisfaction client</div>
              </div>
            </div>
          </div>

          {/* Côté droit : Photo avec effets */}
          <div className="home-photo-container">
            <div className="photo-frame">
              <div className="photo-glow"></div>
              <div className="photo-gradient-border"></div>
              <img 
                src="/images/Reda.JPG" 
                alt="Reda - Développeur Full Stack"
                className="profile-photo"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'photo-fallback';
                  fallback.innerHTML = 'RD';
                  e.target.parentNode.appendChild(fallback);
                }}
              />
              
              {/* Badge animé sur la photo */}
              <div className="photo-badge">
                <span className="badge-icon">💻</span>
                <span className="badge-text">Développeur</span>
              </div>
              
              {/* Éléments décoratifs */}
              <div className="floating-element element-1">React</div>
              <div className="floating-element element-2">Node.js</div>
              <div className="floating-element element-3">TypeScript</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Composant Navbar
const ProfessionalNavbar = ({ activeSection, onNavClick, isScrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Accueil', icon: '🏠' },
    { id: 'skills', label: 'Compétences', icon: '⚡' },
    { id: 'projects', label: 'Projets', icon: '🚀' },
    { id: 'contact', label: 'Contact', icon: '✉️' },
  ];

  // Créer des particules pour le menu mobile
  useEffect(() => {
    if (mobileMenuOpen) {
      const particlesContainer = document.querySelector('.mobile-menu-particles');
      if (!particlesContainer) return;

      // Créer 20 particules
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'mobile-particle';
        
        // Position aléatoire
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${Math.random() * 5 + 5}s`;
        
        particlesContainer.appendChild(particle);
      }

      return () => {
        particlesContainer.innerHTML = '';
      };
    }
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : 'unset';
  };

  const handleNavClick = (sectionId) => {
    onNavClick(sectionId);
    setMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <div className={`navbar-container ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-content">
          {/* Logo */}
          <a 
            href="#home" 
            className="navbar-logo"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
          >
            <div className="logo-icon">DEV</div>
            <span className="logo-text">Portfolio</span>
          </a>

          {/* Navigation Desktop */}
          <nav className="navbar-nav">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.label}</span>
              </a>
            ))}
            
            <button 
              className="nav-cta"
              onClick={() => handleNavClick('contact')}
            >
              <span>✉️</span>
              <span>Contactez-moi</span>
              <span>➔</span>
            </button>
          </nav>

          {/* Menu Mobile Button */}
          <button 
            className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
          >
            <span className="menu-line"></span>
            <span className="menu-line"></span>
            <span className="menu-line"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}>
        {/* Particules */}
        <div className="mobile-menu-particles"></div>
        
        <button className="close-menu-btn" onClick={toggleMobileMenu}>
          ×
        </button>
        
        <div className="mobile-nav-links">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
            >
              <span className="mobile-nav-icon">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

// Composant pour le bouton "Back to Top"
const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button 
      className="scroll-top-btn"
      onClick={scrollToTop}
      aria-label="Retour en haut"
    >
      <span className="scroll-top-icon">↑</span>
    </button>
  );
};

// Composant Footer
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-icon">DEV</span>
              <span className="footer-logo-text">Portfolio</span>
            </div>
            <p className="footer-description">
              Développeur Full Stack • {currentYear}
            </p>
          </div>

          <div className="footer-social">
            <a href="#" className="social-link" aria-label="LinkedIn">
              <span className="social-icon">👔</span>
            </a>
            <a href="#" className="social-link" aria-label="GitHub">
              <span className="social-icon">💻</span>
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <span className="social-icon">🐦</span>
            </a>
          </div>

          <div className="footer-copyright">
            © {currentYear} Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
};

// Composant principal App
function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Détection du scroll
      setIsScrolled(window.scrollY > 50);

      // Détection de la section active
      const sections = ['home', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 90; // Hauteur du navbar
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="app">
      {/* Navbar Professionnel */}
      <ProfessionalNavbar 
        activeSection={activeSection}
        onNavClick={scrollToSection}
        isScrolled={isScrolled}
      />

      {/* Contenu principal */}
      <div id="back-to-top-anchor"></div>
      
      {/* Sections */}
      <HomeSection scrollToSection={scrollToSection} />
      <Skills />
      <Projects />
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Bouton Back to Top */}
      <ScrollTop />
    </div>
  );
}

export default App;