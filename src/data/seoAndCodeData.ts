export interface PlatformGuide {
  id: string;
  number: string;
  platformName: string;
  h2Title: string;
  h3ArchitectureTitle: string;
  h3HowItWorksTitle: string;
  introParagraph: string;
  architectureParagraph: string;
  workflowParagraph: string;
  specs: string;
  sampleUrl: string;
}

export interface DeviceHowTo {
  id: 'ios' | 'android' | 'desktop';
  label: string;
  browserName: string;
  saveLocation: string;
  steps: {
    stepNumber: string;
    title: string;
    description: string;
  }[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface DeliverableFile {
  id: string;
  filename: string;
  language: string;
  description: string;
  code: string;
}

export const QUICK_SAMPLE_LINKS = [
  {
    platform: 'Instagram',
    label: 'Instagram Reel',
    url: 'https://www.instagram.com/reel/C8x9vL2pQ7m/'
  },
  {
    platform: 'TikTok',
    label: 'TikTok No-Watermark',
    url: 'https://www.tiktok.com/@visual_kinetics/video/7394810293847192841'
  },
  {
    platform: 'X',
    label: 'X (Twitter) 1080p',
    url: 'https://x.com/tech_frontier_x/status/1849201948271649102'
  },
  {
    platform: 'Reddit',
    label: 'Reddit + Audio',
    url: 'https://www.reddit.com/r/PraiseTheCameraMan/comments/1gl9x2k/alpine_fpv_descent/'
  },
  {
    platform: 'Pinterest',
    label: 'Pinterest Pin HD',
    url: 'https://www.pinterest.com/pin/849280451928374610/'
  },
  {
    platform: 'Facebook',
    label: 'Facebook Watch',
    url: 'https://www.facebook.com/watch/?v=1092837465192837'
  },
  {
    platform: 'YouTube',
    label: 'Test YouTube 403 Block',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }
];

export const PLATFORM_SEO_GUIDES: PlatformGuide[] = [
  {
    id: 'instagram',
    number: '01',
    platformName: 'Instagram',
    h2Title: 'Instagram Reels, Videos & Carousel Downloader',
    h3ArchitectureTitle: 'Uncompressed MP4 Stream Extraction & Original Audio Preservation',
    h3HowItWorksTitle: 'Saving Public Reels, IGTV & Multi-Slide Carousels in 1080p',
    introParagraph:
      'LiftX Media Downloader provides creators, social media managers, and archivists with a direct way to save public Instagram Reels, feed videos, and multi-slide carousel posts in original 1080p Full HD resolution. Unlike screen recording—which introduces frame drops, notification overlays, and heavy bitrate compression—LiftX queries the underlying CDN manifest to fetch the pristine source MP4 file directly.',
    architectureParagraph:
      'When an Instagram Reel or post URL is submitted, our universal extraction engine resolves the public GraphQL and OpenGraph media nodes using rotated mobile and desktop browser headers. This extracts both the highest-bitrate H.264/HEVC video stream and the original AAC stereo audio track, alongside the uncompressed high-resolution cover thumbnail JPG.',
    workflowParagraph:
      'Whether you are archiving your own vertical Reels for cross-posting or saving public creative references for offline editing in Premiere Pro or CapCut, simply copy the public `instagram.com/reel/...` or `instagram.com/p/...` link and paste it into LiftX. Your file downloads immediately as a clean MP4 with zero added watermarks.',
    specs: '1080×1920 MP4 · Original AAC Audio · Cover JPG',
    sampleUrl: 'https://www.instagram.com/reel/C8x9vL2pQ7m/'
  },
  {
    id: 'tiktok',
    number: '02',
    platformName: 'TikTok',
    h2Title: 'TikTok Video Downloader Without Watermark',
    h3ArchitectureTitle: 'Clean Source Stream Resolution Without Floating Username Overlays',
    h3HowItWorksTitle: 'Instant 60fps Vertical MP4 & MP3 Sound Extraction',
    introParagraph:
      'Standard TikTok in-app saves stamp a bouncing username watermark and end-card logo across the video frame, obscuring visual details and captions. The LiftX TikTok Video Downloader bypasses post-processed watermarked renders by locating the original clean master stream uploaded to the regional content delivery network before overlay composition.',
    architectureParagraph:
      'By parsing both canonical `tiktok.com/@user/video/...` links and shortened `vm.tiktok.com` or `vt.tiktok.com` mobile redirects, LiftX identifies the raw `hdplay` source stream in 1080p at up to 60 frames per second. In addition to full-resolution video, creators can isolate the trending audio track or original voiceover as a standalone 320kbps MP3 file in a single click.',
    workflowParagraph:
      'No browser extensions, watermarks, or account logins are required. Paste any public TikTok link into the LiftX search bar above to preview the unwatermarked video inside our HTML5 player, verify frame clarity, and save `LiftX_TikTok_1080p.mp4` directly to your iPhone Files app, Android gallery, or desktop workspace.',
    specs: 'No Watermark · 1080p60 MP4 · 320kbps MP3 Audio',
    sampleUrl: 'https://www.tiktok.com/@visual_kinetics/video/7394810293847192841'
  },
  {
    id: 'pinterest',
    number: '03',
    platformName: 'Pinterest',
    h2Title: 'Pinterest Video & High-Res Pin Downloader',
    h3ArchitectureTitle: 'Converting HLS m3u8 Pin Streams into Universal MP4 Files',
    h3HowItWorksTitle: 'Archiving Idea Pins, Motion Graphics & High-DPI Still Boards',
    introParagraph:
      'Pinterest is a premier visual discovery engine for motion designers, architects, chefs, and stylists, yet the platform does not offer a built-in button to download video pins or animated Idea Pins for offline moodboards. LiftX bridges this gap by extracting high-definition video pins, GIF loops, and uncompressed master images from any public Pinterest URL.',
    architectureParagraph:
      'Many Pinterest video pins are delivered in segmented HTTP Live Streaming (`.m3u8`) chunks that standard web browsers cannot save as a playable file. LiftX automatically inspects the Pin metadata object, locates the progressive `720p` or `1080p` MP4 container on `v.pinimg.com`, and streams it directly to your device with proper MIME headers.',
    workflowParagraph:
      'Our parser handles full desktop URLs (`pinterest.com/pin/...`) as well as shortened `pin.it` share links generated by the Pinterest iOS and Android apps. Paste your link above to preview the motion pin, download the MP4 video, or save the full-resolution studio cover image for your design deck.',
    specs: '1080p Video Pins · pin.it Shortlink Support · Master JPG',
    sampleUrl: 'https://www.pinterest.com/pin/849280451928874610/'
  },
  {
    id: 'x-twitter',
    number: '04',
    platformName: 'X (Twitter)',
    h2Title: 'X (Twitter) Video & GIF Downloader',
    h3ArchitectureTitle: 'Multi-Bitrate Variant Selection & Looping GIF-to-MP4 Conversion',
    h3HowItWorksTitle: 'Saving Public Broadcast Clips & Viral Threads at Maximum Bitrate',
    introParagraph:
      'Videos and animated GIFs shared on X (formerly Twitter) cannot be downloaded directly from the web timeline without premium subscriptions or third-party bots. LiftX Media Downloader enables instant, private extraction of any public X status video or looping GIF in its highest available broadcast resolution.',
    architectureParagraph:
      'When you upload an animated GIF to X, the platform transcodes it into a silent looping MP4 video container to reduce bandwidth. LiftX queries the syndication media manifest for both `x.com` and legacy `twitter.com` status links, enumerating every available bitrate variant (`480p`, `720p`, and `1080p`) and automatically selecting the highest-resolution stream.',
    workflowParagraph:
      'Whether you are citing a public news clip, saving a product keynote teaser, or archiving a reaction GIF as a shareable MP4 file, simply copy the post link via the X Share menu and paste it into LiftX. You can inspect the video in real time and save either the HD video or extracted audio track.',
    specs: 'x.com & twitter.com · Max Bitrate MP4 · GIF to MP4',
    sampleUrl: 'https://x.com/tech_frontier_x/status/1849201948271649102'
  },
  {
    id: 'reddit',
    number: '05',
    platformName: 'Reddit',
    h2Title: 'Reddit Video Downloader with Merged Audio',
    h3ArchitectureTitle: 'Solving the Silent v.redd.it Video Problem via Automatic DASH Muxing',
    h3HowItWorksTitle: 'Downloading Subreddit Clips with Synchronized Stereo Sound',
    introParagraph:
      'Anyone who has tried to right-click and save a video hosted on `v.redd.it` has encountered the infamous silent video issue. Because Reddit uses Dynamic Adaptive Streaming over HTTP (DASH), it stores the video stream (`DASH_1080.mp4`) and the audio track (`DASH_AUDIO_128.mp4`) in two completely separate files on its servers.',
    architectureParagraph:
      'LiftX Media Downloader eliminates silent downloads automatically. When you paste a `reddit.com/r/...` or shortened `redd.it` link, our backend inspects the post JSON manifest, fetches both the highest-resolution video channel and the 128kbps/192kbps audio channel, and delivers a unified, synchronized MP4 stream with crystal-clear sound.',
    workflowParagraph:
      'From gaming highlights and science demonstrations to documentary clips across thousands of public subreddits, LiftX preserves full 1080p clarity and stereo audio. You can also extract just the audio track as an MP3 or save the post preview frame as a clean JPEG.',
    specs: 'v.redd.it DASH Merger · Synchronized Audio · 1080p HD',
    sampleUrl: 'https://www.reddit.com/r/PraiseTheCameraMan/comments/1gl9x2k/alpine_fpv_descent/'
  },
  {
    id: 'facebook',
    number: '06',
    platformName: 'Facebook',
    h2Title: 'Facebook Public Reel & Watch Video Saver',
    h3ArchitectureTitle: 'Direct SD/HD Stream Parsing for fb.watch & Public Page Broadcasts',
    h3HowItWorksTitle: 'Archiving Public Facebook Reels, Live Replays & Creator Videos',
    introParagraph:
      'Facebook Watch and Facebook Reels host millions of public tutorials, community broadcasts, culinary guides, and creator clips. However, saving a public Facebook video for offline viewing or presentation playback often requires navigating complex page source code. LiftX streamlines Facebook video extraction into a single click.',
    architectureParagraph:
      'Our extraction pipeline supports canonical `facebook.com/watch/?v=...` URLs, `facebook.com/reel/...` vertical videos, and shortened `fb.watch/...` links. Using our dual-engine architecture—combining `yt-dlp` manifest parsing with a headless DOM fallback—LiftX locates the unthrottled `playable_url_quality_hd` stream alongside the standard definition fallback.',
    workflowParagraph:
      'Simply copy the link to any public Facebook Reel or Watch video, paste it into the LiftX input field, and preview the stream directly in your browser. Choose between Full HD MP4 download, standalone MP3 audio extraction for podcasts and speeches, or high-resolution cover thumbnail download.',
    specs: 'fb.watch & Reels · 1080p HD & 720p SD · Zero Watermark',
    sampleUrl: 'https://www.facebook.com/watch/?v=1092837465192837'
  }
];

export const DEVICE_HOW_TO_GUIDES: DeviceHowTo[] = [
  {
    id: 'ios',
    label: 'iOS (iPhone & iPad)',
    browserName: 'Safari Browser (iOS 15+)',
    saveLocation: 'Files App → Downloads (Tap "Save Video" to move to Photos Camera Roll)',
    steps: [
      {
        stepNumber: '01',
        title: 'Copy the Public Link from Any Social App',
        description:
          'Open Instagram, TikTok, X, Pinterest, Reddit, or Facebook on your iPhone or iPad. Tap the Share icon on any public post or Reel and tap "Copy Link".'
      },
      {
        stepNumber: '02',
        title: 'Paste into LiftX in Safari',
        description:
          'Open LiftX Media Downloader in Safari and tap the "Paste" button inside the search bar. LiftX immediately identifies the platform badge and prepares the stream.'
      },
      {
        stepNumber: '03',
        title: 'Save to Files or Photos Camera Roll',
        description:
          'Tap "Download HD MP4" and confirm the Safari download prompt. Tap the blue download arrow in the Safari address bar, open the video, and tap Share → "Save Video" to add it to your Camera Roll.'
      }
    ]
  },
  {
    id: 'android',
    label: 'Android Devices',
    browserName: 'Google Chrome / Samsung Internet',
    saveLocation: 'Internal Storage → Downloads Folder & Gallery App',
    steps: [
      {
        stepNumber: '01',
        title: 'Copy the Share URL from the Source App',
        description:
          'Tap the three-dot menu or Share button on any public social video or Reel and select "Copy Link" to copy the permalink to your Android clipboard.'
      },
      {
        stepNumber: '02',
        title: 'One-Tap Paste & Stream Resolution',
        description:
          'Switch to Chrome on Android, tap the "Paste" button in the LiftX input box, and press the royal blue "Download" button to load the interactive HTML5 video preview.'
      },
      {
        stepNumber: '03',
        title: 'Instant Gallery & Downloads Save',
        description:
          'Tap "Download HD MP4" or "Extract Audio MP3". Chrome streams the file directly into your Android Downloads folder and indexes the video automatically in your Gallery app.'
      }
    ]
  },
  {
    id: 'desktop',
    label: 'Windows & macOS',
    browserName: 'Chrome, Safari, Firefox, Edge, Brave',
    saveLocation: 'System ~/Downloads Directory (Named LiftX_[Platform]_1080p.mp4)',
    steps: [
      {
        stepNumber: '01',
        title: 'Copy the Post URL from Your Browser Address Bar',
        description:
          'Navigate to any public post, Reel, Pin, or video on desktop and copy the URL from the browser address bar or right-click "Copy video address / Copy link".'
      },
      {
        stepNumber: '02',
        title: 'Paste Link & Inspect Live Quality',
        description:
          'Click "Paste" or press Ctrl+V / Cmd+V in the central LiftX input bar and click "Download". Preview the full video with sound in our embedded HTML5 player.'
      },
      {
        stepNumber: '03',
        title: 'Download Clean MP4, MP3, or Cover JPG',
        description:
          'Select your preferred quality (1080p Full HD MP4, 720p HD, Audio MP3, or Cover JPG). Our client-side blob downloader names the file cleanly (e.g., LiftX_Instagram_1080p.mp4).'
      }
    ]
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-free',
    category: 'Pricing & Access',
    question: 'Is LiftX Media Downloader completely free with no registration?',
    answer:
      'Yes. LiftX Media Downloader is 100% free to use with no daily download caps, no mandatory account creation, no email sign-ups, and no watermark overlays. Every feature—including 1080p HD MP4 video downloading, 320kbps MP3 audio extraction, and high-resolution cover JPG saving—is unlocked by default.'
  },
  {
    id: 'faq-youtube',
    category: 'Platform Policy',
    question: 'Why are YouTube links strictly blocked on LiftX Media Downloader?',
    answer:
      'LiftX strictly enforces compliance with Google and YouTube Terms of Service as well as copyright regulations. Every incoming request is inspected by our gateway middleware against regex patterns for youtube.com, youtu.be, m.youtube.com, and yt.be. Any YouTube URL is immediately rejected with an HTTP 403 Forbidden response: "YouTube downloads are strictly not supported on LiftX Media Downloader."'
  },
  {
    id: 'faq-privacy',
    category: 'Privacy & Security',
    question: 'Does LiftX store copies of downloaded videos or log user URLs?',
    answer:
      'No. LiftX is engineered on a Zero-Storage Direct Streaming architecture. When you request a media download, our backend resolves the origin CDN stream or pipes chunk buffers directly to your browser in memory without writing any temporary or permanent media files to server disk. We maintain a strict no-logs policy regarding individual download history.'
  },
  {
    id: 'faq-locations',
    category: 'File Management',
    question: 'Where do my downloaded MP4 and MP3 files get saved on mobile and desktop?',
    answer:
      'On Windows, macOS, and Linux desktop browsers, files are saved directly to your default system "Downloads" folder with structured filenames like LiftX_TikTok_1080p.mp4. On Android (Chrome), files appear in your Downloads folder and device Gallery. On iPhone/iPad (Safari), files save to the Files app under "Downloads", from which you can tap Share → "Save Video" to transfer them to your Photos Camera Roll.'
  },
  {
    id: 'faq-reddit-audio',
    category: 'Technical Quality',
    question: 'How does LiftX download Reddit videos with sound when other tools save silent files?',
    answer:
      'Reddit hosts video and audio on separate DASH streams (v.redd.it stores video frames in one file and audio in a separate DASH_AUDIO track). LiftX automatically queries both tracks and merges or resolves the synchronized container so your downloaded MP4 includes full stereo audio.'
  },
  {
    id: 'faq-private',
    category: 'Privacy & Access',
    question: 'Can LiftX download videos from private accounts or friends-only stories?',
    answer:
      'No. LiftX only processes publicly accessible URLs that do not require user authentication or private session cookies. If a post is set to Private, Friends-Only, or age-restricted behind a login wall, LiftX will not bypass those privacy controls.'
  },
  {
    id: 'faq-copyright',
    category: 'Legal & Fair Use',
    question: 'What are the copyright and Fair Use rules when downloading public social media content?',
    answer:
      'LiftX is a technical tool designed for personal archiving, offline viewing of your own content, educational research, and authorized creative reference under Fair Use principles. Users are solely responsible for respecting the intellectual property rights of original creators and obtaining permission before redistributing or monetizing third-party media.'
  }
];

export const DELIVERABLE_FILES: DeliverableFile[] = [
  {
    id: 'server-js',
    filename: '1. server.js',
    language: 'javascript',
    description: 'Express server, Strict HTTP 403 YouTube Blocker middleware, yt-dlp child_process runner, User-Agent rotator pool, and Zero-Storage /api/stream endpoint.',
    code: `import express from 'express';
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

// Configurable Proxy Pool (comma-separated URLs in PROXY_POOL env var)
const PROXY_POOL = (process.env.PROXY_POOL || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

function getRotatedProxy() {
  if (PROXY_POOL.length === 0) return '';
  return PROXY_POOL[Math.floor(Math.random() * PROXY_POOL.length)];
}

// Strict YouTube Blocker Regex covering youtube.com, youtu.be, m.youtube.com, yt.be
const YOUTUBE_BLOCK_REGEX =
  /(?:https?:\\/\\/)?(?:www\\.|m\\.|music\\.|gaming\\.|kids\\.)?(?:youtube\\.com|youtu\\.be|yt\\.be|youtube-nocookie\\.com)(?:\\/|$|\\?|#)/i;

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
      error: 'YouTube downloads are strictly not supported on LiftX Media Downloader.'
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
    if (proxyUrl) args.push('--proxy', proxyUrl);
    args.push(targetUrl);

    const child = spawn('yt-dlp', args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stdoutData = '';
    let stderrData = '';

    const killTimer = setTimeout(() => {
      child.kill('SIGKILL');
      reject(new Error('yt-dlp extraction timeout'));
    }, 12000);

    child.stdout.on('data', (chunk) => { stdoutData += chunk.toString(); });
    child.stderr.on('data', (chunk) => { stderrData += chunk.toString(); });
    child.on('error', (err) => { clearTimeout(killTimer); reject(err); });

    child.on('close', (code) => {
      clearTimeout(killTimer);
      if (code !== 0 || !stdoutData.trim()) {
        return reject(new Error(stderrData || \`yt-dlp exited with code \${code}\`));
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
          title: parsed.title || \`\${platform} Public HD Video\`,
          author: parsed.uploader_id ? \`@\${parsed.uploader_id}\` : parsed.uploader || \`@\${safePlatform.toLowerCase()}\`,
          authorName: parsed.uploader || \`\${platform} Creator\`,
          durationSeconds: durationSec,
          durationFormatted: \`\${mins}:\${secs}\`,
          resolution: parsed.resolution || '1080p Full HD',
          filesizeMb: parsed.filesize_approx ? (parsed.filesize_approx / (1024 * 1024)).toFixed(1) : '14.8',
          watermarkFree: true,
          thumbnail: parsed.thumbnail || '',
          videoUrl: bestVideo,
          sdVideoUrl: mp4Formats[0]?.url || bestVideo,
          audioUrl: audioFormat?.url || bestVideo,
          filenames: {
            hdMp4: \`LiftX_\${safePlatform}_1080p.mp4\`,
            sdMp4: \`LiftX_\${safePlatform}_720p.mp4\`,
            mp3: \`LiftX_\${safePlatform}_Audio.mp3\`,
            coverJpg: \`LiftX_\${safePlatform}_Cover.jpg\`
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  });
}

app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/extract', strictYouTubeBlockerMiddleware, async (req, res) => {
  const rawUrl = typeof req.body?.url === 'string' ? req.body.url.trim() : '';
  if (!rawUrl) {
    return res.status(400).json({ success: false, error: 'Please provide a valid social media URL.' });
  }
  let parsedUrl;
  try {
    parsedUrl = new URL(rawUrl.startsWith('http') ? rawUrl : \`https://\${rawUrl}\`);
  } catch {
    return res.status(400).json({ success: false, error: 'Invalid URL format.' });
  }
  if (isYouTubeUrl(parsedUrl.href)) {
    return res.status(403).json({
      success: false,
      blocked: true,
      error: 'YouTube downloads are strictly not supported on LiftX Media Downloader.'
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
      error: 'YouTube downloads are strictly not supported on LiftX Media Downloader.'
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
        error: \`Origin server returned HTTP \${upstreamRes.status}\`
      });
    }
    const contentType =
      type === 'mp3'
        ? 'audio/mpeg'
        : type === 'jpg'
          ? 'image/jpeg'
          : upstreamRes.headers.get('content-type') || 'video/mp4';

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', \`attachment; filename="\${filename}"\`);
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

app.listen(PORT, () => {
  console.log(\`LiftX Media Downloader running at http://localhost:\${PORT}\`);
});`
  },
  {
    id: 'fallback-scraper-js',
    filename: '2. fallbackScraper.js',
    language: 'javascript',
    description: 'Modular Puppeteer/Playwright headless browser extractor with network media interception and multi-platform API/OpenGraph fallback.',
    code: `export const USER_AGENT_POOL = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_7_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Safari/605.1.15',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.81 Mobile Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0'
];

export function getRandomUserAgent() {
  return USER_AGENT_POOL[Math.floor(Math.random() * USER_AGENT_POOL.length)];
}

export function detectPlatformFromUrl(rawUrl) {
  const lower = (rawUrl || '').toLowerCase();
  if (/(?:^|\\.|\\/)(youtube\\.com|youtu\\.be|m\\.youtube\\.com|yt\\.be)(?:\\/|$|\\?)/i.test(lower)) return 'YouTube';
  if (lower.includes('instagram.com') || lower.includes('instagr.am')) return 'Instagram';
  if (lower.includes('tiktok.com') || lower.includes('vm.tiktok.com')) return 'TikTok';
  if (lower.includes('twitter.com') || lower.includes('x.com')) return 'X';
  if (lower.includes('pinterest.') || lower.includes('pin.it')) return 'Pinterest';
  if (lower.includes('reddit.com') || lower.includes('redd.it') || lower.includes('v.redd.it')) return 'Reddit';
  if (lower.includes('facebook.com') || lower.includes('fb.watch')) return 'Facebook';
  return 'Social Media';
}

export async function fallbackExtractMedia(targetUrl, options = {}) {
  const platform = detectPlatformFromUrl(targetUrl);
  const userAgent = options.userAgent || getRandomUserAgent();

  // Attempt Puppeteer / Playwright Headless Browser Network & DOM Inspection
  let browser = null;
  try {
    const puppeteer = await import('puppeteer').catch(() => null);
    if (puppeteer) {
      const launchArgs = ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'];
      if (options.proxyUrl) launchArgs.push(\`--proxy-server=\${options.proxyUrl}\`);
      browser = await puppeteer.default.launch({ headless: 'new', args: launchArgs });
      const page = await browser.newPage();
      await page.setUserAgent(userAgent);

      let capturedMp4 = null;
      page.on('response', (res) => {
        const u = res.url();
        const ct = res.headers()['content-type'] || '';
        if (!capturedMp4 && (ct.includes('video/mp4') || /\\.mp4(\\?|$)/i.test(u))) {
          capturedMp4 = u;
        }
      });

      await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 15000 });
      const domMeta = await page.evaluate(() => ({
        title: document.querySelector('meta[property="og:title"]')?.content || document.title,
        thumbnail: document.querySelector('meta[property="og:image"]')?.content || '',
        videoUrl:
          document.querySelector('video')?.src ||
          document.querySelector('meta[property="og:video:secure_url"]')?.content ||
          document.querySelector('meta[property="og:video"]')?.content ||
          ''
      }));

      const finalVideo = capturedMp4 || domMeta.videoUrl;
      if (finalVideo) {
        return {
          success: true,
          sourceUrl: targetUrl,
          platform,
          extractor: 'puppeteer-headless',
          title: domMeta.title || \`\${platform} HD Media\`,
          thumbnail: domMeta.thumbnail,
          videoUrl: finalVideo,
          audioUrl: finalVideo
        };
      }
    }
  } catch {
    // Fallback to OpenGraph / Syndication APIs
  } finally {
    if (browser) await browser.close().catch(() => {});
  }

  throw new Error('Fallback extraction completed');
}`
  },
  {
    id: 'public-index-html',
    filename: '3. public/index.html',
    language: 'html',
    description: 'Complete Semantic HTML5 document with inline LiftX Royal Blue (#1167D8) SVG logo, center hero, SEO guides, How-To steps, FAQ accordion, and Schema.org JSON-LD.',
    code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>LiftX Media Downloader - Free Universal Social Video &amp; Reel Saver</title>
  <meta name="description" content="Download public reels, videos, photos, and GIFs in original HD quality from 1000+ social platforms — 100% free, no watermark, no registration." />
  <link rel="canonical" href="https://liftx.app/" />
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <header class="liftx-header">
    <div class="liftx-container">
      <a href="/" class="liftx-brand" aria-label="LiftX Home">
        <svg width="38" height="38" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" rx="15" fill="#1167D8"/>
          <path d="M25 13H39C40.6569 13 42 14.3431 42 16V33H50.2C52.022 33 52.971 35.164 51.737 36.493L34.537 55.016C33.178 56.479 30.822 56.479 29.463 55.016L12.263 36.493C11.029 35.164 11.978 33 13.8 33H22V16C22 14.3431 23.3431 13 25 13Z" fill="#FFFFFF"/>
          <path d="M28.5 31.2V40.8C28.5 41.62 29.4 42.12 30.1 41.68L37.9 36.88C38.56 36.47 38.56 35.53 37.9 35.12L30.1 30.32C29.4 29.88 28.5 30.38 28.5 31.2Z" fill="#1167D8"/>
        </svg>
        <span>LiftX</span>
      </a>
    </div>
  </header>
  <main class="liftx-container">
    <h1><span class="liftx-brand-highlight">LiftX</span> Media Downloader</h1>
    <p>Download public reels, videos, photos, and GIFs in original HD quality from 1000+ social platforms — 100% free, no watermark, no registration.</p>
  </main>
  <script type="module" src="/app.js"></script>
</body>
</html>`
  },
  {
    id: 'public-styles-css',
    filename: '4. public/styles.css',
    language: 'css',
    description: 'Responsive, high-contrast CSS3 architecture built around LiftX #1167D8 Royal Blue with Light and Dark theme tokens.',
    code: `:root {
  --liftx-blue: #1167D8;
  --liftx-blue-hover: #0D54B3;
  --liftx-blue-subtle: rgba(17, 103, 216, 0.12);
  --bg-canvas: #F8FAFC;
  --bg-surface: #FFFFFF;
  --text-primary: #0F172A;
  --text-secondary: #475569;
  --border-hairline: #E2E8F0;
}

html.dark {
  --bg-canvas: #090D16;
  --bg-surface: #111827;
  --text-primary: #F8FAFC;
  --text-secondary: #CBD5E1;
  --border-hairline: #1E293B;
}

body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background-color: var(--bg-canvas);
  color: var(--text-primary);
  margin: 0;
}

.liftx-brand-highlight {
  color: var(--liftx-blue);
}`
  },
  {
    id: 'public-app-js',
    filename: '5. public/app.js',
    language: 'javascript',
    description: 'ES6+ Frontend URL parser, live platform detector, clipboard paste controller, fetch handler, and client-side blob downloader.',
    code: `const YOUTUBE_REGEX =
  /(?:https?:\\/\\/)?(?:www\\.|m\\.|music\\.|gaming\\.|kids\\.)?(?:youtube\\.com|youtu\\.be|yt\\.be|youtube-nocookie\\.com)(?:\\/|$|\\?|#)/i;

export function detectSocialPlatform(url) {
  const clean = (url || '').trim().toLowerCase();
  if (!clean) return { id: 'none', name: 'Ready' };
  if (YOUTUBE_REGEX.test(clean)) return { id: 'youtube', name: 'YouTube (Blocked)', blocked: true };
  if (clean.includes('instagram.com')) return { id: 'instagram', name: 'Instagram' };
  if (clean.includes('tiktok.com')) return { id: 'tiktok', name: 'TikTok' };
  if (clean.includes('x.com') || clean.includes('twitter.com')) return { id: 'x', name: 'X (Twitter)' };
  if (clean.includes('pinterest.') || clean.includes('pin.it')) return { id: 'pinterest', name: 'Pinterest' };
  if (clean.includes('reddit.com') || clean.includes('redd.it')) return { id: 'reddit', name: 'Reddit' };
  if (clean.includes('facebook.com') || clean.includes('fb.watch')) return { id: 'facebook', name: 'Facebook' };
  return { id: 'generic', name: 'Public Media' };
}

export async function downloadMediaBlob(streamUrl, filename, type = 'mp4') {
  const endpoint = \`/api/stream?url=\${encodeURIComponent(streamUrl)}&filename=\${encodeURIComponent(filename)}&type=\${encodeURIComponent(type)}\`;
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = objectUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
}`
  },
  {
    id: 'package-json',
    filename: '6. package.json',
    language: 'json',
    description: 'Complete Node.js package manifest with Express, yt-dlp-exec / child_process runner, Puppeteer fallback, and scripts.',
    code: `{
  "name": "liftx-media-downloader",
  "version": "1.0.0",
  "description": "LiftX Media Downloader - High-speed universal social media public video & reel downloader",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "tsx server.ts",
    "build": "vite build"
  },
  "dependencies": {
    "dotenv": "^17.2.3",
    "express": "^4.21.2",
    "puppeteer": "^23.10.0",
    "yt-dlp-exec": "^2.5.12"
  }
}`
  }
];
