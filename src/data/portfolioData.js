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
    "Data Analyst",
  ],
  tagline: "I don’t chase success—I pursue excellence, and through it, I create intelligent solutions that make a difference. Second by second, chasing time with purpose, discipline, and the will to become better every day....",
  email: "sushant14300@gmail.com",
  phone: "+91 6207851006",
  location: "India",
  resumeLink: "https://drive.google.com/uc?export=download&id=1MX2avd9-3vJZzhvE6EvCsmWmyhHmlTfI",
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


export const projects = [
  {
    title: "VisionTraffic: Smart Vehicle Traffic Monitoring System",
    description:
      "An AI-powered real-time traffic intelligence system that performs vehicle detection, classification, speed tracking, anomaly detection, and license plate recognition from live video streams. Built using advanced computer vision techniques and predictive analytics to improve traffic monitoring and management.",
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
    image: "Assets/telecom.gif",
    github: "https://github.com/sushantkumar143/Telecom-Customer-Churn-Prediction",
    live: "",
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
    live: "https://www.linkedin.com/posts/sushant-kumar-97978b28b_exceldashboard-dataanalytics-employeeattrition-activity-7316497932378165248-lI7x?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEZqm60BHwOIyyPRuyUiQke89iWADIG-GaY",
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
  { platform: "LeetCode", handle: "@sushant_kumar", solved: 850, rating: 1850, icon: "⚡" },
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
