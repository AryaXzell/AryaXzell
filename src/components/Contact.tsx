import { useState } from "react";
import { 
  Github, 
  Send, 
  Copy, 
  Check, 
  MessageSquare, 
  ShieldAlert, 
  MessageCircle,
  Facebook,
  Instagram,
  AtSign,
  Pin,
  Globe
} from "lucide-react";
import { useLanguage } from "../LanguageContext";

export default function Contact() {
  const { t, language } = useLanguage();
  const [message, setMessage] = useState("");
  const [draftCopied, setDraftCopied] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const handleCopyMessage = () => {
    if (!message.trim()) return;
    navigator.clipboard.writeText(message);
    setDraftCopied(true);
    setTimeout(() => setDraftCopied(false), 2000);
  };

  const handleCopyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const directChannels = [
    {
      id: "github",
      name: t("channel_github"),
      handle: "@AryaXzell",
      url: "https://github.com/AryaXzell",
      icon: <Github size={15} />,
      colorClass: "text-gray-800 dark:text-zinc-200 bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800",
      actionLabel: t("action_open_profile")
    },
    {
      id: "telegram",
      name: t("channel_telegram"),
      handle: "@aryaxzell",
      url: "https://t.me/aryaxzell",
      icon: <Send size={14} className="rotate-[-25deg] translate-x-[-1px] translate-y-[0.5px] rtl:rotate-250" />,
      colorClass: "text-sky-500 bg-sky-50 dark:bg-sky-950/30 border-sky-100 dark:border-sky-900/50",
      actionLabel: t("action_open_chat")
    },
    {
      id: "whatsapp",
      name: t("channel_whatsapp"),
      handle: "@AryaXzell",
      url: "https://wa.me/628123456789", // Indonesia template or blank wa.me
      icon: <MessageCircle size={15} />,
      colorClass: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900/50",
      actionLabel: t("action_chat_whatsapp")
    }
  ];

  const socialMedia = [
    {
      id: "instagram",
      name: "Instagram",
      profileName: "Arya Vallencia",
      handle: "AryaXzell",
      url: "https://instagram.com/AryaXzell",
      icon: <Instagram size={15} />,
      colorClass: "text-rose-500 bg-rose-50 dark:bg-rose-950/30 border-rose-100 dark:border-rose-900/40"
    },
    {
      id: "facebook",
      name: "Facebook",
      profileName: "Arya Vallencia",
      handle: "AryaXzell",
      url: "https://facebook.com/AryaXzell",
      icon: <Facebook size={15} />,
      colorClass: "text-blue-600 bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/40"
    },
    {
      id: "threads",
      name: "Threads",
      profileName: "Arya Vallencia",
      handle: "AryaXzell",
      url: "https://threads.net/@AryaXzell",
      icon: <AtSign size={15} />,
      colorClass: "text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850"
    },
    {
      id: "pinterest",
      name: "Pinterest",
      profileName: "Arya Vallencia",
      handle: "AryaXzell",
      url: "https://pinterest.com/AryaXzell",
      icon: <Pin size={15} />,
      colorClass: "text-red-600 bg-red-50 dark:bg-red-950/30 border-red-100 dark:border-red-900/40"
    },
    {
      id: "vk",
      name: "VKontakte (VK)",
      profileName: "Arya Vallencia",
      handle: "AryaXzell",
      url: "https://vk.com/AryaXzell",
      icon: <Globe size={15} />,
      colorClass: "text-cyan-500 bg-cyan-50 dark:bg-cyan-950/30 border-cyan-100 dark:border-cyan-900/40"
    }
  ];

  return (
    <section
      id="contact"
      className="py-24 px-6 bg-gray-50/50 dark:bg-black border-t border-gray-100 dark:border-zinc-900"
    >
      <div className="max-w-xl mx-auto space-y-12">
        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            {t("contact_title")}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400">
            {t("contact_subtitle")}
          </p>
          <div className="h-1 w-12 bg-apple-blue rounded-full mx-auto mt-4" />
        </div>

        {/* Contact groups - Grouped List Style */}
        <div className="space-y-6">
          {/* Direct channels card */}
          <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-gray-200/50 dark:border-zinc-850 shadow-2xs space-y-4">
            <div className="flex items-center space-x-2.5 rtl:space-x-reverse pb-2 border-b border-gray-100 dark:border-zinc-900">
              <MessageCircle size={16} className="text-apple-blue" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500">
                {t("contact_direct_title")}
              </h3>
            </div>

            <div className="space-y-3">
              {directChannels.map((channel) => (
                <div 
                  key={channel.id} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-gray-50/50 dark:bg-zinc-900/20 rounded-xl border border-gray-100/70 dark:border-zinc-850/50 gap-3"
                >
                  <div className="flex items-center space-x-3 rtl:space-x-reverse text-left rtl:text-right">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center border shadow-3xs shrink-0 ${channel.colorClass}`}>
                      {channel.icon}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100">{channel.name}</h4>
                      <p className="text-[10px] text-gray-400 dark:text-zinc-500 font-mono">{channel.handle}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 rtl:space-x-reverse self-end sm:self-auto">
                    {channel.url && (
                      <a
                        href={channel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-gray-950 hover:bg-black text-white dark:bg-zinc-900 dark:hover:bg-zinc-850 dark:text-zinc-100 border border-gray-200 dark:border-zinc-850 font-bold text-[10px] rounded-lg transition-all"
                      >
                        {channel.actionLabel}
                      </a>
                    )}
                    
                    <button
                      onClick={() => handleCopyText(channel.id, channel.handle)}
                      className={`px-3 py-1.5 font-bold text-[10px] rounded-lg transition-all cursor-pointer flex items-center space-x-1 rtl:space-x-reverse ${
                        copiedStates[channel.id]
                          ? "bg-emerald-500 text-white border-transparent"
                          : "bg-white hover:bg-gray-100 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 border border-gray-200 dark:border-zinc-850"
                      }`}
                    >
                      {copiedStates[channel.id] ? (
                        <>
                          <Check size={10} />
                          <span>{t("action_copied")}</span>
                        </>
                      ) : (
                        <>
                          <Copy size={10} />
                          <span>{t("action_copy")}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media Profiles Card */}
          <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-gray-200/50 dark:border-zinc-850 shadow-2xs space-y-4">
            <div className="flex items-center space-x-2.5 rtl:space-x-reverse pb-2 border-b border-gray-100 dark:border-zinc-900">
              <Globe size={16} className="text-apple-blue animate-none" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500">
                {t("contact_social_title")}
              </h3>
            </div>

            <div className="space-y-3">
              {socialMedia.map((social) => (
                <div 
                  key={social.id} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-gray-50/50 dark:bg-zinc-900/20 rounded-xl border border-gray-100/70 dark:border-zinc-850/50 gap-3 hover:border-gray-200 dark:hover:border-zinc-800 transition-colors"
                >
                  <div className="flex items-center space-x-3 rtl:space-x-reverse text-left rtl:text-right">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center border shadow-3xs shrink-0 ${social.colorClass}`}>
                      {social.icon}
                    </span>
                    <div>
                      <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                        <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100">{social.profileName}</h4>
                        <span className="text-[10px] text-gray-400 dark:text-zinc-500 font-normal">({social.name})</span>
                      </div>
                      <p className="text-[10px] text-gray-400 dark:text-zinc-500 font-mono">{social.handle}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 rtl:space-x-reverse self-end sm:self-auto">
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-gray-950 hover:bg-black text-white dark:bg-zinc-900 dark:hover:bg-zinc-850 dark:text-zinc-100 border border-gray-200 dark:border-zinc-850 font-bold text-[10px] rounded-lg transition-all"
                    >
                      {t("action_visit")}
                    </a>
                    
                    <button
                      onClick={() => handleCopyText(social.id, social.handle)}
                      className={`px-3 py-1.5 font-bold text-[10px] rounded-lg transition-all cursor-pointer flex items-center space-x-1 rtl:space-x-reverse ${
                        copiedStates[social.id]
                          ? "bg-emerald-500 text-white border-transparent"
                          : "bg-white hover:bg-gray-100 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 border border-gray-200 dark:border-zinc-850"
                      }`}
                    >
                      {copiedStates[social.id] ? (
                        <>
                          <Check size={10} />
                          <span>{t("action_copied")}</span>
                        </>
                      ) : (
                        <>
                          <Copy size={10} />
                          <span>{t("action_copy")}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy first scratchpad for communications */}
          <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-gray-200/50 dark:border-zinc-850 shadow-2xs space-y-4">
            <div className="flex items-center space-x-2.5 rtl:space-x-reverse pb-2 border-b border-gray-100 dark:border-zinc-900">
              <MessageSquare size={16} className="text-apple-blue shrink-0" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500">
                {t("contact_notepad_title")}
              </h3>
            </div>

            <p className="text-[11px] text-gray-400 dark:text-zinc-500 leading-relaxed text-left rtl:text-right">
              {t("contact_notepad_desc")}
            </p>

            <div className="space-y-2">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-850 rounded-xl p-3 text-xs focus:outline-hidden focus:border-apple-blue dark:text-zinc-200 font-sans text-left rtl:text-right"
                placeholder={t("contact_notepad_placeholder")}
              />

              <div className="flex items-center justify-between">
                {/* Security Badge */}
                <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-[9px] text-gray-400 dark:text-zinc-500 font-mono">
                  <ShieldAlert size={10} />
                  <span>{t("contact_notepad_security")}</span>
                </div>

                <button
                  onClick={handleCopyMessage}
                  disabled={!message.trim()}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center space-x-1.5 rtl:space-x-reverse transition-all cursor-pointer ${
                    !message.trim()
                      ? "bg-gray-100 dark:bg-zinc-900 text-gray-400 dark:text-zinc-600 cursor-not-allowed"
                      : "bg-apple-blue/10 hover:bg-apple-blue/15 text-apple-blue"
                  }`}
                  id="copy-draft-button"
                >
                  {draftCopied ? (
                    <>
                      <Check size={12} />
                      <span>{t("contact_notepad_copied")}</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>{t("contact_notepad_copy")}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
