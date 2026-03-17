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
  email: "sushant14300@gmail.com",
  phone: "+91 6207851006",
  location: "India",
  resumeLink: "#",
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

// export const projects = [
//   {
//     title: "AI Disease Detection System",
//     description:
//       "A deep learning–powered web application that predicts diseases from medical images using CNN architectures. Features a Django backend with a React dashboard for real-time analysis.",
//     tech: ["Python", "TensorFlow", "Django", "React", "Docker"],
//     categories: ["AI", "Machine Learning", "Data Science"],
//     image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80", // medical AI placeholder
//     github: "#",
//     live: "#",
//   },
//   {
//     title: "Agentic RAG Chatbot",
//     description:
//       "An intelligent conversational AI agent built with LangChain that can browse documents, search the web, and provide contextual answers using Retrieval-Augmented Generation.",
//     tech: ["Python", "LangChain", "FastAPI", "ChromaDB", "React"],
//     categories: ["AI", "Machine Learning", "IT"],
//     image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80", // AI Chatbot placeholder
//     github: "#",
//     live: "#",
//   },
//   {
//     title: "DevFlow – CI/CD Pipeline Dashboard",
//     description:
//       "A real-time monitoring dashboard for CI/CD pipelines with GitHub integration, automated deployments, and alerting via Slack/Discord webhooks.",
//     tech: ["Next.js", "Node.js", "Docker", "GitHub API", "WebSockets"],
//     categories: ["DevOps", "IT"],
//     image: "https://images.unsplash.com/photo-1618401471353-b98a5233c591?w=800&q=80", // Code / Dashboard placeholder
//     github: "#",
//     live: "#",
//   },
//   {
//     title: "DataLens – Analytics Platform",
//     description:
//       "An end-to-end data analytics platform with interactive dashboards, automated ETL pipelines, and predictive analytics using machine learning models.",
//     tech: ["Python", "Streamlit", "PostgreSQL", "Apache Airflow", "Plotly"],
//     categories: ["Data Science", "IT"],
//     image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", // Analytics placeholder
//     github: "#",
//     live: "#",
//   },
//   {
//     title: "Smart Campus IoT Network",
//     description:
//       "An IoT-based campus management system with real-time sensor data collection, cloud processing on AWS, and a mobile-responsive monitoring dashboard.",
//     tech: ["React", "Node.js", "MQTT", "AWS IoT", "MongoDB"],
//     categories: ["IT", "DevOps"],
//     image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", // Hardware/IoT placeholder
//     github: "#",
//     live: "#",
//   },
// ];


export const projects = [
  {
    title: "VisionTraffic: Smart Vehicle Traffic Monitoring System",
    description:
      "An AI-powered real-time traffic intelligence system that performs vehicle detection, classification, speed tracking, anomaly detection, and license plate recognition from live video streams. Built using advanced computer vision techniques and predictive analytics to improve traffic monitoring and management.",
    tech: ["Python", "Computer Vision", "YOLOv8", "OCR", "Predictive Analytics", "MySQL", "Excel"],
    categories: ["AI", "Machine Learning", "Computer Vision", "Data Science"],
    image: "Assets/Vehicle_Detection.png",
    github: "https://github.com/sushantkumar143/VisionTraffic-Smart-Vehicle-Traffic-Monitoring-System",
    live: "#",
    date: "Apr 2025 – May 2025",
  },

  {
    title: "Multi-Disease Prediction System",
    description:
      "A machine learning-based healthcare application that predicts multiple diseases including Diabetes, Heart Disease, and Parkinson’s based on patient health parameters. Developed an interactive web interface using Streamlit for real-time health predictions and data visualization.",
    tech: ["Python", "Streamlit", "Pandas", "NumPy", "Machine Learning", "Data Visualization"],
    categories: ["AI", "Machine Learning", "Healthcare", "Data Science"],
    image: "Assets/Multi_disease_prediction_model.png",
    github: "https://github.com/sushantkumar143/Multi-Disease-prediction-Model",
    live: "#",
    date: "Apr 2025 – May 2025",
  },

  {
    title: "AI Integrated Multi-Platform Task Management & Automation Platform",
    description:
      "An intelligent automation platform integrating Gmail, Google Calendar, and WhatsApp APIs for smart task, meeting, and email management. Features speech recognition, face recognition authentication, NLP-based commands, and AI-powered reminders to automate daily workflows.",
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
    tech: ["Power BI", "Data Analytics", "Data Visualization", "Excel", "Business Intelligence"],
    categories: ["Data Science", "Analytics"],
    image: "Assets/Telecom_Churn_Prediction.png",
    github: "https://github.com/sushantkumar143/Telecom-Customer-Churn-Prediction",
    live: "#",
    date: "Jan 2025 – Feb 2025",
  },

  {
    title: "IBM Attrition Analysis Dashboard",
    description:
      "Built an HR analytics dashboard using Microsoft Excel to analyze employee attrition patterns in IBM datasets. Implemented data cleaning, pivot tables, KPIs, and dynamic charts to uncover workforce insights and attrition trends.",
    tech: ["Microsoft Excel", "Data Analysis", "Pivot Tables", "Data Visualization"],
    categories: ["Data Analytics"],
    image: "Assets/IBM_Attrition_Analysis.png",
    github: "https://github.com/sushantkumar143/IBM-Attrition-Analysis-Dashboard",
    live: "#",
    date: "Dec 2024 – Jan 2025",
  },

  {
    title: "DSA Visualizer Website",
    description:
      "An interactive web-based platform for visualizing Data Structures and Algorithms concepts. The project demonstrates sorting algorithms, searching algorithms, and data structure operations with real-time visual animations to help students understand algorithm behavior.",
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
    tech: ["Arduino", "IoT", "Embedded Systems", "Sensors", "Automation"],
    categories: ["IT", "Embedded Systems"],
    image: "Assets/Advanced_IoT.png",
    github: "https://github.com/sushantkumar143/Advanced-IoT-Projects",
    live: "#",
    date: "Aug 2024 – Sep 2024",
  },
];


