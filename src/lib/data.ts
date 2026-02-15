export const PROFILE = {
  name: "Kushagra Singhal",
  title: "Architect of Intelligent Systems",
  role: "Founding Engineer | AI Systems Architect",
  location: "Bangalore, India",
  tagline: "I architect AI-first products that ship at scale.",
  taglines: [
    "Architecting intelligence at production scale",
    "From RAG pipelines to drone detection",
    "11 AI agents. 6 microservices. 5 systems deployed.",
    "Building AI-first products at scale",
    "Founding Engineer | AI Systems Architect",
  ],
  bio: "Founding Engineer building production AI systems across EdTech, AdTech, Fleet Intelligence, Defense & Conversational AI. From RAG pipelines to drone detection — I ship systems that matter.",
  xp: 9500,
  level: 42,
  rank: "Architect Prime",
  clearance: "OMEGA" as const,
  systemsOnline: 5,
  agentsDeployed: 11,
  microservices: 6,
  etlRows: "1M+",
  threatAccuracy: "97%+",
  email: "singhalkushagra03@gmail.com",
  phone: "+918955531225",
  whatsapp: "https://wa.me/918955531225",
  github: "https://github.com/kushagra67",
  linkedin: "https://www.linkedin.com/in/kushagra-singhal20/",
  resumePath: "/Kushagra_Resume.pdf",
};

export interface Mission {
  id: string;
  codename: string;
  title: string;
  subtitle: string;
  domain: string;
  status: "ACTIVE" | "DEPLOYED" | "CLASSIFIED";
  threatLevel: "S" | "A" | "B";
  impactScore: number;
  summary: string;
  problem: string;
  architecture: string;
  techStack: string[];
  impact: string[];
  color: string;
  icon: string;
  architectureNodes: ArchNode[];
}

export interface ArchNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type: "input" | "process" | "output" | "ai" | "database";
  connections: string[];
}

