import axios from "axios";

// Assure-toi que le port correspond à ton backend
const API_BASE = "http://localhost:5002/api";

// Skills
export const getSkills = async () => {
  try {
    const res = await axios.get(`${API_BASE}/skills`);
    return res.data;
  } catch (err) {
    console.error("Erreur API skills:", err);
    return [];
  }
};

// Projects
export const getProjects = async () => {
  try {
    const res = await axios.get(`${API_BASE}/projects`);
    return res.data;
  } catch (err) {
    console.error("Erreur API projects:", err);
    return [];
  }
};

// Dans votre fichier api.js
export const sendContact = async (contact) => {
  try {
    const res = await axios.post(`${API_BASE}/contacts`, contact, {
      headers: { "Content-Type": "application/json" },
      timeout: 10000,
    });
    return res.data;
  } catch (err) {
    console.error("Erreur API contact:", err);
    
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message || err.response.data.error || "Erreur serveur");
    }
    
    if (err.message.includes("Network Error")) {
      throw new Error("Impossible de se connecter au serveur. Vérifiez votre backend.");
    }
    if (err.code === "ECONNABORTED") {
      throw new Error("Délai d'attente dépassé. Réessayez.");
    }
    
    throw new Error(err.message || "Erreur inconnue");
  }
};