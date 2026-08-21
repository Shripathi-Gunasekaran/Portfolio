const PORTFOLIO_DATA = {
  personal: {
    name: "Shri Pathi G",
    role: "Software Engineer",
    subtag: "Hello .",
    tagline: "Computer Science Engineering graduate specializing in Software Development, QA Testing, IoT, and Data Analytics.",
    bio: "I am a Computer Science Engineering graduate with hands-on experience in software development, testing, AI/ML, IoT, and data analytics. During my internship at Yectra Technologies, I worked on real-time projects involving frontend development, API integration, and software testing. I am passionate about building practical solutions, learning emerging technologies, and contributing to impactful projects.",
    degree: "B.E. Computer Science and Engineering (2022 - 2026)",
    college: "Dr. Mahalingam College of Engineering and Technology, Pollachi",
    location: "Bhavani, Tamil Nadu",
    phone: "9344752868",
    email: "shrisekar3@gmail.com",
    github: "https://github.com/Shripathi-Gunasekaran",
    linkedin: "https://linkedin.com/in/shripathi-gunasekaran-5bb7732b1",
    resume: "assets/Shri_Pathi Software_Engineer.pdf",
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
    { number: 5, suffix: "+", label: "Industry Certifications" }
  ],

  categorizedSkills: {
    "Development": ["React", "Next.js", "TypeScript", "JavaScript", "Python", "C/C++", "Java", "HTML5", "CSS3"],
    "Testing": ["Cypress", "Selenium", "Manual Testing", "UI Testing", "API Testing"],
    "Data & AI": ["Power BI", "Machine Learning", "Generative AI", "Tableau", "Excel"],
    "Cloud & Tools": ["AWS", "Git", "GitHub", "Linux", "Docker", "N8N", "Flowise"],
    "Databases": ["SQL", "MongoDB"]
  },

  skills: [
    "React", "Next.js", "TypeScript", "JavaScript", "Python", "C/C++", "Java",
    "Cypress", "Selenium", "Manual Testing", "Power BI", "Machine Learning",
    "Generative AI", "AWS", "Git", "GitHub", "Linux", "Docker", "SQL", "MongoDB"
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
      title: "IoT & Cloud Engineering",
      description: "Designing real-time sensor monitoring systems, AWS Cloud architectures, and automated IoT telemetry solutions.",
      featured: false
    }
  ],

  experience: [
    {
      role: "Full Stack Developer Intern",
      company: "Yectra Technologies Private Limited",
      period: "Jan 2026 – Present",
      description: "Worked on real-time projects involving frontend UI development, API integration, and software testing using Cypress."
    },
    {
      role: "Power BI Intern",
      company: "Cognifyz",
      period: "Oct 2025 – Nov 2025",
      description: "Developed interactive Power BI dashboards for data analytics, visualization, and business intelligence insights."
    },
    {
      role: "Machine Learning Intern",
      company: "Acmegrade",
      period: "Oct 2024 – Nov 2024",
      description: "Gained foundational knowledge in Machine Learning algorithms, supervised & unsupervised model training, and evaluation."
    },
    {
      role: "Cloud Computing Intern",
      company: "Gateway Software Solutions",
      period: "Jun 2024 – Jul 2024",
      description: "Gained core knowledge in Cloud Computing concepts, AWS Core Services, Big Data architecture, and cloud analytics."
    },
    {
      role: "Artificial Intelligence Intern",
      company: "Elewayte",
      period: "Feb 2024 – Mar 2024",
      description: "Explored AI fundamentals, Neural Networks, Machine Learning algorithms, and Deep Learning model architectures."
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
      description: "Developed software to streamline and automate hotel operations, enhancing overall efficiency and guest experience.",
      snippet: `// Java Hotel Management Core Logic\npublic class HotelSystem {\n  public boolean bookRoom(int roomNo, Guest guest) {\n    if (room.isAvailable()) {\n      room.checkIn(guest);\n      return true;\n    }\n    return false;\n  }\n}`,
      githubUrl: "https://github.com/Shripathi-Gunasekaran",
      liveUrl: "https://github.com/Shripathi-Gunasekaran"
    },
    {
      id: "smart-cart",
      title: "IoT-Based Smart Shopping Cart System",
      category: "IoT & Embedded",
      period: "Jan 2024 – May 2024",
      tags: ["IoT", "Sensors", "Embedded C++", "Smart Checkout"],
      description: "Created a retail technology solution that detects scamming using sensors and enables seamless checkout.",
      snippet: `// Smart Cart Sensor Telemetry\nif(itemDetected && !isScanned) {\n  triggerAlarm();\n  displayAlert("Unscanned Item Detected!");\n} else {\n  updateCartTotal(itemPrice);\n}`,
      githubUrl: "https://github.com/Shripathi-Gunasekaran",
      liveUrl: "https://github.com/Shripathi-Gunasekaran"
    },
    {
      id: "hotel-management-python",
      title: "Hotel Management System - Python",
      category: "Software & Dev",
      period: "Mar 2024 – Apr 2024",
      tags: ["Python", "Operations", "Automation", "Guest Management"],
      description: "Designed a hotel management system using Python to automate operations enhancing guest management.",
      snippet: `# Python Hotel Management Core\ndef check_in_guest(guest_id, room_no):\n    if room_status.get(room_no) == "Available":\n        room_status[room_no] = f"Occupied by {guest_id}"\n        print("Check-in successful")`,
      githubUrl: "https://github.com/Shripathi-Gunasekaran",
      liveUrl: "https://github.com/Shripathi-Gunasekaran"
    },
    {
      id: "perishable-storage",
      title: "IoT-Based Monitoring System for Temperature, Humidity & Ammonia in Perishable Storage",
      category: "IoT & Embedded",
      period: "Feb 2025 – May 2025",
      tags: ["IoT Sensors", "Ammonia/Temp Monitor", "Published Paper", "Real-time Alerts"],
      description: "Developed a sensor-based IoT system to monitor temperature, humidity, and ammonia in food storage, enabling real-time alerts and data-driven spoilage prevention.",
      snippet: `SENSOR_READINGS:\nTemp: 4.2°C | Humidity: 85% | Ammonia: 12ppm\nStatus: NORMAL - Food Spoilage Risk LOW\nISBN: 978-93-6228-246-0`,
      githubUrl: "https://github.com/Shripathi-Gunasekaran",
      liveUrl: "https://github.com/Shripathi-Gunasekaran"
    },
    {
      id: "covid-dashboard",
      title: "Power BI Dashboard – COVID-19 Analysis",
      category: "Data Analytics",
      period: "Jun 2025 – Aug 2025",
      tags: ["Power BI", "Data Visualization", "SDLC", "Excel"],
      description: "Developed an interactive COVID-19 data analysis dashboard using Power BI, following SDLC principles to ensure structured design, visualization, and insights on confirmed, recovered, active, and death cases.",
      snippet: `DAX Measure:\nActive Cases = SUM(Cases[Confirmed]) - (SUM(Cases[Recovered]) + SUM(Cases[Deaths]))\nKPI Trend: Active cases decreased by 14.2% YoY.`,
      githubUrl: "https://github.com/Shripathi-Gunasekaran",
      liveUrl: "https://github.com/Shripathi-Gunasekaran"
    },
    {
      id: "hr-attrition",
      title: "Power BI Dashboard - HR Employee Attrition",
      category: "Data Analytics",
      period: "Sep 2025 – Oct 2025",
      tags: ["Power BI", "HR Analytics", "Data Mining", "Retention"],
      description: "Developed an interactive Power BI dashboard to analyze employee attrition patterns, including trends by age, gender, job role, and department, enabling data-driven insights for workforce retention.",
      snippet: `Attrition Rate DAX:\nAttrition % = DIVIDE(COUNTROWS(Filter(HR, Attrition="Yes")), COUNTROWS(HR))\nInsight: Sales Dept shows 18% highest attrition risk.`,
      githubUrl: "https://github.com/Shripathi-Gunasekaran",
      liveUrl: "https://github.com/Shripathi-Gunasekaran"
    }
  ],

  achievements: [
    {
      title: "1st Prize – AI Tech Expo",
      issuer: "National AI Tech Expo",
      description: "Awarded 1st Prize for presenting an innovative AI-driven real-time automation solution."
    },
    {
      title: "IoT-Based Real-Time Monitoring System",
      issuer: "11th IC-LTSET (ISBN: 978-93-6228-246-0)",
      description: "Developed and published an IoT sensor monitoring system for temperature, humidity, and ammonia in perishable storage."
    },
    {
      title: "COVID-19 Data Analysis Dashboard",
      issuer: "Power BI Analytics",
      description: "Built an interactive Power BI analytics dashboard following SDLC principles to visualize key healthcare metrics."
    },
    {
      title: "Technical Workshops & Paper Presentations",
      issuer: "Sree Sakthi & Karpagam Colleges of Engineering",
      description: "Participated and presented papers on AI in Healthcare & Smart AI Shopping Trolley Systems."
    },
    {
    "title": "Python (Basic) Certificate",
    "issuer": "HackerRank",
    "date": "20 Apr 2024",
    "description": "Successfully cleared the HackerRank assessment for Python (Basic)."
  },
  {
    "title": "Introduction to Java",
    "issuer": "Coursera – LearnQuest",
    "date": "Sep 1, 2023",
    "description": "Successfully completed the Introduction to Java online non-credit course authorized by LearnQuest and offered through Coursera."
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
    }
  ]
};