export const MISSIONS: Mission[] = [
  {
    id: "shikshavedam",
    codename: "SHIKSHA-VEDAM",
    title: "ShikshaVedam",
    subtitle: "Education Intelligence Core",
    domain: "EdTech",
    status: "ACTIVE",
    threatLevel: "S",
    impactScore: 95,
    summary: "AI-powered ERP with Virtual Principal, RAG pipelines, and LangGraph orchestration for next-gen education.",
    problem: "Educational institutions lack intelligent automation. Manual processes, zero AI integration, fragmented data systems.",
    architecture: "Multi-agent system with RAG-powered knowledge retrieval, LangGraph state machines, and a Virtual Principal AI that autonomously manages institutional operations.",
    techStack: ["Python", "FastAPI", "LangChain", "LangGraph", "RAG", "PostgreSQL", "pgvector", "React", "Next.js", "Gemini", "Vertex AI"],
    impact: [
      "Virtual Principal AI managing institutional ops autonomously",
      "RAG pipeline processing 10K+ educational documents",
      "LangGraph orchestrating multi-step administrative workflows",
      "Full ERP with AI-first architecture"
    ],
    color: "#00d4ff",
    icon: "🎓",
    architectureNodes: [
      { id: "user", label: "User Interface", x: 10, y: 50, type: "input", connections: ["api"] },
      { id: "api", label: "FastAPI Gateway", x: 30, y: 50, type: "process", connections: ["langgraph", "rag"] },
      { id: "langgraph", label: "LangGraph Engine", x: 50, y: 30, type: "ai", connections: ["principal"] },
      { id: "rag", label: "RAG Pipeline", x: 50, y: 70, type: "ai", connections: ["pgvector"] },
      { id: "principal", label: "Virtual Principal", x: 70, y: 30, type: "ai", connections: ["output"] },
      { id: "pgvector", label: "pgVector DB", x: 70, y: 70, type: "database", connections: ["output"] },
      { id: "output", label: "Response Layer", x: 90, y: 50, type: "output", connections: [] },
    ],
  },
  {
    id: "pracharvedam",
    codename: "PRACHAR-VEDAM",
    title: "PracharVedam",
    subtitle: "AI Growth Matrix",
    domain: "AdTech",
    status: "DEPLOYED",
    threatLevel: "S",
    impactScore: 92,
    summary: "6-microservice AI ad generation platform with real-time analytics and intelligent campaign orchestration.",
    problem: "Ad creation is manual, slow, and disconnected from performance data. No AI-native ad generation pipeline exists at scale.",
    architecture: "6 microservices handling ad generation, creative AI, campaign management, analytics ingestion, real-time bidding optimization, and user targeting — all orchestrated via event-driven architecture.",
    techStack: ["Python", "FastAPI", "React", "Next.js", "PostgreSQL", "ClickHouse", "Redis", "Docker", "Gemini", "Vertex AI"],
    impact: [
      "6 microservices in production",
      "AI-generated ad creatives with Gemini",
      "Real-time analytics with ClickHouse",
      "Event-driven campaign orchestration"
    ],
    color: "#a855f7",
    icon: "📡",
    architectureNodes: [
      { id: "client", label: "Dashboard UI", x: 10, y: 50, type: "input", connections: ["gateway"] },
      { id: "gateway", label: "API Gateway", x: 25, y: 50, type: "process", connections: ["adgen", "campaign", "analytics"] },
      { id: "adgen", label: "Ad Generation AI", x: 45, y: 20, type: "ai", connections: ["creative"] },
      { id: "campaign", label: "Campaign Engine", x: 45, y: 50, type: "process", connections: ["targeting"] },
      { id: "analytics", label: "Analytics Ingestion", x: 45, y: 80, type: "process", connections: ["clickhouse"] },
      { id: "creative", label: "Creative Store", x: 65, y: 20, type: "database", connections: ["delivery"] },
      { id: "targeting", label: "User Targeting", x: 65, y: 50, type: "ai", connections: ["delivery"] },
      { id: "clickhouse", label: "ClickHouse", x: 65, y: 80, type: "database", connections: ["delivery"] },
      { id: "delivery", label: "Ad Delivery", x: 85, y: 50, type: "output", connections: [] },
    ],
  },
  {
    id: "pravahvedam",
    codename: "PRAVAH-VEDAM",
    title: "PravahVedam",
    subtitle: "Autonomous Fleet Grid",
    domain: "Fleet Intelligence",
    status: "ACTIVE",
    threatLevel: "S",
    impactScore: 98,
    summary: "11 AI agents for fleet intelligence: V2V communication, Driver Monitoring System, predictive maintenance, and real-time fleet orchestration.",
    problem: "Fleet management is reactive, not predictive. No V2V communication, no driver monitoring, no AI-driven fleet orchestration exists in current solutions.",
    architecture: "11 specialized AI agents coordinating via message bus: DMS agent (MediaPipe), V2V communication agent, route optimization agent, predictive maintenance agent, and 7 more — forming an autonomous fleet intelligence network.",
    techStack: ["Python", "FastAPI", "MediaPipe", "YOLOv10", "Redis", "PostgreSQL", "Docker", "WebSocket", "Ollama"],
    impact: [
      "11 AI agents deployed in parallel",
      "V2V communication protocol implemented",
      "DMS with MediaPipe face/eye tracking",
      "Real-time fleet orchestration dashboard"
    ],
    color: "#22c55e",
    icon: "🚛",
    architectureNodes: [
      { id: "vehicles", label: "Vehicle Sensors", x: 10, y: 50, type: "input", connections: ["dms", "v2v"] },
      { id: "dms", label: "DMS Agent", x: 30, y: 25, type: "ai", connections: ["orchestrator"] },
      { id: "v2v", label: "V2V Comm Agent", x: 30, y: 75, type: "ai", connections: ["orchestrator"] },
      { id: "orchestrator", label: "Fleet Orchestrator", x: 55, y: 50, type: "process", connections: ["route", "maintenance", "alert"] },
      { id: "route", label: "Route Optimizer", x: 75, y: 25, type: "ai", connections: ["dashboard"] },
      { id: "maintenance", label: "Predictive Maint.", x: 75, y: 50, type: "ai", connections: ["dashboard"] },
      { id: "alert", label: "Alert System", x: 75, y: 75, type: "output", connections: ["dashboard"] },
      { id: "dashboard", label: "Fleet Dashboard", x: 92, y: 50, type: "output", connections: [] },
    ],
  },
  {
    id: "astravedam",
    codename: "ASTRA-VEDAM",
    title: "AstraVedam",
    subtitle: "Defensive Vision Engine",
    domain: "Defense",
    status: "CLASSIFIED",
    threatLevel: "S",
    impactScore: 99,
    summary: "YOLOv10-powered drone detection system with geofencing, real-time threat classification, and automated response protocols.",
    problem: "Unauthorized drones pose critical security threats. No real-time detection + classification + geofence enforcement system exists at scale.",
    architecture: "YOLOv10 detection pipeline → threat classifier → geofence engine → automated response system. Sub-100ms inference with edge deployment capability.",
    techStack: ["Python", "YOLOv10", "FastAPI", "OpenCV", "PostgreSQL", "Redis", "Docker", "WebSocket"],
    impact: [
      "YOLOv10 drone detection with sub-100ms inference",
      "Dynamic geofencing with real-time violation alerts",
      "Threat classification with 97%+ accuracy",
      "Edge-deployable architecture"
    ],
    color: "#ef4444",
    icon: "🛡️",
    architectureNodes: [
      { id: "cameras", label: "Camera Array", x: 10, y: 50, type: "input", connections: ["yolo"] },
      { id: "yolo", label: "YOLOv10 Detector", x: 30, y: 50, type: "ai", connections: ["classifier", "tracker"] },
      { id: "classifier", label: "Threat Classifier", x: 50, y: 30, type: "ai", connections: ["geofence"] },
      { id: "tracker", label: "Object Tracker", x: 50, y: 70, type: "process", connections: ["geofence"] },
      { id: "geofence", label: "Geofence Engine", x: 70, y: 50, type: "process", connections: ["response"] },
      { id: "response", label: "Response Protocol", x: 90, y: 50, type: "output", connections: [] },
    ],
  },
  {
    id: "vebot",
    codename: "VE-BOT",
    title: "Vebot",
    subtitle: "Conversational Intelligence Layer",
    domain: "Conversational AI",
    status: "DEPLOYED",
    threatLevel: "A",
    impactScore: 85,
    summary: "Multi-platform conversational AI deployed across WhatsApp, Telegram, and Discord with contextual memory and tool use.",
    problem: "Businesses need AI assistants across multiple messaging platforms but building separate bots for each is unsustainable.",
    architecture: "Unified conversational engine with platform adapters for WhatsApp, Telegram, and Discord. Shared context memory, tool-use capabilities, and configurable personas.",
    techStack: ["Python", "FastAPI", "LangChain", "Redis", "PostgreSQL", "Docker", "WhatsApp API", "Telegram API", "Discord API"],
    impact: [
      "Unified bot engine across 3 platforms",
      "Contextual memory with Redis-backed sessions",
      "Tool-use capabilities via LangChain agents",
      "Configurable personas per deployment"
    ],
    color: "#f59e0b",
    icon: "🤖",
    architectureNodes: [
      { id: "whatsapp", label: "WhatsApp", x: 10, y: 25, type: "input", connections: ["adapter"] },
      { id: "telegram", label: "Telegram", x: 10, y: 50, type: "input", connections: ["adapter"] },
      { id: "discord", label: "Discord", x: 10, y: 75, type: "input", connections: ["adapter"] },
      { id: "adapter", label: "Platform Adapter", x: 35, y: 50, type: "process", connections: ["engine"] },
      { id: "engine", label: "Conv. Engine", x: 55, y: 50, type: "ai", connections: ["memory", "tools"] },
      { id: "memory", label: "Context Memory", x: 75, y: 30, type: "database", connections: ["response"] },
      { id: "tools", label: "Tool Registry", x: 75, y: 70, type: "process", connections: ["response"] },
      { id: "response", label: "Response", x: 90, y: 50, type: "output", connections: [] },
    ],
  },
];

