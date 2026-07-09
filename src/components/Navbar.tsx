import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, ArrowUpRight, Languages, Check } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import { languages } from "../locales";
import { AnimatePresence, motion } from "motion/react";
import LanguageIcon from "./LanguageIcon";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { language, setLanguage, t, currentLangConfig } = useLanguage();

  const navItems = [
    { id: "hero", label: t("nav_overview") },
    { id: "about", label: t("nav_about") },
    { id: "projects", label: t("nav_projects") },
    { id: "skills", label: t("nav_skills") },
    { id: "contact", label: t("nav_contact") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple intersection tracker
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [language]); // Re-run tracker if navigation labels change translation

  // Click outside listener for language picker
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#lang-picker-container")) {
        setLangMenuOpen(false);
      }
    };
    if (langMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [langMenuOpen]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-effect border-b border-gray-200/50 dark:border-zinc-800/50 py-3 shadow-xs"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo/Name */}
        <button
          onClick={() => handleNavClick("hero")}
          className="flex items-center space-x-2 rtl:space-x-reverse text-lg font-semibold tracking-tight hover:opacity-80 transition-opacity cursor-pointer group"
          id="nav-logo"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-apple-blue group-hover:scale-125 transition-transform" />
          <span className="text-gray-950 dark:text-gray-50">AryaXzell</span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 rtl:space-x-reverse" id="nav-desktop">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                activeSection === item.id
                  ? "bg-gray-100 text-gray-900 dark:bg-zinc-800 dark:text-gray-50"
                  : "text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse" id="nav-controls">
          
          {/* Custom Language Picker (on the left of theme switcher) */}
          <div className="relative" id="lang-picker-container">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center space-x-1.5 rtl:space-x-reverse px-2.5 py-1.5 rounded-full text-xs font-semibold text-gray-600 hover:bg-gray-100 dark:text-zinc-300 dark:hover:bg-zinc-850 transition-all border border-gray-200/50 dark:border-zinc-800/50 cursor-pointer shadow-3xs"
              aria-label="Change language"
              id="lang-toggle-btn"
            >
              <LanguageIcon code={currentLangConfig.code} className="w-4 h-4 shadow-3xs" />
              <span className="uppercase text-[10px] tracking-wider font-mono font-bold">{currentLangConfig.code}</span>
            </button>

            {/* Custom Dropdown Dialog with animation */}
            <AnimatePresence>
              {langMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute top-12 ltr:right-0 rtl:left-0 z-50 w-48 py-1.5 bg-white/95 dark:bg-zinc-950/95 border border-gray-200 dark:border-zinc-850 rounded-2xl shadow-lg backdrop-blur-md"
                  id="lang-dropdown-menu"
                >
                  <div className="px-3 py-1.5 border-b border-gray-100 dark:border-zinc-900 flex items-center space-x-1.5 rtl:space-x-reverse">
                    <Languages size={12} className="text-apple-blue" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500">
                      Select Language
                    </span>
                  </div>
                  <div className="py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors cursor-pointer text-left rtl:text-right ${
                          language === lang.code
                            ? "bg-gray-50 text-apple-blue dark:bg-zinc-900/50 dark:text-blue-400"
                            : "text-gray-600 hover:bg-gray-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                        }`}
                      >
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <LanguageIcon code={lang.code} className="w-4 h-4 shadow-3xs" />
                          <span>{lang.name}</span>
                        </div>
                        {language === lang.code && (
                          <Check size={13} className="text-apple-blue dark:text-blue-400 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Toggle dark mode"
            id="theme-toggle"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* GitHub redirect */}
          <a
            href="https://github.com/AryaXzell"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center space-x-1 rtl:space-x-reverse px-4 py-2 text-xs font-medium bg-gray-900 text-white rounded-full hover:bg-black dark:bg-gray-50 dark:text-gray-950 dark:hover:bg-white transition-all shadow-xs"
            id="nav-github-link"
          >
            <span>{t("nav_github")}</span>
            <ArrowUpRight size={13} className="opacity-65" />
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-x-0 top-[60px] bg-white/95 dark:bg-zinc-950/95 border-b border-gray-200 dark:border-zinc-800 backdrop-blur-md px-6 py-4 flex flex-col space-y-3 z-40 transition-all"
          id="mobile-drawer"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-left rtl:text-right py-3 text-sm font-medium border-b border-gray-100 dark:border-zinc-900 cursor-pointer text-gray-600 dark:text-zinc-300 active:text-apple-blue"
            >
              {item.label}
            </button>
          ))}
          <a
            href="https://github.com/AryaXzell"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-1.5 rtl:space-x-reverse py-3 mt-2 bg-gray-900 text-white dark:bg-gray-50 dark:text-gray-950 rounded-lg text-sm font-medium"
          >
            <span>{t("nav_visit_github")}</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      )}
    </header>
  );
}

