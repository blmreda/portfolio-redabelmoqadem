// Deployment verification script
const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying deployment setup...\n');

// Check 1: vercel.json exists and is valid
console.log('1. Checking vercel.json...');
try {
  const vercelConfig = JSON.parse(fs.readFileSync('./vercel.json', 'utf8'));
  console.log('✅ vercel.json exists and is valid');
  console.log(`   - Version: ${vercelConfig.version}`);
  console.log(`   - Builds: ${vercelConfig.builds.length}`);
  console.log(`   - Routes: ${vercelConfig.routes.length}`);
} catch (err) {
  console.log('❌ vercel.json error:', err.message);
  process.exit(1);
}

// Check 2: Dist folder exists with required files
console.log('\n2. Checking dist folder...');
const distPath = path.join(__dirname, 'backend', 'dist');
if (fs.existsSync(distPath)) {
  const files = fs.readdirSync(distPath);
  const hasIndexHtml = files.includes('index.html');
  const hasAssets = fs.existsSync(path.join(distPath, 'assets'));
  
  console.log(`✅ Dist folder exists with ${files.length} files`);
  console.log(`   - Has index.html: ${hasIndexHtml}`);
  console.log(`   - Has assets folder: ${hasAssets}`);
  
  if (!hasIndexHtml) {
    console.log('❌ Missing index.html in dist folder');
    process.exit(1);
  }
} else {
  console.log('❌ Dist folder not found');
  process.exit(1);
}

// Check 3: Backend server configuration
console.log('\n3. Checking backend server...');
const serverPath = path.join(__dirname, 'backend', 'server.js');
if (fs.existsSync(serverPath)) {
  const serverContent = fs.readFileSync(serverPath, 'utf8');
  const hasStaticServe = serverContent.includes('express.static');
  const hasDistPath = serverContent.includes('dist');
  const hasCatchAllRoute = serverContent.includes("app.get('*'");
  
  console.log('✅ server.js exists');
  console.log(`   - Serves static files: ${hasStaticServe}`);
  console.log(`   - References dist folder: ${hasDistPath}`);
  console.log(`   - Has catch-all route: ${hasCatchAllRoute}`);
  
  if (!hasStaticServe || !hasDistPath || !hasCatchAllRoute) {
    console.log('⚠️  Warning: Some server configurations may be missing');
  }
} else {
  console.log('❌ server.js not found');
  process.exit(1);
}

// Check 4: API service configuration
console.log('\n4. Checking API service...');
const apiServicePath = path.join(__dirname, 'frontend', 'src', 'services', 'apiService.jsx');
if (fs.existsSync(apiServicePath)) {
  const apiContent = fs.readFileSync(apiServicePath, 'utf8');
  const usesRelativeApi = apiContent.includes('const API_BASE = "/api"');
  const usesAbsoluteApi = apiContent.includes('localhost:5002');
  
  console.log('✅ apiService.jsx exists');
  console.log(`   - Uses relative API paths: ${usesRelativeApi}`);
  console.log(`   - Uses absolute API paths: ${usesAbsoluteApi}`);
  
  if (!usesRelativeApi) {
    console.log('❌ API service should use relative paths "/api"');
    process.exit(1);
  }
} else {
  console.log('❌ apiService.jsx not found');
  process.exit(1);
}

// Check 5: Vite configuration
console.log('\n5. Checking Vite configuration...');
const viteConfigPath = path.join(__dirname, 'frontend', 'vite.config.js');
if (fs.existsSync(viteConfigPath)) {
  const viteContent = fs.readFileSync(viteConfigPath, 'utf8');
  const hasBaseConfig = viteContent.includes("base: './'");
  const hasBuildConfig = viteContent.includes("outDir: '../backend/dist'");
  
  console.log('✅ vite.config.js exists');
  console.log(`   - Has relative base path: ${hasBaseConfig}`);
  console.log(`   - Has correct build output: ${hasBuildConfig}`);
  
  if (!hasBaseConfig) {
    console.log('⚠️  Warning: Vite config should use relative base path');
  }
} else {
  console.log('❌ vite.config.js not found');
  process.exit(1);
}

console.log('\n🎉 All checks passed! Your app should deploy correctly to Vercel.');
console.log('\n📝 Next steps:');
console.log('   1. Commit your changes: git add . && git commit -m "Fix deployment issues"');
console.log('   2. Push to GitHub: git push origin main');
console.log('   3. Connect to Vercel or redeploy');
console.log('   4. Set environment variables in Vercel dashboard:');
console.log('      - MONGODB_URI');
console.log('      - EMAIL_USER');
console.log('      - EMAIL_PASS');
console.log('      - PERSONAL_EMAIL');