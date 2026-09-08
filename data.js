const PORTFOLIO_DATA = {
  personal: {
    name: "Shri Pathi G",
    role: "Full Stack Developer",
    subtag: "Hello .",
    tagline: "Computer Science Engineering graduate focused on Full Stack Development, Hardware Engineering, Automation Testing, and Data Analytics.",
    bio: "I am a Computer Science Engineering graduate with hands-on experience across full stack development, hardware and IoT systems, automation testing, and data analytics. I build practical applications, validate real-world workflows, work with sensors and embedded systems, and turn data into useful dashboards and decisions.",
    degree: "B.E. Computer Science and Engineering (2022 - 2026)",
    college: "Dr. Mahalingam College of Engineering and Technology, Pollachi",
    location: "Bhavani, Tamil Nadu",
    phone: "9344752868",
    email: "shrisekar3@gmail.com",
    hiringProfile: {
      availability: "Open to full-time opportunities",
      targetRoles: ["Full Stack Developer", "Hardware Engineer", "Automation Test Engineer", "Data Analyst"],
      workPreference: "Open to on-site, hybrid, and remote roles in India",
      noticePeriod: "Available after graduation",
      graduation: "Expected graduation: 2026",
      whyHireMe: "I combine full stack development, hardware engineering, automation testing, and data analytics. I learn quickly, communicate clearly, and enjoy turning real requirements into tested, useful products.",
      responseTime: "I usually respond within 1–2 business days."
    },
    github: "https://github.com/Shripathi-Gunasekaran",
    linkedin: "https://linkedin.com/in/shripathi-gunasekaran-5bb7732b1",
    resume: "assets/Shri_Pathi_Software_Engineer.pdf",
    avatar: "assets/image.png",
    logo: "assets/name.png"
  },

  leadership: {
    title: "Hostel Welfare Committee Member",
    period: "2023 – 2025",
    institution: "Dr. Mahalingam College of Engineering and Technology",
    contribution: "Coordinated student activities, addressed student concerns, and supported hostel administration."
  },

  stats: [
    { number: 5, suffix: "", label: "Professional Internships" },
    { number: 9, suffix: "+", label: "Projects & Papers" },
    { number: 1, suffix: "st", label: "Prize AI Tech Expo Win" },
    { number: 25, suffix: "+", label: "Industry Certifications" }
  ],

  categorizedSkills: {
    "Development": ["React", "Next.js", "TypeScript", "JavaScript", "Python", "C/C++", "Java", "HTML5", "CSS3"],
    "Testing": ["Cypress", "Selenium", "Manual Testing", "UI Testing", "API Testing"],
    "Hardware & Embedded": ["Arduino", "Embedded C++", "Sensors", "IoT", "Real-time Monitoring"],
    "Data & AI": ["Power BI", "Machine Learning", "Generative AI", "Tableau", "Excel"],
    "Cloud & Tools": ["AWS", "Git", "GitHub", "Linux", "Docker", "N8N", "Flowise"],
    "Databases": ["SQL", "MongoDB"]
  },

  skills: [
    "React", "Next.js", "TypeScript", "JavaScript", "Python", "C/C++", "Java",
    "Cypress", "Selenium", "Manual Testing", "Arduino", "Embedded C++", "Sensors", "IoT",
    "Power BI", "Machine Learning", "Generative AI", "AWS", "Git", "GitHub", "Linux", "Docker", "SQL", "MongoDB"
  ],

  services: [
    {
      id: "fullstack",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
      title: "Full-Stack Development",
      description: "Building modern, responsive web applications using React, Next.js, TypeScript, Python, and RESTful APIs.",
      featured: false
    },
    {
      id: "testing",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
      title: "QA Engineering & Automation Testing",
      description: "Executing robust end-to-end testing, UI automation, and manual testing using Cypress, Selenium, and Cypress test suites.",
      featured: false
    },
    {
      id: "ai-data",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
      title: "Data Analytics & Power BI",
      description: "Transforming complex datasets into executive decision dashboards using Power BI, Tableau, and Machine Learning models.",
      featured: false
    },
    {
      id: "iot-cloud",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h10M7 12h10M7 17h10"/></svg>`,
      title: "Hardware Engineering",
      description: "Designing sensor-based hardware systems, embedded workflows, real-time monitoring solutions, and IoT telemetry prototypes.",
      featured: false
    }
  ],

  experience: [
    {
      role: "Full Stack Developer Intern",
      company: "Yectra Technologies Private Limited",
      period: "Jan 2026 – Present",
      description: "Build frontend interfaces, integrate APIs, and validate real-time workflows with Cypress as part of a production-focused development team.",
      tools: "React, API integration, Cypress",
      impact: "Contributed across implementation and quality validation for real-time project features."
    },
    {
      role: "Power BI Intern",
      company: "Cognifyz",
      period: "Oct 2025 – Nov 2025",
      description: "Completed a hands-on Power BI internship focused on data visualization, data analysis, Power Query, data modelling, and interactive business-intelligence dashboards.",
      tools: "Power BI, Power Query, data modelling, DAX",
      impact: "Transformed raw datasets into dashboard views and business insights for trend analysis and reporting."
    },
    {
      role: "Machine Learning Intern",
      company: "Acmegrade",
      period: "Oct 2024 – Nov 2024",
      description: "Completed practical machine-learning training in collaboration with Mood Indigo, IIT Bombay, covering model concepts, applications, and evaluation.",
      tools: "Python, Machine Learning, model training, evaluation",
      impact: "Strengthened hands-on understanding of machine-learning workflows during the 8 Oct–8 Nov 2024 program."
    },
    {
      role: "Cloud Computing Intern",
      company: "Gateway Software Solutions",
      period: "Jun 2024 – Jul 2024",
      description: "Completed cloud-computing training at Gateway Software Solutions in collaboration with Hewlett Packard Enterprise, exploring cloud technologies and industrial applications.",
      tools: "AWS, Cloud Computing, Big Data, cloud analytics",
      impact: "Developed practical familiarity with cloud service architecture and real-time industry use cases."
    },
    {
      role: "Artificial Intelligence Intern",
      company: "Elewayte",
      period: "Feb 2024 – Mar 2024",
      description: "Completed an Artificial Intelligence internship at Elewayte and worked on two hands-on projects exploring practical AI applications.",
      tools: "Artificial Intelligence, Machine Learning, Neural Networks, Deep Learning",
      impact: "Built practical exposure to AI project workflows and strengthened understanding of applied AI technologies."
    }
  ],

  education: [
    {
      degree: "B.E. Computer Science and Engineering",
      institution: "Dr. Mahalingam College of Engineering and Technology, Pollachi",
      period: "2022 – 2026"
    },
    {
      degree: "Higher Secondary School Leaving Certificate (HSC)",
      institution: "S.S.M. Lakshmi Ammal Matric Higher Secondary School, Komarapalayam",
      period: "2021 – 2022"
    }
  ],

  projects: [
    {
      id: "hotel-management-java",
      title: "Hotel Management System - Java",
      category: "Software & Dev",
      period: "Oct 2023 – Nov 2023",
      tags: ["Java", "OOP", "Automation", "Guest Management"],
      technologies: "Java, OOP, room booking, guest management",
      description: "Developed software to streamline and automate hotel operations, enhancing overall efficiency and guest experience.",
      role: "Developer",
      problem: "Manual hotel operations make room availability and guest check-in harder to manage consistently.",
      users: "Hotel staff and guests",
      workflow: "Guest request → room availability check → booking or check-in update → confirmation",
      contribution: "Designed the object-oriented booking and guest-management flow in Java.",
      result: "Functional prototype demonstrating automated room-booking decisions.",
      documentationUrl: "",
      image: "",
      snippet: `// Java Hotel Management Core Logic\npublic class HotelSystem {\n  public boolean bookRoom(int roomNo, Guest guest) {\n    if (room.isAvailable()) {\n      room.checkIn(guest);\n      return true;\n    }\n    return false;\n  }\n}`,
      githubUrl: "",
      liveUrl: ""
    },
    {
      id: "smart-cart",
      title: "IoT-Based Smart Shopping Cart System",
      category: "IoT & Embedded",
      period: "Jan 2024 – May 2024",
      tags: ["IoT", "Sensors", "Embedded C++", "Smart Checkout"],
      technologies: "C++, Arduino, sensors, embedded systems",
      description: "Created a retail technology solution that detects scamming using sensors and enables seamless checkout.",
      role: "IoT and Embedded Developer",
      problem: "Unscanned items can create checkout losses and require manual intervention in retail stores.",
      users: "Retail customers and store operators",
      workflow: "Item detected → scan state checked → alert triggered for mismatch → cart total updated",
      contribution: "Designed the sensor-based detection logic and the embedded checkout workflow.",
      result: "Working concept for detecting unscanned items and notifying users in real time.",
      documentationUrl: "https://github.com/Shripathi-Gunasekaran/Smart_Shopping_Cart",
      image: "https://github.com/Shripathi-Gunasekaran/Smart_Shopping_Cart/blob/main/Smart%20Shopping%20Cart%20Sample%20Image.png",
      snippet: `// Smart Cart Sensor Telemetry\nif(itemDetected && !isScanned) {\n  triggerAlarm();\n  displayAlert("Unscanned Item Detected!");\n} else {\n  updateCartTotal(itemPrice);\n}`,
      githubUrl: "https://github.com/Shripathi-Gunasekaran/Smart_Shopping_Cart",
      liveUrl: ""
    },
    {
      id: "hotel-management-python",
      title: "Hotel Management System - Python",
      category: "Software & Dev",
      period: "Mar 2024 – Apr 2024",
      tags: ["Python", "Operations", "Automation", "Guest Management"],
      technologies: "Python, automation, room-status management",
      description: "Designed a hotel management system using Python to automate operations enhancing guest management.",
      role: "Python Developer",
      problem: "Hotel teams need a simple way to track room status and guest check-ins.",
      users: "Hotel administrators and front-desk staff",
      workflow: "Guest ID and room input → availability validation → room status update → confirmation",
      contribution: "Implemented the room-status and check-in logic in Python.",
      result: "Functional command-line prototype for consistent guest check-in operations.",
      documentationUrl: "https://github.com/Shripathi-Gunasekaran/Hotel-Management-System#readme",
      image: "",
      snippet: `# Python Hotel Management Core\ndef check_in_guest(guest_id, room_no):\n    if room_status.get(room_no) == "Available":\n        room_status[room_no] = f"Occupied by {guest_id}"\n        print("Check-in successful")`,
      githubUrl: "https://github.com/Shripathi-Gunasekaran/Hotel-Management-System",
      liveUrl: ""
    },
    {
      id: "perishable-storage",
      title: "IoT-Based Monitoring System for Temperature, Humidity & Ammonia in Perishable Storage",
      category: "IoT & Embedded",
      period: "Feb 2025 – May 2025",
      tags: ["IoT Sensors", "Ammonia/Temp Monitor", "Published Paper", "Real-time Alerts"],
      technologies: "IoT sensors, embedded C++, temperature, humidity, ammonia monitoring",
      description: "Developed a sensor-based IoT system to monitor temperature, humidity, and ammonia in food storage, enabling real-time alerts and data-driven spoilage prevention.",
      role: "IoT System Developer and Paper Author",
      problem: "Perishable storage needs continuous environmental monitoring to identify spoilage risk early.",
      users: "Food-storage operators and supply-chain teams",
      workflow: "Sensors collect readings → telemetry is evaluated → threshold status is determined → alert is raised",
      contribution: "Designed the monitoring concept, sensor readings workflow, and real-time risk indicators.",
      result: "Published work with ISBN 978-93-6228-246-0; prototype readings show temperature, humidity, and ammonia status.",
      documentationUrl: "https://github.com/Shripathi-Gunasekaran/IoT-Based-Temperature-and-Humidity-Monitoring-System-for-Perishable-Foods#readme",
      evidenceUrl: "",
      image: "https://github.com/Shripathi-Gunasekaran/IoT-Based-Temperature-and-Humidity-Monitoring-System-for-Perishable-Foods/blob/main/Project%20Image.png",
      snippet: `SENSOR_READINGS:\nTemp: 4.2°C | Humidity: 85% | Ammonia: 12ppm\nStatus: NORMAL - Food Spoilage Risk LOW\nISBN: 978-93-6228-246-0`,
      githubUrl: "https://github.com/Shripathi-Gunasekaran/IoT-Based-Temperature-and-Humidity-Monitoring-System-for-Perishable-Foods",
      liveUrl: ""
    },
    {
      id: "covid-dashboard",
      title: "Power BI Dashboard – COVID-19 Analysis",
      category: "Data Analytics",
      period: "Jun 2025 – Aug 2025",
      tags: ["Power BI", "Data Visualization", "SDLC", "Excel"],
      technologies: "Power BI, DAX, Excel, data modelling, SDLC",
      description: "Developed an interactive COVID-19 data analysis dashboard using Power BI, following SDLC principles to ensure structured design, visualization, and insights on confirmed, recovered, active, and death cases.",
      role: "Data Analyst and Dashboard Developer",
      problem: "Raw COVID-19 data is difficult to interpret quickly without consistent KPIs and trend views.",
      users: "Analysts, educators, and decision-makers",
      workflow: "Excel data → cleaning and modelling → DAX measures → interactive KPI and trend visuals",
      contribution: "Structured the dashboard workflow and created the active-case DAX calculation.",
      result: "Interactive dashboard covering confirmed, recovered, active, and death cases; the project example records a 14.2% year-over-year decrease in active cases.",
      documentationUrl: "https://github.com/Shripathi-Gunasekaran/PowerBI-Project",
      evidenceUrl: "",
      image: "",
      snippet: `DAX Measure:\nActive Cases = SUM(Cases[Confirmed]) - (SUM(Cases[Recovered]) + SUM(Cases[Deaths]))\nKPI Trend: Active cases decreased by 14.2% YoY.`,
      githubUrl: "https://github.com/Shripathi-Gunasekaran/PowerBI-Project",
      liveUrl: ""
    },
    {
      id: "hr-attrition",
      title: "Power BI Dashboard - HR Employee Attrition",
      category: "Data Analytics",
      period: "Sep 2025 – Oct 2025",
      tags: ["Power BI", "HR Analytics", "Data Mining", "Retention"],
      technologies: "Power BI, DAX, HR analytics, data mining",
      description: "Developed an interactive Power BI dashboard to analyze employee attrition patterns, including trends by age, gender, job role, and department, enabling data-driven insights for workforce retention.",
      role: "Data Analyst and Dashboard Developer",
      problem: "HR teams need to understand where employee attrition is concentrated so retention efforts can be targeted.",
      users: "HR teams and workforce planners",
      workflow: "HR records → filtering and measures → demographic and department analysis → retention insight",
      contribution: "Created the attrition-rate measure and organized views by age, gender, role, and department.",
      result: "Interactive attrition dashboard; the project analysis identifies Sales as the highest-risk department at 18%.",
      documentationUrl: "https://github.com/Shripathi-Gunasekaran/PowerBI-Project",
      evidenceUrl: "",
      image: "",
      snippet: `Attrition Rate DAX:\nAttrition % = DIVIDE(COUNTROWS(Filter(HR, Attrition="Yes")), COUNTROWS(HR))\nInsight: Sales Dept shows 18% highest attrition risk.`,
      githubUrl: "https://github.com/Shripathi-Gunasekaran/PowerBI-Project",
      liveUrl: ""
    }
  ],

  achievements: [
    {
      title: "1st Prize – AI Tech Expo",
      issuer: "National AI Tech Expo",
      eventName: "AI Tech Expo",
      organizer: "National AI Tech Expo",
      description: "Awarded 1st Prize for presenting an innovative AI-driven real-time automation solution.",
      evidenceLabel: "Award proof: add certificate, event-result link, or photograph",
      evidenceUrl: "https://drive.google.com/drive/folders/1TiFrJU6XZqOiHYTQEfduASHk30x85p-e?usp=drive_link",
      certificateUrl: "https://drive.google.com/file/d/112TtW2as1PcseosOgkuGPUUXEy2ZllLC/view?usp=drive_link",
    },
    {
      title: "An IoT-Based Real-Time Monitoring System for Temperature, Humidity, and Ammonia Detection in Perishable Food Storage",
      issuer: "Karpagam Institute of Technology, Coimbatore - 11th ICLTSET’25 (ISBN: 978-93-6228-246-0)",
      description: "Developed and published an IoT sensor monitoring system for temperature, humidity, and ammonia in perishable storage.",
      evidenceLabel: "Publication proof: add paper PDF, DOI, or publisher URL",
      evidenceUrl: "https://github.com/Shripathi-Gunasekaran/IoT-Based-Temperature-and-Humidity-Monitoring-System-for-Perishable-Foods",
      certificateUrl: "https://drive.google.com/file/d/1TqH1yNKc9YV87wVnTsTDl1xjh0yQv3Cp/view?usp=drive_link",
      proceedingsUrl: "https://drive.google.com/file/d/1-LEKQa2mHa2R2y-JU6_G_RSAteZCI3KI/view?usp=drive_link",
    },
    {
    "title": "Python (Basic) Certificate",
    "issuer": "HackerRank",
    "description": "Successfully cleared the HackerRank assessment for Python (Basic)."
    ,"certificateUrl": "https://drive.google.com/file/d/1d97nMNMm7935btt3hDeAOtvqr56qrW1w/view?usp=drive_link"
  },
  {
    "title": "Introduction to Java",
    "issuer": "Coursera – LearnQuest",
    "description": "Successfully completed the Introduction to Java online non-credit course authorized by LearnQuest and offered through Coursera.",
    "certificateUrl": "https://drive.google.com/file/d/1MEE16uK2YcX5z6i8den_xvlWPdWenqu0/view?usp=drive_link"
  },
  {
    title: "Oracle Fusion Cloud Applications HCM Certified Foundations Associate",
    issuer: "Oracle",
    description: "Earned foundational knowledge of Oracle Fusion Cloud Applications HCM and enterprise HR technology through Oracle University.",
    certificateUrl: "https://drive.google.com/file/d/1AhkVx-m9DyvkdcdfUhBNJZUx3nXxXZuo/view?usp=drive_link",
  },
  {
    title: "Cambridge Linguaskill Business English Test",
    issuer: "Cambridge University Press & Assessment",
    date: "Overall CEFR Level B1 · Average score 143",
    description: "Completed an internationally aligned Business English assessment covering listening, reading, speaking, and writing. Scores: Listening 133 (A2), Reading 138 (A2), Speaking 151 (B1), Writing 151 (B1).",
    certificateUrl: "https://drive.google.com/file/d/14hYzwFH1YR5bduS1jQVLQCIw5O2wlGbl/view?usp=drive_link",
  },
  {
    title: "Power BI Workshop Certificate of Completion",
    issuer: "OfficeMaster",
    description: "Completed hands-on training in interactive dashboards, data modelling, Power Query transformation, AI-powered insights, and data-driven visualisation.",
    certificateUrl: "https://drive.google.com/file/d/13lJCosUlgcx6LMcm3W_3H0d_MTlkry5C/view?usp=drive_link",
  },
  {
    title: "EF SET English Certificate",
    issuer: "EF SET",
    date: "CEFR Level C1 Advanced · Score 70/100",
    description: "Demonstrated advanced English proficiency with strong reading and listening skills for academic research, professional collaboration, technical documentation, and global communication.",
    evidenceUrl: "https://lnkd.in/g_NjAW-x",
    certificateUrl: "https://drive.google.com/file/d/1KIgLAPyCUpNambPSk5TC6GZoJwIKscA6/view?usp=drive_link",
  },
  {
    title: "Data Science & Analytics",
    issuer: "HP LIFE · HP Foundation",
    description: "Completed an online course covering data science practices, analytics methodologies, data-driven decision-making, and the skills needed for a career in analytics.",
    certificateUrl: "https://drive.google.com/file/d/1i7noUsqbfwgOwfmv--eWo-yPj9Cs2JIy/view?usp=drive_link",
  }
  ,{
    title: "Deloitte Data Analytics Job Simulation",
    issuer: "Deloitte · Forage",
    description: "Completed a virtual experience focused on data analysis and forensic technology, solving practical challenges inspired by Deloitte professional work.",
    certificateUrl: "https://drive.google.com/file/d/16Z0KH9E6aFR0u-s7gw56G_gVWn1p4kNJ/view?usp=drive_link",
  },
  {
    title: "Hostel Welfare Committee Certificate of Appreciation",
    issuer: "Dr. Mahalingam College of Engineering and Technology",
    date: "2023 – 2025",
    description: "Recognized for leading and coordinating welfare activities, improving communication between students and administration, and supporting a positive hostel environment.",
    evidenceUrl: "https://drive.google.com/file/d/11jYUr87Z6dlw8aMwUxsPFG6CoENCwxh8/view?usp=drive_link",
    certificateUrl: "https://drive.google.com/file/d/1pfb0CtBsM8SGtIUci_Fdp_wJFbc384Jb/view?usp=drive_link",
  },
  {
    title: "Generative AI Workshop",
    issuer: "Amypo Technologies Pvt. Ltd.",
    description: "Completed hands-on learning in AI fundamentals, prompt engineering, ChatGPT, Midjourney, and practical generative AI platforms.",
    certificateUrl: "https://drive.google.com/file/d/1CKdb6MBiyUbj1_lAGQlE5wqFGMobBD0l/view?usp=drive_link",
  },
  {
    title: "Building Computer Vision Modules with Python",
    issuer: "Department of ECE, Karpagam College of Engineering",
    description: "Participated in a national-level workshop exploring practical Python applications for computer vision and image-based problem solving.",
    certificateUrl: "https://drive.google.com/file/d/1p6AOcTHQKTZaPFJr_W1sLv0FKdYpUuDY/view?usp=drive_link",
  },
  {
    title: "Industrial Visit – Robomiracle Technologies",
    issuer: "Robomiracle Technologies Pvt. Ltd.",
    description: "Completed an academic industrial visit focused on real-world engineering applications, technology operations, and industry knowledge sharing.",
    certificateUrl: "https://drive.google.com/file/d/1zVq1Cn1wVxM1CK6KQbnMSpN_aeGM8gUJ/view?usp=drive_link",
  },
  {
    title: "Application Development with Low Code No Code",
    issuer: "Dr. Mahalingam College of Engineering and Technology",
    description: "Completed a two-day workshop on rapid application development, functional prototyping, and low-code/no-code development approaches.",
    certificateUrl: "https://drive.google.com/file/d/1aJdMvFwIC9S3jmbX9Dj8VW2hCrhurt_T/view?usp=drive_link",
  },
  {
    title: "Professional Career Counselling Webinar",
    issuer: "Elewayte",
    description: "Participated in a career counselling webinar covering industry expectations, informed career decisions, and professional development planning.",
    evidenceLabel: "Certificate proof: add webinar certificate URL or image",
    certificateUrl: "https://drive.google.com/file/d/1pmOzAA-6IHt78cTV5k4Dow7uXmpz-jKb/view?usp=drive_link",
  },
  {
    title: "INTER “O” FEST-2K24 Technical Symposium",
    issuer: "Sree Sakthi Engineering College, Coimbatore",
    description: "Participated in a national-level technical symposium with exposure to web development, code debugging, workshops, and technical interactions.",
    certificateUrl: "https://drive.google.com/file/d/12RQU9V01TkEmaUcstCS2lDx8sJDOxSlw/view?usp=drive_link",
  },
  {
    title: "Oracle Cloud Success Navigator Essentials",
    issuer: "Oracle University",
    description: "Completed training in Oracle Cloud adoption strategies, enterprise best practices, and success planning for cloud transformation initiatives.",
    evidenceUrl: "https://lnkd.in/eFKXwDf7",
    certificateUrl: "https://drive.google.com/file/d/1uNq38NsDDv-qIZLRgW_flGVlc1bP48O2/view?usp=drive_link",
  },
  {
    title: "Introduction to Data Analytics",
    issuer: "Simplilearn SkillUp",
    date: "Certificate ID 8047690",
    description: "Completed a foundational course in data interpretation, analytics tools, business intelligence, and data-driven decision-making.",
    certificateUrl: "https://drive.google.com/file/d/1on-J--2o2BDi13o1ZY87IXbjsLAZ1Ia3/view?usp=drive_link",
  },
  {
    title: "CodeQuest MCQ Challenge – Elimination Round",
    issuer: "Code Clash 2025 · Unstop",
    description: "Received a Certificate of Participation after testing problem-solving skills in the CodeQuest MCQ elimination round of Code Clash 2025.",
    certificateUrl: "https://drive.google.com/file/d/1lXHnqiQQWxfLb-Ij-NCU9sE5Whz-hwNA/view?usp=drive_link",
  },
  {
    title: "Advanc ed Analytics with Power BI",
    issuer: "Future Forge Series 2024 · Pantech",
    description: "Completed an advanced Power BI program covering data visualization and analytics, and received a Certificate of Participation.",
    certificateUrl: "https://drive.google.com/file/d/1BPfxUjkKGRnf4eS_D5BAiMPgzsHTa8lv/view?usp=drive_link",
  },
  {
    title: "Artificial Intelligence Internship Completion",
    issuer: "Elewayte",
    description: "Completed an AI internship involving two hands-on projects and practical exposure to artificial-intelligence applications.",
    certificateUrl: "https://drive.google.com/file/d/1JbaQKlehXx_MZ_bfTlU5xdT7Tf4KaE8Q/view?usp=drive_link",
  },
  {
    title: "Machine Learning Training Completion",
    issuer: "Acmegrade · Mood Indigo, IIT Bombay",
    description: "Completed practical machine-learning training covering core concepts, applications, and model-focused learning activities.",
    certificateUrl: "https://drive.google.com/file/d/1X2-DyTnfkF9wsblB2U-nlvt27FlkZUh8/view?usp=drive_link",
  },
  {
    title: "Cloud Computing Internship Completion",
    issuer: "Gateway Software Solutions · Hewlett Packard Enterprise",
    description: "Completed cloud-computing training focused on cloud technologies and real-time industrial applications.",
    certificateUrl: "https://drive.google.com/file/d/155Mx25GrEdiMd1YW3CwNWtgfJTtswBoB/view?usp=drive_link",
  },
  {
    title: "Power BI Internship Completion",
    issuer: "Cognifyz Technologies",
    description: "Completed a Power BI internship involving data visualization, data analysis, Power Query, modelling, and interactive business-intelligence reports.",
    certificateUrl: "https://drive.google.com/file/d/1iKB-_M1XeEKeTFAWVBM2EWUjWj49SjAm/view?usp=drive_link",
  }
  ],

  testimonials: [
    {
      id: 1,
      rating: 5,
      quote: "Shri Pathi demonstrates excellent technical problem solving, fast adaptability to new frameworks, and solid software engineering standards.",
      name: "Yectra Technologies Team",
      role: "Engineering Mentor @ Yectra Tech"
    },
    {
      id: 2,
      rating: 5,
      quote: "His IoT sensor monitoring system project won 1st prize at the AI Tech Expo due to its practical real-world application and innovation.",
      name: "Tech Expo Jury",
      role: "Evaluation Committee"
    },
    {
      id: 3,
      rating: 5,
      label: "PROJECT HIGHLIGHT",
      quote: "The perishable-storage monitoring project combines temperature, humidity, and ammonia sensing with real-time risk indicators to support food-safety decisions.",
      name: "Perishable Storage IoT System",
      role: "Published research project · ISBN 978-93-6228-246-0"
    },
    {
      id: 4,
      rating: 5,
      label: "EXPERIENCE HIGHLIGHT",
      quote: "Power BI internship work focused on transforming raw datasets into interactive dashboards, using Power Query, data modelling, and visual analysis for business intelligence.",
      name: "Cognifyz Power BI Internship",
      role: "Data analytics and dashboard development · Oct–Nov 2025"
    },
    {
      id: 5,
      rating: 5,
      label: "PROJECT HIGHLIGHT",
      quote: "The smart shopping cart concept uses sensors and embedded logic to detect unscanned items, trigger an alert, and support a smoother checkout workflow.",
      name: "Smart Shopping Cart System",
      role: "IoT and embedded systems project · C++ and Arduino"
    },
    {
      id: 6,
      rating: 5,
      label: "LEARNING HIGHLIGHT",
      quote: "The certification and workshop journey spans full stack development, hardware and IoT systems, automation testing, generative AI, cloud computing, and data analytics.",
      name: "Continuous Learning Portfolio",
      role: "25+ credentials, workshops, internships, and technical projects"
    }
  ]
};
