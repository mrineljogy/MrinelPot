export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  videos?: string[];
  tags: string[];
  overview: string;
  details: string[];
  category: "personal" | "school";
  badge?: string;
  externalLinks?: {
    label: string;
    url: string;
  }[];
}

export const projects: Project[] = [
  {
    id: "hydrosave-plus",
    title: "Hydrosave+",
    description: "AI-driven smart water management system with real-time monitoring and consumption forecasting.",
    thumbnail: "/project-hydrosave.jpg",
    images: ["/project-hydrosave.jpg"],
    tags: ["ESP32", "Arduino", "IoT", "Linear Regression", "React", "MQTT", "Supabase"],
    overview: "An AI-driven smart water management system using ESP32/Arduino with water-level, TDS, and flow-rate sensors, achieving real-time monitoring at 1-second intervals.",
    details: [
      "• Engineered a cloud-connected MQTT to Supabase data pipeline feeding an interactive React dashboard for live analytics and consumption visualisation.",
      "• Implemented a Linear Regression model (R² = 0.91) forecasting daily household water usage, enabling proactive conservation alerts."
    ],
    category: "school"
  },
  {
    id: "asl-sports-league",
    title: "ASL Sports League Management System",
    description: "Full-stack sports league platform with live score tracking and real-time rankings.",
    thumbnail: "/project-asl.jpg",
    images: ["/project-asl.jpg"],
    tags: ["Next.js", "MongoDB", "Node.js", "Express.js"],
    overview: "Built a full-stack sports league platform managing 10+ teams and 50+ fixtures with live score tracking and real-time ranking for an inter-college tournament.",
    details: [
      "• Engineered automated fixture scheduling algorithms, reducing administrative setup from hours to minutes.",
      "• Integrated a fantasy league module driving a 40% increase in user engagement during the tournament period."
    ],
    category: "school"
  },
  {
    id: "medimetrics",
    title: "MediMetrics – Patient Health Analytics Dashboard",
    description: "Healthcare analytics dashboard integrating patient vitals, appointments, and treatment outcomes.",
    thumbnail: "/project-medimetrics.jpg",
    images: ["/project-medimetrics.jpg"],
    tags: ["Python", "SQL", "Power BI", "Pandas"],
    overview: "Designed a healthcare analytics dashboard integrating patient vitals, appointment history, and treatment outcomes from structured hospital datasets.",
    details: [
      "• Built ETL pipelines using Python and SQL to clean and transform raw medical records, reducing data inconsistencies by 35% before loading into Power BI.",
      "• Developed KPI visualisations for patient readmission rates, treatment duration, and department load, enabling data-driven clinical decision-making."
    ],
    category: "personal"
  },
  {
    id: "cybersentinel",
    title: "CyberSentinel – Network Threat Detection System",
    description: "Real-time network intrusion detection system classifying normal vs. malicious traffic.",
    thumbnail: "/project-cybersentinel.jpg",
    images: ["/project-cybersentinel.jpg"],
    tags: ["Python", "Scikit-learn", "Flask", "Random Forest"],
    overview: "Built a real-time network intrusion detection system using machine learning to classify normal vs. malicious traffic patterns from network log datasets.",
    details: [
      "• Trained Random Forest and Logistic Regression models achieving 78% classification accuracy on benchmark network security datasets.",
      "• Developed a Flask-based monitoring dashboard displaying live threat alerts, traffic anomalies, and model confidence scores for rapid incident response."
    ],
    category: "personal"
  },
  {
    id: "ai-personal-assistant",
    title: "AI Personal Assistant",
    description: "Conversational AI assistant for personalised study planning and productivity coaching.",
    thumbnail: "/project-assistant.jpg",
    images: ["/project-assistant.jpg"],
    tags: ["Python", "JavaScript", "Generative AI", "NLP"],
    overview: "Built a conversational AI assistant using prompt engineering and LLM API integration for personalised study planning and productivity coaching.",
    details: [
      "• Developed an automated roadmap generator breaking long-term learning goals into weekly schedules, adopted by 15+ beta testers."
    ],
    category: "personal"
  }
];
