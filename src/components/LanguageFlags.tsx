import React from "react";

export function BrazilFlag({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 24"
      className={`${className} rounded-xs shrink-0 shadow-xs`}
      aria-label="Bandeira do Brasil (Português)"
    >
      <rect width="32" height="24" fill="#009b3a" rx="1.5" />
      <polygon points="16,3 29,12 16,21 3,12" fill="#fedf00" />
      <circle cx="16" cy="12" r="5.2" fill="#002776" />
      <path
        d="M 11.2,13.2 Q 16,10.2 20.8,13.2"
        stroke="#ffffff"
        strokeWidth="0.9"
        fill="none"
      />
    </svg>
  );
}

export function UsaFlag({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 24"
      className={`${className} rounded-xs shrink-0 shadow-xs`}
      aria-label="Flag of the United States (English)"
    >
      <rect width="32" height="24" fill="#ffffff" rx="1.5" />
      <rect y="0" width="32" height="3.7" fill="#b22234" />
      <rect y="7.4" width="32" height="3.7" fill="#b22234" />
      <rect y="14.8" width="32" height="3.7" fill="#b22234" />
      <rect y="20.3" width="32" height="3.7" fill="#b22234" />
      <rect width="14" height="12.5" fill="#3c3b6e" />
      <circle cx="4" cy="4" r="1.1" fill="#ffffff" />
      <circle cx="10" cy="4" r="1.1" fill="#ffffff" />
      <circle cx="7" cy="8" r="1.1" fill="#ffffff" />
      <circle cx="4" cy="10" r="1.1" fill="#ffffff" />
      <circle cx="10" cy="10" r="1.1" fill="#ffffff" />
    </svg>
  );
}
