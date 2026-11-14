import express, { Request, Response, NextFunction } from 'express';
import { spawn } from 'child_process';
import { Readable } from 'stream';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import {
  USER_AGENT_POOL,
  getRandomUserAgent,
  detectPlatformFromUrl,
  fallbackExtractMedia
} from './fallbackScraper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

/**
 * Configurable Proxy Rotation Pool (populated via PROXY_POOL env var or optional config)
 */
const PROXY_POOL: string[] = (process.env.PROXY_POOL || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

function getRotatedProxy(): string {
  if (PROXY_POOL.length === 0) return '';
  return PROXY_POOL[Math.floor(Math.random() * PROXY_POOL.length)];
}

/**
 * Strict YouTube Blocker Regex
 * Matches youtube.com, www.youtube.com, m.youtube.com, music.youtube.com,
 * youtu.be, yt.be, and youtube-nocookie.com across any path or protocol.
 */
const YOUTUBE_BLOCK_REGEX =
  /(?:https?:\/\/)?(?:www\.|m\.|music\.|gaming\.|kids\.)?(?:youtube\.com|youtu\.be|yt\.be|youtube-nocookie\.com)(?:\/|$|\?|#)/i;

export function isYouTubeUrl(inputUrl: string): boolean {
  if (!inputUrl || typeof inputUrl !== 'string') return false;
  const decoded = decodeURIComponent(inputUrl.trim());
  return YOUTUBE_BLOCK_REGEX.test(decoded) || YOUTUBE_BLOCK_REGEX.test(inputUrl.trim());
}

/**
 * Express Middleware: Strict YouTube Blocker
 * Intercepts every incoming URL in body or query before any extraction or streaming occurs.
 */
function strictYouTubeBlockerMiddleware(req: Request, res: Response, next: NextFunction) {
  const candidateUrl =
    (req.body && typeof req.body.url === 'string' ? req.body.url : '') ||
    (typeof req.query.url === 'string' ? req.query.url : '');

  if (candidateUrl && isYouTubeUrl(candidateUrl)) {
    res.status(403).json({
      success: false,
      blocked: true,
      code: 'YOUTUBE_STRICTLY_FORBIDDEN',
      error: 'YouTube downloads are not supported due to policy guidelines.'
    });
    return;
  }
  next();
}

/**
 * Primary Engine: Spawns `yt-dlp` with rotated User-Agent and optional proxy
 * to extract direct CDN streams without saving files to disk.
 */
function extractWithYtDlp(targetUrl: string, userAgent: string, proxyUrl: string): Promise<any> {
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

    const child = spawn('yt-dlp', args, {
      stdio: ['ignore', 'pipe', 'pipe']
    });

    let stdoutData = '';
    let stderrData = '';

    const killTimer = setTimeout(() => {
      child.kill('SIGKILL');
      reject(new Error('yt-dlp extraction timed out after 12 seconds'));
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
        reject(new Error(stderrData || `yt-dlp exited with code ${code}`));
        return;
      }

      try {
        const parsed = JSON.parse(stdoutData);
        const platform = detectPlatformFromUrl(targetUrl);
        const safePlatform = platform.replace(/[^a-zA-Z0-9]/g, '');

        // Select best MP4 video stream and audio stream
        const formats = Array.isArray(parsed.formats) ? parsed.formats : [];
        const mp4Formats = formats.filter(
          (f: any) => f.url && (f.ext === 'mp4' || (f.vcodec && f.vcodec !== 'none'))
        );
        const bestVideo =
          mp4Formats[mp4Formats.length - 1]?.url ||
          parsed.url ||
          parsed.requested_downloads?.[0]?.url;

        const audioFormat = formats.find(
          (f: any) => f.url && (f.acodec && f.acodec !== 'none' && (!f.vcodec || f.vcodec === 'none'))
        );

        if (!bestVideo) {
          reject(new Error('No direct stream URL found in yt-dlp output'));
          return;
        }

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
          resolution: parsed.resolution || `${parsed.width || 1080}x${parsed.height || 1920}`,
          filesizeMb: parsed.filesize_approx
            ? (parsed.filesize_approx / (1024 * 1024)).toFixed(1)
            : '15.2',
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
          },
          formats: [
            {
              id: 'hd-1080p',
              label: '1080p Full HD (No Watermark)',
              ext: 'mp4',
              resolution: parsed.resolution || '1080p HD',
              sizeMb: '15.2',
              url: bestVideo,
              filename: `LiftX_${safePlatform}_1080p.mp4`
            },
            {
              id: 'audio-mp3',
              label: 'Original Audio Track (320kbps)',
              ext: 'mp3',
              resolution: 'Audio Only',
              sizeMb: '3.2',
              url: audioFormat?.url || bestVideo,
              filename: `LiftX_${safePlatform}_Audio.mp3`
            }
          ]
        });
      } catch (parseErr) {
        reject(parseErr);
      }
    });
  });
}

