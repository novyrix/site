import { cn } from "@/lib/utils";
import Image from "next/image";

// KRA Logo - Using actual PNG file
export const KRALogo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="/logos/KRA2.png"
        alt="KRA eTIMS"
        width={120}
        height={120}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

// Novyrix Logo (simplified version)
export const NovyrixLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="novyrix-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff5722" />
          <stop offset="100%" stopColor="#d84315" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" fill="url(#novyrix-gradient)" rx="24" />
      <text
        x="60"
        y="78"
        fontSize="52"
        fontWeight="900"
        fill="white"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
      >
        N
      </text>
      {/* Small accent dot */}
      <circle cx="85" cy="35" r="6" fill="rgba(255,255,255,0.3)" />
    </svg>
  );
};

// M-Pesa Logo - Using actual PNG file
export const MPesaLogo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="/logos/M-PESA-logo-2.png"
        alt="M-PESA"
        width={120}
        height={120}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

// SMS Gateway Logo
export const SMSLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
    >
      <defs>
        <linearGradient id="sms-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4285f4" />
          <stop offset="100%" stopColor="#1967d2" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#sms-gradient)" rx="12" />
      <path
        d="M25 30 h50 v35 l-25 10 l-25 -10 v-35 z M30 40 h40 M30 50 h40"
        stroke="white"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};

// API Integration Logo
export const APILogo = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="api-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#api-gradient)" rx="12" />
      <text
        x="50"
        y="60"
        fontSize="28"
        fontWeight="bold"
        fill="white"
        textAnchor="middle"
        fontFamily="monospace"
      >
        API
      </text>
    </svg>
  );
};

// Database Logo
export const DatabaseLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="db-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#db-gradient)" rx="12" />
      <ellipse cx="50" cy="35" rx="25" ry="10" fill="white" opacity="0.9" />
      <rect x="25" y="35" width="50" height="30" fill="white" opacity="0.9" />
      <ellipse cx="50" cy="65" rx="25" ry="10" fill="white" opacity="0.9" />
    </svg>
  );
};

// Security/Lock Logo
export const SecurityLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="security-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#security-gradient)" rx="12" />
      <path
        d="M50 20 L30 30 v20 c0 15 20 25 20 25 s20 -10 20 -25 v-20 z"
        fill="white"
        opacity="0.9"
      />
      <circle cx="50" cy="50" r="8" fill="url(#security-gradient)" />
    </svg>
  );
};

// Mobile App Logo
export const MobileLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="mobile-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#db2777" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#mobile-gradient)" rx="12" />
      <rect x="30" y="20" width="40" height="60" rx="4" fill="white" opacity="0.9" />
      <rect x="35" y="25" width="30" height="45" fill="url(#mobile-gradient)" />
      <circle cx="50" cy="75" r="3" fill="url(#mobile-gradient)" />
    </svg>
  );
};
