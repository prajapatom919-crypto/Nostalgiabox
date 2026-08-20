import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const PORT = 8765;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };

function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const path = req.url === '/' ? '/index.html' : req.url.split('?')[0];
      try {
        const body = readFileSync(join(ROOT, path));
        res.writeHead(200, { 'Content-Type': MIME[extname(path)] || 'text/plain' });
        res.end(body);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

const server = await startServer();
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
page.on('console', (m) => console.log('CONSOLE:', m.type(), m.text()));
page.on('pageerror', (e) => console.log('PAGE ERROR:', e.message));

await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded' });
await new Promise((r) => setTimeout(r, 15000));

const debug = await page.evaluate(() => ({
  hasYT: typeof window.YT !== 'undefined',
  hasReady: typeof window.onYouTubeIframeAPIReady === 'function',
  playerHtml: document.getElementById('player')?.innerHTML?.slice(0, 200) || '',
  hasTestApi: typeof window.__nostalgiaTest !== 'undefined',
  title: document.getElementById('trackTitle')?.textContent,
}));
console.log(JSON.stringify(debug, null, 2));

await browser.close();
server.close();
