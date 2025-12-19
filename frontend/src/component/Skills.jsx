import React, { useEffect, useState } from 'react';
import { getSkills } from '../services/apiService';
import './skills.css';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Appel API - utilise uniquement les données du backend
        const data = await getSkills();
        
        if (data && Array.isArray(data)) {
          setSkills(data);
        } else {
          console.error('Données reçues invalides:', data);
          setSkills([]);
        }
      } catch (err) {
        console.error('Erreur lors du chargement des compétences:', err);
        setError('Impossible de charger les compétences. Vérifiez votre connexion au backend.');
        setSkills([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Grouper les compétences par catégorie (basé sur les données du backend)
  const groupSkillsByCategory = (skillsList) => {
    return skillsList.reduce((groups, skill) => {
      // Utilise la catégorie du backend ou "Autres" par défaut
      const category = skill.category || 'Autres';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(skill);
      return groups;
    }, {});
  };

  // Mapper les catégories aux icônes
  const getCategoryIcon = (category) => {
    const iconMap = {
      'Frontend': '💻',
      'Backend': '⚙️',
      'Database': '🗄️',
      'Cloud': '☁️',
      'Mobile': '📱',
      'Design': '🎨',
      'DevOps': '🔧',
      'Soft Skills': '🤝',
      'Autres': '✨'
    };
    return iconMap[category] || '✨';
  };

  // Mapper les catégories aux couleurs de dégradé
  const getCategoryGradient = (category) => {
    const gradientMap = {
      'Frontend': ['#00ff88', '#0088ff'],
      'Backend': ['#ff0088', '#8800ff'],
      'Database': ['#ff8800', '#ff0088'],
      'Cloud': ['#0088ff', '#00ff88'],
      'Mobile': ['#8800ff', '#ff0088'],
      'Design': ['#ff0088', '#ff8800'],
      'DevOps': ['#00ff88', '#8800ff'],
      'Soft Skills': ['#ff8800', '#0088ff'],
      'Autres': ['#0088ff', '#8800ff']
    };
    return gradientMap[category] || ['#0088ff', '#8800ff'];
  };

  // Animation des barres de progression
  useEffect(() => {
    if (!loading && skills.length > 0) {
      const timer = setTimeout(() => {
        document.querySelectorAll('.progress-bar').forEach(bar => {
          const level = parseInt(bar.dataset.level);
          if (level) {
            bar.style.width = `${level}%`;
          }
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading, skills]);

  // Rendu du loader
  if (loading) {
    return (
      <section className="skills-section" id="skills">
        <div className="circuit-bg"></div>
        <div className="loader-container">
          <div className="cyber-loader"></div>
        </div>
      </section>
    );
  }

  // Rendu d'erreur
  if (error) {
    return (
      <section className="skills-section" id="skills">
        <div className="circuit-bg"></div>
        <div className="skills-container">
          <div className="section-title">
            <h1 className="digital-title">Mes Compétences</h1>
            <div className="title-line"></div>
          </div>
          <div className="error-message" style={{
            textAlign: 'center',
            padding: '60px',
            color: '#ff4444',
            fontSize: '1.2rem'
          }}>
            {error}
          </div>
        </div>
      </section>
    );
  }

  // Grouper les compétences
  const groupedSkills = groupSkillsByCategory(skills);

  return (
    <section className="skills-section" id="skills">
      {/* Background effet circuit */}
      <div className="circuit-bg"></div>

      <div className="skills-container">
        {/* Titre */}
        <div className="section-title animate-fade-up">
          <h1 className="digital-title">Mes Compétences</h1>
          <p className="title-sub">
            Expertise technique spécialisée basée sur mes expériences réelles
          </p>
          <div className="title-line"></div>
        </div>

        {/* Grille de compétences */}
        <div className="skills-grid">
          {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => {
            const [color1, color2] = getCategoryGradient(category);
            
            return (
              <div 
                key={category} 
                className="skill-card animate-fade-up"
                style={{ animationDelay: `${categoryIndex * 0.1}s` }}
              >
                {/* En-tête de catégorie */}
                <div 
                  className="skill-header"
                  style={{
                    background: `linear-gradient(90deg, ${color1}20, ${color2}20)`
                  }}
                >
                  <div 
                    className="skill-icon"
                    style={{
                      background: `linear-gradient(45deg, ${color1}, ${color2})`
                    }}
                  >
                    {getCategoryIcon(category)}
                  </div>
                  <h2 className="skill-category">{category}</h2>
                </div>

                {/* Liste des compétences */}
                <div className="skill-content">
                  {categorySkills.map((skill, skillIndex) => (
                    <div 
                      key={skill._id || skillIndex} 
                      className="skill-item"
                      style={{ animationDelay: `${skillIndex * 0.05}s` }}
                    >
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-level">{skill.level || 0}%</span>
                      </div>
                      <div className="progress-container">
                        <div 
                          className="progress-bar"
                          data-level={skill.level || 0}
                          style={{
                            width: '0%',
                            background: `linear-gradient(90deg, ${color1}, ${color2})`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Section technologies maîtrisées */}
        {skills.length > 0 && (
          <div className="tech-mastery animate-fade-up delay-100">
            <div className="tech-header">
              <div className="tech-icon">🚀</div>
              <h2 className="tech-title">Technologies Maîtrisées</h2>
              <div className="tech-divider"></div>
            </div>
            
            <div className="tech-cloud">
              {skills.map((skill, index) => (
                <span 
                  key={skill._id || index} 
                  className="tech-tag"
                  style={{ animationDelay: `${index * 0.03}s` }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Message si aucune compétence */}
        {!loading && skills.length === 0 && (
          <div className="no-skills animate-fade-up" style={{
            textAlign: 'center',
            padding: '60px',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '1.2rem'
          }}>
            Aucune compétence disponible pour le moment.
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;