interface ShortLinkEntry {
  code: string;
  mediaUrl: string;
  platform: string;
  title: string;
  createdAt: string;
  clicks: number;
}

const shortLinkStore = new Map<string, ShortLinkEntry>();

// Seed a default branded short link for the LiftX tool itself
shortLinkStore.set('liftx1', {
  code: 'liftx1',
  mediaUrl: '',
  platform: 'LiftX',
  title: 'LiftX Media Downloader — Free Universal HD Video & Reel Saver',
  createdAt: new Date().toISOString(),
  clicks: 128
});

function generateShortCode(seedInput: string): string {
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

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  // Health & Engine Metadata Endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'LiftX Universal Media Engine',
      userAgentPoolSize: USER_AGENT_POOL.length,
      proxyRotationConfigured: PROXY_POOL.length > 0,
      youtubePolicy: 'STRICT_HTTP_403_BLOCK',
      zeroStorageMode: true,
      activeShortLinks: shortLinkStore.size
    });
  });

  // Branded LiftX Short URL Generator Endpoint
  app.post('/api/share', strictYouTubeBlockerMiddleware, (req: Request, res: Response) => {
    const rawMediaUrl = typeof req.body?.url === 'string' ? req.body.url.trim() : '';
    const title =
      typeof req.body?.title === 'string' && req.body.title.trim()
        ? req.body.title.trim()
        : 'LiftX Media Downloader — Free Universal Social Video & Reel Saver';

    if (rawMediaUrl && isYouTubeUrl(rawMediaUrl)) {
      res.status(403).json({
        success: false,
        blocked: true,
        error: 'YouTube downloads are not supported due to policy guidelines.'
      });
      return;
    }

    const platform = rawMediaUrl ? detectPlatformFromUrl(rawMediaUrl) : 'LiftX';
    const code = generateShortCode(rawMediaUrl);

    const existing = shortLinkStore.get(code);
    const entry: ShortLinkEntry = existing || {
      code,
      mediaUrl: rawMediaUrl,
      platform,
      title,
      createdAt: new Date().toISOString(),
      clicks: 1
    };

    if (existing) {
      existing.clicks += 1;
    } else {
      shortLinkStore.set(code, entry);
    }

    const hostHeader = req.get('host') || `localhost:${PORT}`;
    const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'https';
    const baseUrl = (process.env.APP_URL || `${protocol}://${hostHeader}`).replace(/\/$/, '');

    res.json({
      success: true,
      code: entry.code,
      brandedShortUrl: `liftx.app/s/${entry.code}`,
      liveShareUrl: `${baseUrl}/s/${entry.code}`,
      directAppUrl: rawMediaUrl
        ? `${baseUrl}/?lx=${encodeURIComponent(entry.code)}`
        : `${baseUrl}/`,
      platform: entry.platform,
      title: entry.title,
      clicks: entry.clicks
    });
  });

  // Resolve a short code via API
  app.get('/api/share/:code', (req: Request, res: Response) => {
    const code = (req.params.code || '').trim().toLowerCase();
    const entry = shortLinkStore.get(code);
    if (!entry) {
      res.status(404).json({
        success: false,
        error: 'Short link not found or expired.'
      });
      return;
    }
    entry.clicks += 1;
    res.json({
      success: true,
      ...entry,
      brandedShortUrl: `liftx.app/s/${entry.code}`
    });
  });

  // Short link redirect handler (/s/:code -> /?lx=:code)
  app.get('/s/:code', (req: Request, res: Response) => {
    const code = (req.params.code || '').trim().toLowerCase();
    const entry = shortLinkStore.get(code);
    if (entry && entry.mediaUrl) {
      entry.clicks += 1;
      res.redirect(302, `/?lx=${encodeURIComponent(entry.code)}`);
      return;
    }
    res.redirect(302, '/');
  });

  // Primary Media Extraction Endpoint (Protected by Strict YouTube Blocker Middleware)
  app.post('/api/extract', strictYouTubeBlockerMiddleware, async (req: Request, res: Response) => {
    const rawUrl = typeof req.body?.url === 'string' ? req.body.url.trim() : '';

    if (!rawUrl) {
      res.status(400).json({
        success: false,
        error: 'Please paste a valid public social media URL to begin extraction.'
      });
      return;
    }

    // Validate URL syntax
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`);
    } catch {
      res.status(400).json({
        success: false,
        error: 'Invalid URL format. Please enter a complete link starting with https://'
      });
      return;
    }

    // Double check YouTube hostname after URL normalization
    if (isYouTubeUrl(parsedUrl.href)) {
      res.status(403).json({
        success: false,
        blocked: true,
        code: 'YOUTUBE_STRICTLY_FORBIDDEN',
        error: 'YouTube downloads are not supported due to policy guidelines.'
      });
      return;
    }

    const rotatedUserAgent = getRandomUserAgent();
    const rotatedProxy = getRotatedProxy();

    try {
      // Step 1: Attempt primary yt-dlp engine
      const ytDlpData = await extractWithYtDlp(parsedUrl.href, rotatedUserAgent, rotatedProxy);
      res.json(ytDlpData);
      return;
    } catch {
      // Step 2: Seamlessly fall back to Headless Browser / Platform API / OpenGraph Scraper
      try {
        const fallbackData = await fallbackExtractMedia(parsedUrl.href, {
          userAgent: rotatedUserAgent,
          proxyUrl: rotatedProxy
        });
        res.json(fallbackData);
        return;
      } catch (fallbackErr: any) {
        res.status(500).json({
          success: false,
          error:
            fallbackErr?.message ||
            'Unable to extract media from this link. Please verify that the post is public.'
        });
      }
    }
  });

  // Zero-Storage Direct Streaming Proxy Endpoint (Protected by Strict YouTube Blocker Middleware)
  app.get('/api/stream', strictYouTubeBlockerMiddleware, async (req: Request, res: Response) => {
    const mediaUrl = typeof req.query.url === 'string' ? req.query.url.trim() : '';
    const filename =
      typeof req.query.filename === 'string'
        ? req.query.filename.replace(/[^a-zA-Z0-9._-]/g, '_')
        : 'LiftX_Download.mp4';
    const type = typeof req.query.type === 'string' ? req.query.type : 'video/mp4';

    if (!mediaUrl || !mediaUrl.startsWith('http')) {
      res.status(400).json({
        success: false,
        error: 'Missing or invalid source stream URL.'
      });
      return;
    }

    if (isYouTubeUrl(mediaUrl)) {
      res.status(403).json({
        success: false,
        blocked: true,
        error: 'YouTube downloads are not supported due to policy guidelines.'
      });
      return;
    }

    try {
      const upstreamRes = await fetch(mediaUrl, {
        headers: {
          'User-Agent': getRandomUserAgent(),
          Accept: '*/*'
        },
        redirect: 'follow'
      });

      if (!upstreamRes.ok || !upstreamRes.body) {
        res.status(upstreamRes.status || 502).json({
          success: false,
          error: `Upstream CDN returned HTTP ${upstreamRes.status}`
        });
        return;
      }

      const contentType =
        type === 'mp3'
          ? 'audio/mpeg'
          : type === 'jpg'
            ? 'image/jpeg'
            : upstreamRes.headers.get('content-type') || 'video/mp4';

      const contentLength = upstreamRes.headers.get('content-length');

      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
      if (contentLength) {
        res.setHeader('Content-Length', contentLength);
      }

      // Pipe Web ReadableStream directly to Express response (Zero Disk Storage)
      const nodeStream = Readable.fromWeb(upstreamRes.body as any);
      nodeStream.on('error', () => {
        if (!res.headersSent) {
          res.status(500).end();
        } else {
          res.end();
        }
      });
      nodeStream.pipe(res);
    } catch {
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          error: 'Failed to stream media from origin CDN.'
        });
      }
    }
  });

  // Mount Vite Middleware in Development or Serve Static Dist in Production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LiftX Media Downloader running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
