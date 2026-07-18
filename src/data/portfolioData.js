/*
  Portfolio data – all content in one place for easy editing.
  Replace placeholder values with your real information.
*/

export const personalInfo = {
  name: "Sushant Kumar",
  roles: [
    "Data Scientist",
    "DevOps Engineer",
    "Agentic AI Developer",
    "Full Stack Developer",
    "AI/ML Engineer",
  ],
  tagline: "I don’t chase success—I pursue excellence, and through it, I create intelligent solutions that make a difference. Second by second, chasing time with purpose, discipline, and the will to become better every day....",
  email: "sushant14300@gmail.com",
  phone: "+91 6207851006",
  location: "India",
  resumeLink: "https://drive.google.com/file/d/1icajMoq5yrYVwERyCGRbgvoQut-cigzD/view?usp=sharing",
  socialLinks: {
    github: "https://github.com/sushantkumar143",
    linkedin: "https://www.linkedin.com/in/sushant-kumar-97978b28b/",
    twitter: "https://twitter.com/sushant_kumar",
    leetcode: "https://leetcode.com/u/sx_sushant/",
    kaggle: "https://kaggle.com/sushant-kumar",
  },
};

export const aboutMe = {
  bio: `I'm a passionate Computer Science Engineering student with a deep interest in Data Science, Agentic AI, and Full Stack Development. I love building end-to-end solutions that leverage machine learning, modern web technologies, and cloud infrastructure. My journey spans from crafting intelligent AI agents to deploying scalable web applications and automating DevOps pipelines.`,
  highlights: [
    "CSE Undergraduate with a focus on AI/ML",
    "Experienced in building AI agents & RAG systems",
    "Full Stack Developer (React, Node, Python, FastAPI)",
    "DevOps practitioner (Docker, Kubernetes, CI/CD)",
    "Passionate about data-driven decision making",
  ],
};

export const education = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Lovely Professional University",
    year: "2023 – Present",
    grade: "CGPA: 9.09/10",
    logo: "🎓",
  },
  {
    degree: "Senior Secondary (XII) – CBSE",
    institution: "Atomic Energy Central School No. 4, Rawatbhata",
    year: "2022 – 2023",
    grade: "Percentage: 81.4%",
    logo: "🏫",
  },
  {
    degree: "Secondary (X) – CBSE",
    institution: "Atomic Energy Central School No. 2, Rawatbhata",
    year: "2020 – 2021",
    grade: "Percentage: 89.6%",
    logo: "📚",
  },
];

export const skillCategories = [
  {
    name: "Data Science & ML",
    icon: "🧠",
    skills: [
      { name: "Python", level: 92, icon: "/models/icons/numpy.png" }, // No native python icon available, using numpy approximation
      { name: "Matplotlib", level: 85, icon: "/models/icons/tensorflow.png" },
      { name: "OpenCV", level: 72, icon: "/models/icons/tensorflow.png" }, // Fallback to TF
      { name: "Scikit-Learn", level: 88, icon: "/models/icons/Prompt.png" }, // Approximate fallback
      { name: "Pandas / NumPy", level: 90, icon: "/models/icons/numpy.png" },
      { name: "NLP / LLMs", level: 82, icon: "/models/icons/bedrock.png" }, // Using bedrock as an LLM representation
    ],
  },
  {
    name: "Agentic AI",
    icon: "🤖",
    skills: [
      { name: "LangChain / LlamaIndex", level: 85, icon: "/models/icons/Agent.png" },
      { name: "RAG Pipelines", level: 96, icon: "/models/icons/rag.png" },
      { name: "Agent Frameworks", level: 78, icon: "/models/icons/spatiate.glb" }, // spatial/agent correlation
      { name: "Prompt Engineering", level: 88, icon: "/models/icons/Prompt.png" },
      { name: "Vector Databases", level: 75, icon: "/models/icons/sql.png" }, // DB fallback
      { name: "OpenAI / Gemini API", level: 85, icon: "/models/icons/meta_quest_logo.glb" }, // Meta tech fallback
    ],
  },
  {
    name: "Full Stack Development",
    icon: "💻",
    skills: [
      { name: "React.js", level: 90, icon: "/models/icons/react_logo.glb" },
      // { name: "Next.js", level: 82, icon: "/models/icons/NextJs.png" },
      // { name: "Node.js / Express", level: 85, icon: "/models/icons/javascript_1.glb" },
      { name: "FastAPI", level: 80, icon: "/models/icons/django.png" },
      { name: "PostgreSQL", level: 78, icon: "/models/icons/sql.png" },
      { name: "TypeScript", level: 75, icon: "/models/icons/javascript_1.glb" }, // JS model fallback for TS
    ],
  },
  {
    name: "DevOps & Cloud",
    icon: "☁️",
    skills: [
      { name: "Docker", level: 95, icon: "/models/icons/moby_dock_docker_whale.glb" },
      { name: "Kubernetes", level: 72, icon: "/models/icons/kubernetes_1_cluster.glb" },
      { name: "CI/CD (GitHub Actions)", level: 80, icon: "/models/icons/github.glb" },
      { name: "AWS / GCP", level: 75, icon: "/models/icons/aws_logo.glb" },
      { name: "Linux / Bash", level: 88, icon: "/models/icons/linux-char.glb" },
      { name: "Jenkins", level: 68, icon: "/models/icons/terraform.png" },
    ],
  },
  {
    name: "Data Analytics",
    icon: "📊",
    skills: [
      { name: "SQL", level: 90, icon: "/models/icons/sql.png" },
      { name: "Power BI", level: 82, icon: "/models/icons/PowerBi.glb" },
      { name: "Microsoft Excel", level: 85, icon: "/models/icons/Excel.glb" },
      { name: "Apache Hadoop", level: 70, icon: "/models/icons/download-removebg-preview.png" }, // Generic data fallback
      { name: "Data Visualization", level: 88, icon: "/models/icons/download-removebg-preview (1).png" }, // Data visualization fallback
      { name: "Statistical Analysis", level: 78, icon: "/models/icons/Agent.png" }, // Analysis fallback
    ],
  },

];


