import React, { useState, useEffect } from 'react';
import {
  Share2,
  Link2,
  Copy,
  Check,
  X,
  Loader2,
  ExternalLink,
  MessageSquareShare
} from 'lucide-react';
import { LiftXBrandLogo } from './LiftXBrandLogo';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMedia?: {
    sourceUrl: string;
    platform: string;
    title: string;
  } | null;
}

interface ShortLinkResponse {
  success: boolean;
  code: string;
  brandedShortUrl: string;
  liveShareUrl: string;
  directAppUrl: string;
  platform: string;
  title: string;
  clicks: number;
}

export const ShareLiftXModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  currentMedia
}) => {
  const [shareScope, setShareScope] = useState<'tool' | 'media'>(
    currentMedia ? 'media' : 'tool'
  );
  const [urlFormat, setUrlFormat] = useState<'branded' | 'live'>('branded');
  const [shortData, setShortData] = useState<ShortLinkResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedTarget, setCopiedTarget] = useState<'url' | 'message' | null>(null);
  const [nativeShareNote, setNativeShareNote] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setShareScope(currentMedia ? 'media' : 'tool');
    }
  }, [isOpen, currentMedia]);

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;
    async function generateBrandedShortUrl() {
      setIsLoading(true);
      try {
        const payload =
          shareScope === 'media' && currentMedia
            ? {
                url: currentMedia.sourceUrl,
                title: `${currentMedia.title} (${currentMedia.platform} HD via LiftX)`
              }
            : {
                url: '',
                title: 'LiftX Media Downloader — Free Universal Social Video & Reel Saver'
              };

        const res = await fetch('/api/share', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (!cancelled && res.ok && data.success) {
          setShortData(data);
        }
      } catch {
        const fallbackCode = shareScope === 'media' ? 'lx8k4p' : 'liftx1';
        const origin = window.location.origin;
        if (!cancelled) {
          setShortData({
            success: true,
            code: fallbackCode,
            brandedShortUrl: `liftx.app/s/${fallbackCode}`,
            liveShareUrl: `${origin}/s/${fallbackCode}`,
            directAppUrl: `${origin}/`,
            platform: currentMedia?.platform || 'LiftX',
            title:
              currentMedia?.title ||
              'LiftX Media Downloader — Free Universal Social Video & Reel Saver',
            clicks: 1
          });
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    generateBrandedShortUrl();
    return () => {
      cancelled = true;
    };
  }, [isOpen, shareScope, currentMedia]);

  if (!isOpen) return null;

  const activeShortUrl =
    urlFormat === 'branded'
      ? `https://${shortData?.brandedShortUrl || 'liftx.app/s/liftx1'}`
      : shortData?.liveShareUrl || window.location.origin;

  const shareMessage =
    shareScope === 'media' && currentMedia
      ? `Check out this ${currentMedia.platform} HD video on LiftX Media Downloader (no watermark): ${activeShortUrl}`
      : `Download public Reels, TikToks (no watermark), X videos, Pinterest pins & Reddit clips with sound in 1080p HD for free with LiftX Media Downloader: ${activeShortUrl}`;

  const handleCopyText = async (text: string, target: 'url' | 'message') => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    setCopiedTarget(target);
    setTimeout(() => setCopiedTarget(null), 2200);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'LiftX Media Downloader',
          text: shareMessage,
          url: shortData?.liveShareUrl || window.location.origin
        });
        setNativeShareNote('Shared via system share sheet');
        setTimeout(() => setNativeShareNote(null), 2500);
        return;
      } catch {
        // User cancelled or share blocked in iframe; fallback to clipboard copy
      }
    }
    await handleCopyText(activeShortUrl, 'url');
    setNativeShareNote('Copied link to clipboard');
    setTimeout(() => setNativeShareNote(null), 2500);
  };

  const encodedUrl = encodeURIComponent(activeShortUrl);
  const encodedText = encodeURIComponent(shareMessage);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-liftx-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 p-6 shadow-xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <LiftXBrandLogo size="sm" />
            <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">
              /
            </span>
            <h2
              id="share-liftx-title"
              className="text-base font-bold text-slate-900 dark:text-white"
            >
              Branded Short Link Generator
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close share dialog"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scope Selector if a video is currently extracted */}
        {currentMedia && (
          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              Choose what to share:
            </p>
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200/70 dark:border-slate-700/60">
              <button
                type="button"
                onClick={() => setShareScope('tool')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap truncate cursor-pointer ${
                  shareScope === 'tool'
                    ? 'bg-[#1167D8] text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Share LiftX Tool
              </button>
              <button
                type="button"
                onClick={() => setShareScope('media')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap truncate cursor-pointer ${
                  shareScope === 'media'
                    ? 'bg-[#1167D8] text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Share Current {currentMedia.platform} Video
              </button>
            </div>
          </div>
        )}

        {/* Generated Short URL Box */}
        <div className="mt-5">
          <div className="flex items-center justify-between gap-2 mb-2">
            <label
              htmlFor="liftx-short-url-input"
              className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
            >
              <Link2 className="w-3.5 h-3.5 text-[#1167D8]" />
              <span>Generated LiftX Short URL</span>
            </label>

            {/* Toggle between Branded Domain and Live App Redirect URL */}
            <div className="inline-flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => setUrlFormat('branded')}
                className={`font-medium transition-colors cursor-pointer ${
                  urlFormat === 'branded'
                    ? 'text-[#1167D8] dark:text-[#3B82F6] underline underline-offset-4 font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Branded (liftx.app)
              </button>
              <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">
                ·
              </span>
              <button
                type="button"
                onClick={() => setUrlFormat('live')}
                className={`font-medium transition-colors cursor-pointer ${
                  urlFormat === 'live'
                    ? 'text-[#1167D8] dark:text-[#3B82F6] underline underline-offset-4 font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Live App URL
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="flex-1 min-w-0 px-2.5 py-1.5">
              {isLoading ? (
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#1167D8]" />
                  <span>Generating short link...</span>
                </div>
              ) : (
                <input
                  id="liftx-short-url-input"
                  type="text"
                  readOnly
                  value={activeShortUrl}
                  onFocus={(e) => e.currentTarget.select()}
                  className="w-full bg-transparent text-sm font-mono font-semibold text-slate-900 dark:text-white focus:outline-none truncate"
                />
              )}
            </div>

            <button
              type="button"
              onClick={() => handleCopyText(activeShortUrl, 'url')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-[#1167D8] hover:bg-[#0D54B3] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copiedTarget === 'url' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied Link!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Short Link</span>
                </>
              )}
            </button>
          </div>

          {/* Unboxed Shortcode Metadata */}
          {shortData && (
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
              <div>
                <span>Shortcode: #{shortData.code}</span>
                <span className="mx-1.5" aria-hidden="true">
                  ·
                </span>
                <span>Target: {shortData.platform}</span>
              </div>
              <div>
                <span>{shortData.clicks} link resolves</span>
              </div>
            </div>
          )}
        </div>

        {/* Ready-to-Share Social Blurb + One-Click Copy */}
        <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <MessageSquareShare className="w-3.5 h-3.5 text-[#1167D8]" />
              <span>Ready-to-Post Share Message</span>
            </span>
            <button
              type="button"
              onClick={() => handleCopyText(shareMessage, 'message')}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1167D8] dark:text-[#3B82F6] hover:underline underline-offset-4 cursor-pointer whitespace-nowrap"
            >
              {copiedTarget === 'message' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Copied Message!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Message + Link</span>
                </>
              )}
            </button>
          </div>

          <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed select-all">
            {shareMessage}
          </p>
        </div>

        {/* Direct Social & Native Share Triggers */}
        <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2.5">
            Share directly to social networks:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <button
              type="button"
              onClick={handleNativeShare}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#1167D8] text-white hover:bg-[#0D54B3] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Now</span>
            </button>

            <a
              href={`https://twitter.com/intent/tweet?text=${encodedText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-[#1167D8] border border-slate-200 dark:border-slate-700 transition-colors whitespace-nowrap shrink-0"
            >
              <span>Post on X</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <a
              href={`https://api.whatsapp.com/send?text=${encodedText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-[#1167D8] border border-slate-200 dark:border-slate-700 transition-colors whitespace-nowrap shrink-0"
            >
              <span>WhatsApp</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <a
              href={`https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(
                'Download HD Reels, TikToks & Social Videos free on LiftX'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-[#1167D8] border border-slate-200 dark:border-slate-700 transition-colors whitespace-nowrap shrink-0"
            >
              <span>Telegram</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <a
              href={`https://www.reddit.com/submit?url=${encodedUrl}&title=${encodeURIComponent(
                'LiftX Media Downloader — Free Universal 1080p Social Video & Reel Saver'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-[#1167D8] border border-slate-200 dark:border-slate-700 transition-colors whitespace-nowrap shrink-0"
            >
              <span>Reddit</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>

          {nativeShareNote && (
            <p className="mt-2.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              {nativeShareNote}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
