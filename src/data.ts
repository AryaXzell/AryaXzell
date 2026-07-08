import { Project } from "./types";

export const projectsData: Project[] = [
  {
    id: "zip2git",
    name: "Zip2Git",
    tagline: "Local code packager and direct publisher for GitHub",
    description: "I built this to skip the whole Git terminal setup when working on public computers or quick sandboxes. Drag in a ZIP of your directory, and it pushes the files directly to your GitHub repo without sending your access tokens or codebase to an external server.",
    detailedDescription: [
      "Built with React 19, TypeScript, and modern Tailwind CSS to keep the application lightweight and instant.",
      "Requires a GitHub Personal Access Token which is kept strictly inside temporary session storage.",
      "Performs folder extraction directly in browser memory using JSZip, so files never leave your computer.",
      "Prevents repository clutter by automatically filtering out useless system logs, node_modules, and platform artifacts.",
      "Leverages the GitHub Contents API with smart recursive queues and SHA-aware overwrite checks to avoid merge conflicts."
    ],
    caseStudy: {
      why: "I often find myself using shared devices in computer labs or quick online workspaces where setting up Git SSH keys, cloning a large repo, and executing commit terminals is slow and repetitive.",
      problem: "Existing online file upload tools require you to hand over your source code and private GitHub tokens to their servers for decompression and API forwarding. I couldn't find a solution that respected code confidentiality and worked entirely in-browser.",
      solution: "I created Zip2Git to run entirely on the client side. Using JSZip, the ZIP archive is opened directly in browser memory. It processes the folder tree, filters out unnecessary system noise (like .DS_Store and node_modules), and pipes the files directly to the GitHub Contents API.",
      challenges: "Uploading a massive number of files concurrently would trigger GitHub's abuse rate limits or crash the browser tab. To solve this, I designed an asynchronous upload queue that publishes files recursively, throttle-limiting connections while feeding real-time progress bars and time estimates to the user.",
      result: "A lightweight, functional workspace publisher. Pushing a full boilerplate template with dozens of files now takes under 4 seconds, preserving complete credential confidentiality while working flawlessly on any internet-enabled browser."
    },
    status: "Live",
    latestUpdate: "June 2026",
    liveUrl: "https://zip2-git-eight.vercel.app/",
    githubUrl: "https://github.com/AryaXzell/zip2git",
    tags: ["React 19", "TypeScript", "JSZip", "GitHub API", "Tailwind CSS"],
    highlightBadge: "Credentials Safe"
  },
  {
    id: "ipscope",
    name: "IPScope",
    tagline: "Client-safe network diagnostics and mapping center",
    description: "An application to inspect IP addresses, check active domain names, and map geographic coordinates. I designed it to be fully accessible, loading instantly on slow connections without cluttered ads or trackers.",
    detailedDescription: [
      "Runs fully on a single-screen layout supporting deep domain name, IPv4, and IPv6 lookups.",
      "Inspects registered ASNs and internet service providers to diagnose routing and latency patterns.",
      "Detects background proxy usage, Tor exit nodes, and commercial VPN connections to analyze visitor authenticity.",
      "Checks domain and server IP records against popular active security blocklists for risk verification.",
      "Features interactive geolocation plotting utilizing high-performance Leaflet mapping vectors and OpenStreetMap tiles."
    ],
    caseStudy: {
      why: "I wanted a fast, aesthetic tool to check client connection specs, test proxy layouts, and look up domain diagnostics without browsing slow, ad-heavy websites that log your search history.",
      problem: "Most network tools are cluttered with banner ads, load heavy trackers that log client behaviors, and fail basic keyboard accessibility or screen reader audits.",
      solution: "I designed IPScope as a responsive dashboard. It combines live geolocation, ASN routing lookups, WHOIS/RDAP logs, and security checks in one place. By relying on direct public APIs with robust retry strategies, the app remains exceptionally lean.",
      challenges: "Rendering full-featured maps dynamically without introducing heavy layout shifts or tanking performance on low-end phones was difficult. I optimized this by lazy-initializing the Leaflet containers, stripping bulky styles, and implementing an elegant glassmorphism layout that scales smoothly.",
      result: "A responsive diagnostics board that loads in less than 800 milliseconds, achieves near-perfect accessibility scores, and provides comprehensive network diagnostics with touch-enabled mapping."
    },
    status: "Live",
    latestUpdate: "May 2026",
    liveUrl: "https://ipscope-xi.vercel.app/",
    githubUrl: "https://github.com/AryaXzell/ipscope",
    tags: ["Single-Page App", "Leaflet Maps", "WHOIS/RDAP API", "PWA-Ready"],
    highlightBadge: "Responsive Maps"
  }
];
