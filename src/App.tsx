import React, { useState, useEffect, useRef } from 'react';
import {
  Download,
  ClipboardPaste,
  X,
  Sun,
  Moon,
  Music,
  Image as ImageIcon,
  ShieldAlert,
  CheckCircle2,
  ChevronDown,
  Code2,
  Copy,
  Check,
  ArrowUpRight,
  Loader2,
  Play,
  SlidersHorizontal,
  Share2,
  Link2
} from 'lucide-react';
import { LiftXBrandLogo, PlatformSvgIcon } from './components/LiftXBrandLogo';
import { ShareLiftXModal } from './components/ShareLiftXModal';
import {
  QUICK_SAMPLE_LINKS,
  PLATFORM_SEO_GUIDES,
  DEVICE_HOW_TO_GUIDES,
  FAQ_ITEMS,
  DELIVERABLE_FILES
} from './data/seoAndCodeData';

interface ExtractedFormat {
  id: string;
  label: string;
  ext: string;
  resolution: string;
  sizeMb: string;
  url: string;
  filename: string;
}

interface ExtractedMediaPayload {
  success: boolean;
  sourceUrl: string;
  platform: string;
  extractor: string;
  title: string;
  author: string;
  authorName: string;
  durationSeconds: number;
  durationFormatted: string;
  resolution: string;
  filesizeMb: string;
  watermarkFree: boolean;
  thumbnail: string;
  videoUrl: string;
  sdVideoUrl: string;
  audioUrl: string;
  filenames: {
    hdMp4: string;
    sdMp4: string;
    mp3: string;
    coverJpg: string;
  };
  formats: ExtractedFormat[];
}

