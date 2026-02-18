export const PROFILE = {
  name: "Kushagra Singhal",
  title: "Architect of Intelligent Systems",
  role: "Founding Engineer | AI Systems Architect",
  location: "Bangalore, India",
  tagline: "I architect AI-first products that ship at scale.",
  taglines: [
    "Architecting intelligence at production scale",
    "From knowledge distillation to drone detection",
    "16 AI agents. 9 microservices. 9 systems deployed.",
    "Building AI-first products that ship",
    "Founding Engineer | AI Systems Architect",
  ],
  bio: "Founding Engineer building production AI systems across EdTech, AdTech, Fleet Intelligence, Defense, HealthTech, Auth & Conversational AI. From knowledge distillation to drone detection — I architect systems that ship.",
  xp: 12500,
  level: 48,
  rank: "Architect Prime",
  clearance: "OMEGA" as const,
  systemsOnline: 9,
  agentsDeployed: 16,
  microservices: 9,
  etlRows: "1M+",
  threatAccuracy: "97%+",
  email: "singhalkushagra03@gmail.com",
  phone: "+918955531225",
  whatsapp: "https://wa.me/918955531225",
  github: "https://github.com/kushagra67",
  linkedin: "https://www.linkedin.com/in/kushagra-singhal20/",
  resumePath: "/AI_engineer.pdf",
  resumes: [
    { role: "AI Engineer", path: "/AI_engineer.pdf" },
    { role: "Backend Engineer", path: "/Backend_engineer.pdf" },
    { role: "DevOps Engineer", path: "/Devops_engineer.pdf" },
  ],
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
    subtitle: "AI-First School ERP + Virtual Principal",
    domain: "EdTech",
    status: "ACTIVE",
    threatLevel: "S",
    impactScore: 95,
    summary: "AI-first ERP for CBSE schools with a Virtual Principal AI that orchestrates 5 specialized agents (Compliance, Academic, Finance, Welfare + Orchestrator). Features OCR answer-sheet grading, RAG knowledge base over CBSE regulations, role-based dashboards for students/teachers/principals, and 3-level decision governance with human-in-the-loop. Deployed with Android + iOS apps, Keycloak auth, and MCP tool layer.",
    problem: "CBSE schools run on fragmented manual systems — attendance on paper, grading in Excel, compliance tracked nowhere. No AI-driven governance or intelligent automation exists for Indian K-12 education.",
    architecture: "Virtual Principal orchestrator coordinates 4 domain agents (Compliance, Academic, Finance, Student Welfare) via MCP tool layer. RAG pipeline with pgvector processes CBSE documents for semantic search. 3-level decision governance: Level 1 (autonomous dashboards), Level 2 (auto + notify), Level 3 (human approval required). Keycloak SSO via PramanVedam. Usage tracking via VyayVedam.",
    techStack: ["Python", "FastAPI", "LangGraph", "RAG", "PostgreSQL", "pgvector", "React", "Vite", "Keycloak", "Docker", "Android (Kotlin)", "iOS (Swift)", "Gemini", "Ollama", "Phi-3"],
    impact: [
      "5 AI agents: Virtual Principal + Compliance, Academic, Finance, Welfare",
      "OCR grading pipeline with human-in-the-loop approval",
      "RAG over CBSE regulations with pgvector semantic search",
      "Role-based dashboards: Student, Teacher, Principal, Admin",
      "3-level decision governance (Autonomous → Advisory → Enforcement)",
      "Cross-platform: Web + Android (Kotlin) + iOS (Swift)"
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
    subtitle: "AI Ad Analytics & Campaign Intelligence",
    domain: "AdTech",
    status: "DEPLOYED",
    threatLevel: "S",
    impactScore: 92,
    summary: "End-to-end ad analytics platform with 6 microservices: campaign management, AI creative generation, real-time analytics (ClickHouse + TimescaleDB), ML-powered bidding optimization, A/B testing framework, and multi-platform ad integrations (Google, Facebook, LinkedIn, TikTok). Simulation engine for budget forecasting and what-if scenario analysis.",
    problem: "Ad creation is manual, slow, and disconnected from performance data. Campaign optimization relies on gut feeling, not ML. No unified analytics across Google, Facebook, LinkedIn, and TikTok exists.",
    architecture: "6 microservices: Campaign Engine, Ad Generation AI, Analytics Ingestion (Kafka streams → ClickHouse), ML Bidding Optimizer, Creative Asset Manager, User Targeting. API Gateway with rate limiting + auth. ETL pipelines for batch + real-time data. Simulation framework for budget allocation and performance forecasting. CQRS + event sourcing for campaign workflows.",
    techStack: ["Python", "FastAPI", "React", "PostgreSQL", "ClickHouse", "TimescaleDB", "Redis", "Kafka", "Docker", "Gemini", "Vertex AI", "MLflow", "Airflow", "GraphQL"],
    impact: [
      "6 microservices handling campaign lifecycle end-to-end",
      "Multi-platform: Google Ads, Facebook, LinkedIn, TikTok integrations",
      "Real-time analytics: <5s ingestion latency, <200ms API p95",
      "ML bidding optimizer with anomaly detection and churn prediction",
      "Simulation engine for budget forecasting and scenario analysis",
      "A/B testing framework with automated creative performance ranking"
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
    subtitle: "Autonomous Fleet Intelligence Grid",
    domain: "Fleet Intelligence / IoT",
    status: "ACTIVE",
    threatLevel: "S",
    impactScore: 98,
    summary: "11 AI agents for fleet intelligence: V2V communication, Driver Monitoring System (MediaPipe), predictive maintenance, route optimization, and 7 more. Full IoT dashboard with real-time vehicle tracking (Leaflet maps), sensor monitoring, geofenced zone management, alert system, and fleet analytics (Recharts). WebSocket-powered live data feeds.",
    problem: "Fleet management is reactive, not predictive. No V2V communication, no driver fatigue monitoring, no AI-driven fleet orchestration exists. IoT sensor data goes unanalyzed.",
    architecture: "11 specialized AI agents coordinating via message bus: DMS agent (MediaPipe face/eye tracking), V2V communication agent, route optimization agent, predictive maintenance agent, sensor fusion agent, and 6 more. Next.js IoT dashboard with Leaflet maps for real-time vehicle tracking, zone geofencing, sensor monitoring, and alert management. WebSocket feeds for live telemetry.",
    techStack: ["Python", "FastAPI", "MediaPipe", "YOLOv10", "Next.js", "React", "Leaflet", "Recharts", "WebSocket", "Redis", "PostgreSQL", "Docker", "Framer Motion"],
    impact: [
      "11 AI agents deployed in parallel via message bus",
      "Real-time IoT dashboard with Leaflet maps and vehicle tracking",
      "DMS with MediaPipe face/eye tracking for driver fatigue detection",
      "V2V communication protocol for inter-vehicle coordination",
      "Geofenced zone management with automated alert triggers",
      "Predictive maintenance reducing unplanned downtime"
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
  {
    id: "bodhivedam",
    codename: "BODHI-VEDAM",
    title: "BodhiVedam",
    subtitle: "Knowledge Distillation Engine",
    domain: "AI/ML",
    status: "ACTIVE",
    threatLevel: "S",
    impactScore: 94,
    summary: "Domain-agnostic knowledge distillation platform. Distill GPT-4o, Claude, Llama 70B into deployable student models (Phi-3, Qwen 1.5B, Gemma 2B) — driven entirely by YAML configuration. Full pipeline: teacher generation → data blending → LoRA/QLoRA fine-tuning → model registry → FastAPI serving → export to SafeTensors/GGUF for edge deployment.",
    problem: "Large language models are too expensive and slow for production edge deployment. No generic, config-driven distillation pipeline exists to compress frontier models into deployable ones.",
    architecture: "YAML-driven pipeline: domain config → teacher generation (GPT-4o, Claude, Llama 70B, Mixtral) → data blending (public + generated datasets) → SFT with LoRA/QLoRA (Phi-3, Qwen 1.5B, Gemma 2B, Mistral 7B) → model registry with versioning → FastAPI server with streaming + batching → export to SafeTensors, GGUF (Ollama), ONNX. Curriculum learning with progressive difficulty.",
    techStack: ["Python", "PyTorch", "Transformers", "PEFT", "LoRA", "QLoRA", "FastAPI", "MLflow", "vLLM", "SafeTensors", "GGUF", "Docker"],
    impact: [
      "Multi-teacher distillation: GPT-4o, Claude, Llama 70B → Phi-3, Qwen 1.5B",
      "YAML-driven domain configs — add any domain (education, healthcare, legal)",
      "LoRA/QLoRA for memory-efficient fine-tuning on consumer GPUs",
      "Export to SafeTensors + GGUF for edge/Ollama deployment",
      "Curriculum learning with progressive difficulty scheduling",
      "Model registry with versioning, comparison, and promotion"
    ],
    color: "#f97316",
    icon: "🧬",
    architectureNodes: [
      { id: "config", label: "YAML Config", x: 5, y: 50, type: "input", connections: ["teacher"] },
      { id: "teacher", label: "Teacher Models", x: 22, y: 30, type: "ai", connections: ["blend"] },
      { id: "dataset", label: "Public Datasets", x: 22, y: 70, type: "database", connections: ["blend"] },
      { id: "blend", label: "Data Blender", x: 40, y: 50, type: "process", connections: ["train"] },
      { id: "train", label: "LoRA/QLoRA SFT", x: 58, y: 50, type: "ai", connections: ["registry"] },
      { id: "registry", label: "Model Registry", x: 75, y: 35, type: "database", connections: ["serve", "export"] },
      { id: "serve", label: "FastAPI Server", x: 92, y: 25, type: "output", connections: [] },
      { id: "export", label: "GGUF / ONNX", x: 92, y: 65, type: "output", connections: [] },
    ],
  },
  {
    id: "broai",
    codename: "BRO-AI",
    title: "BroAI",
    subtitle: "Converged Cognitive Architecture",
    domain: "AI Infrastructure",
    status: "ACTIVE",
    threatLevel: "S",
    impactScore: 93,
    summary: "Production-ready AI agent memory system replacing the traditional 3-database approach (files + vector DB + graph DB) with a single PostgreSQL instance. Hybrid search (semantic + BM25 + RRF), PII protection, transactional outbox, zero-hallucination NLP with deterministic intent routing, LangGraph workflow engine, and bilingual template-driven responses (English + Malayalam).",
    problem: "AI agents typically need 3 separate databases (files, vectors, graphs) — creating consistency nightmares, 3× operational cost, and no ACID guarantees across stores.",
    architecture: "Single PostgreSQL with pgvector (semantic search) + Apache AGE (graph relations) + tsvector (full-text). Hybrid search with Reciprocal Rank Fusion. Zero-hallucination intent routing: deterministic rule-based classification for 18 high-risk intents → emergency keyword pre-filtering → RAG fallback with .gov.in sources only → hallucination guardrail (difflib ≥ 0.95). LangGraph state machines for 5 guided workflows. Template-driven response engine with 14 bilingual YAML templates.",
    techStack: ["Python", "PostgreSQL", "pgvector", "Apache AGE", "FastAPI", "LangGraph", "asyncpg", "Redis", "Transformers", "IndicTrans2", "Docker"],
    impact: [
      "60% cost reduction vs traditional 3-database approach",
      "Sub-20ms hybrid search (semantic + BM25 + RRF) on 100K memories",
      "Zero-hallucination NLP: deterministic routing for 18 high-risk intents",
      "Bilingual support: English + Malayalam with IndicTrans2 translation",
      "LangGraph workflows: 5 approved paths, max 7 turns, audit logging",
      "PII protection with synthetic masking + prompt injection defense"
    ],
    color: "#06b6d4",
    icon: "🧠",
    architectureNodes: [
      { id: "input", label: "User Query", x: 8, y: 50, type: "input", connections: ["intent"] },
      { id: "intent", label: "Intent Router", x: 25, y: 30, type: "ai", connections: ["workflow", "rag"] },
      { id: "workflow", label: "LangGraph FSM", x: 45, y: 20, type: "ai", connections: ["template"] },
      { id: "rag", label: "RAG Retriever", x: 45, y: 60, type: "ai", connections: ["template"] },
      { id: "postgres", label: "PostgreSQL + pgvector", x: 45, y: 85, type: "database", connections: ["rag"] },
      { id: "template", label: "Template Engine", x: 68, y: 40, type: "process", connections: ["guard"] },
      { id: "guard", label: "Hallucination Guard", x: 85, y: 40, type: "process", connections: ["output"] },
      { id: "output", label: "Response", x: 95, y: 40, type: "output", connections: [] },
    ],
  },
  {
    id: "lakshyavedam",
    codename: "LAKSHYA-VEDAM",
    title: "LakshyaVedam",
    subtitle: "Biomechanical AI Coach",
    domain: "Sports / HealthTech",
    status: "ACTIVE",
    threatLevel: "A",
    impactScore: 88,
    summary: "AI-powered biomechanical analysis for injury prevention — built for Bihar's elite sports program. Real-time pose estimation (MediaPipe BlazePose), stability scoring via Center-of-Gravity variance, bilingual AI coaching (Hindi/English) via Llama 3.1 8B, and shooting stance analysis. Designed for edge deployment on Raspberry Pi for rural areas.",
    problem: "Sports injuries from poor biomechanics go undetected until damage occurs. No affordable, AI-driven injury prevention exists for rural athletes. Physiotherapy access is limited outside cities.",
    architecture: "MediaPipe BlazePose → COG (Center of Gravity) variance engine → stability scoring (0-100) → risk assessment (Low/Moderate/High) → LLM coach (Llama 3.1 8B via Ollama) generates personalized drills in Hindi/English. Shooting module adds stance analysis for archers. Gradio web UI with Bihar green theme. Plotly + Matplotlib for real-time biomechanical visualization.",
    techStack: ["Python", "MediaPipe", "Gradio", "Ollama", "Llama 3.1", "Plotly", "Matplotlib", "FastAPI"],
    impact: [
      "Real-time biomechanical analysis at 30 FPS, <100ms latency",
      "Stability scoring with injury risk assessment (Low/Moderate/High)",
      "Bilingual AI coaching: Hindi + English with practical drills",
      "Shooting stance analysis for archers (archery-specific module)",
      "CPU-only inference — no GPU required, runs on basic devices",
      "Edge-deployable: designed for Raspberry Pi in rural field use"
    ],
    color: "#10b981",
    icon: "🏹",
    architectureNodes: [
      { id: "camera", label: "Camera Feed", x: 8, y: 50, type: "input", connections: ["pose"] },
      { id: "pose", label: "MediaPipe Pose", x: 28, y: 50, type: "ai", connections: ["cog", "shooting"] },
      { id: "cog", label: "COG Variance", x: 48, y: 30, type: "process", connections: ["score"] },
      { id: "shooting", label: "Stance Analysis", x: 48, y: 70, type: "ai", connections: ["score"] },
      { id: "score", label: "Stability Score", x: 65, y: 50, type: "process", connections: ["coach"] },
      { id: "coach", label: "LLM Coach", x: 82, y: 50, type: "ai", connections: ["ui"] },
      { id: "ui", label: "Gradio UI", x: 95, y: 50, type: "output", connections: [] },
    ],
  },
  {
    id: "pramanvedam",
    codename: "PRAMAN-VEDAM",
    title: "PramanVedam",
    subtitle: "Identity & Access Fortress",
    domain: "Security / Auth",
    status: "DEPLOYED",
    threatLevel: "A",
    impactScore: 86,
    summary: "Multi-tenant authentication & authorization server built on Keycloak with Traefik reverse proxy. Realm-based tenant isolation, SSO, RBAC, user federation, and dynamic tenant provisioning — securing the entire Datavedam ecosystem (ShikshaVedam + VyayVedam + PracharVedam).",
    problem: "Multi-tenant SaaS platforms need centralized auth with realm isolation, SSO, and dynamic tenant provisioning. Most teams build fragile custom auth that breaks at scale.",
    architecture: "Keycloak with realm-based multi-tenancy → Traefik for routing + load balancing + SSL termination → FastAPI management APIs (tenant CRUD, user onboarding) → React/TypeScript admin UI. Docker-based deployment with PostgreSQL 15. Supports single-tenant and multi-tenant modes. 5-minute access tokens, 10-hour refresh tokens.",
    techStack: ["Keycloak", "FastAPI", "React", "TypeScript", "Traefik", "PostgreSQL", "Docker", "OAuth 2.0", "OIDC", "RBAC"],
    impact: [
      "Multi-tenant SSO with Keycloak realm isolation",
      "OAuth 2.0 / OpenID Connect compliant authentication",
      "Traefik-based routing with load balancing and SSL termination",
      "Secures 3+ services in the Datavedam ecosystem",
      "Dynamic tenant provisioning via API (single + multi-tenant modes)",
      "Docker-based deployment with PostgreSQL 15 backend"
    ],
    color: "#8b5cf6",
    icon: "🔐",
    architectureNodes: [
      { id: "client", label: "Client Apps", x: 8, y: 50, type: "input", connections: ["traefik"] },
      { id: "traefik", label: "Traefik Proxy", x: 28, y: 50, type: "process", connections: ["keycloak", "api"] },
      { id: "keycloak", label: "Keycloak Auth", x: 50, y: 30, type: "process", connections: ["postgres"] },
      { id: "api", label: "FastAPI Mgmt", x: 50, y: 70, type: "process", connections: ["postgres"] },
      { id: "postgres", label: "PostgreSQL", x: 70, y: 50, type: "database", connections: ["admin"] },
      { id: "admin", label: "Admin UI", x: 90, y: 50, type: "output", connections: [] },
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
    { name: "PostgreSQL", level: 90, maxLevel: 100, category: "backend", unlocked: true },
    { name: "Redis", level: 85, maxLevel: 100, category: "backend", unlocked: true },
    { name: "ClickHouse", level: 78, maxLevel: 100, category: "backend", unlocked: true },
    { name: "pgvector", level: 88, maxLevel: 100, category: "backend", unlocked: true },
    { name: "Kafka", level: 80, maxLevel: 100, category: "backend", unlocked: true },
    { name: "GraphQL", level: 75, maxLevel: 100, category: "backend", unlocked: true },
  ],
  ai: [
    { name: "LangChain", level: 93, maxLevel: 100, category: "ai", unlocked: true },
    { name: "LangGraph", level: 90, maxLevel: 100, category: "ai", unlocked: true },
    { name: "RAG", level: 91, maxLevel: 100, category: "ai", unlocked: true },
    { name: "YOLOv10", level: 85, maxLevel: 100, category: "ai", unlocked: true },
    { name: "Gemini", level: 88, maxLevel: 100, category: "ai", unlocked: true },
    { name: "MediaPipe", level: 82, maxLevel: 100, category: "ai", unlocked: true },
    { name: "PyTorch", level: 82, maxLevel: 100, category: "ai", unlocked: true },
    { name: "LoRA / QLoRA", level: 84, maxLevel: 100, category: "ai", unlocked: true },
    { name: "Ollama / vLLM", level: 83, maxLevel: 100, category: "ai", unlocked: true },
    { name: "Transformers", level: 86, maxLevel: 100, category: "ai", unlocked: true },
  ],
  devops: [
    { name: "Docker", level: 90, maxLevel: 100, category: "devops", unlocked: true },
    { name: "Kubernetes", level: 78, maxLevel: 100, category: "devops", unlocked: true },
    { name: "CI/CD", level: 85, maxLevel: 100, category: "devops", unlocked: true },
    { name: "Traefik", level: 80, maxLevel: 100, category: "devops", unlocked: true },
    { name: "Keycloak", level: 82, maxLevel: 100, category: "devops", unlocked: true },
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
    title: "BodhiVedam — Knowledge Distillation",
    description: "Built YAML-driven distillation platform: GPT-4o/Claude → Phi-3/Qwen 1.5B via LoRA/QLoRA. Export to GGUF for edge deployment.",
    level: 48,
    type: "milestone",
  },
  {
    year: "",
    title: "BroAI — Cognitive Architecture",
    description: "Shipped converged AI memory system: PostgreSQL + pgvector + Apache AGE replacing 3 databases. Zero-hallucination NLP with bilingual support.",
    level: 46,
    type: "milestone",
  },
  {
    year: "",
    title: "LakshyaVedam — Sports AI Coach",
    description: "Built biomechanical AI coach for Bihar sports program. MediaPipe pose analysis, stability scoring, bilingual coaching.",
    level: 44,
    type: "project",
  },
  {
    year: "",
    title: "PravahVedam — Fleet Intelligence",
    description: "Deployed 11 AI agents: V2V, DMS (MediaPipe), predictive maintenance, route optimization. IoT dashboard with Leaflet maps.",
    level: 42,
    type: "milestone",
  },
  {
    year: "",
    title: "AstraVedam — Defense Systems",
    description: "YOLOv10 drone detection with geofencing, 97%+ accuracy. Sub-100ms inference, edge-deployable.",
    level: 40,
    type: "milestone",
  },
  {
    year: "",
    title: "PramanVedam — Auth & Security",
    description: "Multi-tenant Keycloak auth with Traefik proxy, SSO, RBAC. Secures the entire Datavedam ecosystem.",
    level: 38,
    type: "project",
  },
  {
    year: "",
    title: "PracharVedam Deployed",
    description: "Shipped 6-microservice ad platform: Kafka streams, ClickHouse analytics, ML bidding optimizer, multi-platform ad integrations.",
    level: 36,
    type: "project",
  },
  {
    year: "",
    title: "ShikshaVedam Initiated",
    description: "AI-first ERP with Virtual Principal orchestrating 5 agents. OCR grading, RAG over CBSE docs, 3-level decision governance.",
    level: 30,
    type: "project",
  },
  {
    year: "",
    title: "Vebot Launched",
    description: "Deployed multi-platform conversational AI across WhatsApp, Telegram, and Discord with contextual memory.",
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
  RANK            Architect Prime [LVL 48]
  LOCATION        Bangalore, India
  ARCHITECTURE    AI Systems · Multi-Agent · Full-Stack

──────────── PRODUCTION FOOTPRINT ─────────────

  SYSTEMS SHIPPED        9 production-grade AI products
  AI AGENTS DEPLOYED     16 autonomous agents
  MICROSERVICES LIVE     9 independent services
  DOMAINS COVERED        EdTech · AdTech · Fleet Intel
                         Defense · HealthTech · Auth
                         AI/ML · Conversational AI

──────────── IMPACT METRICS ───────────────────

  ETL THROUGHPUT         1,000,000+ rows processed
  PERF OPTIMIZATION      35% improvement
  HYBRID SEARCH          <20ms on 100K memories
  DISTILLATION           GPT-4o → Phi-3 (edge-ready)
  THREAT DETECTION       97%+ precision (YOLOv10)

──────────── CORE STACK ───────────────────────

  BACKEND      Python · FastAPI · PostgreSQL · Redis
  AI/ML        LangGraph · RAG · LoRA · PyTorch
  SEARCH       pgvector · Apache AGE · ClickHouse
  VISION       YOLOv10 · MediaPipe · OpenCV
  INFERENCE    Gemini · Ollama · vLLM · Transformers
  FRONTEND     React · Next.js · TypeScript · Tailwind
  INFRA        Docker · K8s · Kafka · Traefik · Keycloak
  PROCESS      Scrum Master · Jira · Confluence

──────────── SYSTEM STATUS ────────────────────

  PRODUCTION SYSTEMS     ● ONLINE
  AI AGENT NETWORK       ● ACTIVE [16/16]
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
  XP:              12,500
  Level:           48
  Rank:            Architect Prime
  Systems Online:  9
  Agents Deployed: 16
  Microservices:   9
  ETL Rows:        1,000,000+
  Threat Accuracy: 97%+
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,

  "missions": `> MISSION REGISTRY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  [S] SHIKSHA-VEDAM  │ AI-First School ERP         │ ACTIVE
  [S] PRACHAR-VEDAM  │ Ad Analytics Platform       │ DEPLOYED
  [S] PRAVAH-VEDAM   │ Fleet Intelligence Grid     │ ACTIVE
  [S] ASTRA-VEDAM    │ Defensive Vision Engine     │ CLASSIFIED
  [A] VE-BOT         │ Conv. Intelligence Layer    │ DEPLOYED
  [S] BODHI-VEDAM    │ Knowledge Distillation      │ ACTIVE
  [S] BRO-AI         │ Cognitive Architecture      │ ACTIVE
  [A] LAKSHYA-VEDAM  │ Biomechanical AI Coach      │ ACTIVE
  [A] PRAMAN-VEDAM   │ Identity & Access Fortress  │ DEPLOYED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Type 'load <codename>' to open briefing`,

  "list missions": `> MISSION REGISTRY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  [S] SHIKSHA-VEDAM  │ AI-First School ERP         │ ACTIVE
  [S] PRACHAR-VEDAM  │ Ad Analytics Platform       │ DEPLOYED
  [S] PRAVAH-VEDAM   │ Fleet Intelligence Grid     │ ACTIVE
  [S] ASTRA-VEDAM    │ Defensive Vision Engine     │ CLASSIFIED
  [A] VE-BOT         │ Conv. Intelligence Layer    │ DEPLOYED
  [S] BODHI-VEDAM    │ Knowledge Distillation      │ ACTIVE
  [S] BRO-AI         │ Cognitive Architecture      │ ACTIVE
  [A] LAKSHYA-VEDAM  │ Biomechanical AI Coach      │ ACTIVE
  [A] PRAMAN-VEDAM   │ Identity & Access Fortress  │ DEPLOYED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,

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
  AI Agents:    16 ACTIVE
  Services:     9 DEPLOYED
  Systems:      9 OPERATIONAL
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
  Total XP:     12,500
  Level:        48 / 50
  Rank:         Architect Prime
  Next Rank:    System Overlord (15,000 XP)
  Progress:     ████████████████████░░ 96%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,

  "timeline": `> CAREER PROGRESSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  BodhiVedam — Knowledge Distill.   LVL 48
  BroAI — Cognitive Architecture    LVL 46
  LakshyaVedam — Sports AI Coach    LVL 44
  PravahVedam — Fleet Intel         LVL 42
  AstraVedam — Defense              LVL 40
  PramanVedam — Auth & Security     LVL 38
  PracharVedam Deployed             LVL 36
  ShikshaVedam Initiated            LVL 30
  Vebot Launched                    LVL 22
  Internship @ Nineleaps            LVL 15
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,

  "contact": `> SECURE CHANNEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Email:    singhalkushagra03@gmail.com
  Phone:    +91 8955531225
  WhatsApp: wa.me/918955531225
  GitHub:   github.com/kushagra67
  LinkedIn: linkedin.com/in/kushagra-singhal20
  Resume:
    → AI Engineer       /AI_engineer.pdf
    → Backend Engineer  /Backend_engineer.pdf
    → DevOps Engineer   /Devops_engineer.pdf
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
};
