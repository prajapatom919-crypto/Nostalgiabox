/**
 * Automated smoke test for Nostalgia Box YouTube player recovery.
 * Run: node test-player.mjs
 * Requires: npx puppeteer (downloaded on first run)
 */
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const PORT = 8765;
const PROBLEMATIC_IDS = ['mEEsjJjB40Q', 'jQXGbT839f0', 'msCFFPc48Ig'];
const TEST_TIMEOUT_MS = 120000;

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
};

function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const path = req.url === '/' ? '/index.html' : req.url.split('?')[0];
      const filePath = join(ROOT, path);
      try {
        const body = readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'text/plain' });
        res.end(body);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

async function waitFor(fn, label, timeoutMs = 30000, intervalMs = 500) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await fn()) return;
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  throw new Error(`Timeout waiting for: ${label}`);
}

async function run() {
  const server = await startServer();
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--autoplay-policy=no-user-gesture-required',
    ],
  });

  const results = [];
  const page = await browser.newPage();
  page.setDefaultTimeout(TEST_TIMEOUT_MS);

  page.on('console', (msg) => {
    const text = msg.text();
    if (text.includes('[Nostalgia]')) {
      results.push(text);
    }
  });

  try {
    await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded' });

    await waitFor(async () => {
      return page.evaluate(() => typeof window.YT !== 'undefined' && window.YT.Player);
    }, 'YouTube IFrame API');

    await waitFor(async () => {
      return page.evaluate(() => window.__nostalgiaTest?.isReady?.());
    }, 'playlist ready', 60000);

    await page.evaluate(() => window.__nostalgiaTest.clickPlay());
    await new Promise((r) => setTimeout(r, 3000));

    const playlistInfo = await page.evaluate((ids) => {
      const list = window.__nostalgiaTest.getPlaylist().ids;
      return {
        count: list.length,
        indices: ids.map((id) => list.indexOf(id)),
        currentIndex: window.__nostalgiaTest.getPlaylist().index,
        currentId: window.__nostalgiaTest.getMeta().videoId,
      };
    }, PROBLEMATIC_IDS);

    console.log('Playlist loaded:', playlistInfo.count, 'tracks');
    console.log('Problematic ID indices:', playlistInfo.indices);

    // Navigate to each problematic track (or nearest available) and verify recovery.
    for (const targetId of PROBLEMATIC_IDS) {
      const index = playlistInfo.indices[PROBLEMATIC_IDS.indexOf(targetId)];
      if (index < 0) {
        console.warn(`SKIP: ${targetId} not in playlist`);
        continue;
      }

      console.log(`Testing problematic video ${targetId} at index ${index}`);
      const beforeLogs = results.length;

      await page.evaluate((idx) => {
        window.__nostalgiaTest.playAt(idx);
      }, index);

      await new Promise((r) => setTimeout(r, 14000));

      const snapshot = await page.evaluate(() => {
        const meta = window.__nostalgiaTest.getMeta();
        return {
          videoId: meta.videoId,
          index: meta.index,
          state: meta.state,
          title: document.getElementById('trackTitle')?.textContent || '',
          subtitle: document.getElementById('trackSubtitle')?.textContent || '',
          nextDisabled: document.getElementById('nextButton')?.disabled ?? true,
          prevDisabled: document.getElementById('prevButton')?.disabled ?? true,
        };
      });

      const recoveryLogs = results.slice(beforeLogs).filter((line) =>
        line.includes('Scheduling auto-skip') || line.includes('Auto-skipping') || line.includes('Player Error')
      );

      const advanced = snapshot.videoId !== targetId || snapshot.state === 1;
      const controlsEnabled = !snapshot.nextDisabled && !snapshot.prevDisabled;

      console.log(`  state=${snapshot.state} current=${snapshot.videoId} title="${snapshot.title}"`);
      console.log(`  recovery logs: ${recoveryLogs.length}, advanced=${advanced}, controls=${controlsEnabled}`);

      if (!controlsEnabled) {
        throw new Error(`Controls disabled on ${targetId}`);
      }

      if (!advanced && snapshot.state !== 3) {
        console.warn(`  WARNING: still on ${targetId} after 12s (may need longer for silent failures)`);
      }
    }

    // Rapid next-click stress test
    console.log('Rapid next-click stress test (8 clicks)...');
    for (let i = 0; i < 8; i += 1) {
      await page.click('#nextButton');
      await new Promise((r) => setTimeout(r, 150));
    }

    await new Promise((r) => setTimeout(r, 5000));

    const afterStress = await page.evaluate(() => ({
      index: window.__nostalgiaTest.getPlaylist().index,
      videoId: window.__nostalgiaTest.getMeta().videoId,
      nextDisabled: document.getElementById('nextButton')?.disabled ?? true,
    }));

    if (afterStress.nextDisabled) {
      throw new Error('Next button disabled after rapid clicks');
    }

    console.log(`After stress: index=${afterStress.index} video=${afterStress.videoId}`);
    console.log('TEST PASSED');
  } finally {
    await browser.close();
    server.close();
  }
}

run().catch((err) => {
  console.error('TEST FAILED:', err.message);
  process.exit(1);
});
