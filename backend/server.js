const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/database");
const path = require("path");
const fs = require("fs");  // Ajoutez cette ligne

dotenv.config();

const app = express();

// DEBUG: Check paths
console.log('=== DEBUG INFO ===');
console.log('Current directory:', __dirname);
const frontendDistPath = path.join(__dirname, '../frontend/dist');
console.log('Frontend dist path:', frontendDistPath);

if (fs.existsSync(frontendDistPath)) {
  console.log('✓ Frontend dist exists!');
  console.log('Files in dist:', fs.readdirSync(frontendDistPath));
} else {
  console.log('✗ Frontend dist NOT found!');
  console.log('Checking frontend directory...');
  const frontendPath = path.join(__dirname, '../frontend');
  if (fs.existsSync(frontendPath)) {
    console.log('Frontend files:', fs.readdirSync(frontendPath));
  }
}

// Configuration CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL || 'https://portfolio-redabelmoqadem.vercel.app'] // 
    : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Connexion à la base de données
connectDB();

// Serve static files - CORRIGEZ LE CHEMIN ICI
if (process.env.NODE_ENV === 'production') {
  // CORRECTION: Utilisez le bon chemin
  const staticPath = frontendDistPath;
  
  if (fs.existsSync(staticPath)) {
    console.log(`✅ Serving static files from: ${staticPath}`);
    app.use(express.static(staticPath));
  } else {
    console.log(`❌ Static path not found: ${staticPath}`);
  }
}

// Routes API
app.use("/api/projects", require("./src/routes/projectRoutes"));
app.use("/api/skills", require("./src/routes/skillRoutes"));
app.use("/api/contacts", require("./src/routes/contactRoutes"));

// Route de test pour vérifier que l'API fonctionne
app.get('/api', (req, res) => {
  res.json({ 
    message: '✅ API Portfolio fonctionne!',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    frontendPath: frontendDistPath,
    frontendExists: fs.existsSync(frontendDistPath)
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

// Handle React routing in production - CORRIGEZ LE CHEMIN ICI
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    const indexPath = path.join(frontendDistPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send(`
        <h1>Frontend Not Found</h1>
        <p>Expected index.html at: ${indexPath}</p>
        <p>Check if Vite build completed successfully.</p>
        <p><a href="/api">Test API</a></p>
      `);
    }
  });
}

// Gestion des erreurs 404 pour les routes API
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    res.status(404).json({ 
      error: 'Route non trouvée',
      path: req.path 
    });
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