// export const certifications = [
//   {
//     title: "AWS Certified Cloud Practitioner",
//     issuer: "Amazon Web Services",
//     year: "Feb 2025",
//     description: "Fundamental understanding of IT services and their uses in the AWS Cloud.",
//     image: "/certificates/oracle-cloud.png",
//     link: "#"
//   },
//   {
//     title: "TensorFlow Developer Certificate",
//     issuer: "Google",
//     year: "Jan 2025",
//     description: "Building and training neural networks and deep learning models using TensorFlow.",
//     image: "/certificates/DSA.png",
//     link: "#"
//   },
//   {
//     title: "Meta Front-End Developer",
//     issuer: "Meta (Coursera)",
//     year: "Nov 2024",
//     description: "Advanced React, state management, and responsive web development methodologies.",
//     image: "/certificates/Java.png",
//     link: "#"
//   },
//   {
//     title: "IBM Data Science Professional",
//     issuer: "IBM (Coursera)",
//     year: "Aug 2024",
//     description: "Data analysis, machine learning algorithms, and real-world data science projects.",
//     image: "/certificates/oracle-analytics.png",
//     link: "#"
//   },
//   {
//     title: "Docker Certified Associate",
//     issuer: "Docker Inc.",
//     year: "May 2024",
//     description: "Containerization, orchestration, and deploying scalable microservices.",
//     image: "/certificates/oracle-devops.png",
//     link: "#"
//   },
//   {
//     title: "Google Data Analytics",
//     issuer: "Google (Coursera)",
//     year: "Dec 2023",
//     description: "Data cleaning, visualization, and R programming for business intelligence.",
//     image: "/certificates/c-programming.png",
//     link: "#"
//   },
// ];

