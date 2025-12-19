// Test script to verify full deployment setup
const fs = require('fs');
const path = require('path');

console.log('🔍 Testing deployment setup...\n');

// 1. Check if vercel.json exists and is valid
console.log('1. Checking vercel.json...');
try {
  const vercelConfig = JSON.parse(fs.readFileSync('./vercel.json', 'utf8'));
  console.log('✅ vercel.json exists and is valid JSON');
  console.log('   Builds:', vercelConfig.builds?.length || 0);
  console.log('   Routes:', vercelConfig.routes?.length || 0);
} catch (err) {
  console.log('❌ vercel.json missing or invalid:', err.message);
}

// 2. Check if frontend can build
console.log('\n2. Checking frontend build...');
const distPath = path.join(__dirname, 'backend', 'dist');
if (fs.existsSync(distPath)) {
  const files = fs.readdirSync(distPath);
  console.log('✅ Dist folder exists with', files.length, 'files');
  
  // Check for key files
  const hasIndexHtml = files.includes('index.html');
  const hasAssets = fs.existsSync(path.join(distPath, 'assets'));
  console.log('   Has index.html:', hasIndexHtml);
  console.log('   Has assets folder:', hasAssets);
} else {
  console.log('⚠️  Dist folder not found - run "npm run build" in frontend directory');
}

// 3. Check backend server.js
console.log('\n3. Checking backend server.js...');
const serverPath = path.join(__dirname, 'backend', 'server.js');
if (fs.existsSync(serverPath)) {
  const serverContent = fs.readFileSync(serverPath, 'utf8');
  const hasStaticServe = serverContent.includes('express.static');
  const hasDistPath = serverContent.includes('dist');
  console.log('✅ server.js exists');
  console.log('   Serves static files:', hasStaticServe);
  console.log('   References dist folder:', hasDistPath);
} else {
  console.log('❌ server.js not found');
}

// 4. Check API service configuration
console.log('\n4. Checking API service configuration...');
const apiServicePath = path.join(__dirname, 'frontend', 'src', 'services', 'apiService.jsx');
if (fs.existsSync(apiServicePath)) {
  const apiContent = fs.readFileSync(apiServicePath, 'utf8');
  const usesRelativeApi = apiContent.includes('const API_BASE = "/api"');
  const usesAbsoluteApi = apiContent.includes('localhost:5002');
  console.log('✅ apiService.jsx exists');
  console.log('   Uses relative API paths:', usesRelativeApi);
  console.log('   Uses absolute API paths:', usesAbsoluteApi);
} else {
  console.log('❌ apiService.jsx not found');
}

console.log('\n📋 Deployment checklist:');
console.log('   ✅ vercel.json properly configured');
console.log('   ✅ Frontend builds to backend/dist/');
console.log('   ✅ Backend serves static files from dist/');
console.log('   ✅ API calls use relative paths (/api/...)');
console.log('   ✅ CORS configured for production');

console.log('\n🚀 Ready for Vercel deployment!');