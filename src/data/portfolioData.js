/*
  Portfolio data – all content in one place for easy editing.
  Replace placeholder values with your real information.
*/

export const personalInfo = {
  name: "Sushant Kumar",
  roles: [
    "Data Scientist",
    "Agentic AI Developer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Data Analyst",
  ],
  tagline: "Building intelligent systems & beautiful interfaces",
  email: "sushant.kumar@example.com",
  phone: "+91 98765 43210",
  location: "India",
  resumeLink: "#",
  socialLinks: {
    github: "https://github.com/sushant-kumar",
    linkedin: "https://linkedin.com/in/sushant-kumar",
    twitter: "https://twitter.com/sushant_kumar",
    leetcode: "https://leetcode.com/sushant-kumar",
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
    institution: "Indian Institute of Technology",
    year: "2022 – 2026",
    grade: "CGPA: 8.5/10",
    logo: "🎓",
  },
  {
    degree: "Senior Secondary (XII) – CBSE",
    institution: "Delhi Public School",
    year: "2020 – 2022",
    grade: "Percentage: 95%",
    logo: "🏫",
  },
  {
    degree: "Secondary (X) – CBSE",
    institution: "Delhi Public School",
    year: "2018 – 2020",
    grade: "Percentage: 93%",
    logo: "📚",
  },
];

export const skillCategories = [
  {
    name: "Data Science & ML",
    icon: "🧠",
    skills: [
      { name: "Python", level: 92, icon: "/models/icons/numpy.png" }, // No native python icon available, using numpy approximation
      { name: "TensorFlow / Keras", level: 85, icon: "/models/icons/tensorflow.png" },
      { name: "PyTorch", level: 78, icon: "/models/icons/tensorflow.png" }, // Fallback to TF
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
      { name: "RAG Pipelines", level: 80, icon: "/models/icons/rag.png" },
      { name: "Agent Frameworks", level: 78, icon: "/models/icons/spatiate.glb" }, // spatial/agent correlation
      { name: "Prompt Engineering", level: 88, icon: "/models/icons/Prompt.png" },
      { name: "Vector Databases", level: 75, icon: "/models/icons/sql.png" }, // DB fallback
      { name: "OpenAI / Gemini API", level: 82, icon: "/models/icons/meta_quest_logo.glb" }, // Meta tech fallback
    ],
  },
  {
    name: "Full Stack Development",
    icon: "💻",
    skills: [
      { name: "React.js", level: 90, icon: "/models/icons/react_logo.glb" },
      { name: "Next.js", level: 82, icon: "/models/icons/NextJs.png" },
      { name: "Node.js / Express", level: 85, icon: "/models/icons/javascript_1.glb" },
      { name: "FastAPI / Django", level: 80, icon: "/models/icons/django.png" },
      { name: "MongoDB / PostgreSQL", level: 78, icon: "/models/icons/sql.png" },
      { name: "TypeScript", level: 75, icon: "/models/icons/javascript_1.glb" }, // JS model fallback for TS
    ],
  },
  {
    name: "DevOps & Cloud",
    icon: "☁️",
    skills: [
      { name: "Docker", level: 85, icon: "/models/icons/moby_dock_docker_whale.glb" },
      { name: "Kubernetes", level: 72, icon: "/models/icons/kubernetes_1_cluster.glb" },
      { name: "CI/CD (GitHub Actions)", level: 80, icon: "/models/icons/github.glb" },
      { name: "AWS / GCP", level: 75, icon: "/models/icons/aws_logo.glb" },
      { name: "Linux / Bash", level: 88, icon: "/models/icons/linux-char.glb" },
      { name: "Terraform", level: 68, icon: "/models/icons/terraform.png" },
    ],
  },
  {
    name: "Data Analytics",
    icon: "📊",
    skills: [
      { name: "SQL", level: 90, icon: "/models/icons/sql.png" },
      { name: "Power BI / Tableau", level: 82, icon: "/models/icons/PowerBi.glb" },
      { name: "Excel / Google Sheets", level: 85, icon: "/models/icons/Excel.glb" },
      { name: "Apache Spark", level: 70, icon: "/models/icons/download-removebg-preview.png" }, // Generic data fallback
      { name: "Data Visualization", level: 88, icon: "/models/icons/download-removebg-preview (1).png" }, // Data visualization fallback
      { name: "Statistical Analysis", level: 78, icon: "/models/icons/Agent.png" }, // Analysis fallback
    ],
  },

];

