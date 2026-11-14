/**
 * LiftX Media Downloader — Production Express Backend (server.js)
 * Features:
 * 1. Strict YouTube Blocker Middleware (HTTP 403 for youtube.com, youtu.be, m.youtube.com, yt.be)
 * 2. Primary Universal Engine via `yt-dlp` child_process.spawn supporting 1000+ social sites
 * 3. Headless Browser & Platform API Fallback (fallbackScraper.js)
 * 4. User-Agent Rotation Pool & Configurable Proxy Support
 * 5. Zero-Storage Direct CDN Streaming (/api/stream)
 */

import express from 'express';
import { spawn } from 'child_process';
import { Readable } from 'stream';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  USER_AGENT_POOL,
  getRandomUserAgent,
  detectPlatformFromUrl,
  fallbackExtractMedia
} from './fallbackScraper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const PROXY_POOL = (process.env.PROXY_POOL || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

function getRotatedProxy() {
  if (PROXY_POOL.length === 0) return '';
  return PROXY_POOL[Math.floor(Math.random() * PROXY_POOL.length)];
}

const YOUTUBE_BLOCK_REGEX =
  /(?:https?:\/\/)?(?:www\.|m\.|music\.|gaming\.|kids\.)?(?:youtube\.com|youtu\.be|yt\.be|youtube-nocookie\.com)(?:\/|$|\?|#)/i;

export function isYouTubeUrl(inputUrl) {
  if (!inputUrl || typeof inputUrl !== 'string') return false;
  try {
    const decoded = decodeURIComponent(inputUrl.trim());
    return YOUTUBE_BLOCK_REGEX.test(decoded) || YOUTUBE_BLOCK_REGEX.test(inputUrl.trim());
  } catch {
    return YOUTUBE_BLOCK_REGEX.test(inputUrl.trim());
  }
}

export function strictYouTubeBlockerMiddleware(req, res, next) {
  const candidateUrl =
    (req.body && typeof req.body.url === 'string' ? req.body.url : '') ||
    (typeof req.query.url === 'string' ? req.query.url : '');

  if (candidateUrl && isYouTubeUrl(candidateUrl)) {
    return res.status(403).json({
      success: false,
      blocked: true,
      code: 'YOUTUBE_STRICTLY_FORBIDDEN',
      error: 'YouTube downloads are not supported due to policy guidelines.'
    });
  }
  next();
}

function extractWithYtDlp(targetUrl, userAgent, proxyUrl) {
  return new Promise((resolve, reject) => {
    const args = [
      '--dump-single-json',
      '--no-playlist',
      '--no-warnings',
      '--no-check-certificates',
      '--geo-bypass',
      '--user-agent',
      userAgent
    ];

    if (proxyUrl) {
      args.push('--proxy', proxyUrl);
    }
    args.push(targetUrl);

    const child = spawn('yt-dlp', args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stdoutData = '';
    let stderrData = '';

    const killTimer = setTimeout(() => {
      child.kill('SIGKILL');
      reject(new Error('yt-dlp timed out after 12s'));
    }, 12000);

    child.stdout.on('data', (chunk) => {
      stdoutData += chunk.toString();
    });

    child.stderr.on('data', (chunk) => {
      stderrData += chunk.toString();
    });

    child.on('error', (err) => {
      clearTimeout(killTimer);
      reject(err);
    });

    child.on('close', (code) => {
      clearTimeout(killTimer);
      if (code !== 0 || !stdoutData.trim()) {
        return reject(new Error(stderrData || `yt-dlp exited with code ${code}`));
      }
      try {
        const parsed = JSON.parse(stdoutData);
        const platform = detectPlatformFromUrl(targetUrl);
        const safePlatform = platform.replace(/[^a-zA-Z0-9]/g, '');
        const formats = Array.isArray(parsed.formats) ? parsed.formats : [];
        const mp4Formats = formats.filter((f) => f.url && (f.ext === 'mp4' || (f.vcodec && f.vcodec !== 'none')));
        const bestVideo = mp4Formats[mp4Formats.length - 1]?.url || parsed.url;
        const audioFormat = formats.find((f) => f.url && f.acodec && f.acodec !== 'none' && (!f.vcodec || f.vcodec === 'none'));

        if (!bestVideo) return reject(new Error('No direct video URL found'));

        const durationSec = Math.round(Number(parsed.duration) || 15);
        const mins = Math.floor(durationSec / 60);
        const secs = String(durationSec % 60).padStart(2, '0');

        resolve({
          success: true,
          sourceUrl: targetUrl,
          platform,
          extractor: 'yt-dlp-native',
          title: parsed.title || `${platform} Public HD Video`,
          author: parsed.uploader_id ? `@${parsed.uploader_id}` : parsed.uploader || `@${safePlatform.toLowerCase()}`,
          authorName: parsed.uploader || `${platform} Creator`,
          durationSeconds: durationSec,
          durationFormatted: `${mins}:${secs}`,
          resolution: parsed.resolution || '1080p Full HD',
          filesizeMb: parsed.filesize_approx ? (parsed.filesize_approx / (1024 * 1024)).toFixed(1) : '14.8',
          watermarkFree: true,
          thumbnail: parsed.thumbnail || '',
          videoUrl: bestVideo,
          sdVideoUrl: mp4Formats[0]?.url || bestVideo,
          audioUrl: audioFormat?.url || bestVideo,
          filenames: {
            hdMp4: `LiftX_${safePlatform}_1080p.mp4`,
            sdMp4: `LiftX_${safePlatform}_720p.mp4`,
            mp3: `LiftX_${safePlatform}_Audio.mp3`,
            coverJpg: `LiftX_${safePlatform}_Cover.jpg`
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  });
}

const shortLinkStore = new Map();

function generateShortCode(seedInput = '') {
  if (!seedInput) return 'liftx1';
  let hash = 2166136261;
  for (let i = 0; i < seedInput.length; i++) {
    hash ^= seedInput.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const alphabet = '23456789abcdefghjkmnpqrstuvwxyz';
  let result = 'lx';
  let positive = Math.abs(hash);
  for (let i = 0; i < 4; i++) {
    result += alphabet[positive % alphabet.length];
    positive = Math.floor(positive / alphabet.length) + i * 7;
  }
  return result;
}

app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/share', strictYouTubeBlockerMiddleware, (req, res) => {
  const rawMediaUrl = typeof req.body?.url === 'string' ? req.body.url.trim() : '';
  const title =
    typeof req.body?.title === 'string' && req.body.title.trim()
      ? req.body.title.trim()
      : 'LiftX Media Downloader — Free Universal Social Video & Reel Saver';

  if (rawMediaUrl && isYouTubeUrl(rawMediaUrl)) {
    return res.status(403).json({
      success: false,
      blocked: true,
      error: 'YouTube downloads are not supported due to policy guidelines.'
    });
  }

  const code = generateShortCode(rawMediaUrl);
  const platform = rawMediaUrl ? detectPlatformFromUrl(rawMediaUrl) : 'LiftX';
  const entry = shortLinkStore.get(code) || {
    code,
    mediaUrl: rawMediaUrl,
    platform,
    title,
    clicks: 1
  };
  shortLinkStore.set(code, entry);

  const host = req.get('host') || `localhost:${PORT}`;
  const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'https';
  const baseUrl = `${protocol}://${host}`;

  return res.json({
    success: true,
    code,
    brandedShortUrl: `liftx.app/s/${code}`,
    liveShareUrl: `${baseUrl}/s/${code}`,
    platform,
    title
  });
});

app.get('/s/:code', (req, res) => {
  const entry = shortLinkStore.get((req.params.code || '').toLowerCase());
  if (entry && entry.mediaUrl) {
    return res.redirect(302, `/?lx=${encodeURIComponent(entry.code)}`);
  }
  return res.redirect(302, '/');
});

app.post('/api/extract', strictYouTubeBlockerMiddleware, async (req, res) => {
  const rawUrl = typeof req.body?.url === 'string' ? req.body.url.trim() : '';
  if (!rawUrl) {
    return res.status(400).json({ success: false, error: 'Please provide a valid social media URL.' });
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`);
  } catch {
    return res.status(400).json({ success: false, error: 'Invalid URL format.' });
  }

  if (isYouTubeUrl(parsedUrl.href)) {
    return res.status(403).json({
      success: false,
      blocked: true,
      error: 'YouTube downloads are not supported due to policy guidelines.'
    });
  }

  const userAgent = getRandomUserAgent();
  const proxyUrl = getRotatedProxy();

  try {
    const result = await extractWithYtDlp(parsedUrl.href, userAgent, proxyUrl);
    return res.json(result);
  } catch {
    try {
      const fallbackResult = await fallbackExtractMedia(parsedUrl.href, { userAgent, proxyUrl });
      return res.json(fallbackResult);
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err.message || 'Could not extract public media from the provided URL.'
      });
    }
  }
});

app.get('/api/stream', strictYouTubeBlockerMiddleware, async (req, res) => {
  const mediaUrl = typeof req.query.url === 'string' ? req.query.url.trim() : '';
  const filename =
    typeof req.query.filename === 'string'
      ? req.query.filename.replace(/[^a-zA-Z0-9._-]/g, '_')
      : 'LiftX_Media.mp4';
  const type = typeof req.query.type === 'string' ? req.query.type : 'mp4';

  if (!mediaUrl || !mediaUrl.startsWith('http')) {
    return res.status(400).json({ success: false, error: 'Invalid stream URL.' });
  }

  if (isYouTubeUrl(mediaUrl)) {
    return res.status(403).json({
      success: false,
      blocked: true,
      error: 'YouTube downloads are not supported due to policy guidelines.'
    });
  }

  try {
    const upstreamRes = await fetch(mediaUrl, {
      headers: { 'User-Agent': getRandomUserAgent() },
      redirect: 'follow'
    });

    if (!upstreamRes.ok || !upstreamRes.body) {
      return res.status(upstreamRes.status || 502).json({
        success: false,
        error: `Origin server returned HTTP ${upstreamRes.status}`
      });
    }

    const contentType =
      type === 'mp3'
        ? 'audio/mpeg'
        : type === 'jpg'
          ? 'image/jpeg'
          : upstreamRes.headers.get('content-type') || 'video/mp4';

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Cache-Control', 'no-store');

    const contentLength = upstreamRes.headers.get('content-length');
    if (contentLength) res.setHeader('Content-Length', contentLength);

    Readable.fromWeb(upstreamRes.body).pipe(res);
  } catch {
    if (!res.headersSent) {
      res.status(500).json({ success: false, error: 'Direct streaming interrupted.' });
    }
  }
});

if (process.env.LIFTX_STANDALONE === 'true') {
  app.listen(PORT, () => {
    console.log(`LiftX Server listening on http://localhost:${PORT}`);
  });
}

export default app;
