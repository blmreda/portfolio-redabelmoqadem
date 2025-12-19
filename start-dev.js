// Development startup script
const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting development servers...\n');

// Start backend server
const backend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: true
});

// Start frontend server
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'frontend'),
  stdio: 'inherit',
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down servers...');
  backend.kill();
  frontend.kill();
  process.exit(0);
});

backend.on('error', (err) => {
  console.error('❌ Backend server error:', err.message);
});

frontend.on('error', (err) => {
  console.error('❌ Frontend server error:', err.message);
});

console.log('✅ Servers starting...');
console.log('   Backend: http://localhost:5002');
console.log('   Frontend: http://localhost:3000');
console.log('\nPress Ctrl+C to stop both servers.');