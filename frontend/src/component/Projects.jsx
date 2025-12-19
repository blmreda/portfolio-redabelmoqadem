import React, { useState, useEffect } from 'react';
import { getProjects } from '../services/apiService'; // Importez votre fonction API
import './projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('Tous');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Charger les projets depuis l'API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error('Erreur lors du chargement des projets:', err);
        setError('Impossible de charger les projets. Vérifiez votre connexion.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Extraire toutes les technologies pour les filtres
  const allTechnologies = [
    'Tous',
    ...new Set(projects.flatMap(project => project.technologies || []))
  ];

  // Filtrer les projets
  const filteredProjects = filter === 'Tous' 
    ? projects 
    : projects.filter(project => 
        project.technologies?.some(tech => 
          tech.toLowerCase().includes(filter.toLowerCase())
        )
      );

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
    setTimeout(() => {
      document.body.style.overflow = 'unset';
    }, 500);
  };

  // Rendu du loader
  if (loading) {
    return (
      <section className="projects-section">
        <div className="loader-container">
          <div className="hologram-loader"></div>
          <p style={{ color: '#00ffff', marginTop: '20px' }}>
            Chargement des projets...
          </p>
        </div>
      </section>
    );
  }

  // Rendu en cas d'erreur
  if (error) {
    return (
      <section className="projects-section">
        <div className="error-container" style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          color: '#ff4444'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚠️</div>
          <h2 style={{ color: '#ff4444', marginBottom: '10px' }}>Erreur</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            🔄 Réessayer
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="projects-section" id="projects">
      {/* Effets de fond */}
      <div className="cosmic-bg"></div>
      <div className="grid-overlay"></div>

      <div className="projects-container">
        {/* Titre */}
        <div className="section-title animate-fade-up">
          <h1 className="title-hologram">🚀 Mes Projets</h1>
          <p className="title-sub">
            Innovations techniques et réalisations concrètes qui repoussent les limites du possible
          </p>
          <div className="title-underline"></div>
        </div>

        {/* Filtres */}
        {allTechnologies.length > 1 && (
          <div className="filter-section animate-fade-up delay-100">
            <div className="filter-header">
              <div className="filter-icon">🔧</div>
              <h2 className="filter-title">Filtrer par technologie</h2>
            </div>
            <div className="filter-tags">
              {allTechnologies.slice(0, 10).map((tech, index) => (
                <button
                  key={tech}
                  className={`filter-tag ${filter === tech ? 'active' : ''} animate-fade-up`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => setFilter(tech)}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Grille de projets */}
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div 
              key={project._id} 
              className="project-card animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Badge vedette */}
              {project.featured && (
                <div className="featured-badge">
                  <span>⭐</span> Vedette
                </div>
              )}

              {/* Image/Glow du projet */}
              <div className="project-image">
                <div className="project-glow"></div>
                {project.imageUrl ? (
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '12px'
                    }}
                  />
                ) : (
                  <div className="project-icon">💻</div>
                )}
                
                {/* Overlay d'actions */}
                <div className="project-overlay">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="action-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      🔗
                    </a>
                  )}
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="action-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      🌐
                    </a>
                  )}
                  <button 
                    className="action-btn"
                    onClick={() => handleOpenModal(project)}
                  >
                    👁️
                  </button>
                </div>
              </div>

              {/* Contenu */}
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  {project.year && (
                    <div className="project-year">
                      <span>📅</span> {project.year}
                    </div>
                  )}
                </div>

                <p className="project-description">
                  {project.description || 'Aucune description disponible'}
                </p>

                {project.technologies && project.technologies.length > 0 && (
                  <>
                    <div className="tech-label">
                      <span>⚙️</span> Technologies utilisées :
                    </div>
                    <div className="tech-tags">
                      {project.technologies.slice(0, 3).map(tech => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="tech-more">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </>
                )}

                <button 
                  className="details-btn"
                  onClick={() => handleOpenModal(project)}
                >
                  <span>Voir les détails</span>
                  <span>➔</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucun projet */}
        {filteredProjects.length === 0 && (
          <div className="no-projects animate-fade-up">
            <div className="no-projects-icon">🔍</div>
            <h2 className="no-projects-title">Aucun projet trouvé</h2>
            <p className="no-projects-text">
              {projects.length === 0 
                ? "Aucun projet n'a encore été ajouté à la base de données."
                : `Aucun projet ne correspond au filtre "${filter}". Essayez une autre technologie ou revenez à "Tous".`
              }
            </p>
            {projects.length > 0 && (
              <button 
                className="reset-filter-btn"
                onClick={() => setFilter('Tous')}
              >
                <span>🔁</span> Voir tous les projets
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal de détails */}
      {selectedProject && (
        <div className={`modal-overlay ${showModal ? 'active' : ''}`}>
          <div className="modal-content">
            <button className="close-modal-btn" onClick={handleCloseModal}>
              ✕
            </button>

            {/* Header */}
            <div className="modal-header">
              <div className="modal-title-section">
                <h2 className="modal-title">{selectedProject.title}</h2>
                {selectedProject.featured && (
                  <div className="featured-badge">
                    <span>⭐</span> Projet Vedette
                  </div>
                )}
              </div>
              <p className="modal-subtitle">
                {selectedProject.year && `${selectedProject.year} • `}
                {selectedProject.category || 'Projet'}
              </p>
            </div>

            {/* Body */}
            <div className="modal-body">
              <p className="modal-description">{selectedProject.description}</p>

              {selectedProject.details && (
                <div className="modal-section">
                  <h3 className="modal-section-title">
                    <span>📋</span> Détails du projet
                  </h3>
                  <p className="modal-description">{selectedProject.details}</p>
                </div>
              )}

              {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                <div className="modal-section">
                  <h3 className="modal-section-title">
                    <span>⚙️</span> Technologies utilisées
                  </h3>
                  <div className="modal-tech-tags">
                    {selectedProject.technologies.map(tech => (
                      <span key={tech} className="modal-tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              )}

              {selectedProject.features && (
                <div className="modal-section">
                  <h3 className="modal-section-title">
                    <span>✨</span> Fonctionnalités principales
                  </h3>
                  <ul className="modal-features">
                    {selectedProject.features.split(',').map((feature, index) => (
                      <li key={index} className="modal-feature">
                        <span>✓</span> {feature.trim()}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <div className="modal-actions-left">
                <button className="social-action">
                  ❤️
                </button>
                <button className="social-action">
                  🔗
                </button>
              </div>

              <div className="modal-actions-right">
                <button className="modal-btn close" onClick={handleCloseModal}>
                  <span>✕</span> Fermer
                </button>
                {selectedProject.github && (
                  <a 
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-btn source"
                  >
                    <span>💻</span> Code Source
                  </a>
                )}
                {selectedProject.link && (
                  <a 
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-btn visit"
                  >
                    <span>🌐</span> Visiter
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;