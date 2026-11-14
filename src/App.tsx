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
  Link2,
  Globe,
  Menu,
  AlertTriangle
} from 'lucide-react';
import { LiftXBrandLogo, PlatformSvgIcon } from './components/LiftXBrandLogo';
import { ShareLiftXModal } from './components/ShareLiftXModal';
import {
  AdSlotContainer,
  VisualThreeStepGuide,
  LegalAndContactPageView
} from './components/VisualStepsAndLegalPages';
import {
  DownloadScreenView,
  HistoryAndSettingsModal,
  DownloadHistoryItem
} from './components/DownloadScreenView';
import {
  LanguageCode,
  TRANSLATIONS,
  QUICK_SAMPLE_LINKS,
  PLATFORM_SEO_GUIDES,
  KEY_FEATURES_GRID,
  DEVICE_HOW_TO_GUIDES,
  FAQ_ITEMS,
  DELIVERABLE_FILES,
  GLOBAL_DISCLAIMER_TEXT
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

type ActiveRouteView =
  | { type: 'home' }
  | { type: 'platform'; platformId: string }
  | { type: 'legal'; page: 'privacy' | 'terms' | 'dmca' | 'contact' };

const YOUTUBE_CLIENT_REGEX =
  /(?:https?:\/\/)?(?:www\.|m\.|music\.|gaming\.|kids\.)?(?:youtube\.com|youtu\.be|yt\.be|youtube-nocookie\.com)(?:\/|$|\?|#)/i;

function detectLivePlatform(input: string): {
  id: string;
  name: string;
  isYouTube: boolean;
} {
  const clean = input.trim().toLowerCase();
  if (!clean) return { id: 'none', name: 'Smart Auto-Detect', isYouTube: false };
  if (YOUTUBE_CLIENT_REGEX.test(clean)) {
    return { id: 'youtube', name: 'YouTube (Unsupported)', isYouTube: true };
  }
  if (clean.includes('linkedin.com') || clean.includes('lnkd.in')) {
    return { id: 'linkedin', name: 'LinkedIn', isYouTube: false };
  }
  if (clean.includes('instagram.com') || clean.includes('instagr.am')) {
    return { id: 'instagram', name: 'Instagram', isYouTube: false };
  }
  if (clean.includes('facebook.com') || clean.includes('fb.watch') || clean.includes('fb.com')) {
    return { id: 'facebook', name: 'Facebook', isYouTube: false };
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
  if (clean.includes('snapchat.com')) {
    return { id: 'snapchat', name: 'Snapchat', isYouTube: false };
  }
  if (clean.includes('reddit.com') || clean.includes('redd.it') || clean.includes('v.redd.it')) {
    return { id: 'reddit', name: 'Reddit', isYouTube: false };
  }
  if (clean.includes('vimeo.com')) {
    return { id: 'vimeo', name: 'Vimeo', isYouTube: false };
  }
  return { id: 'generic', name: 'Public Media URL', isYouTube: false };
}

function parsePathnameToRoute(pathname: string): ActiveRouteView {
  const clean = pathname.toLowerCase().replace(/\/$/, '') || '/';
  if (clean === '/privacy-policy') return { type: 'legal', page: 'privacy' };
  if (clean === '/terms-and-conditions' || clean === '/terms-of-service') {
    return { type: 'legal', page: 'terms' };
  }
  if (clean === '/dmca' || clean === '/copyright') return { type: 'legal', page: 'dmca' };
  if (clean === '/contact' || clean === '/contact-us') return { type: 'legal', page: 'contact' };

  const matchedPlatform = PLATFORM_SEO_GUIDES.find((p) => p.slug === clean);
  if (matchedPlatform) {
    return { type: 'platform', platformId: matchedPlatform.id };
  }
  return { type: 'home' };
}

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [lang, setLang] = useState<LanguageCode>('en');
  const [activeRoute, setActiveRoute] = useState<ActiveRouteView>(() =>
    parsePathnameToRoute(window.location.pathname)
  );
  const [appsDropdownOpen, setAppsDropdownOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Downloader states
  const [urlInput, setUrlInput] = useState<string>('');
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isYouTubeBlockedError, setIsYouTubeBlockedError] = useState<boolean>(false);
  const [mediaResult, setMediaResult] = useState<ExtractedMediaPayload | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<'1080p' | '720p'>('1080p');
  const [downloadingKey, setDownloadingKey] = useState<string | null>(null);
  const [downloadSuccessNote, setDownloadSuccessNote] = useState<string | null>(null);
  const [pasteFeedback, setPasteFeedback] = useState<string | null>(null);

  // Interactive sections state
  const [activeDeviceTab, setActiveDeviceTab] = useState<'ios' | 'android' | 'desktop'>('ios');
  const [openFaqId, setOpenFaqId] = useState<string>(FAQ_ITEMS[0].id);
  const [showCodeModal, setShowCodeModal] = useState<boolean>(false);
  const [activeCodeFileId, setActiveCodeFileId] = useState<string>(DELIVERABLE_FILES[0].id);
  const [copiedFileId, setCopiedFileId] = useState<string | null>(null);

  // Download Screen & Session History state
  const [autoAnimateDownload, setAutoAnimateDownload] = useState<boolean>(false);
  const [historyModalMode, setHistoryModalMode] = useState<'history' | 'settings' | null>(null);
  const [downloadHistory, setDownloadHistory] = useState<DownloadHistoryItem[]>([
    {
      id: 'default-vacation',
      filename: 'vacation_trip.mp4',
      platform: 'Instagram',
      title: 'Tropical Coastline & Palm Beach Aerial Reel (1080p HD)',
      sizeMb: '74.1',
      resolution: '1920x1080',
      timestamp: 'Just now',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      thumbnail:
        "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'%3E%3Cdefs%3E%3ClinearGradient id='sky' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%2338BDF8'/%3E%3Cstop offset='58%25' stop-color='%23BAE6FD'/%3E%3Cstop offset='100%25' stop-color='%23E0F2FE'/%3E%3C/linearGradient%3E%3ClinearGradient id='sea' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0%25' stop-color='%230284C7'/%3E%3Cstop offset='60%25' stop-color='%230EA5E9'/%3E%3Cstop offset='100%25' stop-color='%2338BDF8'/%3E%3C/linearGradient%3E%3ClinearGradient id='sand' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23FDE68A'/%3E%3Cstop offset='100%25' stop-color='%23F59E0B'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='270' fill='url(%23sky)'/%3E%3Cpath d='M180 265 L320 175 L460 235 L610 185 L780 265 Z' fill='%2364748B' opacity='0.45'/%3E%3Cpath d='M60 265 L220 190 L380 265 Z' fill='%23475569' opacity='0.55'/%3E%3Crect y='260' width='800' height='190' fill='url(%23sea)'/%3E%3Cpath d='M0 280 Q260 320 520 450 L0 450 Z' fill='url(%23sand)'/%3E%3Cpath d='M0 280 Q275 318 545 450 L505 450 Q245 322 0 292 Z' fill='%23FFFFFF' opacity='0.85'/%3E%3Cpath d='M120 430 Q165 240 220 110' stroke='%2378350F' stroke-width='16' stroke-linecap='round' fill='none'/%3E%3Cpath d='M220 110 Q140 80 85 135' stroke='%2315803D' stroke-width='14' stroke-linecap='round' fill='none'/%3E%3Cpath d='M220 110 Q160 55 110 70' stroke='%2316A34A' stroke-width='12' stroke-linecap='round' fill='none'/%3E%3Cpath d='M220 110 Q270 50 335 85' stroke='%2315803D' stroke-width='14' stroke-linecap='round' fill='none'/%3E%3Cpath d='M220 110 Q290 95 345 145' stroke='%2316A34A' stroke-width='13' stroke-linecap='round' fill='none'/%3E%3Cpath d='M220 110 Q230 155 275 190' stroke='%2315803D' stroke-width='11' stroke-linecap='round' fill='none'/%3E%3C/svg%3E"
    }
  ]);

  // Share & Branded Short Link state
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [brandedShortUrl, setBrandedShortUrl] = useState<string>('https://liftx.app/s/liftx1');
  const [copiedShortUrl, setCopiedShortUrl] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const previewSectionRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  useEffect(() => {
    const rootEl = document.documentElement;
    if (darkMode) {
      rootEl.classList.add('dark');
    } else {
      rootEl.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const onPopState = () => {
      setActiveRoute(parsePathnameToRoute(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Close Supported Apps dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAppsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

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

  const navigateToPath = (path: string, scrollTargetId?: string) => {
    try {
      window.history.pushState({}, '', path);
    } catch {
      // Ignore history push errors in restricted sandboxes
    }
    setActiveRoute(parsePathnameToRoute(path));
    setAppsDropdownOpen(false);
    setMobileMenuOpen(false);

    if (scrollTargetId) {
      setTimeout(() => {
        const el = document.getElementById(scrollTargetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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

  // Instant polite message when user pastes a YouTube link
  useEffect(() => {
    if (detectedPlatform.isYouTube) {
      setIsYouTubeBlockedError(true);
      setErrorMsg(t.youtubePolicyMessage);
      setMediaResult(null);
    }
  }, [detectedPlatform.isYouTube, t.youtubePolicyMessage]);

  const handlePasteClick = async () => {
    setErrorMsg(null);
    setIsYouTubeBlockedError(false);
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text && text.trim()) {
          setUrlInput(text.trim());
          setPasteFeedback('Pasted URL from clipboard');
          setTimeout(() => setPasteFeedback(null), 2200);
          inputRef.current?.focus();
          return;
        }
      }
    } catch {
      // Fallback in sandboxed iframe where clipboard read requires user gesture
    }
    const activePlatformSample =
      activeRoute.type === 'platform'
        ? PLATFORM_SEO_GUIDES.find((p) => p.id === activeRoute.platformId)?.sampleUrl
        : QUICK_SAMPLE_LINKS[0].url;
    const sampleUrl = activePlatformSample || QUICK_SAMPLE_LINKS[0].url;
    setUrlInput(sampleUrl);
    setPasteFeedback('Loaded sample public URL');
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

  /**
   * Smart Routing Extraction Engine:
   * Regardless of which page the user is on, pasting any supported link automatically detects
   * the platform and fetches downloadable media in MP4 1080p, 720p, JPG, and Audio MP3.
   */
  const runMediaExtraction = async (targetUrl: string) => {
    const cleanUrl = targetUrl.trim();
    if (!cleanUrl) {
      setErrorMsg(
        'Please paste a valid link from LinkedIn, Instagram, Facebook, TikTok, X/Twitter, Pinterest, Snapchat, Reddit, or Vimeo.'
      );
      setIsYouTubeBlockedError(false);
      inputRef.current?.focus();
      return;
    }

    if (YOUTUBE_CLIENT_REGEX.test(cleanUrl)) {
      setMediaResult(null);
      setIsYouTubeBlockedError(true);
      setErrorMsg(t.youtubePolicyMessage);
      return;
    }

    setIsExtracting(true);
    setErrorMsg(null);
    setIsYouTubeBlockedError(false);
    setDownloadSuccessNote(null);

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
        setErrorMsg(data.error || t.youtubePolicyMessage);
        return;
      }

      if (!response.ok || !data.success) {
        setMediaResult(null);
        setIsYouTubeBlockedError(false);
        setErrorMsg(
          data.error || 'Unable to extract media from this link. Please verify the post is public.'
        );
        return;
      }

      setMediaResult(data);
      setSelectedQuality('1080p');
      setAutoAnimateDownload(true);

      // Prepend to session download history
      setDownloadHistory((prev) => [
        {
          id: `dl-${Date.now()}`,
          filename: data.filenames?.hdMp4 || 'LiftX_Video_1080p.mp4',
          platform: data.platform || 'Social Media',
          title: data.title || 'Downloaded Social Video',
          sizeMb: data.filesizeMb || '48.2',
          resolution: data.resolution || '1080p HD',
          timestamp: 'Just now',
          videoUrl: data.videoUrl,
          thumbnail: data.thumbnail
        },
        ...prev.slice(0, 14)
      ]);

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

  const handleDirectDownload = async (
    actionKey: 'mp4-1080' | 'mp4-720' | 'jpg' | 'mp3',
    streamUrl: string,
    filename: string,
    mimeType: 'mp4' | 'jpg' | 'mp3'
  ) => {
    if (!streamUrl) return;
    setDownloadingKey(actionKey);
    setDownloadSuccessNote(null);

    const streamEndpoint = `/api/stream?url=${encodeURIComponent(
      streamUrl
    )}&filename=${encodeURIComponent(filename)}&type=${encodeURIComponent(mimeType)}`;

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
      const a = document.createElement('a');
      a.href = streamEndpoint;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setDownloadSuccessNote(`Started direct download for ${filename}`);
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

  const activePlatformPage =
    activeRoute.type === 'platform'
      ? PLATFORM_SEO_GUIDES.find((p) => p.id === activeRoute.platformId) || null
      : null;

  const activeDeviceGuide =
    DEVICE_HOW_TO_GUIDES.find((d) => d.id === activeDeviceTab) || DEVICE_HOW_TO_GUIDES[0];

  const activeDeliverable =
    DELIVERABLE_FILES.find((f) => f.id === activeCodeFileId) || DELIVERABLE_FILES[0];

  return (
    <div
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 dark:bg-[#090D16] dark:text-slate-100 transition-colors duration-150"
    >
      {/* 1. Sticky Glassmorphic Header & Navigation Bar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-[#090D16]/90 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Left: Official LiftX Brand Logo */}
          <button
            type="button"
            onClick={() => navigateToPath('/')}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1167D8] rounded-lg shrink-0 cursor-pointer"
            aria-label="LiftX - Media Downloader Home"
          >
            <LiftXBrandLogo size="md" />
          </button>

          {/* Center Navigation Links + Supported Apps Dropdown */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300"
          >
            <button
              type="button"
              onClick={() => navigateToPath('/')}
              className={`hover:text-[#1167D8] dark:hover:text-[#3B82F6] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeRoute.type === 'home' ? 'text-[#1167D8] dark:text-[#3B82F6] font-bold' : ''
              }`}
            >
              {t.navHome}
            </button>

            <button
              type="button"
              onClick={() => {
                navigateToPath('/');
                setTimeout(() => {
                  previewSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 80);
              }}
              className="hover:text-[#1167D8] dark:hover:text-[#3B82F6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Downloads
            </button>

            <button
              type="button"
              onClick={() => setHistoryModalMode('history')}
              className="hover:text-[#1167D8] dark:hover:text-[#3B82F6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              History
            </button>

            <button
              type="button"
              onClick={() => setHistoryModalMode('settings')}
              className="hover:text-[#1167D8] dark:hover:text-[#3B82F6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Settings
            </button>

            {/* Supported Apps Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setAppsDropdownOpen(!appsDropdownOpen)}
                aria-expanded={appsDropdownOpen}
                className={`inline-flex items-center gap-1.5 hover:text-[#1167D8] dark:hover:text-[#3B82F6] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeRoute.type === 'platform'
                    ? 'text-[#1167D8] dark:text-[#3B82F6] font-bold'
                    : ''
                }`}
              >
                <span>{t.navSupportedApps}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-150 ${
                    appsDropdownOpen ? 'rotate-180 text-[#1167D8]' : ''
                  }`}
                />
              </button>

              {appsDropdownOpen && (
                <div className="absolute left-0 mt-2.5 w-64 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50">
                  <div className="px-3.5 py-1.5 text-[11px] font-mono text-slate-400 border-b border-slate-100 dark:border-slate-800">
                    DEDICATED PLATFORM DOWNLOADERS
                  </div>
                  {PLATFORM_SEO_GUIDES.map((app) => (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => navigateToPath(app.slug)}
                      className="w-full px-3.5 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between gap-2 transition-colors cursor-pointer"
                    >
                      <span className="inline-flex items-center gap-2">
                        <PlatformSvgIcon
                          platform={app.platformName}
                          className="w-4 h-4 text-[#1167D8] dark:text-[#3B82F6]"
                        />
                        <span>{app.platformName} Downloader</span>
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => navigateToPath('/', 'how-to-use')}
              className="hover:text-[#1167D8] dark:hover:text-[#3B82F6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.navHowToUse}
            </button>

            <button
              type="button"
              onClick={() => navigateToPath('/privacy-policy')}
              className={`hover:text-[#1167D8] dark:hover:text-[#3B82F6] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeRoute.type === 'legal' && activeRoute.page === 'privacy'
                  ? 'text-[#1167D8] dark:text-[#3B82F6] font-bold'
                  : ''
              }`}
            >
              {t.navPrivacy}
            </button>

            <button
              type="button"
              onClick={() => navigateToPath('/terms-and-conditions')}
              className={`hover:text-[#1167D8] dark:hover:text-[#3B82F6] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeRoute.type === 'legal' && activeRoute.page === 'terms'
                  ? 'text-[#1167D8] dark:text-[#3B82F6] font-bold'
                  : ''
              }`}
            >
              {t.navTerms}
            </button>

            <button
              type="button"
              onClick={() => navigateToPath('/contact')}
              className={`hover:text-[#1167D8] dark:hover:text-[#3B82F6] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeRoute.type === 'legal' && activeRoute.page === 'contact'
                  ? 'text-[#1167D8] dark:text-[#3B82F6] font-bold'
                  : ''
              }`}
            >
              {t.navContact}
            </button>
          </nav>

          {/* Right Controls: Language Selector + Theme Toggle + Mobile Menu Button */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Global Language Selector */}
            <div className="relative inline-flex items-center">
              <Globe className="w-3.5 h-3.5 text-[#1167D8] dark:text-[#3B82F6] absolute left-2.5 pointer-events-none" />
              <select
                aria-label="Select Language"
                value={lang}
                onChange={(e) => setLang(e.target.value as LanguageCode)}
                className="pl-7 pr-6 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-[#1167D8] focus:outline-none focus:border-[#1167D8] cursor-pointer"
              >
                {Object.values(TRANSLATIONS).map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.nativeLabel}
                  </option>
                ))}
              </select>
            </div>

            {/* Theme Switcher */}
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-[#1167D8] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#1167D8]" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>

            {/* User Profile Avatar Circle ("U") matching Download Screen reference */}
            <button
              type="button"
              onClick={() => setHistoryModalMode('history')}
              title="Session Downloads & Preferences"
              className="w-9 h-9 rounded-full bg-[#D6E4FA] dark:bg-slate-800 text-[#1167D8] dark:text-blue-400 font-extrabold text-sm flex items-center justify-center hover:ring-2 hover:ring-[#1167D8] transition-all shrink-0 cursor-pointer"
            >
              U
            </button>

            {/* Mobile Navigation Drawer Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090D16] px-4 py-4 space-y-3">
            <div className="flex flex-wrap gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => navigateToPath('/')}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1167D8] text-white cursor-pointer"
              >
                {t.navHome}
              </button>
              <button
                type="button"
                onClick={() => navigateToPath('/', 'how-to-use')}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                {t.navHowToUse}
              </button>
              <button
                type="button"
                onClick={() => navigateToPath('/privacy-policy')}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                {t.navPrivacy}
              </button>
              <button
                type="button"
                onClick={() => navigateToPath('/terms-and-conditions')}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                {t.navTerms}
              </button>
              <button
                type="button"
                onClick={() => navigateToPath('/contact')}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                {t.navContact}
              </button>
            </div>

            <div>
              <p className="text-[11px] font-mono text-slate-400 mb-2">
                SUPPORTED APPS (DEDICATED DOWNLOADERS)
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {PLATFORM_SEO_GUIDES.map((app) => (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => navigateToPath(app.slug)}
                    className="px-2.5 py-2 rounded-lg text-xs font-semibold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer"
                  >
                    <PlatformSvgIcon
                      platform={app.platformName}
                      className="w-3.5 h-3.5 text-[#1167D8]"
                    />
                    <span className="truncate">{app.platformName}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main id="top" className="flex-1">
        {/* 2. Hero Section (Main Downloader Tool with Universal Smart Routing on Every Page) */}
        <section className="pt-8 pb-14 sm:pt-12 sm:pb-16 px-4 sm:px-6 border-b border-slate-200/70 dark:border-slate-800/70">
          <div className="max-w-4xl mx-auto text-center">
            {/* Ad-Ready Placeholder Space 1: Above the Input Box */}
            <AdSlotContainer
              slotId="ad-slot-above-input"
              label="Top Leaderboard Banner (728×90 / Auto)"
              format="leaderboard"
              className="mb-8"
            />

            {/* Unboxed Platform Support Breadcrumb / Trust Line */}
            <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mb-3 tracking-tight">
              <span>LinkedIn</span>
              <span className="mx-1.5" aria-hidden="true">·</span>
              <span>Instagram</span>
              <span className="mx-1.5" aria-hidden="true">·</span>
              <span>Facebook</span>
              <span className="mx-1.5" aria-hidden="true">·</span>
              <span>TikTok</span>
              <span className="mx-1.5" aria-hidden="true">·</span>
              <span>X / Twitter</span>
              <span className="mx-1.5" aria-hidden="true">·</span>
              <span>Pinterest</span>
              <span className="mx-1.5" aria-hidden="true">·</span>
              <span>Snapchat</span>
              <span className="mx-1.5" aria-hidden="true">·</span>
              <span>Reddit</span>
              <span className="mx-1.5" aria-hidden="true">·</span>
              <span>Vimeo</span>
            </p>

            {/* Prominent H1 Heading */}
            <h1
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.12] mb-4"
              style={{ textWrap: 'balance' }}
            >
              {activePlatformPage ? (
                <>
                  <span className="text-[#1167D8]">LiftX</span>
                  {activePlatformPage.heroHeading.replace(/^LiftX/, '')}
                </>
              ) : (
                <>
                  <span className="text-[#1167D8]">{t.heroTitlePrefix}</span>
                  {t.heroTitleMain}
                </>
              )}
            </h1>

            {/* Sub-heading */}
            <p
              className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8"
              style={{ textWrap: 'balance' }}
            >
              {activePlatformPage ? activePlatformPage.heroSubheading : t.heroSubtitle}
            </p>

            {/* Central Smart-Routing Input Card */}
            <div className="max-w-3xl mx-auto">
              <form
                onSubmit={handleFormSubmit}
                className={`relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 rounded-2xl bg-white dark:bg-[#111827] border-2 transition-all duration-150 shadow-sm ${
                  detectedPlatform.isYouTube || isYouTubeBlockedError
                    ? 'border-amber-500 dark:border-amber-500'
                    : 'border-slate-200 dark:border-slate-800 focus-within:border-[#1167D8] dark:focus-within:border-[#1167D8]'
                }`}
              >
                {/* Live Platform Auto-Detector + Input Field */}
                <div className="flex items-center flex-1 min-w-0 pl-3 pr-2 py-1.5 gap-3">
                  <div
                    className={`flex items-center gap-1.5 text-xs font-semibold shrink-0 pr-2.5 border-r border-slate-200 dark:border-slate-800 ${
                      detectedPlatform.isYouTube
                        ? 'text-amber-600 dark:text-amber-400'
                        : detectedPlatform.id !== 'none'
                          ? 'text-[#1167D8] dark:text-[#3B82F6]'
                          : 'text-slate-500 dark:text-slate-400'
                    }`}
                    title={`Smart Auto-Router: ${detectedPlatform.name}`}
                  >
                    {detectedPlatform.isYouTube ? (
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                    ) : (
                      <PlatformSvgIcon
                        platform={detectedPlatform.name}
                        className="w-4 h-4 shrink-0"
                      />
                    )}
                    <span className="hidden sm:inline whitespace-nowrap">
                      {detectedPlatform.name}
                    </span>
                  </div>

                  <input
                    ref={inputRef}
                    type="text"
                    value={urlInput}
                    onChange={(e) => {
                      const val = e.target.value;
                      setUrlInput(val);
                      if (!YOUTUBE_CLIENT_REGEX.test(val)) {
                        if (errorMsg) setErrorMsg(null);
                        if (isYouTubeBlockedError) setIsYouTubeBlockedError(false);
                      }
                    }}
                    placeholder={t.inputPlaceholder}
                    aria-label="Social media video, reel, photo, story, or GIF URL"
                    className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none truncate"
                  />

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

                {/* One-Click Paste + Bright Download Button */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handlePasteClick}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    title="One-click paste from clipboard"
                  >
                    <ClipboardPaste className="w-4 h-4 text-[#1167D8] dark:text-[#3B82F6]" />
                    <span>{t.pasteBtn}</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isExtracting}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm sm:text-base font-bold text-white bg-[#1167D8] hover:bg-[#0D54B3] active:scale-[0.99] disabled:opacity-60 transition-all whitespace-nowrap shrink-0 cursor-pointer flex-1 sm:flex-initial"
                  >
                    {isExtracting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{t.extractingBtn}</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>{t.downloadBtn}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Quick Sample Links for Instant Testing of All 9 Platforms + YouTube Policy Check */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Try Smart Router:
                  </span>
                  {QUICK_SAMPLE_LINKS.map((sample, idx) => (
                    <React.Fragment key={sample.platform}>
                      {idx > 0 && <span aria-hidden="true">·</span>}
                      <button
                        type="button"
                        onClick={() => handleSelectSample(sample.url)}
                        className={`hover:underline underline-offset-2 transition-colors cursor-pointer whitespace-nowrap ${
                          sample.platform === 'YouTube'
                            ? 'text-amber-600 dark:text-amber-400 font-medium'
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
                  <span className="font-medium">Branded LiftX Short URL:</span>
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

              {/* Polite YouTube Policy Notice / Extraction Error Notice */}
              {errorMsg && (
                <div
                  role="alert"
                  className={`mt-5 p-4 rounded-xl border text-left flex items-start gap-3.5 ${
                    isYouTubeBlockedError
                      ? 'bg-amber-50/90 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/80 text-amber-950 dark:text-amber-200'
                      : 'bg-red-50/90 dark:bg-red-950/30 border-red-200 dark:border-red-900/70 text-red-900 dark:text-red-200'
                  }`}
                >
                  <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-0.5">
                      <span>{isYouTubeBlockedError ? 'POLICY GUIDELINES' : 'EXTRACTION NOTICE'}</span>
                      <span aria-hidden="true">·</span>
                      <span>SMART ROUTER</span>
                    </div>
                    <p className="text-sm font-bold">{errorMsg}</p>
                    {isYouTubeBlockedError && (
                      <p className="text-xs text-amber-800/90 dark:text-amber-300/80 mt-1">
                        LiftX supports LinkedIn, Instagram, Facebook, TikTok, X/Twitter, Pinterest,
                        Snapchat, Reddit, and Vimeo. Paste a link from any of those platforms above.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Download Screen (3-Column Layout with Left/Right AD Skyscrapers, Center Progress Card, and Bottom Premium Bar) */}
            <div ref={previewSectionRef} id="download-screen" className="mt-10 text-left">
              <DownloadScreenView
                filename={mediaResult ? mediaResult.filenames.hdMp4 : 'vacation_trip.mp4'}
                title={
                  mediaResult
                    ? mediaResult.title
                    : 'Tropical Coastline & Palm Beach Aerial Reel (1080p HD)'
                }
                platform={mediaResult ? mediaResult.platform : 'Instagram'}
                totalSizeMb={mediaResult ? parseFloat(mediaResult.filesizeMb) || 74.1 : 74.1}
                videoUrl={
                  mediaResult
                    ? selectedQuality === '1080p'
                      ? mediaResult.videoUrl
                      : mediaResult.sdVideoUrl
                    : 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
                }
                sdVideoUrl={
                  mediaResult
                    ? mediaResult.sdVideoUrl
                    : 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
                }
                audioUrl={
                  mediaResult
                    ? mediaResult.audioUrl
                    : 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
                }
                thumbnailUrl={
                  mediaResult
                    ? mediaResult.thumbnail
                    : downloadHistory[0].thumbnail
                }
                filenames={
                  mediaResult
                    ? mediaResult.filenames
                    : {
                        hdMp4: 'vacation_trip.mp4',
                        sdMp4: 'vacation_trip_720p.mp4',
                        mp3: 'vacation_trip_audio.mp3',
                        coverJpg: 'vacation_trip_cover.jpg'
                      }
                }
                autoAnimate={autoAnimateDownload}
                onTriggerRealDownload={handleDirectDownload}
                downloadingKey={downloadingKey}
                downloadSuccessNote={downloadSuccessNote}
                onOpenShareModal={() => setIsShareModalOpen(true)}
              />
            </div>

            {/* Dedicated Platform Quick-Switch Bar (All 9 Supported Platforms) */}
            <div
              id="supported-platforms"
              className="max-w-5xl mx-auto mt-10 pt-8 border-t border-slate-200/80 dark:border-slate-800/80"
            >
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
                Dedicated Social Media Downloader Pages (Click any app to switch page or test HD extraction):
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2">
                {PLATFORM_SEO_GUIDES.map((p) => {
                  const isCurrentPage =
                    activeRoute.type === 'platform' && activeRoute.platformId === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        navigateToPath(p.slug);
                        handleSelectSample(p.sampleUrl);
                      }}
                      className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isCurrentPage
                          ? 'bg-[#1167D8] text-white border-[#1167D8]'
                          : 'bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 hover:border-[#1167D8] dark:hover:border-[#1167D8] text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <PlatformSvgIcon
                        platform={p.platformName}
                        className={`w-3.5 h-3.5 ${
                          isCurrentPage ? 'text-white' : 'text-[#1167D8] dark:text-[#3B82F6]'
                        }`}
                      />
                      <span>{p.platformName.replace(' (Twitter)', '')}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Conditional Legal Page View vs Main SEO Content Sections */}
        {activeRoute.type === 'legal' ? (
          <LegalAndContactPageView
            pageType={activeRoute.page}
            onBackToHome={() => navigateToPath('/')}
          />
        ) : (
          <>
            {/* 3. Step-by-Step Visual Guide (With Custom UI Mockup Illustrations) */}
            <VisualThreeStepGuide t={t} />

            {/* 4. Detailed SEO Content & Platform Breakdown (Long-Form Article) */}
            <section
              id="seo-guide-article"
              className="py-16 sm:py-20 px-4 sm:px-6 border-b border-slate-200/70 dark:border-slate-800/70"
            >
              <div className="max-w-6xl mx-auto">
                {/* What is LiftX? Overview Article Block */}
                <div className="max-w-4xl mx-auto mb-14 p-6 sm:p-10 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
                  <p className="text-xs font-semibold text-[#1167D8] dark:text-[#3B82F6] mb-2">
                    Browser-Based Universal Media Saver · No App Installation Required
                  </p>
                  <h2
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white mb-4"
                    style={{ textWrap: 'balance' }}
                  >
                    {t.whatIsLiftXTitle}
                  </h2>
                  <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    <p>
                      <strong>LiftX - Media Downloader</strong> is an ultra-fast, browser-based
                      all-in-one social media downloader engineered to help creators, marketers,
                      researchers, and everyday users save publicly shared videos, Reels, photos,
                      stories, multi-slide carousels, and animated GIFs in original HD and 4K
                      resolution. Unlike bulky mobile apps or browser extensions that demand account
                      permissions, LiftX runs directly in your web browser with zero registration
                      and zero watermarks.
                    </p>
                    <p>
                      Powered by our intelligent Smart Routing engine, LiftX automatically detects
                      links from <strong>LinkedIn</strong>, <strong>Instagram</strong>,{' '}
                      <strong>Facebook</strong>, <strong>TikTok</strong>,{' '}
                      <strong>X (Twitter)</strong>, <strong>Pinterest</strong>,{' '}
                      <strong>Snapchat</strong>, <strong>Reddit</strong>, and{' '}
                      <strong>Vimeo</strong>. Simply paste your copied URL into the search box on
                      any page to preview the media stream in our live HTML5 player and download
                      clean <code className="font-mono">MP4 1080p</code>,{' '}
                      <code className="font-mono">MP4 720p</code>,{' '}
                      <code className="font-mono">JPG Photo</code>, or{' '}
                      <code className="font-mono">MP3 Audio</code> files directly from the source
                      CDN.
                    </p>
                  </div>
                </div>

                {/* Ad-Ready Placeholder Space 3: Inside the Article Section */}
                <AdSlotContainer
                  slotId="ad-slot-in-article"
                  label="In-Article Multiplex Ad Unit (AdSense / Monetag)"
                  format="in-article"
                  className="mb-14"
                />

                {/* Key Features Grid (6 Core Pillars) */}
                <div className="mb-16">
                  <div className="text-center max-w-3xl mx-auto mb-10">
                    <p className="text-xs font-semibold text-[#1167D8] dark:text-[#3B82F6] mb-2">
                      Core Capabilities &amp; Performance
                    </p>
                    <h2
                      className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white"
                      style={{ textWrap: 'balance' }}
                    >
                      {t.keyFeaturesTitle}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {KEY_FEATURES_GRID.map((feat) => (
                      <div
                        key={feat.id}
                        className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs font-mono text-slate-400 dark:text-slate-500 mb-3 tabular-nums">
                            <span className="font-bold text-[#1167D8] dark:text-[#3B82F6]">
                              {feat.number}
                            </span>
                            <span>{feat.metric}</span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                            {feat.title}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {feat.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Platform-by-Platform Features Breakdown (Dedicated H2/H3 SEO Sections) */}
                <div id="platform-guides">
                  <div className="max-w-3xl mb-10">
                    <p className="text-xs font-semibold text-[#1167D8] dark:text-[#3B82F6] mb-2">
                      Platform-by-Platform Features &amp; Dedicated SEO Guides
                    </p>
                    <h2
                      className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white mb-3"
                      style={{ textWrap: 'balance' }}
                    >
                      Complete Breakdown of Supported Social Media Platforms
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      Every platform uses a different streaming protocol—from Instagram GraphQL
                      nodes and Pinterest HLS segments to Reddit DASH split audio tracks. Here is
                      how LiftX handles each network in full HD.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {PLATFORM_SEO_GUIDES.map((guide) => (
                      <article
                        key={guide.id}
                        className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                            <span className="inline-flex items-center gap-1.5 font-semibold text-[#1167D8] dark:text-[#3B82F6]">
                              <PlatformSvgIcon platform={guide.platformName} className="w-4 h-4" />
                              <span>
                                {guide.number}. {guide.platformName}
                              </span>
                            </span>
                            <span className="font-mono tabular-nums">{guide.specs}</span>
                          </div>

                          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-3">
                            {guide.h2Title}
                          </h2>

                          {/* Supported Media Formats Unboxed Text Line */}
                          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-4">
                            <span className="text-slate-700 dark:text-slate-200 font-semibold">
                              Supported Formats:{' '}
                            </span>
                            {guide.supportedMediaTypes.join(' · ')}
                          </p>

                          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                            {guide.introParagraph}
                          </p>

                          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                            {guide.h3ArchitectureTitle}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                            {guide.architectureParagraph}
                          </p>

                          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                            {guide.h3HowItWorksTitle}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                            {guide.workflowParagraph}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => navigateToPath(guide.slug)}
                            className="text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-[#1167D8] dark:hover:text-[#3B82F6] transition-colors cursor-pointer"
                          >
                            Page: {guide.slug}
                          </button>

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
              </div>
            </section>

            {/* Cross-Device OS Instructions (iOS, Android, Windows & Mac) */}
            <section className="py-16 px-4 sm:px-6 border-b border-slate-200/70 dark:border-slate-800/70">
              <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                  <div>
                    <p className="text-xs font-semibold text-[#1167D8] dark:text-[#3B82F6] mb-2">
                      Device-Specific File Save Guide
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                      Saving Videos &amp; Photos on Android, iOS, Windows &amp; Mac
                    </h2>
                  </div>

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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {activeDeviceGuide.steps.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800"
                    >
                      <div className="text-xs font-mono font-bold text-[#1167D8] dark:text-[#3B82F6] mb-2 tabular-nums">
                        STEP {step.stepNumber} · {activeDeviceGuide.label.toUpperCase()}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Schema-Ready FAQ Accordion Section (8 Common Questions) */}
            <section
              id="faq"
              className="py-16 sm:py-20 px-4 sm:px-6 border-b border-slate-200/70 dark:border-slate-800/70"
            >
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <p className="text-xs font-semibold text-[#1167D8] dark:text-[#3B82F6] mb-2">
                    Schema.org FAQPage Structured Knowledge Base
                  </p>
                  <h2
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white mb-3"
                    style={{ textWrap: 'balance' }}
                  >
                    {t.faqTitle}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                    Answers to the most common questions about downloading public videos, Reels,
                    photos, and stories with LiftX.
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

            {/* Full-Stack Source Code Deliverables Inspector */}
            <section className="py-10 px-4 sm:px-6 bg-slate-100/70 dark:bg-[#0D1322] border-b border-slate-200/70 dark:border-slate-800/70">
              <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono text-[#1167D8] dark:text-[#3B82F6] mb-1">
                      FULL-STACK ARCHITECTURE · EXPRESS + YT-DLP + TAILWIND CSS
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      Production Source Code &amp; Backend Deliverables
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowCodeModal(!showCodeModal)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1167D8] hover:bg-[#0D54B3] transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-auto"
                  >
                    <Code2 className="w-4 h-4" />
                    <span>{showCodeModal ? 'Hide Source Files' : 'Inspect All 6 Source Files'}</span>
                  </button>
                </div>

                {showCodeModal && (
                  <div className="mt-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 overflow-hidden">
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
                        onClick={() =>
                          handleCopyDeliverable(activeDeliverable.id, activeDeliverable.code)
                        }
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

                    <pre className="p-4 sm:p-6 text-xs font-mono leading-relaxed overflow-x-auto bg-slate-950 text-slate-100 max-h-[420px]">
                      <code>{activeDeliverable.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {/* 5. Mandatory Global Disclaimer Banner (Displayed Above Footer on EVERY Page) */}
        <section
          aria-label="Legal Disclaimer Banner"
          className="py-8 px-4 sm:px-6 bg-amber-50/70 dark:bg-amber-950/20 border-t border-b border-amber-200/80 dark:border-amber-900/50"
        >
          <div className="max-w-6xl mx-auto flex items-start gap-3.5">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {GLOBAL_DISCLAIMER_TEXT}
            </p>
          </div>
        </section>
      </main>

      {/* 6. Footer Section with Quick Platform Links, Legal Links & Copyright */}
      <footer className="bg-white dark:bg-[#090D16] py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-200/80 dark:border-slate-800/80">
            {/* Brand Column */}
            <div className="md:col-span-4 space-y-3">
              <LiftXBrandLogo size="sm" />
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
                LiftX - All-in-One Social Media Media Downloader. Save public Videos, Reels, Photos,
                Stories, Carousels, and GIFs in HD/4K Quality — 100% Free &amp; No Login Required.
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setIsShareModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1167D8] dark:text-[#3B82F6] hover:underline underline-offset-4 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share LiftX Short URL</span>
                </button>
              </div>
            </div>

            {/* Individual Platform Downloader Quick Links */}
            <div className="md:col-span-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                Platform Downloaders
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                {PLATFORM_SEO_GUIDES.map((p) => (
                  <a
                    key={p.id}
                    href={p.slug}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToPath(p.slug);
                    }}
                    className="hover:text-[#1167D8] dark:hover:text-[#3B82F6] transition-colors truncate"
                  >
                    {p.platformName} Downloader
                  </a>
                ))}
              </div>
            </div>

            {/* Legal & Support Links */}
            <div className="md:col-span-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                Legal &amp; Support
              </h3>
              <ul className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                <li>
                  <a
                    href="/terms-and-conditions"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToPath('/terms-and-conditions');
                    }}
                    className="hover:text-[#1167D8] dark:hover:text-[#3B82F6] transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy-policy"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToPath('/privacy-policy');
                    }}
                    className="hover:text-[#1167D8] dark:hover:text-[#3B82F6] transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/dmca"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToPath('/dmca');
                    }}
                    className="hover:text-[#1167D8] dark:hover:text-[#3B82F6] transition-colors"
                  >
                    DMCA / Copyright
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToPath('/contact');
                    }}
                    className="hover:text-[#1167D8] dark:hover:text-[#3B82F6] transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <p>© 2026 LiftX Media Downloader. All rights reserved.</p>
            <p className="font-mono text-[11px]">
              Zero-Storage CDN Proxy · FastDl-Grade Universal Engine
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

      {/* Download History & Settings Modal */}
      <HistoryAndSettingsModal
        mode={historyModalMode}
        onClose={() => setHistoryModalMode(null)}
        historyItems={downloadHistory}
        onClearHistory={() => setDownloadHistory([])}
        onSelectHistoryItem={(item) => {
          setMediaResult({
            success: true,
            sourceUrl: item.videoUrl,
            platform: item.platform,
            extractor: 'liftx-session-history',
            title: item.title,
            author: `@${item.platform.toLowerCase()}`,
            authorName: item.platform,
            durationSeconds: 15,
            durationFormatted: '0:15',
            resolution: item.resolution,
            filesizeMb: item.sizeMb,
            watermarkFree: true,
            thumbnail: item.thumbnail,
            videoUrl: item.videoUrl,
            sdVideoUrl: item.videoUrl,
            audioUrl: item.videoUrl,
            filenames: {
              hdMp4: item.filename,
              sdMp4: item.filename.replace('.mp4', '_720p.mp4'),
              mp3: item.filename.replace('.mp4', '.mp3'),
              coverJpg: item.filename.replace('.mp4', '.jpg')
            },
            formats: []
          });
          setAutoAnimateDownload(false);
        }}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />
    </div>
  );
}
