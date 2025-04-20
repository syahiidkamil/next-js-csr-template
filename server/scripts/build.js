/**
 * Simple build script for the server
 * Copies files to the dist directory and adds a shebang
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create dist directory
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

// Execute the build command for all .js files
try {
  execSync('babel src --out-dir dist --copy-files', { stdio: 'inherit' });
  console.log('✅ Server build completed successfully');
} catch (error) {
  console.error('❌ Error building server:', error);
  process.exit(1);
}
