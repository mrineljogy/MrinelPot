export interface ExperienceItem {
  title: string;
  organization: string;
  period: string;
  logo: string;
  responsibilities: string[];
  github?: string;
  current?: boolean;
}

export const workExperience: ExperienceItem[] = [
  {
    title: "Data Analytics Intern",
    organization: "Camerin Health Technologies Pvt. Ltd.",
    period: "May 2026 - Present",
    current: true,
    logo: "",
    responsibilities: [
      "Built end-to-end analytics solutions using Python, SQL, Power BI, Tableau, and Advanced Excel, applying ETL pipelines, DAX, and Power Query to real-world healthcare and e-commerce datasets.",
      "Developed a Sales Dashboard (Excel), Product Sales Dashboard (Python + Power BI), and a Customer Analytics Dashboard analysing churn and behaviour trends on live banking and e-commerce data.",
      "Automated data transformation workflows, reducing manual preparation time and improving pipeline reliability across multiple reporting cycles."
    ]
  },
  {
    title: "Full Stack Developer Intern",
    organization: "Rajagiri School of Engineering & Technology",
    period: "May 2025 - June 2025",
    logo: "",
    responsibilities: [
      "Built responsive web interfaces using React and Next.js, integrating RESTful APIs with a PostgreSQL backend as part of a 4-person development team.",
      "Delivered two end-to-end features - user authentication and a dynamic analytics dashboard - within a 6-week sprint cycle."
    ]
  },
  {
    title: "Robotics Intern",
    organization: "Techbyheart",
    period: "May 2023 - June 2023",
    logo: "",
    responsibilities: [
      "Programmed ESP32/Arduino microcontrollers for IoT robotic systems, implementing real-time sensor data acquisition and actuation logic.",
      "Designed and assembled embedded circuits integrating ultrasonic, temperature, and proximity sensors for autonomous navigation features."
    ]
  },
  {
    title: "Cyber Security Intern",
    organization: "Zindot Innovations",
    period: "December 2022",
    logo: "",
    responsibilities: [
      "Conducted vulnerability assessments and assisted ethical hacking exercises using industry-standard tools, identifying 5+ simulated network weaknesses.",
      "Documented threat analysis reports supporting the security audit pipeline and incident response practices."
    ]
  }
];

export const education: ExperienceItem[] = [
  {
    title: "B.Tech in Computer Science and Engineering",
    organization: "Albertian Institute of Science and Technology",
    period: "2022 - 2026",
    logo: "",
    responsibilities: [
      "KTU - CGPA: 7.26",
      "Certifications: AI for Cybersecurity (Udemy, Dec 2024); Generative AI and Applications (Coursera, Nov 2024); Core Full Stack Internship Program (RSET, June 2025)"
    ]
  },
  {
    title: "Class XII (CBSE) - 85%",
    organization: "Navy Children School",
    period: "2022",
    logo: "",
    responsibilities: []
  },
  {
    title: "Class X (CBSE) - 91%",
    organization: "Navy Children School",
    period: "2020",
    logo: "",
    responsibilities: []
  }
];