export interface Skill {
  name: string;
  level: number;
  maxLevel: number;
  category: "backend" | "ai" | "devops" | "frontend";
  unlocked: boolean;
}

export const SKILL_TREE: Record<string, Skill[]> = {
  backend: [
    { name: "Python", level: 95, maxLevel: 100, category: "backend", unlocked: true },
    { name: "FastAPI", level: 92, maxLevel: 100, category: "backend", unlocked: true },
    { name: "PostgreSQL", level: 88, maxLevel: 100, category: "backend", unlocked: true },
    { name: "Redis", level: 85, maxLevel: 100, category: "backend", unlocked: true },
    { name: "ClickHouse", level: 78, maxLevel: 100, category: "backend", unlocked: true },
    { name: "pgvector", level: 82, maxLevel: 100, category: "backend", unlocked: true },
  ],
  ai: [
    { name: "LangChain", level: 93, maxLevel: 100, category: "ai", unlocked: true },
    { name: "LangGraph", level: 90, maxLevel: 100, category: "ai", unlocked: true },
    { name: "YOLOv10", level: 85, maxLevel: 100, category: "ai", unlocked: true },
    { name: "Gemini", level: 88, maxLevel: 100, category: "ai", unlocked: true },
    { name: "Vertex AI", level: 84, maxLevel: 100, category: "ai", unlocked: true },
    { name: "MediaPipe", level: 80, maxLevel: 100, category: "ai", unlocked: true },
    { name: "Ollama", level: 82, maxLevel: 100, category: "ai", unlocked: true },
    { name: "RAG", level: 91, maxLevel: 100, category: "ai", unlocked: true },
  ],
  devops: [
    { name: "Docker", level: 90, maxLevel: 100, category: "devops", unlocked: true },
    { name: "CI/CD", level: 85, maxLevel: 100, category: "devops", unlocked: true },
    { name: "Git", level: 92, maxLevel: 100, category: "devops", unlocked: true },
  ],
  frontend: [
    { name: "React", level: 90, maxLevel: 100, category: "frontend", unlocked: true },
    { name: "Next.js", level: 88, maxLevel: 100, category: "frontend", unlocked: true },
    { name: "TypeScript", level: 86, maxLevel: 100, category: "frontend", unlocked: true },
    { name: "Tailwind CSS", level: 88, maxLevel: 100, category: "frontend", unlocked: true },
  ],
};

