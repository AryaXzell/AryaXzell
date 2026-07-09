import { useState, useEffect, useRef } from "react";
import { ArrowDown, Github, Clock, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../LanguageContext";

interface HeroProps {
  onViewProjects: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 14
    }
  }
};

export default function Hero({ onViewProjects }: HeroProps) {
  const [timeString, setTimeString] = useState("");
  const [greeting, setGreeting] = useState("Hello");
  const { language, t } = useLanguage();
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number | null = null;
    let pendingX = 0;
    let pendingY = 0;

    const applyGlow = () => {
      rafId = null;
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(550px circle at ${pendingX}px ${pendingY}px, rgba(0, 113, 227, 0.07) 0%, rgba(168, 85, 247, 0.03) 40%, transparent 80%)`;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const heroEl = document.getElementById("hero");
      if (!heroEl) return;
      const rect = heroEl.getBoundingClientRect();
      pendingX = e.clientX - rect.left;
      pendingY = e.clientY - rect.top;
      if (rafId === null) {
        rafId = requestAnimationFrame(applyGlow);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const updateClockAndGreeting = () => {
      const now = new Date();
      const currentHr = now.getHours();
      
      // Update clock
      const hours = currentHr.toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setTimeString(`${hours}:${minutes}:${seconds}`);

      // Update greeting word
      if (currentHr >= 5 && currentHr < 12) {
        if (language === "id") setGreeting("Selamat pagi");
        else if (language === "ru") setGreeting("Доброе утро");
        else if (language === "ar") setGreeting("صباح الخير");
        else if (language === "es") setGreeting("Buenos días");
        else if (language === "ja") setGreeting("おはようございます");
        else setGreeting("Good morning");
      } else if (currentHr >= 12 && currentHr < 17) {
        if (language === "id") setGreeting("Selamat siang");
        else if (language === "ru") setGreeting("Добрый день");
        else if (language === "ar") setGreeting("مساء الخير");
        else if (language === "es") setGreeting("Buenas tardes");
        else if (language === "ja") setGreeting("こんにちは");
        else setGreeting("Good afternoon");
      } else if (currentHr >= 17 && currentHr < 22) {
        if (language === "id") setGreeting("Selamat malam");
        else if (language === "ru") setGreeting("Добрый вечер");
        else if (language === "ar") setGreeting("مساء الخير");
        else if (language === "es") setGreeting("Buenas noches");
        else if (language === "ja") setGreeting("こんばんは");
        else setGreeting("Good evening");
      } else {
        if (language === "id") setGreeting("Selamat datang");
        else if (language === "ru") setGreeting("Добро пожаловать");
        else if (language === "ar") setGreeting("مرحباً");
        else if (language === "es") setGreeting("Bienvenido");
        else if (language === "ja") setGreeting("ようこそ");
        else setGreeting("Welcome");
      }
    };

    updateClockAndGreeting();
    const interval = setInterval(updateClockAndGreeting, 1000);
    return () => clearInterval(interval);
  }, [language]);

  const getVisitorBadge = () => {
    if (language === "id") return `${greeting}, pengunjung! Selamat datang di ruang saya.`;
    if (language === "ru") return `${greeting}, гость! Добро пожаловать в моё пространство.`;
    if (language === "ar") return `${greeting}، أيها الزائر! مرحبًا بك في مساحتي الخاصة.`;
    if (language === "es") return `¡${greeting}, visitante! Bienvenido a mi espacio.`;
    if (language === "ja") return `ゲスト様、${greeting}！私のポートフォリオへようこそ。`;
    return `${greeting}, visitor! Welcome to my space.`;
  };

  const stats = [
    { value: "7", suffix: "+", label: t("hero_stat_projects"), desc: t("hero_stat_projects_desc") },
    { value: "4", suffix: "+", label: t("hero_stat_tech"), desc: t("hero_stat_tech_desc") },
    { value: "100", suffix: "%", label: t("hero_stat_safe"), desc: t("hero_stat_safe_desc") },
    { value: "800", suffix: "ms", label: t("hero_stat_load"), desc: t("hero_stat_load_desc") }
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-16 px-6 overflow-hidden bg-[#fafafa] dark:bg-black"
    >
      {/* Interactive ambient floating light gradients - extremely refined & high-performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Ambient Blob 1 - Slow drifting blue */}
        <div className="absolute top-[12%] left-[20%] w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] rounded-full bg-apple-blue/5 dark:bg-apple-blue/10 blur-[90px] animate-drift-slow" />
        {/* Ambient Blob 2 - Counter-drifting purple/indigo */}
        <div className="absolute top-[28%] right-[15%] w-[290px] sm:w-[420px] h-[290px] sm:h-[420px] rounded-full bg-purple-500/3 dark:bg-indigo-500/6 blur-[95px] animate-drift-fast" />
        
        {/* Interactive Mouse follow glow - extremely premium */}
        <div 
          ref={glowRef}
          className="absolute inset-0 transition-opacity duration-500 opacity-100 dark:opacity-80"
        />

        {/* Floating micro-particles */}
        {[...Array(12)].map((_, i) => {
          const size = Math.random() * 3 + 2; // 2px to 5px
          const delay = Math.random() * 5;
          const left = Math.random() * 90 + 5; // 5% to 95%
          const top = Math.random() * 80 + 10;  // 10% to 90%
          const animClass = i % 3 === 0 
            ? "animate-float-particle-1" 
            : i % 3 === 1 
              ? "animate-float-particle-2" 
              : "animate-float-particle-3";

          return (
            <div
              key={i}
              className={`absolute rounded-full bg-apple-blue/15 dark:bg-apple-blue/25 blur-[0.5px] ${animClass}`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `-${delay}s`,
              }}
            />
          );
        })}
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl w-full text-center flex flex-col items-center space-y-8 z-10"
      >
        {/* Dynamic Greeting & Badge */}
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 bg-white dark:bg-zinc-900 border border-gray-200/50 dark:border-zinc-800/50 rounded-full text-[11px] font-medium text-gray-600 dark:text-zinc-400 shadow-3xs"
        >
          <Sparkles size={11} className="text-apple-blue animate-pulse-soft" />
          <span>{getVisitorBadge()}</span>
        </motion.div>
 
        {/* Profile Avatar Frame with nice ring */}
        <motion.div 
          variants={itemVariants}
          className="relative group cursor-pointer"
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-apple-blue to-purple-600 opacity-20 blur-md group-hover:opacity-45 transition-opacity duration-500 animate-pulse-soft" />
          <img
            src="https://github.com/AryaXzell.png"
            alt="AryaXzell avatar"
            referrerPolicy="no-referrer"
            width={112}
            height={112}
            fetchPriority="high"
            onError={(e) => {
              e.currentTarget.src = `https://api.dicebear.com/7.x/bottts/svg?seed=AryaXzell`;
            }}
            className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-[3px] border-white dark:border-zinc-950 shadow-md object-cover transition-all duration-500 group-hover:scale-105 group-hover:rotate-1"
            id="hero-avatar"
          />
        </motion.div>

        {/* Identity Title */}
        <motion.div 
          variants={itemVariants}
          className="space-y-3"
        >
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 leading-tight">
            {t("hero_title")} <span className="font-light text-gray-400 dark:text-zinc-500">({t("nav_about")} Arya)</span>
          </h1>
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-widest text-apple-blue font-bold">
            <span>{t("hero_subtitle")}</span>
          </div>
        </motion.div>

        {/* Headline - Upgraded with premium copywriting */}
        <motion.p 
          variants={itemVariants}
          className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-900 dark:text-zinc-100 max-w-xl leading-snug"
        >
          {t("hero_headline")}
        </motion.p>

        {/* Description - Personal vibe */}
        <motion.p 
          variants={itemVariants}
          className="text-sm sm:text-base text-gray-500 dark:text-zinc-400 max-w-lg leading-relaxed font-normal"
        >
          {t("hero_description")}
        </motion.p>

        {/* Statistics & Proof Grid - Added as high-impact proof blocks */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl py-3 px-2"
        >
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="group relative bg-white/70 dark:bg-zinc-950/40 backdrop-blur-xs border border-gray-200/60 dark:border-zinc-900 p-4 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 hover:border-apple-blue/30 dark:hover:border-apple-blue/30 hover:shadow-2xs hover:translate-y-[-2px]"
            >
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white flex items-baseline">
                {stat.value}
                <span className="text-apple-blue font-semibold text-sm ml-0.5">{stat.suffix}</span>
              </div>
              <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 mt-2 text-center">
                {stat.label}
              </div>
              <div className="text-[9px] text-gray-400 dark:text-zinc-600 mt-0.5 text-center">
                {stat.desc}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Real-time Clock Widget */}
        {timeString && (
          <motion.div
            variants={itemVariants}
            className="flex items-center space-x-2 rtl:space-x-reverse px-3.5 py-1.5 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-xs border border-gray-150 dark:border-zinc-800/40 rounded-full text-xs font-mono text-gray-500 dark:text-zinc-400 shadow-3xs"
            id="hero-clock"
          >
            <Clock size={12} className="text-gray-400" />
            <span>{language === "ar" ? "الوقت المحلي" : language === "id" ? "Waktu Lokal" : language === "ru" ? "Местное время" : language === "es" ? "Hora local" : language === "ja" ? "現地時間" : "Local Time"}: {timeString}</span>
          </motion.div>
        )}

        {/* Actions Menu */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto" 
          id="hero-actions"
        >
          <button
            onClick={onViewProjects}
            className="w-full sm:w-auto px-6 py-3 text-sm font-semibold bg-apple-blue hover:bg-apple-blue-hover text-white rounded-full transition-all shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
          >
            {t("hero_cta_primary")}
          </button>
          
          <a
            href="https://github.com/AryaXzell"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 rtl:space-x-reverse px-6 py-3 text-sm font-semibold bg-white hover:bg-gray-50 text-gray-900 dark:bg-zinc-900 dark:hover:bg-zinc-850 dark:text-zinc-100 border border-gray-200 dark:border-zinc-800 rounded-full transition-all shadow-3xs active:scale-[0.98]"
          >
            <Github size={16} />
            <span>{t("hero_cta_secondary")}</span>
          </a>
        </motion.div>
      </motion.div>

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

