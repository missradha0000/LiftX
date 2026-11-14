import React, { useState } from 'react';
import {
  Share2,
  ClipboardPaste,
  Download,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Scale,
  Mail,
  ArrowLeft,
  Send
} from 'lucide-react';
import { LanguagePack } from '../data/seoAndCodeData';

/**
 * Clean Ad-Ready Layout Container (AdSense / Monetag Ready)
 */
export const AdSlotContainer: React.FC<{
  slotId: string;
  label: string;
  format?: 'leaderboard' | 'rectangle' | 'in-article';
  className?: string;
}> = ({ slotId, label, format = 'leaderboard', className = '' }) => {
  const heightClass =
    format === 'leaderboard'
      ? 'min-h-[76px] sm:min-h-[90px]'
      : format === 'rectangle'
        ? 'min-h-[110px]'
        : 'min-h-[96px]';

  return (
    <div
      id={slotId}
      data-ad-slot={slotId}
      data-ad-format="auto"
      data-full-width-responsive="true"
      aria-label={`Advertisement Slot: ${label}`}
      className={`w-full max-w-4xl mx-auto rounded-xl border border-dashed border-slate-200 dark:border-slate-800/90 bg-slate-100/50 dark:bg-slate-900/40 px-4 py-3 flex flex-col items-center justify-center text-center ${heightClass} ${className}`}
    >
      <span className="text-[11px] font-mono tracking-wider text-slate-400 dark:text-slate-500">
        ADVERTISEMENT · {label.toUpperCase()}
      </span>
      <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
        Responsive AdSense / Monetag Container (<code className="font-mono">#{slotId}</code>)
      </span>
    </div>
  );
};

/**
 * 3-Column Visual Step-by-Step Guide with Custom UI Mockup Illustrations
 */
export const VisualThreeStepGuide: React.FC<{ t: LanguagePack }> = ({ t }) => {
  return (
    <section
      id="how-to-use"
      className="py-16 sm:py-20 px-4 sm:px-6 border-b border-slate-200/70 dark:border-slate-800/70"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-semibold text-[#1167D8] dark:text-[#3B82F6] mb-2">
            3-Step Visual Workflow · No App or Account Required
          </p>
          <h2
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white"
            style={{ textWrap: 'balance' }}
          >
            {t.howToSectionTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Step 1 Card + Visual UI Mockup */}
          <div className="rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between">
            <div>
              {/* Custom Visual UI Mockup: Social App Share & Copy Link */}
              <div
                aria-hidden="true"
                className="mb-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4"
              >
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-200/70 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#1167D8]/15 flex items-center justify-center text-[10px] font-bold text-[#1167D8]">
                      IG
                    </div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      @creator_reel
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">1080p Reel</span>
                </div>

                <div className="rounded-lg bg-slate-200/60 dark:bg-slate-800/70 p-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-200">
                    <Share2 className="w-4 h-4 text-[#1167D8]" />
                    <span>Tap Share Menu</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-[#1167D8] text-white text-xs font-bold">
                    Copy Link
                  </span>
                </div>
              </div>

              <div className="text-xs font-mono font-bold text-[#1167D8] dark:text-[#3B82F6] mb-1.5 tabular-nums">
                01 · SOURCE URL
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {t.step1Title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.step1Desc}
              </p>
            </div>
          </div>

          {/* Step 2 Card + Visual UI Mockup */}
          <div className="rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between">
            <div>
              {/* Custom Visual UI Mockup: LiftX Input Bar & Paste/Download */}
              <div
                aria-hidden="true"
                className="mb-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4"
              >
                <div className="text-[11px] font-mono text-slate-400 mb-2">
                  liftx.app · Smart Auto-Router
                </div>
                <div className="rounded-lg bg-white dark:bg-slate-950 border-2 border-[#1167D8] p-2 flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-300 truncate">
                    https://instagram.com/reel/C8x...
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                      <ClipboardPaste className="w-3 h-3 text-[#1167D8]" />
                      Paste
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#1167D8] text-white text-[11px] font-bold">
                      <Download className="w-3 h-3" />
                      Download
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-xs font-mono font-bold text-[#1167D8] dark:text-[#3B82F6] mb-1.5 tabular-nums">
                02 · SMART DETECTION
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {t.step2Title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.step2Desc}
              </p>
            </div>
          </div>

          {/* Step 3 Card + Visual UI Mockup */}
          <div className="rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between">
            <div>
              {/* Custom Visual UI Mockup: Multi-Quality HD Save Selector */}
              <div
                aria-hidden="true"
                className="mb-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4"
              >
                <div className="grid grid-cols-2 gap-1.5 mb-2.5">
                  <div className="px-2.5 py-1.5 rounded-md bg-[#1167D8] text-white text-xs font-bold flex items-center justify-between">
                    <span>MP4 1080p</span>
                    <Download className="w-3 h-3" />
                  </div>
                  <div className="px-2.5 py-1.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-between">
                    <span>MP4 720p</span>
                    <Download className="w-3 h-3" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] font-medium text-emerald-700 dark:text-emerald-400 pt-1">
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Saved to Device Gallery
                  </span>
                  <span className="font-mono">JPG · MP3</span>
                </div>
              </div>

              <div className="text-xs font-mono font-bold text-[#1167D8] dark:text-[#3B82F6] mb-1.5 tabular-nums">
                03 · DIRECT CDN SAVE
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {t.step3Title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.step3Desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Dedicated Legal & Support Page Views (Privacy Policy, Terms & Conditions, DMCA, Contact Us)
 */
export const LegalAndContactPageView: React.FC<{
  pageType: 'privacy' | 'terms' | 'dmca' | 'contact';
  onBackToHome: () => void;
}> = ({ pageType, onBackToHome }) => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactTopic, setContactTopic] = useState('General Feedback & Feature Request');
  const [contactMessage, setContactMessage] = useState('');
  const [contactError, setContactError] = useState<string | null>(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.includes('@') || !contactMessage.trim()) {
      setContactError('Please enter your name, a valid email address, and your message.');
      return;
    }
    setContactError(null);
    setContactSubmitted(true);
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 border-b border-slate-200/70 dark:border-slate-800/70">
      <div className="max-w-4xl mx-auto">
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#1167D8] dark:text-[#3B82F6] hover:underline underline-offset-4 mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to LiftX All-in-One Downloader</span>
        </button>

        {pageType === 'privacy' && (
          <article className="p-6 sm:p-10 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
              <ShieldCheck className="w-6 h-6 text-[#1167D8]" />
              <div>
                <p className="text-xs font-mono text-slate-400">EFFECTIVE DATE: JANUARY 1, 2026</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
                  Privacy Policy — LiftX Media Downloader
                </h2>
              </div>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                1. Zero User Logs &amp; No Download History Stored
              </h3>
              <p>
                LiftX Media Downloader is engineered from the ground up with privacy-by-design. We do
                not require user registration, social media account logins, or personal profiles. When
                you paste a public social media URL into LiftX, the request is processed transiently in
                memory. We do not log, archive, or associate submitted URLs with your IP address or
                browser identity.
              </p>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                2. Zero-Storage Direct CDN Streaming Architecture
              </h3>
              <p>
                LiftX does not host or store downloaded videos, Reels, photos, stories, or audio files
                on its servers. All media streams are fetched directly from the public third-party
                content delivery networks (CDNs) and piped to your device browser. Once your download
                completes, zero copies remain on LiftX infrastructure.
              </p>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                3. Cookies, Local Preferences &amp; Advertising Partners
              </h3>
              <p>
                LiftX uses lightweight local storage strictly to remember your UI preferences (such as
                Light/Dark theme mode and selected display language). To keep LiftX 100% free for
                everyone, we may display non-intrusive advertisements served by verified third-party
                networks such as Google AdSense or Monetag. These ad partners may use standard cookies
                to serve relevant ads in accordance with their respective privacy policies.
              </p>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                4. Third-Party Links &amp; Security
              </h3>
              <p>
                All communications between your browser and LiftX are encrypted over HTTPS/TLS. If you
                have any privacy inquiries, please reach out through our official Contact page.
              </p>
            </div>
          </article>
        )}

        {pageType === 'terms' && (
          <article className="p-6 sm:p-10 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
              <FileText className="w-6 h-6 text-[#1167D8]" />
              <div>
                <p className="text-xs font-mono text-slate-400">LAST UPDATED: 2026</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
                  Terms &amp; Conditions of Use
                </h2>
              </div>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                1. Personal, Non-Commercial &amp; Fair Use Only
              </h3>
              <p>
                By accessing and using LiftX Media Downloader, you agree to use this web application
                strictly for lawful, personal, educational, or archival purposes (such as backing up
                your own social media posts or offline viewing under Fair Use guidelines).
              </p>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                2. Respect for Creator Copyright &amp; Intellectual Property
              </h3>
              <p>
                All videos, Reels, photos, stories, carousels, GIFs, and audio tracks belong to their
                respective content creators and rightsholders. LiftX does not claim ownership over any
                third-party media. Users are solely responsible for obtaining explicit permission from
                the original copyright owner before redistributing, republishing, or monetizing any
                downloaded content.
              </p>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                3. Public Content Only &amp; Platform Policy Compliance
              </h3>
              <p>
                LiftX only processes publicly available URLs from supported platforms (LinkedIn,
                Instagram, Facebook, TikTok, X/Twitter, Pinterest, Snapchat, Reddit, and Vimeo). LiftX
                cannot and will not bypass private account restrictions, paywalls, or authentication
                barriers. Furthermore, YouTube downloads are strictly not supported due to policy
                guidelines.
              </p>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                4. Limitation of Liability
              </h3>
              <p>
                LiftX is provided on an &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; basis without
                warranties of any kind. Users assume full legal responsibility for how they use files
                downloaded through this tool.
              </p>
            </div>
          </article>
        )}

        {pageType === 'dmca' && (
          <article className="p-6 sm:p-10 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
              <Scale className="w-6 h-6 text-[#1167D8]" />
              <div>
                <p className="text-xs font-mono text-slate-400">COPYRIGHT &amp; COMPLIANCE</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
                  DMCA &amp; Copyright Policy
                </h2>
              </div>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                LiftX Media Downloader respects the intellectual property rights of creators, artists,
                and media publishers worldwide and complies with the Digital Millennium Copyright Act
                (DMCA).
              </p>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Zero-Hosting Technical Architecture
              </h3>
              <p>
                LiftX does not store, cache, or host any video, photo, or audio files on its servers.
                All links processed by LiftX resolve directly to publicly accessible third-party
                content delivery networks (CDNs) operated by platforms such as Instagram, Facebook, X,
                Pinterest, LinkedIn, and TikTok.
              </p>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Submitting a Copyright / Block Request
              </h3>
              <p>
                If you are a copyright owner or authorized agent and wish to block a specific public
                creator profile or URL pattern from being resolved through LiftX, please submit a
                request via our Contact page including: (1) identification of the copyrighted work, (2)
                the exact permalink URL(s) to be added to our gateway blocklist, and (3) your contact
                information. Our compliance team processes blocklist additions within 24 hours.
              </p>
            </div>
          </article>
        )}

        {pageType === 'contact' && (
          <article className="p-6 sm:p-10 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
              <Mail className="w-6 h-6 text-[#1167D8]" />
              <div>
                <p className="text-xs font-mono text-slate-400">SUPPORT &amp; LEGAL DESK</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
                  Contact LiftX Team
                </h2>
              </div>
            </div>

            {contactSubmitted ? (
              <div className="p-6 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Message Received by LiftX Support</span>
                </div>
                <p className="text-sm">
                  Thank you, <strong>{contactName}</strong>. Your inquiry regarding{' '}
                  <strong>{contactTopic}</strong> has been logged. We will respond to{' '}
                  <code className="font-mono">{contactEmail}</code> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setContactSubmitted(false);
                    setContactMessage('');
                  }}
                  className="mt-2 px-4 py-2 rounded-lg bg-[#1167D8] text-white text-xs font-bold cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Alex Rivera"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#1167D8]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#1167D8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Inquiry Topic
                  </label>
                  <select
                    value={contactTopic}
                    onChange={(e) => setContactTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#1167D8]"
                  >
                    <option value="General Feedback & Feature Request">
                      General Feedback &amp; Feature Request
                    </option>
                    <option value="Broken Link / Extractor Report">
                      Broken Link / Platform Extractor Report
                    </option>
                    <option value="DMCA / Copyright Exclusion Request">
                      DMCA / Copyright Exclusion Request
                    </option>
                    <option value="Advertising & Partnership Inquiry">
                      Advertising &amp; Partnership Inquiry
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Share details, platform URLs, or questions..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#1167D8]"
                  />
                </div>

                {contactError && (
                  <p className="text-xs font-semibold text-red-600 dark:text-red-400">
                    {contactError}
                  </p>
                )}

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1167D8] hover:bg-[#0D54B3] text-white text-sm font-bold transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </article>
        )}
      </div>
    </section>
  );
};