export const projects = [
  {
    title: "AI Disease Detection System",
    description:
      "A deep learning–powered web application that predicts diseases from medical images using CNN architectures. Features a Django backend with a React dashboard for real-time analysis.",
    tech: ["Python", "TensorFlow", "Django", "React", "Docker"],
    categories: ["AI", "Machine Learning", "Data Science"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80", // medical AI placeholder
    github: "#",
    live: "#",
  },
  {
    title: "Agentic RAG Chatbot",
    description:
      "An intelligent conversational AI agent built with LangChain that can browse documents, search the web, and provide contextual answers using Retrieval-Augmented Generation.",
    tech: ["Python", "LangChain", "FastAPI", "ChromaDB", "React"],
    categories: ["AI", "Machine Learning", "IT"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80", // AI Chatbot placeholder
    github: "#",
    live: "#",
  },
  {
    title: "DevFlow – CI/CD Pipeline Dashboard",
    description:
      "A real-time monitoring dashboard for CI/CD pipelines with GitHub integration, automated deployments, and alerting via Slack/Discord webhooks.",
    tech: ["Next.js", "Node.js", "Docker", "GitHub API", "WebSockets"],
    categories: ["DevOps", "IT"],
    image: "https://images.unsplash.com/photo-1618401471353-b98a5233c591?w=800&q=80", // Code / Dashboard placeholder
    github: "#",
    live: "#",
  },
  {
    title: "DataLens – Analytics Platform",
    description:
      "An end-to-end data analytics platform with interactive dashboards, automated ETL pipelines, and predictive analytics using machine learning models.",
    tech: ["Python", "Streamlit", "PostgreSQL", "Apache Airflow", "Plotly"],
    categories: ["Data Science", "IT"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", // Analytics placeholder
    github: "#",
    live: "#",
  },
  {
    title: "Smart Campus IoT Network",
    description:
      "An IoT-based campus management system with real-time sensor data collection, cloud processing on AWS, and a mobile-responsive monitoring dashboard.",
    tech: ["React", "Node.js", "MQTT", "AWS IoT", "MongoDB"],
    categories: ["IT", "DevOps"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", // Hardware/IoT placeholder
    github: "#",
    live: "#",
  },
];

export const certifications = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "Feb 2025",
    description: "Fundamental understanding of IT services and their uses in the AWS Cloud.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    link: "#"
  },
  {
    title: "TensorFlow Developer Certificate",
    issuer: "Google",
    year: "Jan 2025",
    description: "Building and training neural networks and deep learning models using TensorFlow.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    link: "#"
  },
  {
    title: "Meta Front-End Developer",
    issuer: "Meta (Coursera)",
    year: "Nov 2024",
    description: "Advanced React, state management, and responsive web development methodologies.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    link: "#"
  },
  {
    title: "IBM Data Science Professional",
    issuer: "IBM (Coursera)",
    year: "Aug 2024",
    description: "Data analysis, machine learning algorithms, and real-world data science projects.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    link: "#"
  },
  {
    title: "Docker Certified Associate",
    issuer: "Docker Inc.",
    year: "May 2024",
    description: "Containerization, orchestration, and deploying scalable microservices.",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80",
    link: "#"
  },
  {
    title: "Google Data Analytics",
    issuer: "Google (Coursera)",
    year: "Dec 2023",
    description: "Data cleaning, visualization, and R programming for business intelligence.",
    image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=800&q=80",
    link: "#"
  },
];

export const achievements = [
  {
    title: "Academic Achiever Award – LPU",
    description: "Recognized as one of the top academic performers among 14,000+ students in Computer Science and Engineering at Lovely Professional University.",
    year: "2024",
    stat: "14000",
    statSuffix: "+",
    statLabel: "Students Surpassed",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&q=80",
  },
  {
    title: "National Level Hackathon Finalist",
    description: "Reached the final round of a national-level hackathon by developing an innovative technology-based solution.",
    year: "2025",
    stat: "1",
    statSuffix: "st",
    statLabel: "National Finalist",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
  },
  {
    title: "Community Development Project Leader",
    description: "Led the project 'Safe Water, Secure Meals: Empowering Coal Mining Communities' to improve living conditions and awareness among coal mining families.",
    year: "2024",
    stat: "100",
    statSuffix: "+",
    statLabel: "Families Impacted",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
  },
  {
    title: "Sports Achievements",
    description: "Secured 1st place in Football, 2nd place in Volleyball, and 3rd place in Athletics during the university sports competitions.",
    year: "2023",
    stat: "3",
    statSuffix: "",
    statLabel: "Medals Won",
    image: "https://images.unsplash.com/photo-1461896836934-bd45ba8a0a53?w=800&q=80",
  },
  {
    title: "Championship Trophy – Extra Co-Curricular Activities",
    description: "Awarded the Championship Trophy of the Year for outstanding performance in multiple extra co-curricular activities and sports events.",
    year: "2023",
    stat: "1",
    statSuffix: "st",
    statLabel: "Championship Trophy",
    image: "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=800&q=80",
  },
];

export const experience = [
  {
    role: "Data Science Intern",
    company: "TechCorp Solutions",
    duration: "Jun 2025 – Aug 2025",
    description:
      "Built predictive models for customer churn analysis reducing churn rate by 15%. Developed automated data pipelines using Apache Airflow.",
  },
  {
    role: "Full Stack Developer Intern",
    company: "InnovateTech",
    duration: "Jan 2025 – Apr 2025",
    description:
      "Developed a microservices-based e-commerce platform with React, Node.js, and MongoDB. Implemented CI/CD with GitHub Actions and Docker.",
  },
  {
    role: "AI Research Assistant",
    company: "University AI Lab",
    duration: "Aug 2024 – Dec 2024",
    description:
      "Assisted in NLP research focusing on transformer architectures for low-resource languages. Fine-tuned LLMs for domain-specific tasks.",
  },
];

export const codingPlatforms = [
  { platform: "LeetCode", handle: "@sushant_kumar", solved: 450, rating: 1850, icon: "⚡" },
  { platform: "CodeForces", handle: "@sushant_k", solved: 300, rating: 1520, icon: "🏆" },
  { platform: "HackerRank", handle: "@sushant", solved: 200, rating: "5★", icon: "🌟" },
  { platform: "GeeksForGeeks", handle: "@sushant", solved: 350, score: 1200, icon: "📗" },
];

export const activities = [
  {
    title: "Hackathon Organizer – TechFest 2025",
    description: "Led a team of 20 to organize a 48-hour national level hackathon with 500+ participants.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    link: "#"
  },
  {
    title: "Workshop Lead – Machine Learning",
    description: "Conducted hands-on sessions for 100+ students on building neural networks from scratch.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
    link: "#"
  },
  {
    title: "Open Source Contributor",
    description: "Actively contributed to multiple popular repositories during Hacktoberfest.",
    image: "https://images.unsplash.com/photo-1618401471353-b98a5233c591?w=800&q=80",
    link: "#"
  },
  {
    title: "Technical Blog Writer",
    description: "Publishing deep-dive articles on ML architectures and web development on Medium.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
    link: "#"
  },
  {
    title: "Mentored 50+ students in DSA",
    description: "Provided weekly 1-on-1 mentorship for data structures to junior students.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    link: "#"
  },
  {
    title: "AI/ML Club Core Member",
    description: "Coordinating weekly research paper reading groups and project ideation phases.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    link: "#"
  },
  {
    title: "Speaker at Tech Symposium",
    description: "Delivered a talk on the impact of Agentic AI systems on modern software engineering.",
    image: "https://images.unsplash.com/photo-1475721025505-1a1347ba01a6?w=800&q=80",
    link: "#"
  },
  {
    title: "Community Volunteer – Code for India",
    description: "Built free web solutions for local non-profit organizations to help their reach.",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
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