export const CATEGORY_COLORS: Record<string, string> = {
  backend: "#00f0ff",
  ai: "#f000ff",
  devops: "#00ff88",
  frontend: "#ffaa00",
};

export const CATEGORY_LABELS: Record<string, string> = {
  backend: "Backend Systems",
  ai: "AI / ML Engineering",
  devops: "DevOps & Infrastructure",
  frontend: "Frontend Engineering",
};

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  level: number;
  type: "work" | "project" | "milestone";
}

export const TIMELINE: TimelineEvent[] = [
  {
    year: "",
    title: "PravahVedam — Fleet Intelligence",
    description: "Deployed 11 AI agents for fleet intelligence: V2V, DMS, predictive maintenance, route optimization.",
    level: 42,
    type: "milestone",
  },
  {
    year: "",
    title: "AstraVedam — Defense Systems",
    description: "Built YOLOv10 drone detection with geofencing. Classified-grade threat response system.",
    level: 40,
    type: "milestone",
  },
  {
    year: "",
    title: "PracharVedam Deployed",
    description: "Shipped 6-microservice AI ad generation platform with real-time ClickHouse analytics.",
    level: 36,
    type: "project",
  },
  {
    year: "",
    title: "ShikshaVedam Initiated",
    description: "Architected AI-powered ERP with Virtual Principal, RAG pipelines, and LangGraph orchestration.",
    level: 30,
    type: "project",
  },
  {
    year: "",
    title: "Vebot Launched",
    description: "Deployed multi-platform conversational AI across WhatsApp, Telegram, and Discord.",
    level: 22,
    type: "project",
  },
  {
    year: "",
    title: "Internship — Nineleaps",
    description: "Built ETL pipelines processing 1M+ rows, BI dashboards, CI/CD pipelines, and an LLM agent for Git triage.",
    level: 15,
    type: "work",
  },
];