const YOUTUBE_CLIENT_REGEX =
  /(?:https?:\/\/)?(?:www\.|m\.|music\.|gaming\.|kids\.)?(?:youtube\.com|youtu\.be|yt\.be|youtube-nocookie\.com)(?:\/|$|\?|#)/i;

function detectLivePlatform(input: string): {
  id: string;
  name: string;
  isYouTube: boolean;
} {
  const clean = input.trim().toLowerCase();
  if (!clean) return { id: 'none', name: 'All 1000+ Sites', isYouTube: false };
  if (YOUTUBE_CLIENT_REGEX.test(clean)) {
    return { id: 'youtube', name: 'YouTube (Blocked)', isYouTube: true };
  }
  if (clean.includes('instagram.com') || clean.includes('instagr.am')) {
    return { id: 'instagram', name: 'Instagram', isYouTube: false };
  }
  if (clean.includes('tiktok.com') || clean.includes('vm.tiktok.com') || clean.includes('vt.tiktok.com')) {
    return { id: 'tiktok', name: 'TikTok', isYouTube: false };
  }
  if (clean.includes('x.com') || clean.includes('twitter.com') || clean.includes('t.co')) {
    return { id: 'x', name: 'X (Twitter)', isYouTube: false };
  }
  if (clean.includes('pinterest.') || clean.includes('pin.it')) {
    return { id: 'pinterest', name: 'Pinterest', isYouTube: false };
  }
  if (clean.includes('reddit.com') || clean.includes('redd.it') || clean.includes('v.redd.it')) {
    return { id: 'reddit', name: 'Reddit', isYouTube: false };
  }
  if (clean.includes('facebook.com') || clean.includes('fb.watch') || clean.includes('fb.com')) {
    return { id: 'facebook', name: 'Facebook', isYouTube: false };
  }
  if (clean.includes('vimeo.com')) {
    return { id: 'vimeo', name: 'Vimeo', isYouTube: false };
  }
  return { id: 'generic', name: 'Public Social Link', isYouTube: false };
}

export default function App() {
  // Default to sleek high-contrast light/dark theme with persistence
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [urlInput, setUrlInput] = useState<string>('');
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isYouTubeBlockedError, setIsYouTubeBlockedError] = useState<boolean>(false);
  const [mediaResult, setMediaResult] = useState<ExtractedMediaPayload | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<'1080p' | '720p'>('1080p');
  const [downloadingKey, setDownloadingKey] = useState<string | null>(null);
  const [downloadSuccessNote, setDownloadSuccessNote] = useState<string | null>(null);
  const [pasteFeedback, setPasteFeedback] = useState<string | null>(null);
  const [imgError, setImgError] = useState<boolean>(false);

  // Interactive sections state
  const [activeDeviceTab, setActiveDeviceTab] = useState<'ios' | 'android' | 'desktop'>('ios');
  const [openFaqId, setOpenFaqId] = useState<string>(FAQ_ITEMS[0].id);
  const [showCodeModal, setShowCodeModal] = useState<boolean>(false);
  const [activeCodeFileId, setActiveCodeFileId] = useState<string>(DELIVERABLE_FILES[0].id);
  const [copiedFileId, setCopiedFileId] = useState<string | null>(null);

  // Share & Branded Short Link state
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [brandedShortUrl, setBrandedShortUrl] = useState<string>('https://liftx.app/s/liftx1');
  const [copiedShortUrl, setCopiedShortUrl] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const previewSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rootEl = document.documentElement;
    if (darkMode) {
      rootEl.classList.add('dark');
    } else {
      rootEl.classList.remove('dark');
    }
  }, [darkMode]);

  // Resolve shared ?lx= short code or ?url= parameter on initial load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lxCode = params.get('lx');
    const directUrlParam = params.get('url');

    if (directUrlParam && directUrlParam.trim()) {
      setUrlInput(directUrlParam.trim());
      runMediaExtraction(directUrlParam.trim());
      return;
    }

    if (lxCode && lxCode.trim()) {
      fetch(`/api/share/${encodeURIComponent(lxCode.trim())}`)
        .then((r) => r.json())
        .then((data) => {
          if (data?.success && data?.mediaUrl) {
            setUrlInput(data.mediaUrl);
            runMediaExtraction(data.mediaUrl);
          }
        })
        .catch(() => {});
    }
  }, []);

  const handleQuickCopyBrandedUrl = async () => {
    try {
      await navigator.clipboard.writeText(brandedShortUrl);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = brandedShortUrl;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    setCopiedShortUrl(true);
    setTimeout(() => setCopiedShortUrl(false), 2200);
  };

  const detectedPlatform = detectLivePlatform(urlInput);

  const handlePasteClick = async () => {
    setErrorMsg(null);
    setIsYouTubeBlockedError(false);
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text && text.trim()) {
          setUrlInput(text.trim());
          setPasteFeedback('Pasted from clipboard');
          setTimeout(() => setPasteFeedback(null), 2200);
          inputRef.current?.focus();
          return;
        }
      }
    } catch {
      // Clipboard API can be restricted in sandboxed iframes; load a sample URL smoothly
    }
    const fallbackSample = QUICK_SAMPLE_LINKS[0].url;
    setUrlInput(fallbackSample);
    setPasteFeedback('Loaded sample Instagram Reel link');
    setTimeout(() => setPasteFeedback(null), 2200);
    inputRef.current?.focus();
  };

  const handleClearInput = () => {
    setUrlInput('');
    setErrorMsg(null);
    setIsYouTubeBlockedError(false);
    setDownloadSuccessNote(null);
    inputRef.current?.focus();
  };

  const runMediaExtraction = async (targetUrl: string) => {
    const cleanUrl = targetUrl.trim();
    if (!cleanUrl) {
      setErrorMsg('Please paste a public social media link (Instagram, TikTok, X, Pinterest, Reddit, or Facebook).');
      setIsYouTubeBlockedError(false);
      inputRef.current?.focus();
      return;
    }

    setIsExtracting(true);
    setErrorMsg(null);
    setIsYouTubeBlockedError(false);
    setDownloadSuccessNote(null);
    setImgError(false);

    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: cleanUrl })
      });

      const data = await response.json();

      if (response.status === 403 || data.blocked) {
        setMediaResult(null);
        setIsYouTubeBlockedError(true);
        setErrorMsg(
          data.error || 'YouTube downloads are strictly not supported on LiftX Media Downloader.'
        );
        return;
      }

      if (!response.ok || !data.success) {
        setMediaResult(null);
        setIsYouTubeBlockedError(false);
        setErrorMsg(data.error || 'Unable to extract media from this link. Please verify the post is public.');
        return;
      }

      setMediaResult(data);
      setSelectedQuality('1080p');

      // Generate a branded LiftX short URL for this extracted media item
      fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: cleanUrl,
          title: data.title || 'LiftX Media Downloader'
        })
      })
        .then((r) => r.json())
        .then((shareRes) => {
          if (shareRes?.success && shareRes?.brandedShortUrl) {
            setBrandedShortUrl(`https://${shareRes.brandedShortUrl}`);
          }
        })
        .catch(() => {});

      setTimeout(() => {
        previewSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    } catch {
      setErrorMsg('Network error while contacting LiftX extraction engine. Please try again.');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runMediaExtraction(urlInput);
  };

  const handleSelectSample = (sampleUrl: string) => {
    setUrlInput(sampleUrl);
    runMediaExtraction(sampleUrl);
  };

  /**
   * Client-side Blob Downloader for exact file naming (e.g., LiftX_Instagram_1080p.mp4)
   */
  const handleDirectDownload = async (
    actionKey: 'mp4' | 'mp3' | 'jpg',
    streamUrl: string,
    filename: string
  ) => {
    if (!streamUrl) return;
    setDownloadingKey(actionKey);
    setDownloadSuccessNote(null);

    const streamEndpoint = `/api/stream?url=${encodeURIComponent(streamUrl)}&filename=${encodeURIComponent(
      filename
    )}&type=${encodeURIComponent(actionKey)}`;

    try {
      const response = await fetch(streamEndpoint);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 8000);
      setDownloadSuccessNote(`Saved ${filename} (${(blob.size / (1024 * 1024)).toFixed(2)} MB)`);
    } catch {
      // Fallback to direct anchor stream
      const a = document.createElement('a');
      a.href = streamEndpoint;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setDownloadSuccessNote(`Started direct stream for ${filename}`);
    } finally {
      setDownloadingKey(null);
    }
  };

  const handleCopyDeliverable = async (fileId: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedFileId(fileId);
      setTimeout(() => setCopiedFileId(null), 2000);
    } catch {
      setCopiedFileId(fileId);
      setTimeout(() => setCopiedFileId(null), 2000);
    }
  };

  const activeDeviceGuide =
    DEVICE_HOW_TO_GUIDES.find((d) => d.id === activeDeviceTab) || DEVICE_HOW_TO_GUIDES[0];

  const activeDeliverable =
    DELIVERABLE_FILES.find((f) => f.id === activeCodeFileId) || DELIVERABLE_FILES[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 dark:bg-[#090D16] dark:text-slate-100 transition-colors duration-150">
      {/* Sticky Glassmorphic Navigation Bar (Strict 3-Zone Top Bar Contract) */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 dark:bg-[#090D16]/85 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Top-Left Official LiftX Brand Logo */}
          <a
            href="#top"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1167D8] rounded-lg shrink-0"
            aria-label="LiftX Media Downloader Home"
          >
            <LiftXBrandLogo size="md" />
          </a>

          {/* Zone 2: Clean Single-Line Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300"
          >
            <a
              href="#supported-platforms"
              className="hover:text-[#1167D8] dark:hover:text-[#3B82F6] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Supported Platforms
            </a>
            <a
              href="#how-it-works"
              className="hover:text-[#1167D8] dark:hover:text-[#3B82F6] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              How It Works
            </a>
            <a
              href="#platform-guides"
              className="hover:text-[#1167D8] dark:hover:text-[#3B82F6] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Platform Guides
            </a>
            <a
              href="#faq"
              className="hover:text-[#1167D8] dark:hover:text-[#3B82F6] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              FAQ
            </a>
          </nav>

          {/* Zone 3: Theme Switcher Control */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-[#1167D8] dark:hover:border-[#1167D8] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Light Theme</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-[#1167D8]" />
                  <span>Dark Theme</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="top" className="flex-1">
        {/* Center Hero & Universal Downloader Section */}
        <section className="pt-12 pb-16 sm:pt-16 sm:pb-20 px-4 sm:px-6 border-b border-slate-200/70 dark:border-slate-800/70">
          <div className="max-w-4xl mx-auto text-center">
            {/* Subtle Unboxed Trust Kicker */}
            <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mb-3 tracking-tight">
              <span>Universal Public Media Engine</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>Zero Server Storage</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>Original 1080p/4K Streams</span>
            </p>

            {/* Prominent Main Heading (<h1>) */}
            <h1
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.1] mb-4"
              style={{ textWrap: 'balance' }}
            >
              <span className="text-[#1167D8]">LiftX</span> Media Downloader
            </h1>

            {/* Exact Required Subtitle */}
            <p
              className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8"
              style={{ textWrap: 'balance' }}
            >
              Download public reels, videos, photos, and GIFs in original HD quality from 1000+ social
              platforms — 100% free, no watermark, no registration.
            </p>

            {/* Central Input Card */}
            <div className="max-w-3xl mx-auto">
              <form
                onSubmit={handleFormSubmit}
                className={`relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 rounded-2xl bg-white dark:bg-[#111827] border-2 transition-all duration-150 shadow-sm ${
                  detectedPlatform.isYouTube || isYouTubeBlockedError
                    ? 'border-red-500 dark:border-red-500'
                    : 'border-slate-200 dark:border-slate-800 focus-within:border-[#1167D8] dark:focus-within:border-[#1167D8]'
                }`}
              >
                {/* Live Platform Detection Indicator + URL Input */}
                <div className="flex items-center flex-1 min-w-0 pl-3 pr-2 py-1.5 gap-3">
                  <div
                    className={`flex items-center gap-1.5 text-xs font-semibold shrink-0 pr-2.5 border-r border-slate-200 dark:border-slate-800 ${
                      detectedPlatform.isYouTube
                        ? 'text-red-600 dark:text-red-400'
                        : detectedPlatform.id !== 'none'
                          ? 'text-[#1167D8] dark:text-[#3B82F6]'
                          : 'text-slate-500 dark:text-slate-400'
                    }`}
                    title={`Detected Platform: ${detectedPlatform.name}`}
                  >
                    {detectedPlatform.isYouTube ? (
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                    ) : (
                      <PlatformSvgIcon platform={detectedPlatform.name} className="w-4 h-4 shrink-0" />
                    )}
                    <span className="hidden sm:inline whitespace-nowrap">{detectedPlatform.name}</span>
                  </div>

                  <input
                    ref={inputRef}
                    type="text"
                    value={urlInput}
                    onChange={(e) => {
                      setUrlInput(e.target.value);
                      if (errorMsg) setErrorMsg(null);
                      if (isYouTubeBlockedError) setIsYouTubeBlockedError(false);
                    }}
                    placeholder="Paste Instagram, TikTok, X, Pinterest, Reddit, or Facebook link here..."
                    aria-label="Social media post or video URL"
                    className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none truncate"
                  />

                  {/* Clear (X) Button */}
                  {urlInput.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearInput}
                      aria-label="Clear URL input"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Action Buttons: One-Click Paste + #1167D8 Download Button */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handlePasteClick}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    title="Paste link from clipboard"
                  >
                    <ClipboardPaste className="w-4 h-4 text-[#1167D8] dark:text-[#3B82F6]" />
                    <span>Paste</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isExtracting}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm sm:text-base font-bold text-white bg-[#1167D8] hover:bg-[#0D54B3] active:scale-[0.99] disabled:opacity-60 transition-all whitespace-nowrap shrink-0 cursor-pointer flex-1 sm:flex-initial"
                  >
                    {isExtracting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Extracting...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Live Paste / Instant Platform Status Line */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Instant test links:</span>
                  {QUICK_SAMPLE_LINKS.map((sample, idx) => (
                    <React.Fragment key={sample.platform}>
                      {idx > 0 && <span aria-hidden="true">·</span>}
                      <button
                        type="button"
                        onClick={() => handleSelectSample(sample.url)}
                        className={`hover:underline underline-offset-2 transition-colors cursor-pointer whitespace-nowrap ${
                          sample.platform === 'YouTube'
                            ? 'text-red-600 dark:text-red-400 font-medium'
                            : 'hover:text-[#1167D8] dark:hover:text-[#3B82F6]'
                        }`}
                      >
                        {sample.label}
                      </button>
                    </React.Fragment>
                  ))}
                </div>

                {pasteFeedback && (
                  <span className="text-[#1167D8] dark:text-[#3B82F6] font-medium">
                    {pasteFeedback}
                  </span>
                )}
              </div>

              {/* Branded LiftX Short URL & One-Click Share Strip */}
              <div className="mt-4 pt-3.5 border-t border-slate-200/70 dark:border-slate-800/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Link2 className="w-3.5 h-3.5 text-[#1167D8] dark:text-[#3B82F6] shrink-0" />
                  <span className="font-medium">Branded Share URL:</span>
                  <code className="font-mono font-semibold text-slate-900 dark:text-white select-all">
                    {brandedShortUrl.replace(/^https?:\/\//, '')}
                  </code>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleQuickCopyBrandedUrl}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#1167D8] dark:hover:border-[#1167D8] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {copiedShortUrl ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">Copied URL!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#1167D8] dark:text-[#3B82F6]" />
                        <span>Copy Short Link</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsShareModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-white bg-[#1167D8] hover:bg-[#0D54B3] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share LiftX</span>
                  </button>
                </div>
              </div>

              {/* Error / Strict HTTP 403 YouTube Blocker Notice */}
              {errorMsg && (
                <div
                  role="alert"
                  className={`mt-5 p-4 rounded-xl border text-left flex items-start gap-3.5 ${
                    isYouTubeBlockedError
                      ? 'bg-red-50/90 dark:bg-red-950/30 border-red-200 dark:border-red-900/70 text-red-900 dark:text-red-200'
                      : 'bg-amber-50/90 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/70 text-amber-900 dark:text-amber-200'
                  }`}
                >
                  <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-red-700 dark:text-red-400 mb-0.5">
                      <span>{isYouTubeBlockedError ? 'HTTP 403 FORBIDDEN POLICY' : 'EXTRACTION NOTICE'}</span>
                      <span aria-hidden="true">·</span>
                      <span>GATEWAY FILTER</span>
                    </div>
                    <p className="text-sm font-bold">{errorMsg}</p>
                    {isYouTubeBlockedError && (
                      <p className="text-xs text-red-700/90 dark:text-red-300/80 mt-1">
                        LiftX blocks youtube.com, youtu.be, m.youtube.com, and yt.be domains in compliance with YouTube Terms of Service. Try an Instagram, TikTok, X, Pinterest, Reddit, or Facebook link instead.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Preview & Download Card */}
            <div ref={previewSectionRef} className="max-w-4xl mx-auto mt-8 text-left">
              {isExtracting && (
                <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-5 aspect-video rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse flex items-center justify-center">
                      <Loader2 className="w-7 h-7 text-[#1167D8] animate-spin" />
                    </div>
                    <div className="md:col-span-7 space-y-3">
                      <div className="h-4 w-40 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                      <div className="h-6 w-3/4 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                      <div className="h-4 w-1/2 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                      <div className="pt-3 flex gap-3">
                        <div className="h-11 w-40 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
                        <div className="h-11 w-36 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!isExtracting && mediaResult && (
                <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                    {/* Left Column: Live HTML5 Video Player & Thumbnail Preview */}
                    <div className="lg:col-span-5">
                      <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 aspect-video">
                        <video
                          key={selectedQuality === '1080p' ? mediaResult.videoUrl : mediaResult.sdVideoUrl}
                          src={selectedQuality === '1080p' ? mediaResult.videoUrl : mediaResult.sdVideoUrl}
                          poster={!imgError ? mediaResult.thumbnail : undefined}
                          controls
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-contain"
                        >
                          Your browser does not support HTML5 video playback.
                        </video>
                      </div>

                      {/* Clean Unboxed Technical Metadata Bar */}
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
                        <div className="flex items-center gap-1.5">
                          <Play className="w-3.5 h-3.5 text-[#1167D8]" />
                          <span>HTML5 Live Preview</span>
                        </div>
                        <div>
                          <span>{mediaResult.resolution}</span>
                          <span className="mx-1.5" aria-hidden="true">·</span>
                          <span>{mediaResult.durationFormatted}</span>
                          <span className="mx-1.5" aria-hidden="true">·</span>
                          <span>~{mediaResult.filesizeMb} MB</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Metadata Details, Quality Selector & Direct Action Buttons */}
                    <div className="lg:col-span-7 flex flex-col justify-between">
                      <div>
                        {/* Quiet Unboxed Source Metadata */}
                        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                          <span className="inline-flex items-center gap-1.5 font-semibold text-[#1167D8] dark:text-[#3B82F6]">
                            <PlatformSvgIcon platform={mediaResult.platform} className="w-3.5 h-3.5" />
                            <span>{mediaResult.platform}</span>
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono">{mediaResult.author}</span>
                          <span aria-hidden="true">·</span>
                          <span>No Watermark</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono">{mediaResult.extractor}</span>
                        </div>

                        {/* Title / Caption */}
                        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug mb-4">
                          {mediaResult.title}
                        </h2>

                        {/* Interactive Quality / Stream Segmented Control */}
                        <div className="mb-5">
                          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                            <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                              <SlidersHorizontal className="w-3.5 h-3.5 text-[#1167D8]" />
                              <span>Select Video Stream Quality:</span>
                            </span>
                            <span className="font-mono tabular-nums">
                              Target file:{' '}
                              {selectedQuality === '1080p'
                                ? mediaResult.filenames.hdMp4
                                : mediaResult.filenames.sdMp4}
                            </span>
                          </div>

                          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200/70 dark:border-slate-700/60">
                            <button
                              type="button"
                              onClick={() => setSelectedQuality('1080p')}
                              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                                selectedQuality === '1080p'
                                  ? 'bg-[#1167D8] text-white shadow-xs'
                                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                              }`}
                            >
                              1080p Full HD ({mediaResult.filesizeMb} MB)
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedQuality('720p')}
                              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                                selectedQuality === '720p'
                                  ? 'bg-[#1167D8] text-white shadow-xs'
                                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                              }`}
                            >
                              720p Fast Stream ({(parseFloat(mediaResult.filesizeMb) * 0.62).toFixed(1)} MB)
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* 3 Primary Direct Download Action Buttons */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                        <button
                          type="button"
                          disabled={downloadingKey !== null}
                          onClick={() =>
                            handleDirectDownload(
                              'mp4',
                              selectedQuality === '1080p'
                                ? mediaResult.videoUrl
                                : mediaResult.sdVideoUrl,
                              selectedQuality === '1080p'
                                ? mediaResult.filenames.hdMp4
                                : mediaResult.filenames.sdMp4
                            )
                          }
                          className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#1167D8] hover:bg-[#0D54B3] disabled:opacity-60 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          {downloadingKey === 'mp4' ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Download className="w-4 h-4" />
                          )}
                          <span>Download HD MP4</span>
                        </button>

                        <button
                          type="button"
                          disabled={downloadingKey !== null}
                          onClick={() =>
                            handleDirectDownload(
                              'mp3',
                              mediaResult.audioUrl,
                              mediaResult.filenames.mp3
                            )
                          }
                          className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 disabled:opacity-60 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          {downloadingKey === 'mp3' ? (
                            <Loader2 className="w-4 h-4 animate-spin text-[#1167D8]" />
                          ) : (
                            <Music className="w-4 h-4 text-[#1167D8] dark:text-[#3B82F6]" />
                          )}
                          <span>Extract Audio MP3</span>
                        </button>

                        <button
                          type="button"
                          disabled={downloadingKey !== null}
                          onClick={() =>
                            handleDirectDownload(
                              'jpg',
                              mediaResult.thumbnail,
                              mediaResult.filenames.coverJpg
                            )
                          }
                          className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 disabled:opacity-60 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          {downloadingKey === 'jpg' ? (
                            <Loader2 className="w-4 h-4 animate-spin text-[#1167D8]" />
                          ) : (
                            <ImageIcon className="w-4 h-4 text-[#1167D8] dark:text-[#3B82F6]" />
                          )}
                          <span>Save Cover JPG</span>
                        </button>
                      </div>

                      {/* Download Confirmation Feedback & Share Video Short Link */}
                      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                        {downloadSuccessNote ? (
                          <div className="flex items-center gap-2 font-medium text-emerald-700 dark:text-emerald-400">
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            <span className="font-mono">{downloadSuccessNote}</span>
                          </div>
                        ) : (
                          <span className="text-slate-500 dark:text-slate-400 font-mono">
                            Short link: {brandedShortUrl.replace(/^https?:\/\//, '')}
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => setIsShareModalOpen(true)}
                          className="inline-flex items-center gap-1.5 font-bold text-[#1167D8] dark:text-[#3B82F6] hover:underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Share Video Short URL</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Supported Platforms Matrix Bar */}
            <div id="supported-platforms" className="max-w-4xl mx-auto mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800/80">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
                Click any supported platform below to test live HD extraction in the player above:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                {PLATFORM_SEO_GUIDES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectSample(p.sampleUrl)}
                    className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 hover:border-[#1167D8] dark:hover:border-[#1167D8] text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <PlatformSvgIcon platform={p.platformName} className="w-4 h-4 text-[#1167D8] dark:text-[#3B82F6]" />
                    <span>{p.platformName}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3-Step "How to Use LiftX Media Downloader" Guide (iOS, Android, Windows/Mac) */}
        <section
          id="how-it-works"
          className="py-16 sm:py-20 px-4 sm:px-6 border-b border-slate-200/70 dark:border-slate-800/70"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <p className="text-xs font-semibold text-[#1167D8] dark:text-[#3B82F6] mb-2">
                  Cross-Platform Workflow
                </p>
                <h2
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white"
                  style={{ textWrap: 'balance' }}
                >
                  How to Use LiftX Media Downloader in 3 Simple Steps
                </h2>
              </div>

              {/* Interactive OS Selector Tabs */}
              <div
                role="tablist"
                aria-label="Operating System Instructions"
                className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-200/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 self-start"
              >
                {DEVICE_HOW_TO_GUIDES.map((device) => (
                  <button
                    key={device.id}
                    role="tab"
                    aria-selected={activeDeviceTab === device.id}
                    type="button"
                    onClick={() => setActiveDeviceTab(device.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      activeDeviceTab === device.id
                        ? 'bg-[#1167D8] text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {device.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Device Environment Context Bar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Recommended Browser:
                </span>{' '}
                <span>{activeDeviceGuide.browserName}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Default Save Path:
                </span>{' '}
                <span className="font-mono">{activeDeviceGuide.saveLocation}</span>
              </div>
            </div>

            {/* 3 Step Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeDeviceGuide.steps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs font-mono font-bold text-[#1167D8] dark:text-[#3B82F6] mb-3 tabular-nums">
                      STEP {step.stepNumber} · {activeDeviceGuide.label.toUpperCase()}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2.5">
                      {step.stepNumber}. {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6 Detailed Platform SEO Guides (150–200+ words each with H2/H3 structure) */}
        <section
          id="platform-guides"
          className="py-16 sm:py-20 px-4 sm:px-6 border-b border-slate-200/70 dark:border-slate-800/70"
        >
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-12">
              <p className="text-xs font-semibold text-[#1167D8] dark:text-[#3B82F6] mb-2">
                Platform Extraction Architecture & Editorial Guides
              </p>
              <h2
                className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white mb-3"
                style={{ textWrap: 'balance' }}
              >
                Universal Social Video &amp; Audio Extraction Across 1000+ Public Networks
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Explore how LiftX Media Downloader resolves original uncompressed MP4 video streams,
                merges separate DASH audio tracks, and strips post-processed watermarks across the six
                most popular social platforms.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {PLATFORM_SEO_GUIDES.map((guide) => (
                <article
                  key={guide.id}
                  className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    {/* Clean Unboxed Header Kicker */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-[#1167D8] dark:text-[#3B82F6]">
                        <PlatformSvgIcon platform={guide.platformName} className="w-4 h-4" />
                        <span>
                          {guide.number}. {guide.platformName}
                        </span>
                      </span>
                      <span className="font-mono tabular-nums">{guide.specs}</span>
                    </div>

                    {/* SEO H2 Title */}
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-3">
                      {guide.h2Title}
                    </h2>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {guide.introParagraph}
                    </p>

                    {/* SEO H3 Subheading 1 */}
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                      {guide.h3ArchitectureTitle}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {guide.architectureParagraph}
                    </p>

                    {/* SEO H3 Subheading 2 */}
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                      {guide.h3HowItWorksTitle}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                      {guide.workflowParagraph}
                    </p>
                  </div>

                  {/* Action Footer to Test Platform Live */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-4">
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500 truncate">
                      {guide.sampleUrl}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        handleSelectSample(guide.sampleUrl);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1167D8] dark:text-[#3B82F6] hover:underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Test {guide.platformName} Sample</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive FAQ Accordion Section */}
        <section
          id="faq"
          className="py-16 sm:py-20 px-4 sm:px-6 border-b border-slate-200/70 dark:border-slate-800/70"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold text-[#1167D8] dark:text-[#3B82F6] mb-2">
                Frequently Asked Questions
              </p>
              <h2
                className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white mb-3"
                style={{ textWrap: 'balance' }}
              >
                Everything You Need to Know About LiftX Media Downloader
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Answers regarding our zero-storage privacy architecture, strict YouTube exclusion policy,
                mobile file locations, and Fair Use guidelines.
              </p>
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openFaqId === item.id;
                return (
                  <div
                    key={item.id}
                    className="rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? '' : item.id)}
                      aria-expanded={isOpen}
                      className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-mono text-slate-400 dark:text-slate-500 mb-0.5 tabular-nums">
                          0{idx + 1} · {item.category}
                        </div>
                        <span className="text-base font-bold text-slate-900 dark:text-white">
                          {item.question}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-150 ${
                          isOpen ? 'rotate-180 text-[#1167D8]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/70">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Full-Stack Architecture & Source Deliverables Inspector Section */}
        <section className="py-12 px-4 sm:px-6 bg-slate-100/70 dark:bg-[#0D1322]">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-[#1167D8] dark:text-[#3B82F6] mb-1">
                  PRODUCTION DELIVERABLES · NODE.JS + EXPRESS + YT-DLP + PUPPETEER
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  Complete 6-File Modular Source Code Blueprint
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                  Inspect and copy the standalone <code className="font-mono">server.js</code>,{' '}
                  <code className="font-mono">fallbackScraper.js</code>,{' '}
                  <code className="font-mono">public/index.html</code>,{' '}
                  <code className="font-mono">public/styles.css</code>,{' '}
                  <code className="font-mono">public/app.js</code>, and{' '}
                  <code className="font-mono">package.json</code> deliverables.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCodeModal(!showCodeModal)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#1167D8] hover:bg-[#0D54B3] transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-auto"
              >
                <Code2 className="w-4 h-4" />
                <span>{showCodeModal ? 'Hide Source Files' : 'Inspect All 6 Source Files'}</span>
              </button>
            </div>

            {showCodeModal && (
              <div className="mt-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 overflow-hidden">
                {/* File Selector Tabs */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {DELIVERABLE_FILES.map((file) => (
                      <button
                        key={file.id}
                        type="button"
                        onClick={() => setActiveCodeFileId(file.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          activeCodeFileId === file.id
                            ? 'bg-[#1167D8] text-white'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-800'
                        }`}
                      >
                        {file.filename}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyDeliverable(activeDeliverable.id, activeDeliverable.code)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {copiedFileId === activeDeliverable.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy File</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="px-4 py-2.5 text-xs text-slate-600 dark:text-slate-400 border-b border-slate-200/70 dark:border-slate-800/70">
                  {activeDeliverable.description}
                </div>

                <pre className="p-4 sm:p-6 text-xs font-mono leading-relaxed overflow-x-auto bg-slate-950 text-slate-100 max-h-[460px]">
                  <code>{activeDeliverable.code}</code>
                </pre>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Quiet Footer & Legal / DMCA Disclaimer */}
      <footer className="bg-white dark:bg-[#090D16] border-t border-slate-200 dark:border-slate-800 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-slate-200/80 dark:border-slate-800/80">
            <div>
              <LiftXBrandLogo size="sm" />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-md">
                LiftX Media Downloader — High-speed universal public social video, Reel, Pin, and GIF
                saver in original HD quality.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <a href="#top" className="hover:text-[#1167D8] transition-colors whitespace-nowrap">
                Media Downloader
              </a>
              <a
                href="#supported-platforms"
                className="hover:text-[#1167D8] transition-colors whitespace-nowrap"
              >
                Supported Platforms
              </a>
              <a
                href="#how-it-works"
                className="hover:text-[#1167D8] transition-colors whitespace-nowrap"
              >
                How It Works
              </a>
              <a
                href="#platform-guides"
                className="hover:text-[#1167D8] transition-colors whitespace-nowrap"
              >
                Platform SEO Guides
              </a>
              <a href="#faq" className="hover:text-[#1167D8] transition-colors whitespace-nowrap">
                FAQ
              </a>
              <button
                type="button"
                onClick={() => setIsShareModalOpen(true)}
                className="inline-flex items-center gap-1 text-[#1167D8] dark:text-[#3B82F6] hover:underline underline-offset-4 whitespace-nowrap cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share LiftX</span>
              </button>
            </div>
          </div>

          {/* DMCA & Fair Use Legal Disclaimer */}
          <div className="pt-6 space-y-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            <p>
              <strong className="text-slate-700 dark:text-slate-200">
                DMCA, Copyright &amp; Fair Use Notice:
              </strong>{' '}
              LiftX Media Downloader operates strictly as a technical user-initiated stream indexing tool
              for publicly accessible social media URLs. LiftX does not host, cache, archive, or
              distribute any copyrighted video, audio, or image files on its servers. All media streams are
              delivered directly from the respective third-party origin content delivery networks (CDNs).
            </p>
            <p>
              LiftX is not affiliated with, endorsed by, or sponsored by Instagram, Meta, TikTok, ByteDance,
              X Corp (Twitter), Pinterest, or Reddit. YouTube links (<code className="font-mono">youtube.com</code>,{' '}
              <code className="font-mono">youtu.be</code>) are strictly blocked at the server gateway level
              (HTTP 403). Users are solely responsible for complying with applicable copyright laws and
              platform Terms of Service.
            </p>
            <p className="pt-2 text-slate-400 dark:text-slate-500">
              © {new Date().getFullYear()} LiftX Media Downloader. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Branded LiftX Short URL & Social Share Modal */}
      <ShareLiftXModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        currentMedia={
          mediaResult
            ? {
                sourceUrl: mediaResult.sourceUrl,
                platform: mediaResult.platform,
                title: mediaResult.title
              }
            : null
        }
      />
    </div>
  );
}
