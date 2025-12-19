import React, { useState, useEffect } from 'react';
import './contact.css';
import { sendContact } from '../services/apiService'; // Assurez-vous que le chemin est correct

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: 'success',
    message: ''
  });

  // Créer les particules animées
  useEffect(() => {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;

    // Créer 30 particules
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 2 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 15}s`;
      const duration = Math.random() * 10 + 10;
      particle.style.animationDuration = `${duration}s`;
      
      particlesContainer.appendChild(particle);
    }

    return () => {
      particlesContainer.innerHTML = '';
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation simple
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showNotification('error', '❌ Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showNotification('error', '❌ Veuillez entrer une adresse email valide.');
      return;
    }
    
    setLoading(true);

    try {
      // Appel réel à l'API backend
      const response = await sendContact(formData);
      
      // Si le backend renvoie un message de succès
      const successMessage = response.message || '🎉 Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.';
      showNotification('success', successMessage);
      
      // Réinitialiser le formulaire
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      // Afficher l'erreur du backend
      showNotification('error', `❌ ${error.message}`);
      console.error('Erreur lors de l\'envoi du formulaire:', error);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type, message) => {
    setNotification({
      show: true,
      type,
      message
    });

    // Masquer la notification après 5 secondes
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  // ... (le reste du code reste identique : contactInfo, guarantees, render, etc.)
  // Assurez-vous d'avoir toutes les infos de contact et garanties comme avant

  const contactInfo = [
    {
      icon: '✉️',
      type: 'email',
      title: 'Email Professionnel',
      detail: 'redabelmoqadem@gmail.com',
      subtitle: 'Réponse sous 24h maximum'
    },
    {
      icon: '📱',
      type: 'phone',
      title: 'Téléphone',
      detail: '+216 (0)76 476 694',
      subtitle: 'Lun-Ven • 9h-18h'
    },
    {
      icon: '📍',
      type: 'location',
      title: 'Localisation',
      detail: 'Rabat, Maroc',
      subtitle: 'Disponible en remote partout'
    }
  ];

  const guarantees = [
    { icon: '⚡', text: 'Réponse rapide en moins de 24h', color: '#00dbde' },
    { icon: '🔒', text: 'Données 100% sécurisées & chiffrées', color: '#fc00ff' },
    { icon: '🎯', text: 'Solutions personnalisées sur mesure', color: '#00ff88' },
    { icon: '🤝', text: 'Accompagnement professionnel complet', color: '#ff9900' }
  ];

  return (
    <section className="contact-section" id="contact">
      {/* Effets de lumière */}
      <div className="light-effect light-1"></div>
      <div className="light-effect light-2"></div>
      
      {/* Particules animées */}
      <div className="particles"></div>
      
      <div className="contact-container animate-in">
        {/* Côté gauche : Informations */}
        <div className="info-card animate-in delay-1">
          <h2 className="info-title">Contact Direct</h2>
          
          <div className="info-list">
            {contactInfo.map((info, index) => (
              <div 
                key={index} 
                className="info-item animate-in"
                style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
              >
                <div className={`info-icon ${info.type}`}>
                  {info.icon}
                </div>
                <div className="info-content">
                  <h4>{info.title}</h4>
                  <p>{info.detail}</p>
                  <span>{info.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="guarantees">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="guarantee-item animate-in delay-2">
                <div 
                  className="guarantee-icon"
                  style={{ background: guarantee.color }}
                >
                  {guarantee.icon}
                </div>
                <div className="guarantee-text">
                  {guarantee.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Côté droit : Formulaire */}
        <div className="contact-form-container animate-in delay-3">
          <h2 className="form-title">Parlons Projet !</h2>
          <p className="form-subtitle">
            Vous avez un projet en tête ? Parlons-en ! Remplissez le formulaire et je vous 
            répondrai personnellement pour discuter de votre vision.
          </p>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder=" "
                disabled={loading}
              />
              <label>Votre nom complet *</label>
            </div>
            
            <div className="form-group">
              <input
                type="email"
                className="form-input"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder=" "
                disabled={loading}
              />
              <label>Votre adresse email *</label>
            </div>
            
            <div className="form-group">
              <textarea
                className="form-input"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder=" "
                rows="5"
                disabled={loading}
              ></textarea>
              <label>Votre message *</label>
            </div>
            
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span>Envoi en cours...</span>
                  <div className="submit-icon">⏳</div>
                </>
              ) : (
                <>
                  <span>Envoyer le message</span>
                  <div className="submit-icon">🚀</div>
                </>
              )}
            </button>
          </form>
          
          <div className="confidentiality animate-in delay-4">
            <div className="confidentiality-icon">🔒</div>
            <div className="confidentiality-text">
              Vos informations sont traitées de manière confidentielle. 
              Elles ne seront jamais partagées avec des tiers.
            </div>
          </div>
          
          <div className="response-time animate-in delay-4">
            <div className="response-header">
              <div className="response-icon">⏱️</div>
              <h3 className="response-title">Temps de réponse garanti</h3>
            </div>
            <div className="response-details">
              • Projets urgents : 2-4 heures<br/>
              • Demandes standards : Moins de 24h<br/>
              • Devis détaillés : Sous 48h
            </div>
          </div>
        </div>
      </div>
      
      {/* Notification */}
      {notification.show && (
        <div className={`notification ${notification.type} show`}>
          <div className="notification-icon">
            {notification.type === 'success' ? '✅' : '❌'}
          </div>
          <div className="notification-message">{notification.message}</div>
        </div>
      )}
    </section>
  );
};

export default Contact;