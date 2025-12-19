const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// 1. Log de démarrage CRITIQUE
console.log('🚀 SERVER STARTING - VERSION SIMPLIFIED');
console.log('📁 Current directory:', __dirname);
const frontendDistPath = path.join(__dirname, '../frontend/dist');
console.log('🔍 Frontend dist path:', frontendDistPath);

// 2. Middleware de base
app.use(express.json());

// 3. CORS simplifié (si le module est disponible)
try {
  const cors = require("cors");
  app.use(cors());
  console.log('✅ CORS enabled');
} catch (error) {
  console.log('⚠️ CORS module not available, continuing without it');
}

// 4. NE PAS appeler connectDB() - mongoose n'est pas installé
console.log('⚠️ Skipping MongoDB connection (mongoose not installed)');

// 5. NE PAS charger les routes qui n'existent pas
console.log('⚠️ Skipping project/skill/contact routes (files may not exist)');

// 6. Route API de test (DOIT TOUJOURS FONCTIONNER)
app.get('/api', (req, res) => {
  console.log('📞 /api endpoint called');
  res.json({ 
    status: 'success',
    message: '✅ API Portfolio is working!',
    timestamp: new Date().toISOString(),
    version: 'simplified-1.0'
  });
});

app.get('/api/test', (req, res) => {
  res.json({ 
    test: true,
    message: 'Test endpoint works perfectly!'
  });
});

// 7. Gestion du frontend - CORRECTION CRITIQUE ICI
if (fs.existsSync(frontendDistPath)) {
  console.log('✅ Found frontend dist folder');
  
  // Servir les fichiers statiques (CSS, JS, images)
  app.use(express.static(frontendDistPath));
  
  // Page d'accueil
  app.get('/', (req, res) => {
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
  
  // CORRECTION : Route catch-all POUR LE FRONTEND SEULEMENT
  // Elle NE DOIT PAS intercepter les routes API
  app.get('*', (req, res, next) => {
    // Si c'est une route API, passer au middleware suivant
    if (req.path.startsWith('/api')) {
      return next(); // ← CORRECTION IMPORTANTE
    }
    
    // Sinon, servir le frontend React (pour le routing client-side)
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
  
} else {
  console.log('❌ Frontend dist not found, showing backend page');
  
  // Page d'accueil simple (fallback)
  app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Portfolio Backend</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; text-align: center; }
            .success { color: #4CAF50; font-size: 24px; }
            .endpoints { background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px auto; max-width: 500px; }
          </style>
        </head>
        <body>
          <h1 class="success">✅ Backend Server is Running!</h1>
          <p>Frontend will be available after build.</p>
          <div class="endpoints">
            <h3>Available API Endpoints:</h3>
            <ul style="list-style: none; padding: 0;">
              <li><a href="/api" target="_blank">/api</a> - Basic API test</li>
              <li><a href="/api/test" target="_blank">/api/test</a> - Test endpoint</li>
            </ul>
          </div>
        </body>
      </html>
    `);
  });
  
  // Route pour les autres pages quand pas de frontend
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'API route not found' });
    }
    res.redirect('/');
  });
}

// 8. Gestion des erreurs 404 pour les routes API
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    res.status(404).json({ 
      error: 'API route not found',
      path: req.path,
      available_routes: ['/api', '/api/test']
    });
  }
});

// 9. Export pour Vercel
console.log('✅ Server configuration complete, ready to export');
module.exports = app;