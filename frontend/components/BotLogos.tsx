import React from 'react';

// Joy AI Assistant Logo
export const JoyLogo = ({ size = 64, className = "" }) => (
  <div className={`relative ${className}`} style={{ width: size, height: size }}>
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      <defs>
        <linearGradient id="joyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>
        <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="28" fill="url(#joyGradient)" className="animate-pulse" />
      <circle cx="32" cy="32" r="24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <circle cx="24" cy="26" r="3" fill="white" />
      <circle cx="40" cy="26" r="3" fill="white" />
      <circle cx="25" cy="25" r="1" fill="url(#sparkleGradient)" />
      <circle cx="41" cy="25" r="1" fill="url(#sparkleGradient)" />
      <path d="M 22 38 Q 32 46 42 38" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
      <g fill="url(#sparkleGradient)">
        <polygon points="12,12 14,16 18,14 14,18" className="animate-pulse" />
        <polygon points="48,8 50,12 54,10 50,14" className="animate-pulse" style={{animationDelay: '0.5s'}} />
        <polygon points="52,48 54,52 58,50 54,54" className="animate-pulse" style={{animationDelay: '1s'}} />
      </g>
    </svg>
  </div>
);

// Support Bot Logo
export const SupportLogo = ({ size = 64, className = "" }) => (
  <div className={`relative ${className}`} style={{ width: size, height: size }}>
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      <defs>
        <linearGradient id="supportGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="headsetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#374151" />
          <stop offset="100%" stopColor="#1f2937" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="28" fill="url(#supportGradient)" />
      <circle cx="32" cy="32" r="24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <path d="M 18 24 Q 32 14 46 24" stroke="url(#headsetGradient)" strokeWidth="4" fill="none" strokeLinecap="round" />
      <ellipse cx="18" cy="28" rx="4" ry="6" fill="url(#headsetGradient)" />
      <ellipse cx="18" cy="28" rx="2" ry="4" fill="white" />
      <ellipse cx="46" cy="28" rx="4" ry="6" fill="url(#headsetGradient)" />
      <ellipse cx="46" cy="28" rx="2" ry="4" fill="white" />
      <circle cx="28" cy="32" r="2" fill="white" />
      <circle cx="36" cy="32" r="2" fill="white" />
      <line x1="18" y1="34" x2="26" y2="40" stroke="url(#headsetGradient)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="26" cy="40" r="2" fill="url(#headsetGradient)" />
      <g fill="rgba(255,255,255,0.6)">
        <circle cx="12" cy="48" r="1.5" className="animate-bounce" />
        <circle cx="52" cy="16" r="1.5" className="animate-bounce" style={{animationDelay: '0.3s'}} />
        <circle cx="16" cy="16" r="1.5" className="animate-bounce" style={{animationDelay: '0.6s'}} />
      </g>
    </svg>
  </div>
);

// Container Logo for Both Bots
export const BotContainerLogo = ({ size = 80, className = "" }) => (
  <div className={`relative ${className}`} style={{ width: size, height: size }}>
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-xl"
    >
      <defs>
        <linearGradient id="containerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="50%" stopColor="#334155" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="nexoraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(99, 102, 241, 0.4)" />
          <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
        </radialGradient>
      </defs>
      <circle cx="40" cy="40" r="38" fill="url(#glowGradient)" />
      <rect x="8" y="16" width="64" height="48" rx="12" fill="url(#containerGradient)" stroke="url(#nexoraGradient)" strokeWidth="2" />
      <rect x="10" y="18" width="60" height="44" rx="10" fill="none" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1" />
      <circle cx="28" cy="36" r="8" fill="url(#nexoraGradient)" opacity="0.8" />
      <circle cx="26" cy="34" r="1" fill="white" />
      <circle cx="30" cy="34" r="1" fill="white" />
      <path d="M 24 38 Q 28 40 32 38" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" />
      <circle cx="52" cy="36" r="8" fill="#10b981" opacity="0.8" />
      <circle cx="50" cy="34" r="1" fill="white" />
      <circle cx="54" cy="34" r="1" fill="white" />
      <path d="M 46 32 Q 52 28 58 32" stroke="#374151" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <line x1="36" y1="36" x2="44" y2="36" stroke="url(#nexoraGradient)" strokeWidth="2" strokeDasharray="4,2" className="animate-pulse" />
      <text x="40" y="52" textAnchor="middle" fill="url(#nexoraGradient)" fontSize="8" fontWeight="bold" fontFamily="system-ui">NEXORA</text>
      <g fill="url(#nexoraGradient)" opacity="0.6">
        <polygon points="16,8 18,12 22,10 18,14" className="animate-pulse" />
        <polygon points="58,66 60,70 64,68 60,72" className="animate-pulse" style={{animationDelay: '0.7s'}} />
        <circle cx="12" cy="60" r="1" className="animate-ping" style={{animationDelay: '1s'}} />
        <circle cx="68" cy="20" r="1" className="animate-ping" style={{animationDelay: '1.3s'}} />
      </g>
    </svg>
    // change the size of the logos
  </div>
); 