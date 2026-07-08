import { useState, useEffect } from "react";
import {
  UploadCloud,
  CheckCircle2,
  GitBranch,
  Terminal,
  Globe,
  MapPin,
  ShieldAlert,
  Search,
  Database,
  RefreshCw,
  FolderOpen
} from "lucide-react";

export function Zip2GitMockup() {
  const [stage, setStage] = useState<"idle" | "extracting" | "uploading" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState("");
  const [repoName, setRepoName] = useState("my-cool-project");
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    if (stage === "idle") {
      setProgress(0);
      setCurrentFile("");
      return;
    }

    if (stage === "extracting") {
      const files = [
        "package.json",
        "tsconfig.json",
        "vite.config.ts",
        "src/main.tsx",
        "src/App.tsx",
        "src/components/Navbar.tsx",
        "public/index.html",
        "assets/logo.png"
      ];
      let fileIdx = 0;
      const interval = setInterval(() => {
        if (fileIdx < files.length) {
          setCurrentFile(files[fileIdx]);
          setProgress(Math.round(((fileIdx + 1) / files.length) * 100));
          fileIdx++;
        } else {
          clearInterval(interval);
          setStage("uploading");
          setProgress(0);
        }
      }, 400);
      return () => clearInterval(interval);
    }

    if (stage === "uploading") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStage("done"), 500);
            return 100;
          }
          return prev + 10;
        });
      }, 250);
      return () => clearInterval(interval);
    }
  }, [stage]);

  return (
    <div className="w-full h-full bg-[#f4f4f6] dark:bg-zinc-900 rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-800 flex flex-col font-mono text-[10px] text-gray-700 dark:text-zinc-300 shadow-sm select-none">
      {/* Browser Bar */}
      <div className="bg-gray-100 dark:bg-zinc-950 px-3 py-2 flex items-center justify-between border-b border-gray-200 dark:border-zinc-800">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-[9px] text-gray-500 rounded px-1.5 py-0.5 w-1/2 text-center truncate">
          zip2git-eight.vercel.app
        </div>
        <div className="w-8" />
      </div>

      {/* Main UI */}
      <div className="flex-1 p-3 flex flex-col space-y-2.5 justify-between">
        {stage === "idle" && (
          <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-gray-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-950 p-4 text-center cursor-pointer hover:border-apple-blue dark:hover:border-apple-blue transition-colors group" onClick={() => setStage("extracting")}>
            <UploadCloud className="w-6 h-6 text-gray-400 dark:text-zinc-500 group-hover:text-apple-blue group-hover:scale-115 transition-all mb-1.5" />
            <span className="text-[10px] font-semibold text-gray-800 dark:text-zinc-200">
              Upload zip source code
            </span>
            <span className="text-[8px] text-gray-400 dark:text-zinc-500 mt-0.5">
              Drag & drop or click to test-drive
            </span>
          </div>
        )}

        {stage === "extracting" && (
          <div className="flex-1 flex flex-col justify-center space-y-2 bg-white dark:bg-zinc-950 p-3 rounded-lg border border-gray-200/50 dark:border-zinc-800/50">
            <div className="flex items-center justify-between text-[9px] text-gray-500">
              <span className="flex items-center space-x-1">
                <RefreshCw size={10} className="animate-spin text-apple-blue" />
                <span>Extracting client-side ZIP...</span>
              </span>
              <span>{progress}%</span>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-apple-blue h-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>

            <div className="bg-gray-50 dark:bg-zinc-900 border border-gray-200/50 dark:border-zinc-800/50 p-1.5 rounded text-[8px] font-mono text-gray-400 truncate flex items-center space-x-1.5">
              <FolderOpen size={10} className="text-gray-400" />
              <span>{currentFile || "Reading zip contents..."}</span>
            </div>
          </div>
        )}

        {stage === "uploading" && (
          <div className="flex-1 flex flex-col justify-center space-y-2.5 bg-white dark:bg-zinc-950 p-3 rounded-lg border border-gray-200/50 dark:border-zinc-800/50">
            <div className="flex items-center justify-between text-[9px] text-gray-500">
              <span className="flex items-center space-x-1">
                <GitBranch size={10} className="text-apple-blue animate-pulse-soft" />
                <span>Recursive upload to GitHub API...</span>
              </span>
              <span>{progress}%</span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-apple-blue h-full transition-all duration-200" style={{ width: `${progress}%` }} />
            </div>

            <div className="flex items-center justify-between text-[8px] text-gray-400">
              <span>Files: 8 / 8</span>
              <span>ETA: ~1.2s (Browser-only)</span>
            </div>
          </div>
        )}

        {stage === "done" && (
          <div className="flex-1 flex flex-col items-center justify-center space-y-2 bg-white dark:bg-zinc-950 p-3 rounded-lg border border-gray-200/50 dark:border-zinc-800/50">
            <CheckCircle2 className="w-7 h-7 text-green-500" />
            <div className="text-center">
              <p className="text-[9px] font-bold text-gray-800 dark:text-zinc-200">
                Uploaded successfully!
              </p>
              <p className="text-[8px] text-gray-400 dark:text-zinc-500 mt-0.5">
                Created repository: <span className="text-apple-blue font-semibold">{repoName}</span>
              </p>
            </div>
            <button
              onClick={() => setStage("idle")}
              className="px-2 py-0.5 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-[8px] font-bold text-gray-700 dark:text-zinc-300 rounded cursor-pointer"
            >
              Reset Demo
            </button>
          </div>
        )}

        {/* Configurations block */}
        <div className="bg-white/80 dark:bg-zinc-950/80 p-2 rounded-lg border border-gray-200/50 dark:border-zinc-800/50 grid grid-cols-2 gap-2 text-[8px]">
          <div>
            <label className="text-gray-400 dark:text-zinc-500 block mb-0.5">Target Repository</label>
            <input
              type="text"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              disabled={stage !== "idle"}
              className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded px-1 py-0.5 focus:outline-hidden focus:border-apple-blue"
            />
          </div>
          <div>
            <label className="text-gray-400 dark:text-zinc-500 block mb-0.5">Repository Visibility</label>
            <div className="flex items-center space-x-2 h-5">
              <button
                onClick={() => setIsPrivate(false)}
                disabled={stage !== "idle"}
                className={`flex-1 text-center py-0.5 rounded border transition-colors ${
                  !isPrivate
                    ? "bg-apple-blue/10 border-apple-blue/30 text-apple-blue"
                    : "bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800"
                }`}
              >
                Public
              </button>
              <button
                onClick={() => setIsPrivate(true)}
                disabled={stage !== "idle"}
                className={`flex-1 text-center py-0.5 rounded border transition-colors ${
                  isPrivate
                    ? "bg-apple-blue/10 border-apple-blue/30 text-apple-blue"
                    : "bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800"
                }`}
              >
                Private
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function IPScopeMockup() {
  const [ipInput, setIpInput] = useState("8.8.8.8");
  const [activeTab, setActiveTab] = useState<"map" | "whois" | "check">("map");
  const [loading, setLoading] = useState(false);
  const [ipData, setIpData] = useState({
    ip: "8.8.8.8",
    asn: "AS15169 Google LLC",
    org: "Google Public DNS",
    loc: "Mountain View, California, US",
    vpn: false,
    blacklist: 0
  });

  const handleLookup = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (ipInput.includes("1.1.1.1")) {
        setIpData({
          ip: "1.1.1.1",
          asn: "AS13335 Cloudflare, Inc.",
          org: "Cloudflare DNS",
          loc: "Sydney, New South Wales, AU",
          vpn: false,
          blacklist: 0
        });
      } else if (ipInput.includes("45.223.")) {
        setIpData({
          ip: ipInput,
          asn: "AS40021 NordVPN S.A.",
          org: "NordVPN S.A.",
          loc: "Zurich, Switzerland",
          vpn: true,
          blacklist: 2
        });
      } else {
        setIpData({
          ip: ipInput,
          asn: "AS15169 Google LLC",
          org: "Google Public DNS",
          loc: "Mountain View, California, US",
          vpn: false,
          blacklist: 0
        });
      }
    }, 600);
  };

  return (
    <div className="w-full h-full bg-[#f4f4f6] dark:bg-zinc-900 rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-800 flex flex-col font-mono text-[10px] text-gray-700 dark:text-zinc-300 shadow-sm select-none">
      {/* Browser Bar */}
      <div className="bg-gray-100 dark:bg-zinc-950 px-3 py-2 flex items-center justify-between border-b border-gray-200 dark:border-zinc-800">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-[9px] text-gray-500 rounded px-1.5 py-0.5 w-1/2 text-center truncate">
          ipscope-xi.vercel.app
        </div>
        <div className="w-8" />
      </div>

      {/* Main UI */}
      <div className="flex-1 p-3 flex flex-col space-y-2">
        {/* Search Input Bar */}
        <div className="flex space-x-1">
          <div className="relative flex-1">
            <input
              type="text"
              value={ipInput}
              onChange={(e) => setIpInput(e.target.value)}
              className="w-full bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded px-2 py-1 pr-6 focus:outline-hidden text-[9px] focus:border-apple-blue"
              placeholder="Enter IP or Domain..."
            />
            <Search className="absolute right-2 top-1.5 text-gray-400" size={10} />
          </div>
          <button
            onClick={handleLookup}
            disabled={loading}
            className="px-2.5 bg-apple-blue hover:bg-apple-blue-hover text-white rounded font-medium text-[9px] cursor-pointer flex items-center space-x-1"
          >
            {loading ? <RefreshCw size={8} className="animate-spin" /> : "Lookup"}
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex space-x-1 border-b border-gray-200/50 dark:border-zinc-800/50 pb-1">
          <button
            onClick={() => setActiveTab("map")}
            className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
              activeTab === "map" ? "bg-apple-blue/10 text-apple-blue" : "text-gray-400"
            }`}
          >
            Interactive Map
          </button>
          <button
            onClick={() => setActiveTab("whois")}
            className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
              activeTab === "whois" ? "bg-apple-blue/10 text-apple-blue" : "text-gray-400"
            }`}
          >
            RDAP/Whois
          </button>
          <button
            onClick={() => setActiveTab("check")}
            className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
              activeTab === "check" ? "bg-apple-blue/10 text-apple-blue" : "text-gray-400"
            }`}
          >
            Security Check
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 bg-white dark:bg-zinc-950 rounded-lg border border-gray-200/50 dark:border-zinc-800/50 p-2 overflow-hidden flex flex-col justify-between">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-1">
              <RefreshCw size={14} className="animate-spin text-apple-blue" />
              <span className="text-[8px] text-gray-400">Querying DNS & WHOIS record...</span>
            </div>
          ) : activeTab === "map" ? (
            <div className="flex-1 flex flex-col justify-between">
              {/* Map Canvas Visual (CSS Grid lines styled to look like custom OpenStreetMap tiles) */}
              <div className="relative h-20 bg-blue-50/50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded overflow-hidden flex items-center justify-center">
                {/* Simulated geographic grids */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent dark:from-zinc-800/20 pointer-events-none" />
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:10px_10px]" />
                
                {/* Land masses shapes simulated via simple vector lines */}
                <div className="w-16 h-8 bg-gray-200 dark:bg-zinc-800 rounded-full blur-xs opacity-60 relative -left-4" />
                <div className="w-12 h-6 bg-gray-200 dark:bg-zinc-800 rounded-full blur-xs opacity-60 absolute -right-2" />

                {/* Pin element */}
                <div className="absolute flex flex-col items-center justify-center animate-bounce-soft">
                  <MapPin size={12} className="text-red-500 fill-red-200" />
                  <span className="w-1.5 h-0.5 bg-black/20 rounded-full blur-[1px]" />
                </div>

                <div className="absolute bottom-1 right-1 bg-white/90 dark:bg-zinc-950/90 text-[7px] text-gray-400 px-1 py-0.5 rounded border border-gray-100 dark:border-zinc-800">
                  © OpenStreetMap
                </div>
              </div>

              {/* Data block */}
              <div className="grid grid-cols-2 gap-1.5 text-[8px] mt-1.5 pt-1.5 border-t border-gray-100 dark:border-zinc-900">
                <div className="flex items-center space-x-1 text-gray-500">
                  <Globe size={9} />
                  <span className="truncate">IP: {ipData.ip}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <MapPin size={9} />
                  <span className="truncate">{ipData.loc}</span>
                </div>
              </div>
            </div>
          ) : activeTab === "whois" ? (
            <div className="flex-1 flex flex-col text-[8px] justify-between">
              <div className="bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 p-1.5 rounded font-mono text-gray-500 leading-normal overflow-y-auto max-h-[85px] space-y-1">
                <div>% RDAP/Whois Lookup output for: {ipData.ip}</div>
                <div>NetRange:       8.8.8.0 - 8.8.8.255</div>
                <div>CIDR:           8.8.8.0/24</div>
                <div>NetName:        LVLT-GOGL-8-8-8</div>
                <div>Organization:   {ipData.org}</div>
                <div>ASN:            {ipData.asn}</div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center p-1 bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 rounded">
                  <span className="text-[8px] text-gray-500">Proxy/VPN status</span>
                  <span className={`px-1 rounded text-[7px] font-bold ${
                    ipData.vpn ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                  }`}>
                    {ipData.vpn ? "Proxy / Tor / VPN Detected" : "No Proxy / VPN detected"}
                  </span>
                </div>

                <div className="flex justify-between items-center p-1 bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 rounded">
                  <span className="text-[8px] text-gray-500">Blacklist Check</span>
                  <span className={`px-1 rounded text-[7px] font-bold ${
                    ipData.blacklist > 0 ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                  }`}>
                    {ipData.blacklist > 0 ? `Flagged in ${ipData.blacklist} lists` : "Clean status"}
                  </span>
                </div>
              </div>

              <div className="text-[7px] text-gray-400 flex items-center space-x-1">
                <ShieldAlert size={8} />
                <span>Security check performed against real-time spam databases</span>
              </div>
            </div>
          )}
        </div>

        {/* Hint for inputs */}
        <div className="text-[7.5px] text-gray-400 text-center flex items-center justify-center space-x-1">
          <span>Try: </span>
          <button onClick={() => setIpInput("1.1.1.1")} className="underline text-apple-blue font-bold">1.1.1.1 (Cloudflare)</button>
          <span> or </span>
          <button onClick={() => setIpInput("45.223.0.1")} className="underline text-apple-blue font-bold">45.223.0.1 (VPN IP)</button>
        </div>
      </div>
    </div>
  );
}
