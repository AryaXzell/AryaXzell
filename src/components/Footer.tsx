import { Laptop } from "lucide-react";
import { useLanguage } from "../LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = 2026; // Set as per metadata timeframe

  return (
    <footer className="py-12 px-6 bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-900 text-center space-y-4">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 dark:text-zinc-500 font-mono">
        <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
          <Laptop size={12} className="text-apple-blue shrink-0" />
          <span>© {currentYear} AryaXzell. {t("footer_rights")}</span>
        </div>
        
        <div className="mt-2 sm:mt-0 text-left rtl:text-right">
          <span>{t("footer_philosophy")}</span>
        </div>
      </div>
    </footer>
  );
}
