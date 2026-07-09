import React from "react";

export function USAIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} rounded-full overflow-hidden border border-gray-200/50 dark:border-zinc-800/80 shadow-3xs shrink-0`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" fill="#bb133e" />
      {/* White stripes */}
      <rect width="24" height="1.8" y="1.84" fill="#fff" />
      <rect width="24" height="1.8" y="5.52" fill="#fff" />
      <rect width="24" height="1.8" y="9.2" fill="#fff" />
      <rect width="24" height="1.8" y="12.88" fill="#fff" />
      <rect width="24" height="1.8" y="16.56" fill="#fff" />
      <rect width="24" height="1.8" y="20.24" fill="#fff" />
      {/* Blue canton */}
      <rect width="11.5" height="11.04" fill="#002147" />
      {/* Minimal stars in perfect grid */}
      <circle cx="3" cy="3" r="0.75" fill="#fff" />
      <circle cx="8.5" cy="3" r="0.75" fill="#fff" />
      <circle cx="3" cy="8" r="0.75" fill="#fff" />
      <circle cx="8.5" cy="8" r="0.75" fill="#fff" />
      <circle cx="5.75" cy="5.5" r="0.75" fill="#fff" />
    </svg>
  );
}

export function IndonesiaIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <div className={`${className} rounded-full overflow-hidden border border-gray-200/50 dark:border-zinc-800/80 shadow-3xs flex flex-col shrink-0`}>
      <div className="h-1/2 bg-[#e21c21]" />
      <div className="h-1/2 bg-white" />
    </div>
  );
}

export function RussiaIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <div className={`${className} rounded-full overflow-hidden border border-gray-200/50 dark:border-zinc-800/80 shadow-3xs flex flex-col shrink-0`}>
      <div className="h-1/3 bg-white" />
      <div className="h-1/3 bg-[#0039a6]" />
      <div className="h-1/3 bg-[#d52b1e]" />
    </div>
  );
}

export function ArabicIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} rounded-full overflow-hidden border border-emerald-600/30 shadow-3xs shrink-0`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" fill="#006c35" />
      {/* Minimal elegant representation of Arabic sword/shahada pattern */}
      <path d="M5 14.5h14v1H5z" fill="#fff" opacity="0.95" />
      <path
        d="M5 14.5h2v2H5zm10.5-3.5c-.5 0-.9.4-.9.9v1.2c0 .5.4.9.9.9s.9-.4.9-.9v-1.2c0-.5-.4-.9-.9-.9zm-3.5 0c-.5 0-.9.4-.9.9v1.2c0 .5.4.9.9.9s.9-.4.9-.9v-1.2c0-.5-.4-.9-.9-.9zm-3.5 0c-.5 0-.9.4-.9.9v1.2c0 .5.4.9.9.9s.9-.4.9-.9v-1.2c0-.5-.4-.9-.9-.9z"
        fill="#fff"
        opacity="0.85"
      />
    </svg>
  );
}

export function SpainIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <div className={`${className} rounded-full overflow-hidden border border-gray-200/50 dark:border-zinc-800/80 shadow-3xs flex flex-col shrink-0`}>
      <div className="h-[25%] bg-[#c60b1e]" />
      <div className="h-[50%] bg-[#ffc400] flex items-center justify-start pl-0.5">
        <div className="w-1 h-1.5 bg-[#c60b1e] rounded-xs opacity-80" />
      </div>
      <div className="h-[25%] bg-[#c60b1e]" />
    </div>
  );
}

export function JapanIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <div className={`${className} rounded-full bg-white border border-gray-200/50 dark:border-zinc-800/80 shadow-3xs flex items-center justify-center shrink-0`}>
      <div className="w-1.5 h-1.5 rounded-full bg-[#bc002d]" />
    </div>
  );
}

interface LanguageIconProps {
  code: string;
  className?: string;
}

export default function LanguageIcon({ code, className = "w-4 h-4" }: LanguageIconProps) {
  switch (code.toLowerCase()) {
    case "en":
      return <USAIcon className={className} />;
    case "id":
      return <IndonesiaIcon className={className} />;
    case "ru":
      return <RussiaIcon className={className} />;
    case "ar":
      return <ArabicIcon className={className} />;
    case "es":
      return <SpainIcon className={className} />;
    case "ja":
      return <JapanIcon className={className} />;
    default:
      return (
        <div className={`${className} rounded-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center text-[8px] font-mono font-bold shrink-0`}>
          {code.substring(0, 2).toUpperCase()}
        </div>
      );
  }
}
