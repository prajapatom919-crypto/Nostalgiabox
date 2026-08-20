/**
 * Measures computed UI sizes at desktop viewports for Nostalgia Box.
 * Run: node test-scale-check.mjs
 */
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const PORT = 8000;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png' };

function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const path = req.url === '/' ? '/index.html' : req.url.split('?')[0];
      try {
        const body = readFileSync(join(ROOT, path));
        res.writeHead(200, { 'Content-Type': MIME[extname(path)] || 'text/plain', 'Cache-Control': 'no-store' });
        res.end(body);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

async function measure(browser, url, width, height, label) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle0' });
  const m = await page.evaluate(() => {
    const px = (el, prop) => (el ? parseFloat(getComputedStyle(el)[prop]) : null);
    const brand = document.querySelector('.brand');
    const subtitle = document.querySelector('.subtitle');
    const nav = document.querySelector('.nav-button');
    const player = document.querySelector('.player-card');
    return {
      zoom: getComputedStyle(document.documentElement).zoom,
      bodyZoom: getComputedStyle(document.body).zoom,
      htmlFontSize: px(document.documentElement, 'fontSize'),
      viewport: `${innerWidth}x${innerHeight}`,
      devicePixelRatio: window.devicePixelRatio,
      titleFontSize: px(brand, 'fontSize'),
      subtitleFontSize: px(subtitle, 'fontSize'),
      navFontSize: px(nav, 'fontSize'),
      playerWidth: player ? Math.round(player.getBoundingClientRect().width) : null,
      bodyTransform: getComputedStyle(document.body).transform,
    };
  });
  console.log(`${label} [${url}]`);
  console.log(JSON.stringify(m, null, 2));
  await page.close();
  return m;
}

const server = await startServer();
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

for (const [w, h] of [[1366, 768], [1920, 1080]]) {
  await measure(browser, `http://localhost:${PORT}/`, w, h, `${w}x${h} /`);
  await measure(browser, `http://localhost:${PORT}/index.html`, w, h, `${w}x${h} /index.html`);
}

await browser.close();
server.close();
console.log('DONE');