export const certifications = [
  {
    title: "The Bits and Bytes of Computer Networking",
    issuer: "Google (Coursera)",
    year: "2024",
    description:
      "Completed Google's networking course covering network protocols, cloud networking concepts, troubleshooting, and real-world networking infrastructure.",
    image: "/certificates/bits-and-bytes-cn.png",
    link: "#"
  },
  {
    title: "C Programming Certification",
    issuer: "Lovely Professional University",
    year: "2024",
    description:
      "Certification validating strong understanding of C programming including memory management, pointers, data structures, and problem solving.",
    image: "/certificates/c-programming.png",
    link: "#"
  },
  {
    title: "Computer Communications",
    issuer: "University of Colorado (Coursera)",
    year: "2024",
    description:
      "Learned networking architectures, TCP/IP protocol stack, routing mechanisms, congestion control, and internet communication models.",
    image: "/certificates/computer-communication.png",
    link: "#"
  },
  {
    title: "Competitive Programming",
    issuer: "Programming Pathshala",
    year: "2025",
    description:
      "Certification in advanced problem solving, algorithm optimization, and competitive programming techniques.",
    image: "/certificates/cp.jpg",
    link: "#"
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
    link: "#"
  },
  {
    title: "ISRO Online Course Certification",
    issuer: "Indian Space Research Organisation (ISRO)",
    year: "2024",
    description:
      "Successfully completed ISRO certified course demonstrating knowledge in advanced technology and space science applications.",
    image: "/certificates/isro.png",
    link: "#"
  },
  {
    title: "Java Programming Certification",
    issuer: "iAmNeo",
    year: "2024",
    description:
      "Certification covering object-oriented programming, Java fundamentals, exception handling, and real-world application development.",
    image: "/certificates/Java.png",
    link: "#"
  },
  {
    title: "Local Area Network (LAN)",
    issuer: "University of Colorado (Coursera)",
    year: "2024",
    description:
      "Learned LAN architecture, switching, routing concepts, network topology, and implementation of enterprise networking systems.",
    image: "/certificates/LAN.png",
    link: "#"
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
    title: "Packet Switching Networks",
    issuer: "University of Colorado (Coursera)",
    year: "2024",
    description:
      "Course focused on packet switching technology, network routing algorithms, internet protocols, and scalable network design.",
    image: "/certificates/packet-switching.png",
    link: "#"
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
    link: "#"
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
    image: "ngo.jpg",
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

// export const experience = [
//   {
//     role: "Data Science Intern",
//     company: "TechCorp Solutions",
//     duration: "Jun 2025 – Aug 2025",
//     description:
//       "Built predictive models for customer churn analysis reducing churn rate by 15%. Developed automated data pipelines using Apache Airflow.",
//   },
//   {
//     role: "Full Stack Developer Intern",
//     company: "InnovateTech",
//     duration: "Jan 2025 – Apr 2025",
//     description:
//       "Developed a microservices-based e-commerce platform with React, Node.js, and MongoDB. Implemented CI/CD with GitHub Actions and Docker.",
//   },
//   {
//     role: "AI Research Assistant",
//     company: "University AI Lab",
//     duration: "Aug 2024 – Dec 2024",
//     description:
//       "Assisted in NLP research focusing on transformer architectures for low-resource languages. Fine-tuned LLMs for domain-specific tasks.",
//   },
// ];

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
  { platform: "LeetCode", handle: "@sushant_kumar", solved: 850, rating: 1850, icon: "⚡" },
  { platform: "CodeForces", handle: "@sushant_k", solved: 200, rating: 1520, icon: "🏆" },
  { platform: "HackerRank", handle: "@sushant", solved: 200, rating: "5★", icon: "🌟" },
  { platform: "GeeksForGeeks", handle: "@sushant", solved: 150, score: 1200, icon: "📗" },
];

// export const activities = [
//   {
//     title: "Hackathon Organizer – TechFest 2025",
//     description: "Led a team of 20 to organize a 48-hour national level hackathon with 500+ participants.",
//     image: "/Assets/hackathon_image.JPG",
//     link: "#"
//   },
//   {
//     title: "Workshop Lead – Machine Learning",
//     description: "Conducted hands-on sessions for 100+ students on building neural networks from scratch.",
//     image: "/Assets/Advanced_IoT.png",
//     link: "#"
//   },
//   {
//     title: "Open Source Contributor",
//     description: "Actively contributed to multiple popular repositories during Hacktoberfest.",
//     image: "/Assets/ECE Project.png",
//     link: "#"
//   },
//   {
//     title: "Technical Blog Writer",
//     description: "Publishing deep-dive articles on ML architectures and web development on Medium.",
//     image: "/Assets/Multi disease prediction model.png",
//     link: "#"
//   },
//   {
//     title: "Mentored 50+ students in DSA",
//     description: "Provided weekly 1-on-1 mentorship for data structures to junior students.",
//     image: "/certificates/cp.jpg",
//     link: "#"
//   },
//   {
//     title: "AI/ML Club Core Member",
//     description: "Coordinating weekly research paper reading groups and project ideation phases.",
//     image: "/Assets/Telecom_Churn_Prediction.png",
//     link: "#"
//   },
//   {
//     title: "Speaker at Tech Symposium",
//     description: "Delivered a talk on the impact of Agentic AI systems on modern software engineering.",
//     image: "/Assets/Power BI 1.png",
//     link: "#"
//   },
//   {
//     title: "Community Volunteer – Code for India",
//     description: "Built free web solutions for local non-profit organizations to help their reach.",
//     image: "/Assets/radha_krishna.jpg",
//     link: "#"
//   }
// ];

export const activities = [
  {
    title: "Football Champion",
    description:
      "Won 1st place in the university football championship demonstrating teamwork, leadership, and strategic gameplay.",
    image: "/Assets/football.png",
    link: "#"
  },
  {
    title: "Volleyball Runner-Up",
    description:
      "Secured 2nd place in the university volleyball championship. Known for powerful spikes and strong coordination with the team.",
    image: "Assets/volleyball.jpg",
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
    image: "Assets/radha_krishna.jpg",
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
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
    link: "#"
  },
  {
    title: "Creative Sketching & Drawing",
    description:
      "Passionate about sketching and drawing portraits, landscapes, and cultural artworks as a creative hobby.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
    link: "#"
  },
  {
    title: "Fitness & Sports Enthusiast",
    description:
      "Maintain an active lifestyle through regular sports, physical fitness activities, and outdoor games.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
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