export const projects = [
  {
    title: "RAONE: Retrieval Augmented AI Orchestration SaaS Platform",
    description:
      "A production-grade, multi-tenant AI Copilot SaaS platform enabling organizations to build context-aware, secure, and private AI assistants. Features a complete RAG pipeline with hybrid retrieval (FAISS & BM25 with re-ranking), achieving 98% faithfulness and 94.8% answer relevancy. Incorporates a resilient multi-LLM fallback architecture (including local Ollama) for zero downtime, third-party API integration with a pay-as-per-use model, and a real-time voice-based AI assistant. Architected for scalability with asynchronous processing, MVCC, and automated CI/CD deployment on AWS.",
    deepDescription: [
      {
        title: "🎯 The Problem — Why This Project Exists",
        text: "Organizations and developers today face critical limitations when using public AI assistants like ChatGPT, Gemini, or Grok for business-critical operations. RAONE was built to solve these real-world pain points head-on.",
        items: [
          { label: "No Private Knowledge Base", text: "Public LLMs have zero awareness of company-specific data. An HR manager querying 'What is the leave policy of ABC Corp?' gets generic answers or hallucinated responses — not actual internal policies." },
          { label: "Hallucination & Incorrect Results", text: "LLMs frequently produce confident but fabricated answers. In enterprise settings — legal, medical, financial — a single hallucinated response can have serious consequences." },
          { label: "Context Window Overflow", text: "Uploading large files (2–5 GB) to any LLM hits a hard 'Context window limit exceeded' error. Every LLM has a fixed token limit, making it impossible to process entire knowledge bases in a single prompt." },
          { label: "Token Explosion & Rising Costs", text: "Full-stack developers integrating AI into their apps send the entire conversation history with every request, causing token usage and latency to grow linearly — inflating API costs by 3–5× over time." },
          { label: "Single Point of Failure", text: "Applications relying on a single LLM provider (e.g., only OpenAI) face complete downtime when that provider has outages, rate limits, or API changes — leaving users stranded." },
          { label: "Irrelevant Retrieval & Noise", text: "Basic RAG systems often retrieve loosely related chunks, producing verbose and inaccurate answers. Without reranking and hybrid search, retrieval precision drops below 70%." },
        ],
      },
      {
        title: "✅ How RAONE Solves These Problems",
        items: [
          { label: "Private Knowledge Base → Namespace-Isolated RAG", text: "Each company gets its own FAISS vector index. Documents are chunked, embedded, and stored in tenant-scoped namespaces — ensuring zero cross-tenant data leakage and context-aware answers from your actual data." },
          { label: "Hallucination → Anti-Hallucination Architecture", text: "The AnswerAgent enforces strict citation rules: 'Extract SPECIFIC facts from context, not general ideas.' If context is insufficient, it responds with 'Insufficient information in the knowledge base' instead of fabricating an answer." },
          { label: "Context Overflow → Semantic Chunking + Targeted Retrieval", text: "Instead of sending entire documents to the LLM, RAONE chunks them into 300-token segments, embeds them into 384-dimensional vectors, and retrieves only the top-5 most relevant chunks — reducing context by 80% and eliminating token overflow entirely." },
          { label: "Token Explosion → Intelligent Routing + Scratchpad", text: "The PlanningAgent uses a lightweight 8B model for fast classification, while only the final synthesis step uses the expensive 70B model. The ephemeral scratchpad replaces redundant conversation forwarding, cutting token costs by 20–30%." },
          { label: "Single Provider Failure → Multi-LLM Fallback Chain", text: "Groq → OpenRouter → HuggingFace → local Ollama. If the primary LLM fails, RAONE automatically cascades to the next provider. The local Ollama fallback ensures the system stays online even if all cloud providers are down — true 24×365 availability." },
          { label: "Noisy Retrieval → 3-Stage Hybrid Pipeline", text: "Dense FAISS captures semantic meaning, Sparse BM25 catches exact keywords, and Cross-Encoder reranking rescores candidates jointly — achieving 98% faithfulness and 94.8% answer relevancy where basic RAG systems score below 70%." },
        ],
      },
      {
        title: "🚀 Key Features",
        items: [
          { label: "Multi-Tenant Architecture", text: "Securely isolated data and chat history per company/user with namespace-scoped FAISS indexes." },
          { label: "5-Agent Agentic Pipeline", text: "Memory → Planning → Routing → Retrieval → Answer agents with an ephemeral scratchpad, self-correction loops, and reflective synthesis." },
          { label: "Advanced 3-Stage RAG", text: "Hybrid retrieval using Dense FAISS + Sparse BM25 + Cross-Encoder Reranking achieving 98% faithfulness and 94.8% answer relevancy." },
          { label: "LLM Fallback Chain", text: "Cascading failover across Groq → OpenRouter → HuggingFace → local Ollama guaranteeing 100% uptime." },
          { label: "Task-Specific Model Routing", text: "Different LLM models auto-selected per task — DeepSeek-R1 (70B) for reasoning, Llama 3.1 (8B) for fast classification, Llama 3.3 (70B) for synthesis." },
          { label: "Real-Time Voice AI", text: "Talk to RAONE like a human in any language similar to Gemini Live — voice-driven automation." },
          { label: "Embeddable Widget", text: "Drop-in JavaScript chatbot widget for external websites with third-party API key integration and pay-as-per-use model." },
        ],
      },
      {
        title: "🧠 Multi-Agent Orchestration",
        text: "RAONE uses a 5-agent agentic pipeline where each agent is a specialist with a single responsibility, coordinating through a shared ephemeral scratchpad (MemoryAgent).",
        agents: [
          { name: "MemoryAgent", role: "Ephemeral scratchpad — stores step-by-step reasoning, observations, and intermediate data. No LLM calls.", model: "N/A" },
          { name: "PlanningAgent", role: "Analyzes query intent, generates a JSON execution plan with route and multi-step strategy. Enforces business/personal security constraints.", model: "DeepSeek-R1 (70B)" },
          { name: "RouterAgent", role: "Classifies query intent into rag, web, or direct using LLM classification.", model: "Llama 3.1 (8B)" },
          { name: "RetrievalAgent", role: "Executes RAG pipeline (embed → FAISS → BM25 → rerank) or DuckDuckGo web search with query optimization.", model: "Llama 3.1 (8B)" },
          { name: "AnswerAgent", role: "Reflects on the full scratchpad trace, injects retrieved context, and generates the final anti-hallucination response with citations.", model: "Llama 3.3 (70B)" },
        ],
      },
      {
        title: "📚 RAG Pipeline — 3-Stage Retrieval",
        stages: [
          { name: "Stage 0: Ingestion", detail: "Raw Document → Clean → Semantic Chunk (300 tokens/chunk, 50 overlap) → Embed (all-MiniLM-L6-v2, 384-dim) → FAISS Index." },
          { name: "Stage 1: Hybrid Retrieval", detail: "Dense Vector Search (FAISS IndexFlatIP) + Sparse Keyword Search (BM25) merged via Reciprocal Rank Fusion (RRF)." },
          { name: "Stage 2: Cross-Encoder Reranking", detail: "Top candidates rescored using cross-encoder/ms-marco-MiniLM-L-6-v2 — 10-50× more precise than bi-encoders." },
          { name: "Stage 3: Context-Augmented Generation", detail: "Top-5 reranked chunks formatted as numbered sources and injected into the AnswerAgent's system prompt." },
        ],
      },
      {
        title: "⚡ Performance Benchmarks",
        metrics: [
          { metric: "Faithfulness (Groundedness)", value: "98%", detail: "Ratio of answer statements derivable from retrieved context" },
          { metric: "Answer Relevancy", value: "94.8%", detail: "Cosine similarity between generated response and original query" },
          { metric: "Total Retrieval Latency", value: "120–370ms", detail: "Embedding + FAISS + BM25 + RRF + Reranking combined" },
          { metric: "End-to-End Response (RAG)", value: "3–7s", detail: "2 LLM calls: Planning (2-4s) + Synthesis (1-3s)" },
          { metric: "Embedding Model", value: "all-MiniLM-L6-v2", detail: "384-dim vectors, ~500-1000 chunks/sec on CPU" },
        ],
      },
      {
        title: "🏗️ Deployment & DevOps",
        items: [
          { label: "Docker", text: "Fully containerized multi-service architecture with docker-compose orchestration." },
          { label: "Jenkins CI/CD", text: "Automated build, test, and deploy pipeline with Git version control and automatic rollback." },
          { label: "AWS", text: "Cloud infrastructure for hosting, scaling, and resource management. Always available 24×365." },
          { label: "Security", text: "JWT authentication (HS256), SHA-256 hashed API keys, Argon2 password hashing, configurable CORS, and tenant-isolated FAISS indexes." },
        ],
      },
      {
        title: "🧪 Evaluation Framework",
        items: [
          { label: "Tier 1 — E2E RAG Diagnostic", text: "Full pipeline test from document ingestion through vector indexing, retrieval, agentic orchestration, and final LLM synthesis." },
          { label: "Tier 2 — Isolated Agent Suite", text: "9 automated assertion checks testing each of the 5 agents in complete isolation — route accuracy, security enforcement, query optimization, factual extraction." },
          { label: "Tier 3 — Ragas RAG Triad", text: "Mathematical verification using Ragas framework with LLM-as-a-judge scoring across Faithfulness, Answer Relevance, and Context Recall." },
        ],
      },
    ],
    tech: ["React", "FastAPI", "PostgreSQL", "Redis", "FAISS", "Docker", "Jenkins", "AWS", "RAG", "Agentic AI", "LLMs"],
    categories: ["AI", "Machine Learning", "Data Science", "Web Development", "DevOps", "IT"], // Included in multiple categories so it shows up everywhere
    image: "Assets/raone_dashboard.png",
    github: "https://github.com/sushantkumar143/RAONE-Intelligent-Chatbot-SaaS-Platform",
    live: "https://raone-intelligent-chatbot-saa-s-pla.vercel.app/",
    date: "Apr 2026 – Aug 2026",
  },
  {
    title: "VisionTraffic: Smart Vehicle Traffic Monitoring System",
    description:
      "An AI-powered real-time traffic intelligence system that performs vehicle detection, classification, speed tracking, anomaly detection, and license plate recognition from live video streams. Built using advanced computer vision techniques and predictive analytics to improve traffic monitoring and management.",
    deepDescription: [
      {
        title: "🎯 The Problem — Why This Project Exists",
        text: "Traditional traffic monitoring relies on manual observation, static sensors, and outdated counting mechanisms — failing to keep pace with the scale and complexity of modern urban roads.",
        items: [
          { label: "Manual Traffic Counting", text: "Human operators monitoring CCTV feeds are slow, error-prone, and cannot process 24/7 footage — leading to inaccurate traffic volume data and poor infrastructure planning." },
          { label: "No Real-Time Speed Detection", text: "Conventional speed cameras are fixed-point, expensive to deploy, and cannot track vehicles continuously across a video feed — missing speeding patterns and road safety insights." },
          { label: "Undetected Anomalies", text: "Wrong-way driving, illegal lane changes, and stopped vehicles on highways go unnoticed until accidents occur — reactive instead of proactive safety management." },
          { label: "No Automated License Plate Recognition", text: "Manual plate identification from footage is infeasible at scale. Toll collection, parking enforcement, and stolen vehicle tracking all require automated, high-accuracy OCR." },
          { label: "Lack of Predictive Analytics", text: "Without historical traffic pattern analysis and forecasting, city planners make infrastructure decisions based on guesswork rather than data-driven projections." },
        ],
      },
      {
        title: "✅ How VisionTraffic Solves These Problems",
        items: [
          { label: "Manual Counting → YOLOv8 Real-Time Detection", text: "Trained a custom YOLOv8 model on 184 images with 1,980 instances across 7 vehicle classes. Achieves 83.4% mAP50 with real-time inference at 81.5ms per frame — fully automated 24/7 monitoring." },
          { label: "Static Speed Cameras → Pixel-Based Speed Estimation", text: "Tracks vehicles across consecutive frames using centroid tracking, calculates pixel displacement, and converts to real-world speed using camera calibration — continuous speed monitoring across the entire field of view." },
          { label: "Undetected Anomalies → Rule-Based Anomaly Detection", text: "Monitors vehicle trajectories for wrong-way movement, sudden stops, and unusual speed patterns. Flags anomalies in real-time with timestamp and location for immediate response." },
          { label: "Manual Plate ID → Automated OCR Pipeline", text: "Detects license plate regions within vehicle bounding boxes, applies image preprocessing (grayscale, thresholding, deskewing), and extracts text using OCR — enabling automated toll, parking, and law enforcement systems." },
          { label: "Guesswork Planning → Predictive Traffic Analytics", text: "Aggregates historical vehicle counts, speed distributions, and class breakdowns into MySQL. Generates hourly/daily trend reports with Excel visualizations for data-driven infrastructure planning." },
        ],
      },
      {
        title: "🚀 Key Features & Architecture",
        items: [
          { label: "7-Class Vehicle Classification", text: "Detects and classifies Cars, Trucks, Buses, Motorcycles, Bicycles, Auto-rickshaws, and Emergency Vehicles with per-class precision tracking." },
          { label: "Real-Time Video Processing", text: "Processes live video streams frame-by-frame with YOLOv8 inference at 0.5ms preprocess + 81.5ms inference + 2.2ms postprocess per image on Tesla T4 GPU." },
          { label: "Multi-Object Tracking", text: "Assigns persistent IDs to vehicles across frames using centroid-based tracking, enabling speed calculation and trajectory analysis." },
          { label: "Structured Data Storage", text: "All detections, speeds, and anomalies are logged to MySQL database with timestamps for historical querying and trend analysis." },
          { label: "Excel Report Generation", text: "Automated report generation with traffic volume charts, speed distributions, and peak-hour analysis for stakeholder presentations." },
        ],
      },
      {
        title: "⚡ Model Training & Performance",
        metrics: [
          { metric: "mAP50 (Overall)", value: "83.4%", detail: "Mean Average Precision at IoU 0.50 across all 7 vehicle classes" },
          { metric: "mAP50-95", value: "58.9%", detail: "Strict metric averaging across IoU thresholds 0.50–0.95" },
          { metric: "Precision (Box P)", value: "81.5%", detail: "Ratio of correct detections to total detections" },
          { metric: "Recall (R)", value: "78.6%", detail: "Ratio of detected objects to total ground truth objects" },
          { metric: "Training Time", value: "3.34 hrs", detail: "120 epochs on Tesla T4 GPU with EarlyStopping at epoch 95" },
          { metric: "Model Size", value: "68.1M params", detail: "112 layers, 257.4 GFLOPs — optimized for real-time inference" },
        ],
      },
    ],
    tech: ["Python", "Computer Vision", "YOLOv8", "OCR", "Predictive Analytics", "MySQL", "Excel"],
    categories: ["AI", "Machine Learning", "Computer Vision", "Data Science"],
    image: "Assets/Veh.gif",
    github: "https://github.com/sushantkumar143/VisionTraffic-Smart-Vehicle-Traffic-Monitoring-System",
    live: "https://www.linkedin.com/posts/sushant-kumar-97978b28b_predictiveanalytics-computervision-yolov8-activity-7406366016596996097-gvWa?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEZqm60BHwOIyyPRuyUiQke89iWADIG-GaY",
    date: "Apr 2025 – May 2025",
  },

  {
    title: "Multi-Disease Prediction System",
    description:
      "A machine learning-based healthcare application that predicts multiple diseases including Diabetes, Heart Disease, and Parkinson’s based on patient health parameters. Developed an interactive web interface using Streamlit for real-time health predictions and data visualization.",
    deepDescription: [
      {
        title: "🎯 The Problem — Why This Project Exists",
        text: "Early disease detection remains one of healthcare's biggest challenges. Patients often discover conditions like diabetes or heart disease only after symptoms become severe — when treatment is expensive and outcomes are worse.",
        items: [
          { label: "Late Diagnosis", text: "Most people don't get regular health screenings. By the time symptoms appear, diseases like diabetes and heart disease are already at advanced stages — reducing survival rates and increasing treatment costs." },
          { label: "Fragmented Prediction Tools", text: "Existing health tools focus on a single disease. A patient has to visit multiple platforms or specialists to assess risk for different conditions — no unified screening solution exists." },
          { label: "Inaccessible to Non-Medical Users", text: "Clinical prediction models are trapped in research papers and require domain expertise to interpret. There's no user-friendly interface for everyday people to assess their health risk." },
        ],
      },
      {
        title: "✅ How This Project Solves It",
        items: [
          { label: "Late Diagnosis → Proactive Risk Assessment", text: "Users input basic health parameters (glucose levels, BMI, blood pressure, etc.) and get instant predictions — enabling early intervention before symptoms appear." },
          { label: "Fragmented Tools → Unified Multi-Disease Platform", text: "A single application predicts Diabetes, Heart Disease, and Parkinson's from one interface — eliminating the need for multiple tools or specialist visits." },
          { label: "Inaccessible Models → Streamlit Web Interface", text: "Trained ML models are deployed behind a clean Streamlit UI with input forms, real-time predictions, and visual explanations — making clinical-grade predictions accessible to anyone." },
        ],
      },
      {
        title: "🧠 ML Pipeline & Architecture",
        stages: [
          { name: "Data Collection", detail: "Curated datasets for each disease — Pima Indians Diabetes (768 samples), Cleveland Heart Disease (303 samples), and Oxford Parkinson's (195 samples)." },
          { name: "Feature Engineering", detail: "Handled missing values, normalized features using StandardScaler, and performed correlation analysis to identify the most predictive health parameters." },
          { name: "Model Training", detail: "Trained multiple classifiers (SVM, Random Forest, Logistic Regression) and selected the best performer per disease using cross-validated accuracy and F1-score." },
          { name: "Deployment", detail: "Serialized models with Pickle and deployed via Streamlit with input validation, real-time inference, and visual result cards." },
        ],
      },
    ],
    tech: ["Python", "Streamlit", "Pandas", "NumPy", "Machine Learning", "Data Visualization"],
    categories: ["AI", "Machine Learning", "Healthcare", "Data Science"],
    image: "Assets/Multi_disease_prediction_model.png",
    github: "https://github.com/sushantkumar143/Multi-Disease-prediction-Model",
    live: "https://www.linkedin.com/posts/sushant-kumar-97978b28b_aiforhealth-machinelearning-healthcareinnovation-activity-7316768900375891968-oKW7?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEZqm60BHwOIyyPRuyUiQke89iWADIG-GaY",
    date: "Apr 2025 – May 2025",
  },

  {
    title: "AI Integrated Multi-Platform Task Management & Automation Platform",
    description:
      "An intelligent automation platform integrating Gmail, Google Calendar, and WhatsApp APIs for smart task, meeting, and email management. Features speech recognition, face recognition authentication, NLP-based commands, and AI-powered reminders to automate daily workflows.",
    deepDescription: [
      {
        title: "🎯 The Problem — Why This Project Exists",
        text: "Professionals juggle multiple platforms daily — Gmail for emails, Calendar for meetings, WhatsApp for messages — constantly context-switching between apps, leading to missed tasks and wasted time.",
        items: [
          { label: "Platform Fragmentation", text: "Tasks, meetings, and communications are scattered across Gmail, Google Calendar, and WhatsApp. Managing them manually requires constant app-switching and mental overhead." },
          { label: "No Hands-Free Operation", text: "Existing tools require manual typing and clicking. For busy professionals, there's no voice-driven way to send emails, schedule meetings, or set reminders while multitasking." },
          { label: "Weak Authentication", text: "Password-only authentication is vulnerable to credential theft. There's no biometric layer to prevent unauthorized access to a personal productivity tool." },
        ],
      },
      {
        title: "✅ How This Platform Solves It",
        items: [
          { label: "Fragmentation → Unified Command Center", text: "A single Tkinter dashboard integrates Gmail API, Google Calendar API, and WhatsApp automation — manage emails, meetings, and messages from one interface." },
          { label: "Manual Input → Voice-Driven Automation", text: "Speech recognition engine converts voice commands into actions: 'Send email to John about the meeting' → auto-composes and sends via Gmail API. NLP parses intent and entities." },
          { label: "Weak Auth → Face Recognition Login", text: "OpenCV-based face recognition authenticates users at login — no passwords. Only registered faces can access the platform, adding a biometric security layer." },
        ],
      },
      {
        title: "🚀 Key Features",
        items: [
          { label: "Gmail Integration", text: "Read, compose, and send emails programmatically via Gmail API with NLP-parsed voice commands." },
          { label: "Calendar Management", text: "Create, update, and list Google Calendar events with AI-powered scheduling suggestions and conflict detection." },
          { label: "WhatsApp Automation", text: "Send automated WhatsApp messages and reminders using web scraping and browser automation." },
          { label: "NLP Command Processing", text: "Natural language processing extracts intent (send/schedule/remind) and entities (recipient/time/subject) from voice or text input." },
          { label: "Smart Reminders", text: "AI-powered reminder system that learns from user patterns and sends timely notifications across platforms." },
        ],
      },
    ],
    tech: ["Python", "Machine Learning", "APIs", "Speech Recognition", "Face Recognition", "NLP", "Automation", "Tkinter", "Web Scraping"],
    categories: ["AI", "Automation", "Machine Learning"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    github: "https://github.com/sushantkumar143/AI-Integrated-Multi-Platform-Task-Management-and-Automation-Platform",
    live: "#",
    date: "Feb 2025 – Jul 2025",
  },

  {
    title: "Telecom Customer Churn Prediction Dashboard",
    description:
      "Developed a Power BI analytics dashboard to analyze telecom customer churn patterns using real-world datasets. The project includes customer segmentation, churn prediction insights, KPI dashboards, and interactive visualizations to support business decision-making.",
    deepDescription: [
      {
        title: "🎯 The Problem — Why This Project Exists",
        text: "Telecom companies lose millions in revenue annually due to customer churn. Identifying at-risk customers before they leave is critical for retention, but raw data alone doesn't reveal actionable patterns.",
        items: [
          { label: "High Churn Rates", text: "The telecom industry averages 15–25% annual churn. Acquiring a new customer costs 5–7× more than retaining an existing one — making churn prevention a top business priority." },
          { label: "Data Without Insights", text: "Companies collect massive customer datasets (demographics, usage, billing) but lack the analytical tools to extract patterns — data sits unused in spreadsheets." },
          { label: "Reactive Retention", text: "Most companies only react after a customer has already left. Without predictive indicators, retention teams can't proactively target at-risk customers with offers or outreach." },
        ],
      },
      {
        title: "✅ How This Dashboard Solves It",
        items: [
          { label: "High Churn → Segmented Risk Analysis", text: "Segments customers by contract type, tenure, payment method, and service usage to identify which groups have the highest churn probability — enabling targeted retention campaigns." },
          { label: "Raw Data → Interactive KPI Dashboard", text: "Transforms raw CSV data into dynamic Power BI visualizations with drill-down filters, trend lines, and KPI cards — making patterns instantly visible to stakeholders." },
          { label: "Reactive → Proactive Retention", text: "Highlights leading churn indicators (month-to-month contracts, high monthly charges, no tech support) so retention teams can intervene before the customer decides to leave." },
        ],
      },
      {
        title: "📊 Dashboard Components",
        items: [
          { label: "Churn Overview KPIs", text: "Total customers, churn rate, average tenure, monthly revenue — all at a glance with real-time filtering." },
          { label: "Customer Segmentation", text: "Breakdown by gender, senior citizen status, partner/dependents, contract type, and payment method with churn correlation." },
          { label: "Service Usage Analysis", text: "Internet service type, streaming subscriptions, tech support adoption — mapped against churn probability." },
          { label: "Revenue Impact Visualization", text: "Monthly and total charges distribution for churned vs. retained customers — quantifying the financial impact of churn." },
        ],
      },
    ],
    tech: ["Power BI", "Data Analytics", "Data Visualization", "Excel", "Business Intelligence"],
    categories: ["Data Science", "Analytics"],
    image: "Assets/telecom.gif",
    github: "https://github.com/sushantkumar143/Telecom-Customer-Churn-Prediction",
    live: "",
    date: "Jan 2025 – Feb 2025",
  },

  {
    title: "IBM Attrition Analysis Dashboard",
    description:
      "Built an HR analytics dashboard using Microsoft Excel to analyze employee attrition patterns in IBM datasets. Implemented data cleaning, pivot tables, KPIs, and dynamic charts to uncover workforce insights and attrition trends.",
    deepDescription: [
      {
        title: "🎯 The Problem — Why This Project Exists",
        text: "Employee attrition costs companies 50–200% of an employee's annual salary per departure. HR teams need data-driven insights to understand why employees leave and how to retain top talent.",
        items: [
          { label: "Silent Attrition Patterns", text: "Attrition doesn't happen randomly — it correlates with department, job satisfaction, overtime, and compensation. But without analysis, these patterns remain invisible to HR leadership." },
          { label: "No Accessible Analytics Tool", text: "Not every HR team has access to Power BI or Tableau licenses. Excel remains the most universally available tool — but few know how to build analytical dashboards with it." },
          { label: "Gut-Feel Decisions", text: "Without data, retention strategies are based on intuition rather than evidence — leading to ineffective policies that don't address the actual drivers of attrition." },
        ],
      },
      {
        title: "✅ How This Dashboard Solves It",
        items: [
          { label: "Hidden Patterns → Pivot Table Analysis", text: "Multi-dimensional pivot tables slice attrition data by department, job role, education, age group, and satisfaction level — revealing which employee segments are most at risk." },
          { label: "Expensive Tools → Excel-Native Dashboard", text: "Built entirely in Microsoft Excel with dynamic charts, conditional formatting, and slicers — zero additional software cost, deployable on any corporate machine." },
          { label: "Gut-Feel → KPI-Driven Strategy", text: "Tracks attrition rate, average tenure, satisfaction scores, and overtime correlation — giving HR leadership hard numbers to drive retention policy decisions." },
        ],
      },
      {
        title: "📊 Analysis Components",
        items: [
          { label: "Data Cleaning Pipeline", text: "Removed duplicates, handled missing values, standardized categorical variables, and created calculated fields for attrition rate and tenure buckets." },
          { label: "Dynamic KPI Cards", text: "Total employees, attrition count, attrition rate (%), average monthly income, and average years at company — updated dynamically with slicer selections." },
          { label: "Multi-Dimensional Charts", text: "Bar charts by department, pie charts by education field, line charts by years of service, and heatmaps by satisfaction vs. performance rating." },
          { label: "Workforce Segmentation", text: "Age group analysis, gender distribution, marital status correlation, and distance from home impact — all cross-referenced with attrition status." },
        ],
      },
    ],
    tech: ["Microsoft Excel", "Data Analysis", "Pivot Tables", "Data Visualization"],
    categories: ["Data Analytics"],
    image: "Assets/IBM_Attrition_Analysis.png",
    github: "https://github.com/sushantkumar143/IBM-Attrition-Analysis-Dashboard",
    live: "https://www.linkedin.com/posts/sushant-kumar-97978b28b_exceldashboard-dataanalytics-employeeattrition-activity-7316497932378165248-lI7x?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEZqm60BHwOIyyPRuyUiQke89iWADIG-GaY",
    date: "Dec 2024 – Jan 2025",
  },

  {
    title: "DSA Visualizer Website",
    description:
      "An interactive web-based platform for visualizing Data Structures and Algorithms concepts. The project demonstrates sorting algorithms, searching algorithms, and data structure operations with real-time visual animations to help students understand algorithm behavior.",
    deepDescription: [
      {
        title: "🎯 The Problem — Why This Project Exists",
        text: "Data Structures and Algorithms are the foundation of computer science — yet most students struggle because they learn from static textbooks and dry pseudocode, never seeing how algorithms actually behave in motion.",
        items: [
          { label: "Abstract Concepts", text: "Algorithms like QuickSort, Dijkstra's, or BFS are explained through pseudocode and static diagrams — making it extremely hard for visual learners to understand partitioning, recursion, and traversal." },
          { label: "No Hands-On Experimentation", text: "Students can't experiment with different inputs or array sizes to see how algorithm performance changes — they memorize time complexity formulas without understanding what O(n log n) actually looks like." },
          { label: "Expensive Alternatives", text: "Existing visualization tools are either paid, limited in scope, or require installation — no free, browser-based, comprehensive DSA visualizer exists." },
        ],
      },
      {
        title: "✅ How This Visualizer Solves It",
        items: [
          { label: "Abstract → Visual Animations", text: "Every algorithm step is animated in real-time — array elements change color during comparisons, swaps are visually highlighted, and tree traversals glow as they progress. Students see the algorithm think." },
          { label: "Passive → Interactive Learning", text: "Users can adjust array sizes, input custom values, control animation speed, and pause/step-through execution — transforming passive reading into active experimentation." },
          { label: "Paid Tools → Free & Browser-Based", text: "Built with pure HTML, CSS, and JavaScript — no installation, no sign-up, no cost. Works in any modern browser and is deployed on GitHub Pages for instant access." },
        ],
      },
      {
        title: "🚀 Algorithms Implemented",
        items: [
          { label: "Sorting Algorithms", text: "Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort — with step-by-step visual comparisons and swap animations." },
          { label: "Searching Algorithms", text: "Linear Search and Binary Search with highlighted search space reduction and target identification animations." },
          { label: "Data Structure Operations", text: "Stack push/pop, Queue enqueue/dequeue, and Linked List insertion/deletion with animated node connections and pointer movements." },
          { label: "Complexity Visualization", text: "Side-by-side comparison mode to visually demonstrate why O(n log n) algorithms outperform O(n²) on large inputs." },
        ],
      },
    ],
    tech: ["HTML", "CSS", "JavaScript", "Data Structures", "Algorithms"],
    categories: ["Web Development", "Education", "DevOps"],
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
    github: "https://github.com/sushantkumar143/DSA-Visualizer-Website",
    live: "https://sushantkumar143.github.io/DSA-Visualizer-Website/",
    date: "Oct 2024 – Nov 2024",
  },

  {
    title: "Advanced IoT Projects Collection",
    description:
      "A collection of advanced IoT-based hardware projects including smart monitoring systems using sensors, Arduino microcontrollers, motors, and automation modules. The projects demonstrate real-time data sensing, control systems, and embedded programming concepts.",
    deepDescription: [
      {
        title: "🎯 The Problem — Why This Project Exists",
        text: "Industrial and home environments generate massive amounts of physical data (temperature, humidity, motion, gas levels) that goes completely unmonitored — leading to safety hazards, energy waste, and missed automation opportunities.",
        items: [
          { label: "No Real-Time Environmental Monitoring", text: "Factories, labs, and homes lack affordable systems to continuously monitor temperature, gas leaks, or unauthorized access — problems are only discovered after damage occurs." },
          { label: "Manual Control Systems", text: "Lights, fans, motors, and appliances are controlled manually. Without automation, energy is wasted and human intervention is required for every adjustment." },
          { label: "High Cost of Commercial Solutions", text: "Enterprise IoT solutions cost thousands of dollars. Students and small businesses need affordable, programmable alternatives using commodity hardware." },
        ],
      },
      {
        title: "✅ How These Projects Solve It",
        items: [
          { label: "Unmonitored → Sensor-Driven Awareness", text: "DHT11/DHT22 temperature sensors, MQ gas sensors, PIR motion detectors, and ultrasonic range finders continuously monitor the environment and trigger alerts on threshold violations." },
          { label: "Manual → Automated Control", text: "Servo motors, relay modules, and motor drivers respond to sensor data automatically — lights turn on with motion, fans activate with temperature, and alarms trigger with gas detection." },
          { label: "Expensive → Arduino-Powered & Affordable", text: "Built entirely on Arduino Uno/Mega microcontrollers with commodity sensors — total hardware cost under $30 per project while achieving functionality comparable to commercial systems." },
        ],
      },
      {
        title: "🔧 Projects Included",
        items: [
          { label: "Smart Home Automation", text: "Relay-controlled appliances with PIR motion detection, temperature-based fan control, and LDR light-sensitive automation." },
          { label: "Gas Leak Detection System", text: "MQ-2 gas sensor with buzzer alarm and LED indicator — detects LPG, methane, and smoke with real-time threshold alerting." },
          { label: "Ultrasonic Distance Monitor", text: "HC-SR04 sensor measures distance and triggers servo motor actions — applicable to parking sensors, obstacle avoidance, and level monitoring." },
          { label: "Motor Control Systems", text: "L298N motor driver with PWM speed control and directional control — foundation for robotic movement and conveyor belt automation." },
        ],
      },
    ],
    tech: ["Arduino", "IoT", "Embedded Systems", "Sensors", "Automation"],
    categories: ["IT", "Embedded Systems"],
    image: "Assets/Advanced_IoT.png",
    github: "https://github.com/sushantkumar143/Advanced-IoT-Projects",
    live: "#",
    date: "Aug 2024 – Sep 2024",
  },
];


export const certifications = [
  {
    title: "Computer Communications",
    issuer: "University of Colorado (Coursera)",
    year: "2024",
    description:
      "Learned networking architectures, TCP/IP protocol stack, routing mechanisms, congestion control, and internet communication models.",
    image: "/certificates/computer-communication.png",
    link: "https://coursera.org/verify/specialization/EZ4EEWO86ACO"
  },
  {
    title: "Competitive Programming",
    issuer: "Programming Pathshala",
    year: "2025",
    description:
      "Certification in advanced problem solving, algorithm optimization, and competitive programming techniques.",
    image: "/certificates/cp.jpg",
    link: "https://certificates.programmingpathshala.com/v2/doc?id=3a463bcfc1174ad135f14d26bcbf5bc3ee4d19cf2d145442c0a18f66e2f0ffae"
  },
  {
    title: "Oracle Cloud Foundations Associate",
    issuer: "Oracle",
    year: "2025",
    description:
      "Certification validating knowledge of Oracle Cloud Infrastructure services, architecture, security, and cloud deployment models.",
    image: "/certificates/oracle-cloud.png",
    link: "#"
  },
  {
    title: "Oracle DevOps Professional",
    issuer: "Oracle",
    year: "2025",
    description:
      "Professional certification covering DevOps pipelines, CI/CD automation, cloud deployment, and infrastructure management.",
    image: "/certificates/oracle-devops.png",
    link: "#"
  },
  {
    title: "The Bits and Bytes of Computer Networking",
    issuer: "Google (Coursera)",
    year: "2024",
    description:
      "Completed Google's networking course covering network protocols, cloud networking concepts, troubleshooting, and real-world networking infrastructure.",
    image: "/certificates/bits-and-bytes-cn.png",
    link: "https://coursera.org/verify/VNFM4WI5WOKS"
  },
  {
    title: "C Programming Certification",
    issuer: "Lovely Professional University",
    year: "2024",
    description:
      "Certification validating strong understanding of C programming including memory management, pointers, data structures, and problem solving.",
    image: "/certificates/c-programming.png",
    link: "https://lpucolab438.examly.io/certificate/U2FsdGVkX183gSbO0BG1yIDS44AiXmqqlGCjvktgsHM%3D"
  },
  {
    title: "Data Structures and Algorithms",
    issuer: "iAmNeo / Lovely Professional University",
    year: "2024",
    description:
      "Comprehensive certification covering arrays, linked lists, trees, graphs, dynamic programming, and algorithm optimization.",
    image: "/certificates/DSA.png",
    link: "#"
  },
  {
    title: "Hardware and Operating Systems",
    issuer: "IBM (Coursera)",
    year: "2024",
    description:
      "Fundamental knowledge of computer hardware architecture, operating systems, memory management, and process scheduling.",
    image: "/certificates/hardware-os.png",
    link: "https://coursera.org/verify/XBB5MO5FGEEA"
  },
  {
    title: "ISRO Online Course Certification",
    issuer: "Indian Space Research Organisation (ISRO)",
    year: "2024",
    description:
      "Successfully completed ISRO certified course demonstrating knowledge in advanced technology and space science applications.",
    image: "/certificates/isro.png",
    link: "https://certificate.iirs.gov.in/checkstatus.php?uid=e14b6387cfe9b6da480267b28a769511&enm=20251682764490"
  },
  {
    title: "Java Programming Certification",
    issuer: "iAmNeo",
    year: "2024",
    description:
      "Certification covering object-oriented programming, Java fundamentals, exception handling, and real-world application development.",
    image: "/certificates/Java.png",
    link: "https://lpucolab438.examly.io/certificate/U2FsdGVkX1%2B2B0kFlNRmIfnrHXwVif%2FBzqiFJIByGWo%3D"
  },
  {
    title: "Peer-to-Peer Protocols and Local Area Network (LAN)",
    issuer: "University of Colorado (Coursera)",
    year: "2024",
    description:
      "Learned LAN architecture, switching, routing concepts, network topology, and implementation of enterprise networking systems.",
    image: "/certificates/LAN.png",
    link: "https://coursera.org/verify/SHCI6ITIJ6OI"
  },
  {
    title: "NPTEL Cloud Computing Certification",
    issuer: "NPTEL / IIT",
    year: "2025",
    description:
      "Elite certification covering cloud computing architecture, virtualization, distributed systems, and cloud deployment models.",
    image: "/certificates/NPTEL.png",
    link: "#"
  },
  {
    title: "Object Oriented Programming (OOPS)",
    issuer: "iAmNeo",
    year: "2024",
    description:
      "Certification validating knowledge of OOP concepts including encapsulation, inheritance, polymorphism, and abstraction.",
    image: "/certificates/oops.png",
    link: "#"
  },
  {
    title: "Oracle Analytics Cloud Certification",
    issuer: "Oracle",
    year: "2025",
    description:
      "Oracle certification demonstrating expertise in cloud analytics, data visualization, and enterprise-level analytics solutions.",
    image: "/certificates/oracle-analytics.png",
    link: "#"
  },
  {
    title: "Packet Switching Networks",
    issuer: "University of Colorado (Coursera)",
    year: "2024",
    description:
      "Course focused on packet switching technology, network routing algorithms, internet protocols, and scalable network design.",
    image: "/certificates/packet-switching.png",
    link: "https://coursera.org/verify/X8I3L09FOKK9"
  },
  {
    title: "Problem Solving (Intermediate)",
    issuer: "HackerRank",
    year: "2024",
    description:
      "Demonstrated strong problem-solving skills in algorithms, data structures, and competitive coding challenges.",
    image: "/certificates/hackerrank-problem-solving.png",
    link: "#"
  },
  {
    title: "TCP/IP Networking",
    issuer: "University of Colorado (Coursera)",
    year: "2024",
    description:
      "Advanced course on TCP/IP architecture, IP addressing, routing protocols, and internet communication mechanisms.",
    image: "/certificates/tcpip.png",
    link: "https://coursera.org/verify/QDTDSNE14E0W"
  }
];


export const achievements = [
  {
    title: "Academic Achiever Award – LPU",
    description: "Recognized as one of the top academic performers among 14,000+ students in Computer Science and Engineering at Lovely Professional University.",
    year: "2024",
    stat: "14000",
    statSuffix: "+",
    statLabel: "Students Surpassed",
    image: "/Assets/academic-achiever.jpg",
    // image: "/certificates/academic-topper.jpg",
  },
  {
    title: "National Level Hackathon Finalist",
    description: "Reached the final round of a national-level hackathon by developing an innovative technology-based solution.",
    year: "2025",
    stat: "10",
    statSuffix: "th",
    statLabel: "National Finalist",
    // image: "/Assets/Hackathon.png",
    image: "/Assets/hackathon_image.JPG",
  },
  {
    title: "Community Development Project Leader",
    description: "Led the project 'Safe Water, Secure Meals: Empowering Coal Mining Communities' to improve living conditions and awareness among coal mining families.",
    year: "2024",
    stat: "100",
    statSuffix: "+",
    statLabel: "Families Impacted",
    image: "/Assets/ngo.jpg",
  },
  {
    title: "Sports Achievements",
    description: "Secured 1st place in Football, 2nd place in Volleyball, and 3rd place in Athletics during the university sports competitions.",
    year: "2023",
    stat: "3",
    statSuffix: "",
    statLabel: "Medals Won",
    image: "/Assets/football.png",
  },
  {
    title: "Championship Trophy – Extra Co-Curricular Activities",
    description: "Awarded the Championship Trophy of the Year for outstanding performance in multiple extra co-curricular activities and sports events.",
    year: "2023",
    stat: "1",
    statSuffix: "st",
    statLabel: "Championship Trophy",
    image: "/Assets/trophy.png",
  },
];


export const experience = [
  {
    role: "AI & Cloud Intern",
    company: "AICTE – Edunet Foundation | IBM SkillsBuild",
    duration: "Sep 2025 – Oct 2025",
    description:
      "Worked on AI and Cloud integration projects using Streamlit Cloud. Built machine learning models, developed APIs, and explored LLM-based automation workflows. Gained hands-on experience in building, deploying, and visualizing ML models with real-world datasets.",
    tech: ["Python", "Streamlit", "LLMs", "Pandas", "NumPy", "Data Visualization", "Streamlit Cloud"],
  },

  {
    role: "Conversational Data Analysis with LLMs Intern",
    company: "AICTE – VOIS for Tech | Edunet Foundation",
    duration: "11 Sep 2025 – 08 Oct 2025",
    description:
      "Completed a virtual internship under the AICTE 'VOIS for Tech University Engagement Program' implemented by Edunet Foundation. Worked on Conversational Data Analysis using Large Language Models (LLMs), focusing on AI-powered insights, NLP-based querying, and intelligent data interaction systems.",
    tech: ["Python", "LLMs", "NLP", "Data Analysis", "AI", "Conversational AI"],
  },

  {
    role: "Competitive Programming Summer Trainee",
    company: "Lovely Professional University",
    duration: "Jun 2025 – Jul 2025",
    description:
      "Completed intensive competitive programming training and solved 500+ algorithmic problems across LeetCode and Codeforces. Improved global ranking by 65%, achieved 90% problem-solving accuracy, and optimized solutions using advanced data structures and algorithmic techniques reducing average runtime by 30–40%.",
    tech: ["C++", "Python", "Data Structures", "Algorithms", "STL", "Competitive Programming"],
  }
];


export const codingPlatforms = [
  { platform: "LeetCode", handle: "@sx_sushant", solved: 1000, rating: 1414, icon: "⚡" },
  { platform: "CodeForces", handle: "@sushant_k", solved: 200, rating: 1520, icon: "🏆" },
  { platform: "HackerRank", handle: "@sushant", solved: 200, rating: "5★", icon: "🌟" },
  { platform: "GeeksForGeeks", handle: "@sushant", solved: 150, score: 1200, icon: "📗" },
];


export const activities = [
  {
    title: "Football Champion",
    description:
      "Won 1st place in the university football championship demonstrating teamwork, leadership, and strategic gameplay.",
    image: "/Assets/football.gif",
    link: "#"
  },
  {
    title: "Volleyball Runner-Up",
    description:
      "Secured 2nd place in the university volleyball championship. Known for powerful spikes and strong coordination with the team.",
    image: "Assets/volleyball.gif",
    // image: "Assets/volleyball.jpg",
    link: "#"
  },
  {
    title: "Athletics Competition – 3rd Place",
    description:
      "Achieved 3rd place in athletics events during university sports competitions showcasing speed, stamina, and discipline.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80",
    link: "#"
  },
  {
    title: "Championship Trophy – Extra Co-Curricular Activities",
    description:
      "Awarded the Championship Trophy of the Year (2023) for outstanding performance across multiple sports including football, volleyball, and athletics.",
    image: "Assets/championship.jpg",
    link: "#"
  },
  {
    title: "Radha Krishna Painting",
    description:
      "Created a detailed traditional painting of Radha Krishna reflecting artistic creativity and cultural appreciation.",
    image: "Assets/radhe.gif",
    // image: "Assets/radha_krishna.jpg",
    link: "#"
  },
  {
    title: "Tirupati Balaji Painting",
    description:
      "Designed a devotional painting of Lord Tirupati Balaji demonstrating patience, fine brushwork, and artistic precision.",
    image: "Assets/balaji.jpg",
    link: "#"
  },
  {
    title: "Landscape Painting",
    description:
      "Created landscape artworks focusing on natural scenery, color harmony, and depth perception.",
    image: "Assets/landscape.jpg",
    link: "#"
  },
  {
    title: "Tiger Shroff Portrait Sketch",
    description:
      "Hand-drawn realistic portrait sketch of actor Tiger Shroff showcasing attention to detail and portrait drawing skills.",
    image: "Assets/tiger.png",
    link: "#"
  },
  {
    title: "Fitness & Sports Enthusiast",
    description:
      "Maintain an active lifestyle through regular sports, physical fitness activities, and outdoor games.",
    image: "Assets/fitness.png",
    link: "#"
  }
];


export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
