/**
 * LiftX Media Downloader — Frontend Controller (public/app.js)
 * Features:
 * 1. Live URL parser & platform badge detector (Instagram, TikTok, X, Pinterest, Reddit, Facebook, YouTube block check)
 * 2. One-click Clipboard Paste & Clear (X) handlers
 * 3. Fetch extraction handler (/api/extract) with strict HTTP 403 YouTube blocker display
 * 4. Interactive HTML5 Video Preview & Client-side Blob / Direct Stream Downloader
 */

const YOUTUBE_REGEX =
  /(?:https?:\/\/)?(?:www\.|m\.|music\.|gaming\.|kids\.)?(?:youtube\.com|youtu\.be|yt\.be|youtube-nocookie\.com)(?:\/|$|\?|#)/i;

export function detectSocialPlatform(url) {
  const clean = (url || '').trim().toLowerCase();
  if (!clean) return { id: 'none', name: 'Ready' };
  if (YOUTUBE_REGEX.test(clean)) return { id: 'youtube', name: 'YouTube (Unsupported)', blocked: true };
  if (clean.includes('instagram.com') || clean.includes('instagr.am')) return { id: 'instagram', name: 'Instagram' };
  if (clean.includes('tiktok.com') || clean.includes('vm.tiktok.com')) return { id: 'tiktok', name: 'TikTok' };
  if (clean.includes('x.com') || clean.includes('twitter.com') || clean.includes('t.co')) return { id: 'x', name: 'X (Twitter)' };
  if (clean.includes('pinterest.') || clean.includes('pin.it')) return { id: 'pinterest', name: 'Pinterest' };
  if (clean.includes('reddit.com') || clean.includes('redd.it') || clean.includes('v.redd.it')) return { id: 'reddit', name: 'Reddit' };
  if (clean.includes('facebook.com') || clean.includes('fb.watch')) return { id: 'facebook', name: 'Facebook' };
  if (clean.includes('vimeo.com')) return { id: 'vimeo', name: 'Vimeo' };
  if (clean.startsWith('http://') || clean.startsWith('https://')) return { id: 'generic', name: 'Public Media' };
  return { id: 'none', name: 'Ready' };
}

export async function triggerClientBlobDownload(streamUrl, filename, type = 'mp4', onStateChange = () => {}) {
  try {
    onStateChange('downloading');
    const proxyEndpoint = `/api/stream?url=${encodeURIComponent(streamUrl)}&filename=${encodeURIComponent(filename)}&type=${encodeURIComponent(type)}`;
    const response = await fetch(proxyEndpoint);
    if (!response.ok) {
      throw new Error(`Download failed with status ${response.status}`);
    }
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(blobUrl), 8000);
    onStateChange('completed');
  } catch {
    // Fallback to direct anchor stream
    const fallbackUrl = `/api/stream?url=${encodeURIComponent(streamUrl)}&filename=${encodeURIComponent(filename)}&type=${encodeURIComponent(type)}`;
    const link = document.createElement('a');
    link.href = fallbackUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    onStateChange('completed');
  }
}

export async function generateBrandedLiftXShareUrl(mediaUrl = '', title = '') {
  const response = await fetch('/api/share', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: mediaUrl, title })
  });
  if (!response.ok) {
    throw new Error(`Share URL generation failed (${response.status})`);
  }
  return response.json();
}

export async function copyShareLinkToClipboard(shareUrl) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(shareUrl);
    return true;
  }
  const input = document.createElement('textarea');
  input.value = shareUrl;
  input.style.position = 'fixed';
  input.style.opacity = '0';
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  input.remove();
  return true;
}
