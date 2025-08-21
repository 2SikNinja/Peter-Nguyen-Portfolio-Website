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
    title: "Software Developer",
    company: "Best Friends Animal Society",
    period: "February 2025 – Present",
    location: "Los Angeles, CA",
    description: "Developed responsive pet adoption platform using React and Node.js with Petfinder API integration to aggregate listings from multiple adoption centers across Los Angeles County. Implemented location-based search functionality using Google Maps API enabling users to discover available pets within customizable radius settings and view real-time shelter availability data. Designed and maintained MySQL database schema for animal profiles and adoption records while collaborating with shelter coordinators to streamline data entry workflows and improve information accuracy.",
    technologies: ["React", "Node.js", "Petfinder API", "Google Maps API", "MySQL", "JavaScript"]
  },
  {
    id: 2,
    title: "Data Analyst Intern",
    company: "HAPII Lab",
    period: "September 2023 – June 2024",
    location: "Pomona, CA",
    description: "Developed full-stack survey application comparing three recommender system algorithms using JavaScript frontend and Firebase backend to collect user preference data for machine learning research. Executed cross-cultural data collection study reaching 1,000+ international participants through Amazon Mechanical Turk platform while implementing data validation and quality assurance protocols. Identified actionable insights improving algorithm accuracy by 15% by performing statistical analysis in Python using Pandas for data manipulation and Matplotlib for data visualization of geographical preference patterns.",
    technologies: ["JavaScript", "Firebase", "Python", "Pandas", "Matplotlib", "Amazon Mechanical Turk", "Machine Learning"]
  }
];