import { Code2, Compass, Layout, Cpu } from "lucide-react";
import { useLanguage } from "../LanguageContext";

export default function About() {
  const { t } = useLanguage();

  const pillars = [
    {
      icon: <Code2 className="text-apple-blue" size={20} />,
      title: t("about_pillar_1_title"),
      desc: t("about_pillar_1_desc"),
    },
    {
      icon: <Layout className="text-apple-blue" size={20} />,
      title: t("about_pillar_2_title"),
      desc: t("about_pillar_2_desc"),
    },
    {
      icon: <Cpu className="text-apple-blue" size={20} />,
      title: t("about_pillar_3_title"),
      desc: t("about_pillar_3_desc"),
    },
    {
      icon: <Compass className="text-apple-blue" size={20} />,
      title: t("about_pillar_4_title"),
      desc: t("about_pillar_4_desc"),
    },
  ];

  return (
    <section
      id="about"
      className="py-24 px-6 bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-900"
    >
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Editorial Heading with Live GitHub Avatar */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5 rtl:space-x-reverse text-center sm:text-left rtl:sm:text-right">
          <img
            src="https://github.com/AryaXzell.png"
            alt="Arya"
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-full border-2 border-gray-200/80 dark:border-zinc-800 shadow-md shrink-0"
          />
          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              {t("about_title")}
            </h2>
            <div className="h-1 w-12 bg-apple-blue rounded-full mx-auto sm:mx-0" />
          </div>
        </div>

        {/* Introduction Narrative */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-start">
          <div className="md:col-span-3 space-y-6 text-gray-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
            <p>
              {t("about_intro_p1")}
            </p>
            <p>
              {t("about_intro_p2")}
            </p>
            <p>
              {t("about_intro_p3")}
            </p>
          </div>

          <div className="md:col-span-2 bg-gray-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-zinc-500">
              {t("about_interests_title")}
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700 dark:text-zinc-300 font-medium">
              <li className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="w-1.5 h-1.5 bg-apple-blue rounded-full shrink-0" />
                <span>{t("about_interest_1")}</span>
              </li>
              <li className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="w-1.5 h-1.5 bg-apple-blue rounded-full shrink-0" />
                <span>{t("about_interest_2")}</span>
              </li>
              <li className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="w-1.5 h-1.5 bg-apple-blue rounded-full shrink-0" />
                <span>{t("about_interest_3")}</span>
              </li>
              <li className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="w-1.5 h-1.5 bg-apple-blue rounded-full shrink-0" />
                <span>{t("about_interest_4")}</span>
              </li>
              <li className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="w-1.5 h-1.5 bg-apple-blue rounded-full shrink-0" />
                <span>{t("about_interest_5")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Feature Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 bg-gray-50 dark:bg-zinc-900/30 border border-gray-100 dark:border-zinc-800/60 rounded-2xl space-y-3 transition-colors hover:bg-gray-100/50 dark:hover:bg-zinc-900/50"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-900 shadow-2xs">
                {pillar.icon}
              </div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                {pillar.title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

