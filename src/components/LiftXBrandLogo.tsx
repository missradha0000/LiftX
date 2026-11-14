import React from 'react';

interface LiftXLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Official LiftX Inline SVG + HTML Brand Mark
 * Matches the uploaded reference logo:
 * - Vibrant royal blue (#1167D8) rounded-square icon
 * - Bold white downward download arrow
 * - Royal blue (#1167D8) right-pointing play triangle cut out inside the arrow
 * - Bold, clean geometric sans-serif typography reading "LiftX"
 */
export const LiftXBrandLogo: React.FC<LiftXLogoProps> = ({ size = 'md', className = '' }) => {
  const dimensions = {
    sm: { box: 32, text: 'text-xl' },
    md: { box: 38, text: 'text-2xl' },
    lg: { box: 46, text: 'text-3xl' }
  }[size];

  return (
    <span className={`inline-flex items-center gap-2.5 select-none whitespace-nowrap shrink-0 ${className}`}>
      <svg
        width={dimensions.box}
        height={dimensions.box}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0 shadow-xs rounded-[10px]"
      >
        {/* Royal Blue Rounded Square Base */}
        <rect width="64" height="64" rx="15" fill="#1167D8" />
        {/* Bold White Downward Download Arrow */}
        <path
          d="M24.5 12.5H39.5C41.1569 12.5 42.5 13.8431 42.5 15.5V32H50.4C52.238 32 53.182 34.198 51.918 35.531L34.518 53.881C33.152 55.322 30.848 55.322 29.482 53.881L12.082 35.531C10.818 34.198 11.762 32 13.6 32H21.5V15.5C21.5 13.8431 22.8431 12.5 24.5 12.5Z"
          fill="#FFFFFF"
        />
        {/* Royal Blue Play Triangle Cutout Inside Arrow */}
        <path
          d="M28.2 30.8V41.2C28.2 42.04 29.13 42.55 29.85 42.1L38.45 36.9C39.14 36.48 39.14 35.52 38.45 35.1L29.85 29.9C29.13 29.45 28.2 29.96 28.2 30.8Z"
          fill="#1167D8"
        />
      </svg>
      <span
        className={`${dimensions.text} font-extrabold tracking-tight text-slate-950 dark:text-white leading-none`}
      >
        LiftX
      </span>
    </span>
  );
};

export const PlatformSvgIcon: React.FC<{ platform: string; className?: string }> = ({
  platform,
  className = 'w-4 h-4'
}) => {
  const normalized = platform.toLowerCase();

  if (normalized.includes('instagram')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    );
  }

  if (normalized.includes('tiktok')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    );
  }

  if (normalized === 'x' || normalized.includes('twitter') || normalized.includes('x (')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }

  if (normalized.includes('pinterest')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.017 2C6.486 2 2 6.486 2 12.017c0 4.242 2.636 7.868 6.359 9.327-.088-.792-.167-2.007.035-2.872.182-.78 1.176-4.985 1.176-4.985s-.3-.6-.3-1.487c0-1.393.808-2.433 1.813-2.433.855 0 1.268.642 1.268 1.411 0 .86-.547 2.145-.83 3.337-.236.998.5 1.811 1.483 1.811 1.78 0 3.148-1.877 3.148-4.587 0-2.398-1.723-4.075-4.185-4.075-2.851 0-4.524 2.138-4.524 4.349 0 .861.331 1.785.746 2.287.082.099.094.186.069.287-.076.315-.245.998-.278 1.137-.044.184-.145.223-.334.135-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.531 0 10.017-4.486 10.017-10.017C22.034 6.486 17.548 2 12.017 2z" />
      </svg>
    );
  }

  if (normalized.includes('reddit')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm5.74-6.19c.14.15.14.39 0 .53-.96.96-2.55 1.44-4.74 1.44s-3.78-.48-4.74-1.44a.37.37 0 0 1 0-.53c.15-.14.39-.14.53 0 .81.81 2.22 1.22 4.21 1.22s3.4-.41 4.21-1.22c.14-.14.38-.14.53 0zM9.25 11a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zm5.5 0a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
      </svg>
    );
  }

  if (normalized.includes('facebook')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    );
  }

  if (normalized.includes('linkedin')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    );
  }

  if (normalized.includes('snapchat')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.5c-3.1 0-5.4 2.1-5.4 5.3 0 1 .2 2 .3 2.7-.3.2-.7.3-1.1.3-.5 0-.9-.2-1.1-.2-.3 0-.6.2-.6.6 0 .5.6.9 1.3 1.2.1.1.3.2.3.4 0 .4-.8 1.7-2.4 2.3-.3.1-.5.3-.5.6 0 .4.5.7 1.3.9.2.1.4.3.5.7.1.4.3.7.8.7.4 0 .9-.2 1.7-.2.9 0 1.8.3 2.8 1 .8.5 1.5.7 2.1.7s1.3-.2 2.1-.7c1-.7 1.9-1 2.8-1 .8 0 1.3.2 1.7.2.5 0 .7-.3.8-.7.1-.4.3-.6.5-.7.8-.2 1.3-.5 1.3-.9 0-.3-.2-.5-.5-.6-1.6-.6-2.4-1.9-2.4-2.3 0-.2.2-.3.3-.4.7-.3 1.3-.7 1.3-1.2 0-.4-.3-.6-.6-.6-.2 0-.6.2-1.1.2-.4 0-.8-.1-1.1-.3.1-.7.3-1.7.3-2.7 0-3.2-2.3-5.3-5.4-5.3z" />
      </svg>
    );
  }

  if (normalized.includes('vimeo')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22 7.42c-.1 2.17-1.62 5.15-4.55 8.94-3.03 3.93-5.59 5.89-7.68 5.89-1.3 0-2.4-1.2-3.3-3.6-.6-2.2-1.2-4.4-1.8-6.6-.67-2.4-1.39-3.6-2.16-3.6-.17 0-.75.36-1.74 1.08L0 8.21c1.1-.97 2.18-1.93 3.25-2.9 1.46-1.26 2.56-1.93 3.3-2 1.73-.17 2.8 1.02 3.2 3.56.43 2.73.73 4.43.9 5.1.5 2.27 1.05 3.4 1.65 3.4.47 0 1.18-.74 2.13-2.23.95-1.48 1.46-2.61 1.53-3.38.13-1.28-.37-1.92-1.5-1.92-.53 0-1.08.12-1.65.36 1.1-3.6 3.2-5.35 6.3-5.25 2.3.07 3.39 1.56 3.29 4.47z" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  );
};