export const TERMINAL_COMMANDS: Record<string, string> = {
  "help": `Available commands:
  help                      Show this menu
  whoami                    Operator profile
  skills                    Skill matrix overview
  missions                  List all missions
  load <mission>            Load mission briefing
  status                    System status report
  clearance                 Security clearance info
  xp                        Experience points
  timeline                  Career progression
  contact                   Contact information
  clear                     Clear terminal`,

  "whoami": `
┌──────────────────────────────────────────────┐
│         OPERATOR DOSSIER INITIALIZED         │
│              CLEARANCE: OMEGA                │
└──────────────────────────────────────────────┘

  NAME            Kushagra Singhal
  DESIGNATION     Founding Engineer
  RANK            Architect Prime [LVL 42]
  LOCATION        Bangalore, India
  ARCHITECTURE    AI Systems · Multi-Agent · Full-Stack

──────────── PRODUCTION FOOTPRINT ─────────────

  SYSTEMS SHIPPED        5 production-grade AI products
  AI AGENTS DEPLOYED     11 autonomous agents
  MICROSERVICES LIVE     6 independent services
  DOMAINS COVERED        EdTech · AdTech · Fleet Intel
                         Defense · Conversational AI

──────────── IMPACT METRICS ───────────────────

  ETL THROUGHPUT         1,000,000+ rows processed
  PERF OPTIMIZATION      35% improvement
  SQL PRECISION (LLM)    95% accuracy
  RELIABILITY GAIN       15% uptime increase
  THREAT DETECTION       97%+ precision (YOLOv10)

──────────── CORE STACK ───────────────────────

  BACKEND      Python · FastAPI · PostgreSQL · Redis
  AI/ML        LangChain · LangGraph · RAG · pgvector
  VISION       YOLOv10 · MediaPipe · OpenCV
  INFERENCE    Gemini · Vertex AI · Ollama
  FRONTEND     React · Next.js · TypeScript · Tailwind
  INFRA        Docker · ClickHouse · CI/CD
  PROCESS      Scrum Master · Jira · Confluence

──────────── SYSTEM STATUS ────────────────────

  PRODUCTION SYSTEMS     ● ONLINE
  AI AGENT NETWORK       ● ACTIVE [11/11]
  DEPLOYMENT TIER        ● PRODUCTION
  CLEARANCE LEVEL        ● ENTERPRISE — OMEGA

──────────── CONTACT CHANNELS ─────────────────

  EMAIL        singhalkushagra03@gmail.com
  PHONE        +91 8955531225
  WHATSAPP     wa.me/918955531225
  GITHUB       github.com/kushagra67
  LINKEDIN     linkedin.com/in/kushagra-singhal20

┌──────────────────────────────────────────────┐
│  STATUS: AVAILABLE FOR HIGH-IMPACT ROLES     │
│  TYPE: help  FOR AVAILABLE COMMANDS          │
└──────────────────────────────────────────────┘`,

  "run kushagra --skills": `> LOADING SKILL MATRIX...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  [BACKEND]   Python ████████████████░░ 95
  [BACKEND]   FastAPI ███████████████░░░ 92
  [AI]        LangChain ███████████████░░░ 93
  [AI]        LangGraph ██████████████░░░░ 90
  [AI]        YOLOv10 █████████████░░░░░ 85
  [AI]        RAG █████████████████░░ 91
  [DEVOPS]    Docker ██████████████░░░░ 90
  [FRONTEND]  React ██████████████░░░░ 90
  [FRONTEND]  Next.js ████████████████░░ 88
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,

  "run kushagra --stats": `> CAREER TELEMETRY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  XP:              9,500
  Level:           42
  Rank:            Architect Prime
  Systems Online:  5
  Agents Deployed: 11
  Microservices:   6
  ETL Rows:        1,000,000+
  Threat Accuracy: 97%+
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,

  "missions": `> MISSION REGISTRY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  [S] SHIKSHA-VEDAM  │ AI Education Core          │ ACTIVE
  [S] PRACHAR-VEDAM  │ AI Growth Matrix           │ DEPLOYED
  [S] PRAVAH-VEDAM   │ Autonomous Fleet Grid      │ ACTIVE
  [S] ASTRA-VEDAM    │ Defensive Vision Engine    │ CLASSIFIED
  [A] VE-BOT         │ Conv. Intelligence Layer   │ DEPLOYED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Type 'load <codename>' to open briefing`,

  "list missions": `> MISSION REGISTRY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  [S] SHIKSHA-VEDAM  │ AI Education Core          │ ACTIVE
  [S] PRACHAR-VEDAM  │ AI Growth Matrix           │ DEPLOYED
  [S] PRAVAH-VEDAM   │ Autonomous Fleet Grid      │ ACTIVE
  [S] ASTRA-VEDAM    │ Defensive Vision Engine    │ CLASSIFIED
  [A] VE-BOT         │ Conv. Intelligence Layer   │ DEPLOYED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,

  "skills": `> OPERATOR SKILL MATRIX
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  [BACKEND]   Python ████████████████░░ 95
  [BACKEND]   FastAPI ███████████████░░░ 92
  [AI]        LangChain ███████████████░░░ 93
  [AI]        LangGraph ██████████████░░░░ 90
  [AI]        RAG █████████████████░░ 91
  [AI]        YOLOv10 █████████████░░░░░ 85
  [DEVOPS]    Docker ██████████████░░░░ 90
  [FRONTEND]  React ██████████████░░░░ 90
  [FRONTEND]  Next.js ████████████████░░ 88
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  System Strength Index: 88/100`,

  "status": `> SYSTEM STATUS REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  System:       ONLINE
  Power Level:  100%
  AI Agents:    11 ACTIVE
  Services:     6 DEPLOYED
  Systems:      5 OPERATIONAL
  Uptime:       99.9%
  Threat Level: NOMINAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,

  "clearance": `> SECURITY CLEARANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Level:   OMEGA (Highest)
  Access:  ALL SYSTEMS
  Granted: Full mission archive
  Note:    Classified projects visible
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,

  "xp": `> EXPERIENCE REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Total XP:     9,500
  Level:        42 / 50
  Rank:         Architect Prime
  Next Rank:    System Overlord (10,000 XP)
  Progress:     ████████████████████░░ 95%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,

  "timeline": `> CAREER PROGRESSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  PravahVedam — Fleet Intel       LVL 42
  AstraVedam — Defense            LVL 40
  PracharVedam Deployed           LVL 36
  ShikshaVedam Initiated          LVL 30
  Vebot Launched                  LVL 22
  Internship @ Nineleaps          LVL 15
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,

  "contact": `> SECURE CHANNEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Email:    singhalkushagra03@gmail.com
  Phone:    +91 8955531225
  WhatsApp: wa.me/918955531225
  GitHub:   github.com/kushagra67
  LinkedIn: linkedin.com/in/kushagra-singhal20
  Resume:   /Kushagra_Resume.pdf
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
};
