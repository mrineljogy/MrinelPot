export interface Skill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  label: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    label: "Languages",
    skills: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    ]
  },
  {
    label: "Web & Backend",
    skills: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "REST APIs", icon: "/icon-tech.svg" },
    ]
  },
  {
    label: "Data & Analytics",
    skills: [
      { name: "Power BI", icon: "/icon-powerbi.svg" },
      { name: "Tableau", icon: "/icon-tableau.svg" },
      { name: "Excel", icon: "/icon-excel.svg" },
      { name: "Advanced Excel", icon: "/icon-excel.svg" },
      { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
      { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
      { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
      { name: "Matplotlib", icon: "/icon-matplotlib.svg" },
      { name: "Power Query", icon: "/icon-powerquery.svg" },
      { name: "DAX", icon: "/icon-tech.svg" },
      { name: "ETL", icon: "/icon-tech.svg" },
    ]
  },
  {
    label: "Machine Learning & AI",
    skills: [
      { name: "Scikit-learn", icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
      { name: "OpenCV", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
      { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
      { name: "Linear Regression", icon: "/icon-tech.svg" },
      { name: "Logistic Regression", icon: "/icon-tech.svg" },
      { name: "Random Forest", icon: "/icon-tech.svg" },
      { name: "KNN", icon: "/icon-tech.svg" },
      { name: "SVM", icon: "/icon-tech.svg" },
      { name: "K-Means", icon: "/icon-tech.svg" },
      { name: "PCA", icon: "/icon-tech.svg" },
      { name: "Predictive Analytics", icon: "/icon-tech.svg" },
      { name: "LLM API Integration", icon: "/icon-tech.svg" },
      { name: "Prompt Engineering", icon: "/icon-tech.svg" },
    ]
  },
  {
    label: "Databases & Cloud",
    skills: [
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Supabase", icon: "https://cdn.simpleicons.org/supabase/3ECF8E" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      { name: "MQTT", icon: "https://cdn.simpleicons.org/mqtt/660066" },
    ]
  },
  {
    label: "IoT & Embedded",
    skills: [
      { name: "ESP32", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" },
      { name: "Arduino", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" },
      { name: "Embedded C", icon: "/icon-tech.svg" },
      { name: "Sensor Integration", icon: "/icon-tech.svg" },
      { name: "Circuit Design", icon: "/icon-tech.svg" },
    ]
  },
  {
    label: "Tools & Platforms",
    skills: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Netlify", icon: "https://cdn.simpleicons.org/netlify/00C7B7" },
      { name: "Render", icon: "https://cdn.simpleicons.org/render/46E3B7" },
      { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/FFFFFF" },
    ]
  }
];
