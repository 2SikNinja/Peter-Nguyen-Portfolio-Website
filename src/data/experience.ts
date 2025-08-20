export interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "Tech Innovation Labs",
    period: "Summer 2023",
    location: "Los Angeles, CA",
    description: "Developed and maintained web applications using React.js and Node.js. Collaborated with senior developers to implement new features and optimize existing code. Participated in code reviews and Agile development practices.",
    technologies: ["React", "Node.js", "JavaScript", "Git", "MongoDB"]
  },
  {
    id: 2,
    title: "Research Assistant",
    company: "Cal Poly Pomona - Computer Science Department",
    period: "Fall 2022 - Spring 2023",
    location: "Pomona, CA",
    description: "Assisted in machine learning research projects focused on neural network optimization. Implemented data preprocessing pipelines and contributed to academic publications on AI applications.",
    technologies: ["Python", "TensorFlow", "Data Analysis", "Machine Learning", "Research"]
  },
  {
    id: 3,
    title: "Freelance Web Developer",
    company: "Self-Employed",
    period: "2021 - Present",
    location: "Remote",
    description: "Designed and developed custom websites for small businesses and startups. Managed full project lifecycle from client consultation to deployment and maintenance.",
    technologies: ["HTML/CSS", "JavaScript", "PHP", "WordPress", "UI/UX Design"]
  }
];