import { useState, useEffect } from "react";
import { ArrowDown, Github, Clock, Sparkles } from "lucide-react";

interface HeroProps {
  onViewProjects: () => void;
}

export default function Hero({ onViewProjects }: HeroProps) {
  const [timeString, setTimeString] = useState("");
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    const updateClockAndGreeting = () => {
      const now = new Date();
      const currentHr = now.getHours();
      
      // Update clock
      const hours = currentHr.toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setTimeString(`${hours}:${minutes}:${seconds}`);

      // Update greeting
      if (currentHr >= 5 && currentHr < 12) {
        setGreeting("Good morning");
      } else if (currentHr >= 12 && currentHr < 17) {
        setGreeting("Good afternoon");
      } else if (currentHr >= 17 && currentHr < 22) {
        setGreeting("Good evening");
      } else {
        setGreeting("Welcome");
      }
    };

    updateClockAndGreeting();
    const interval = setInterval(updateClockAndGreeting, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-12 px-6 overflow-hidden bg-[#fafafa] dark:bg-black"
    >
      {/* Decorative premium soft gradients in background - extremely subtle as requested */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-apple-blue/5 dark:bg-apple-blue/10 blur-[80px] pointer-events-none" />

      <div className="max-w-3xl w-full text-center flex flex-col items-center space-y-8 z-10">
        {/* Dynamic Greeting & Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-zinc-900 border border-gray-200/50 dark:border-zinc-800/50 rounded-full text-[11px] font-medium text-gray-600 dark:text-zinc-400">
          <Sparkles size={11} className="text-apple-blue animate-pulse-soft" />
          <span>{greeting}, visitor! Welcome to my space.</span>
        </div>

        {/* Profile Avatar Frame with nice ring */}
        <div className="relative group">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-apple-blue to-purple-600 opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-500" />
          <img
            src="https://github.com/AryaXzell.png"
            alt="AryaXzell avatar"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Fallback to stylized SVG avatar if GitHub fails
              e.currentTarget.src = `https://api.dicebear.com/7.x/bottts/svg?seed=AryaXzell`;
            }}
            className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-[3px] border-white dark:border-zinc-950 shadow-md object-cover transition-transform duration-500 group-hover:scale-105"
            id="hero-avatar"
          />
        </div>

        {/* Identity Title */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50 leading-tight">
            AryaXzell <span className="font-light text-gray-400 dark:text-zinc-500">(Arya)</span>
          </h1>
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-apple-blue font-semibold">
            <span>Student Developer</span>
          </div>
        </div>

        {/* Headline */}
        <p className="text-xl sm:text-2xl font-medium tracking-tight text-gray-800 dark:text-zinc-200 max-w-xl">
          Student developer crafting useful, browser-first apps with clean design.
        </p>

        {/* Natural natural description */}
        <p className="text-sm sm:text-base text-gray-500 dark:text-zinc-400 max-w-lg leading-relaxed font-normal">
          I build clean, practical web tools that help developers and users simplify their digital workflows. Focused on clean performance, solid typography, and offline security.
        </p>

        {/* Real-time Clock Widget */}
        {timeString && (
          <div
            className="flex items-center space-x-2 px-3.5 py-1.5 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xs border border-gray-100 dark:border-zinc-800/40 rounded-full text-xs font-mono text-gray-500 dark:text-zinc-400 shadow-2xs"
            id="hero-clock"
          >
            <Clock size={12} className="text-gray-400" />
            <span>Local Time: {timeString}</span>
          </div>
        )}

        {/* Actions Menu */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto" id="hero-actions">
          <button
            onClick={onViewProjects}
            className="w-full sm:w-auto px-6 py-3 text-sm font-medium bg-apple-blue hover:bg-apple-blue-hover text-white rounded-full transition-all shadow-md active:scale-[0.98] cursor-pointer"
          >
            View My Projects
          </button>
          
          <a
            href="https://github.com/AryaXzell"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 text-sm font-medium bg-white hover:bg-gray-50 text-gray-900 dark:bg-zinc-900 dark:hover:bg-zinc-850 dark:text-zinc-100 border border-gray-200 dark:border-zinc-800 rounded-full transition-all shadow-sm active:scale-[0.98]"
          >
            <Github size={16} />
            <span>Open GitHub</span>
          </a>
        </div>
      </div>

      {/* Bounce Down Indicator */}
      <button
        onClick={onViewProjects}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-2 rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer animate-bounce-soft"
        aria-label="Scroll down"
      >
        <ArrowDown size={20} />
      </button>
    </section>
  );
}
