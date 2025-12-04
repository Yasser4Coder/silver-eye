import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

// Serve static files from dist directory
app.use(express.static(join(__dirname, 'dist'), {
  setHeaders: (res, path) => {
    // Set proper cache headers for static assets
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// Handle SPA routing - serve index.html for all routes
// This must be after static file serving so static files are served first
app.get('*', (req, res) => {
  try {
    const indexPath = join(__dirname, 'dist', 'index.html');
    const html = readFileSync(indexPath, 'utf-8');
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'no-cache');
    res.send(html);
  } catch (error) {
    console.error('Error serving index.html:', error);
    res.status(500).send('Error serving application');
  }
});

app.listen(PORT, () => {
  console.log(`Frontend server running on port ${PORT}`);
});

