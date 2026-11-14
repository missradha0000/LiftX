import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Download,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Cloud,
  ArrowRight,
  Music,
  Image as ImageIcon,
  SlidersHorizontal,
  ShieldCheck,
  X,
  Clock,
  Trash2
} from 'lucide-react';

export interface DownloadHistoryItem {
  id: string;
  filename: string;
  platform: string;
  title: string;
  sizeMb: string;
  resolution: string;
  timestamp: string;
  videoUrl: string;
  thumbnail: string;
}

interface DownloadScreenViewProps {
  filename: string;
  title: string;
  platform: string;
  totalSizeMb: number;
  videoUrl: string;
  sdVideoUrl: string;
  audioUrl: string;
  thumbnailUrl: string;
  filenames: {
    hdMp4: string;
    sdMp4: string;
    mp3: string;
    coverJpg: string;
  };
  autoAnimate?: boolean;
  onTriggerRealDownload: (
    actionKey: 'mp4-1080' | 'mp4-720' | 'jpg' | 'mp3',
    streamUrl: string,
    filename: string,
    mimeType: 'mp4' | 'jpg' | 'mp3'
  ) => void;
  downloadingKey: string | null;
  downloadSuccessNote: string | null;
  onOpenShareModal: () => void;
}

export const DownloadScreenView: React.FC<DownloadScreenViewProps> = ({
  filename,
  title,
  platform,
  totalSizeMb,
  videoUrl,
  sdVideoUrl,
  audioUrl,
  thumbnailUrl,
  filenames,
  autoAnimate = false,
  onTriggerRealDownload,
  downloadingKey,
  downloadSuccessNote,
  onOpenShareModal
}) => {
  const [progress, setProgress] = useState<number>(65);
  const [isPaused, setIsPaused] = useState<boolean>(!autoAnimate);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [activePromoModal, setActivePromoModal] = useState<string | null>(null);
  const [showQualityOptions, setShowQualityOptions] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync progress animation when a new extraction occurs or when user resumes
  useEffect(() => {
    if (autoAnimate) {
      setProgress(12);
      setIsPaused(false);
    }
  }, [filename, videoUrl, autoAnimate]);

  useEffect(() => {
    if (isPaused || progress >= 100) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(100, prev + 5);
      });
    }, 350);

    return () => clearInterval(timer);
  }, [isPaused, progress]);

  const downloadedMb = ((totalSizeMb * progress) / 100).toFixed(1);
  const totalFormattedMb = totalSizeMb.toFixed(1);
  const remainingSeconds =
    progress >= 100 ? 0 : Math.max(1, Math.round(((100 - progress) / 35) * 12));

  const toggleVideoPlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().then(() => setIsVideoPlaying(true)).catch(() => {});
    } else {
      vid.pause();
      setIsVideoPlaying(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Main 3-Column Download Screen Layout (Left Ad | Center Download Card | Right Ad) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* LEFT COLUMN: Vertical Skyscraper Ad ("AD - Special Deal") */}
        <aside
          aria-label="Left Promotional Advertisement"
          className="lg:col-span-2 flex flex-col rounded-2xl bg-[#DCE5F4]/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 p-3 shadow-xs"
        >
          <div className="text-center text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 py-1.5">
            AD
          </div>
          <div className="flex-1 rounded-xl bg-white dark:bg-[#111827] border border-slate-100 dark:border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden">
            <div>
              <p className="text-lg font-extrabold leading-tight bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 bg-clip-text text-transparent mb-2">
                AD - Special Deal
              </p>
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-snug mb-3">
                Get 50% OFF Premium Plans!
              </p>
              <div className="inline-block bg-amber-300/90 text-slate-950 text-[10px] font-extrabold px-2 py-1 rounded-md leading-tight mb-4">
                Limited Time
                <br />
                Offer
              </div>
            </div>

            {/* Decorative Confetti / Burst SVG */}
            <div className="my-2 flex justify-center" aria-hidden="true">
              <svg className="w-20 h-16" viewBox="0 0 100 80" fill="none">
                <path
                  d="M50 75C50 55 30 35 15 25"
                  stroke="#F97316"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M50 75C50 50 50 25 50 10"
                  stroke="#EC4899"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M50 75C55 50 75 35 88 22"
                  stroke="#1167D8"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle cx="22" cy="18" r="4" fill="#FACC15" />
                <circle cx="50" cy="8" r="4" fill="#1167D8" />
                <circle cx="82" cy="16" r="4" fill="#EC4899" />
                <circle cx="35" cy="30" r="3" fill="#10B981" />
                <circle cx="68" cy="32" r="3.5" fill="#F97316" />
              </svg>
            </div>

            <button
              type="button"
              onClick={() => setActivePromoModal('50% OFF Special Deal')}
              className="w-full py-2 px-3 rounded-full bg-[#1167D8] hover:bg-[#0D54B3] text-white text-xs font-bold inline-flex items-center justify-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </aside>

        {/* CENTER COLUMN: Main White Download Screen Card */}
        <div className="lg:col-span-8 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-md flex flex-col justify-between">
          {/* Top Video Preview Frame with Centered Blue Play Button Overlay */}
          <div className="max-w-xl mx-auto w-full">
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-video shadow-md border border-slate-200/70 dark:border-slate-800 group">
              <video
                ref={videoRef}
                src={videoUrl}
                poster={thumbnailUrl}
                playsInline
                preload="metadata"
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
                onEnded={() => setIsVideoPlaying(false)}
                onClick={toggleVideoPlay}
                className="w-full h-full object-cover cursor-pointer"
              />

              {/* Centered Royal Blue Play Button with Concentric Ripple Rings */}
              <button
                type="button"
                onClick={toggleVideoPlay}
                aria-label={isVideoPlaying ? 'Pause preview video' : 'Play preview video'}
                className={`absolute inset-0 flex items-center justify-center bg-black/15 hover:bg-black/25 transition-opacity cursor-pointer ${
                  isVideoPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
                }`}
              >
                <span className="relative flex items-center justify-center">
                  <span className="absolute w-24 h-24 rounded-full bg-white/25 backdrop-blur-[1px] pointer-events-none" />
                  <span className="absolute w-18 h-18 rounded-full bg-white/40 pointer-events-none" />
                  <span className="relative w-14 h-14 rounded-full bg-[#1167D8] hover:bg-[#0D54B3] text-white shadow-lg flex items-center justify-center transition-transform group-hover:scale-105">
                    {isVideoPlaying ? (
                      <Pause className="w-6 h-6 fill-white" />
                    ) : (
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    )}
                  </span>
                </span>
              </button>
            </div>
          </div>

          {/* Middle Progress Bar & Transfer Telemetry Section */}
          <div className="max-w-xl mx-auto w-full my-7 text-center">
            {/* Status Heading: "Downloading... 65% — Please wait" */}
            <h2 className="text-xl sm:text-2xl text-slate-900 dark:text-white tracking-tight mb-3.5 tabular-nums">
              {progress < 100 ? (
                <>
                  <strong className="font-extrabold">Downloading... {progress}%</strong>
                  <span className="font-normal text-slate-700 dark:text-slate-300">
                    {' '}
                    — Please wait
                  </span>
                </>
              ) : (
                <>
                  <strong className="font-extrabold text-emerald-600 dark:text-emerald-400">
                    Download Ready! 100%
                  </strong>
                  <span className="font-normal text-slate-700 dark:text-slate-300">
                    {' '}
                    — File verified
                  </span>
                </>
              )}
            </h2>

            {/* Thick Royal Blue Progress Bar */}
            <div
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              className="w-full h-4 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden p-0.5"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#0D54B3] via-[#1167D8] to-[#2563EB] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Telemetry Subtitle: "vacation_trip.mp4 • 48.2 MB of 74.1 MB • 12s remaining" */}
            <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium tabular-nums">
              <span>{filename}</span>
              <span className="mx-2" aria-hidden="true">
                •
              </span>
              <span>
                {downloadedMb} MB of {totalFormattedMb} MB
              </span>
              <span className="mx-2" aria-hidden="true">
                •
              </span>
              <span>
                {progress >= 100 ? 'Completed (0s remaining)' : `${remainingSeconds}s remaining`}
              </span>
            </p>

            {/* Interactive Controls Bar: Simulate / Complete Progress + Direct File Save Options */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                {isPaused ? '▶ Resume Progress' : '⏸ Pause at ' + progress + '%'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsPaused(true);
                  setProgress(65);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  progress === 65
                    ? 'bg-[#1167D8]/15 text-[#1167D8] dark:text-[#3B82F6] font-bold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                Set 65% Snapshot
              </button>

              <button
                type="button"
                onClick={() =>
                  onTriggerRealDownload('mp4-1080', videoUrl, filenames.hdMp4, 'mp4')
                }
                disabled={downloadingKey !== null}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-[#1167D8] hover:bg-[#0D54B3] text-white transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>
                  {downloadingKey === 'mp4-1080' ? 'Saving MP4...' : 'Save HD MP4 to Device'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setShowQualityOptions(!showQualityOptions)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#1167D8]" />
                <span>More Formats (720p / JPG / MP3)</span>
              </button>
            </div>

            {/* Expandable Multi-Format Direct Download Drawer */}
            {showQualityOptions && (
              <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-2 text-left">
                <button
                  type="button"
                  onClick={() =>
                    onTriggerRealDownload('mp4-720', sdVideoUrl, filenames.sdMp4, 'mp4')
                  }
                  className="px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#1167D8] text-xs font-semibold flex items-center justify-between cursor-pointer"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5 text-[#1167D8]" />
                    <span>MP4 720p</span>
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">Fast HD</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onTriggerRealDownload('jpg', thumbnailUrl, filenames.coverJpg, 'jpg')
                  }
                  className="px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#1167D8] text-xs font-semibold flex items-center justify-between cursor-pointer"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[#1167D8]" />
                    <span>Photo / Cover</span>
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">HD JPG</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onTriggerRealDownload('mp3', audioUrl, filenames.mp3, 'mp3')
                  }
                  className="px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#1167D8] text-xs font-semibold flex items-center justify-between cursor-pointer"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5 text-[#1167D8]" />
                    <span>Audio Track</span>
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">320kbps MP3</span>
                </button>
              </div>
            )}

            {downloadSuccessNote && (
              <div className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-mono">{downloadSuccessNote}</span>
              </div>
            )}
          </div>

          {/* Bottom Inside-Card Horizontal Promotional Banner ("Best Offer — 70% OFF Lifetime Premium!") */}
          <div
            onClick={() => setActivePromoModal('70% OFF Lifetime Premium')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setActivePromoModal('70% OFF Lifetime Premium');
              }
            }}
            className="max-w-xl mx-auto w-full rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-[#EC4899] via-[#F97316] to-[#FACC15] text-white shadow-sm hover:brightness-105 transition-all cursor-pointer relative overflow-hidden text-left"
          >
            <div className="relative z-10">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/25 backdrop-blur-xs text-[11px] font-bold tracking-wide mb-1.5">
                AD - Best Offer
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-white drop-shadow-xs">
                Best Offer — 70% OFF Lifetime Premium!
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-white/95 mt-1 inline-flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 fill-amber-200 text-amber-200 shrink-0" />
                <span>Unlock unlimited downloads &amp; no ads. Claim now →</span>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Vertical Skyscraper Ad ("AD - Upgrade Now") */}
        <aside
          aria-label="Right Promotional Advertisement"
          className="lg:col-span-2 flex flex-col rounded-2xl bg-[#DCE5F4]/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 p-3 shadow-xs"
        >
          <div className="text-center text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 py-1.5">
            AD
          </div>
          <div className="flex-1 rounded-xl bg-gradient-to-b from-[#1D4ED8] via-[#2563EB] to-[#3B82F6] text-white p-4 flex flex-col justify-between relative overflow-hidden">
            <div>
              <p className="text-lg font-extrabold leading-tight mb-2">
                AD -
                <br />
                Upgrade
                <br />
                Now
              </p>
              <p className="text-xs font-semibold text-blue-100 leading-snug">
                Cloud Storage
                <br />
                <strong className="text-white">+50GB Free</strong>
              </p>
            </div>

            <div className="my-4 flex items-center justify-between" aria-hidden="true">
              <Cloud className="w-9 h-9 text-white fill-white/90" />
              <Sparkles className="w-6 h-6 text-amber-300 fill-amber-300" />
            </div>

            <button
              type="button"
              onClick={() => setActivePromoModal('Cloud Storage +50GB Free')}
              className="w-full py-2 px-3 rounded-full bg-white/15 hover:bg-white/25 border border-white/60 text-white text-xs font-bold inline-flex items-center justify-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Claim Offer</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </aside>
      </div>

      {/* BOTTOM FULL-WIDTH HORIZONTAL AD BAR ("Join LiftX Premium — Faster Downloads, No Limits, Ad-Free Experience | Upgrade for $4.99/mo") */}
      <div className="mt-6 rounded-2xl bg-gradient-to-r from-[#DCE7F9] via-[#E5EEFC] to-[#D4E3FA] dark:from-slate-900 dark:via-[#111C35] dark:to-slate-900 border border-blue-200/80 dark:border-slate-800 px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase shrink-0">
            AD
          </span>
          <p className="text-xs sm:text-sm font-semibold text-[#0F3C85] dark:text-blue-200">
            <strong className="font-extrabold">Join LiftX Premium</strong> — Faster Downloads, No
            Limits, Ad-Free Experience <span className="mx-1 opacity-60">|</span> Upgrade for
            $4.99/mo
          </p>
        </div>

        <button
          type="button"
          onClick={() => setActivePromoModal('LiftX Premium ($4.99/mo)')}
          className="px-5 py-2.5 rounded-xl bg-[#1167D8] hover:bg-[#0D54B3] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Upgrade Now
        </button>
      </div>

      {/* Interactive Modal for Premium / Ad Offers */}
      {activePromoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
          onClick={() => setActivePromoModal(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 p-6 shadow-xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#1167D8]" />
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {activePromoModal}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActivePromoModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <p>
                <strong>LiftX Core Downloader is 100% Free Forever!</strong> This promotional banner
                demonstrates the ad-ready layout slots integrated for AdSense / Monetag or optional
                Premium upsells:
              </p>
              <ul className="space-y-1.5 text-xs">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Zero-Advertisement Interface &amp; Priority 4K CDN Threads</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>+50GB Encrypted Cloud Media Vault</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Unlimited Batch Playlist &amp; Carousel ZIP Exports</span>
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setActivePromoModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                Continue Free Download
              </button>
              <button
                type="button"
                onClick={() => {
                  setActivePromoModal(null);
                  onOpenShareModal();
                }}
                className="px-4 py-2 rounded-xl bg-[#1167D8] text-white text-xs font-bold cursor-pointer"
              >
                Share LiftX Instead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Interactive Download History & Settings Modal for Top Nav ("History" & "Settings" links)
 */
export const HistoryAndSettingsModal: React.FC<{
  mode: 'history' | 'settings' | null;
  onClose: () => void;
  historyItems: DownloadHistoryItem[];
  onClearHistory: () => void;
  onSelectHistoryItem: (item: DownloadHistoryItem) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}> = ({
  mode,
  onClose,
  historyItems,
  onClearHistory,
  onSelectHistoryItem,
  darkMode,
  onToggleDarkMode
}) => {
  if (!mode) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 p-6 shadow-xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#1167D8]" />
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              {mode === 'history' ? 'Recent Session Downloads' : 'LiftX Downloader Settings'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {mode === 'history' ? (
          <div className="py-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Session-only local list (Zero history is ever stored on LiftX servers):
            </p>
            {historyItems.length === 0 ? (
              <div className="p-6 text-center rounded-xl bg-slate-50 dark:bg-slate-900 text-xs text-slate-500">
                No downloads in this browser session yet.
              </div>
            ) : (
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {historyItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {item.filename}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {item.platform} · {item.sizeMb} MB · {item.timestamp}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectHistoryItem(item);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#1167D8] text-white text-xs font-bold shrink-0 cursor-pointer"
                    >
                      Load
                    </button>
                  </div>
                ))}
              </div>
            )}

            {historyItems.length > 0 && (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={onClearHistory}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:underline cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Local Session History</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="py-4 space-y-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Appearance Theme</p>
                <p className="text-xs text-slate-500">Switch between Light and Dark surface themes</p>
              </div>
              <button
                type="button"
                onClick={onToggleDarkMode}
                className="px-3.5 py-2 rounded-lg bg-[#1167D8] text-white text-xs font-bold cursor-pointer"
              >
                {darkMode ? 'Switch to Light' : 'Switch to Dark'}
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Default Video Quality</p>
                <p className="text-xs text-slate-500">Always prefer 1080p / 4K master MP4 stream</p>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                1080p HD Active
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
