
// Static data for skills
const STATIC_SKILLS = [
  {
    _id: "1",
    name: "React",
    level: 95,
    category: "Frontend"
  },
  {
    _id: "2",
    name: "JavaScript",
    level: 90,
    category: "Frontend"
  },
  {
    _id: "3",
    name: "Node.js",
    level: 85,
    category: "Backend"
  },
  {
    _id: "4",
    name: "MongoDB",
    level: 80,
    category: "Database"
  },
  {
    _id: "5",
    name: "HTML/CSS",
    level: 95,
    category: "Frontend"
  },
  {
    _id: "6",
    name: "Express",
    level: 85,
    category: "Backend"
  },
  {
    _id: "7",
    name: "Git",
    level: 80,
    category: "DevOps"
  },
  {
    _id: "8",
    name: "Responsive Design",
    level: 90,
    category: "Frontend"
  }
];

// Static data for projects
const STATIC_PROJECTS = [
  {
  _id: '1',
  title: 'Cafe Local',
  description: 'Site vitrine statique pour un café local mettant en valeur son ambiance chaleureuse et son menu. Conçu pour une navigation simple et agréable.',
  year: '2025',
  featured: true,
  technologies: ['HTML', 'CSS', 'Bootstrap'],
  github: 'https://github.com/blmreda/Cafe-Local-', // ton repo GitHub
  link: 'https://cafe-local.vercel.app', // l’URL Vercel une fois déployé
  category: 'Site statique / Vitrine',
  details: 'Ce site statique présente le café, son menu, ses images et ses informations de contact. Il est entièrement responsive et accessible sur tous les appareils.',
  features: 'Menu interactif, Galerie d’images, Informations de contact, Design responsive, Navigation simple et épurée'
},
{
  _id: '2',
  title: 'MOVIEFLIX',
  description: 'MOVIEFLIX est une application web développée avec React et Tailwind CSS qui consomme une API de films pour afficher, rechercher et consulter les détails des films populaires dans une interface moderne et responsive. 🎬',
  year: '2026',
  featured: true,
  technologies: ['React', 'TailwindCSS', 'API'],
  github: 'https://github.com/blmreda/MOVIEFLIX', // ton repo GitHub
  link: 'https://movieflixforreda.vercel.app/', // l’URL Vercel une fois déployé
  category: 'Application web / Plateforme de films',
  details: 'MOVIEFLIX est une application web qui affiche et explore des films via une API externe. Elle permet de découvrir, Ajouter, rechercher et consulter les détails des films dans une interface moderne et responsive.',
  features: 'Liste de films, Recherche en temps réel, Ajouter des films , Détails des films, Interface responsive, Navigation simple et fluide'

},

  
];

// Skills
export const getSkills = async () => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return STATIC_SKILLS;
  } catch (err) {
    console.error("Erreur API skills:", err);
    return [];
  }
};

// Projects
export const getProjects = async () => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return STATIC_PROJECTS;
  } catch (err) {
    console.error("Erreur API projects:", err);
    return [];
  }
};

// Contact form submission - simulate success
export const sendContact = async (contact) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validate contact data
    if (!contact.name || !contact.email || !contact.message) {
      throw new Error("Tous les champs sont requis");
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contact.email)) {
      throw new Error("Adresse email invalide");
    }
    
    // Return success response
    return {
      success: true,
      message: "Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais."
    };
  } catch (err) {
    console.error("Erreur API contact:", err);
    throw new Error(err.message || "Erreur lors de l'envoi du message");
  }
};