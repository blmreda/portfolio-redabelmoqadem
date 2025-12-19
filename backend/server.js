const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/database");
const path = require("path");

dotenv.config();

const app = express();

// Configuration CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL || 'https://portfolio-reda-henna.vercel.app'] // Specific to your Vercel app
    : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Connexion à la base de données
connectDB();

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// Routes
app.use("/api/projects", require("./src/routes/projectRoutes"));
app.use("/api/skills", require("./src/routes/skillRoutes"));
app.use("/api/contacts", require("./src/routes/contactRoutes"));

// Route de test pour vérifier que l'API fonctionne
app.get('/api', (req, res) => {
  res.json({ 
    message: '✅ API Portfolio fonctionne!',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Route de santé pour vérifier MongoDB
app.get('/api/health', (req, res) => {
  const mongoose = require('mongoose');
  res.json({ 
    status: 'OK',
    mongodb: mongoose.connection.readyState === 1 ? '✅ Connected' : '❌ Disconnected',
    timestamp: new Date().toISOString()
  });
});

// Gestion des erreurs 404
app.use((req, res) => {
  // For API routes, return JSON error
  if (req.path.startsWith('/api')) {
    res.status(404).json({ 
      error: 'Route non trouvée',
      path: req.path 
    });
  } else {
    // For non-API routes in production, serve the React app
    if (process.env.NODE_ENV === 'production' && req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    } else {
      res.status(404).json({ 
        error: 'Route non trouvée',
        path: req.path 
      });
    }
  }
});

// IMPORTANT: Export pour Vercel (serverless)
module.exports = app;

// Serveur local uniquement (pas en production Vercel)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5002;
  app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
    console.log(`📡 API disponible sur http://localhost:${PORT}/api`);
  });
}