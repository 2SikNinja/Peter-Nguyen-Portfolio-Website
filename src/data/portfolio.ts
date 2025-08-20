export interface SectionConfig {
  id: string;
  enabled: boolean;
  alignment: 'left' | 'center' | 'right';
  component: string;
  title?: string;
  data?: string;
}

export interface GridItem {
  id: number;
  title: string;
  description: string;
  image?: string;
}

export interface SocialMediaItem {
  id: number;
  name: string;
  icon: string;
  url: string;
}

// ADD THIS NEW INTERFACE
export interface SkillsCategory {
  title: string;
  skills: string[];
}

export const portfolioSections: SectionConfig[] = [
  {
    id: "hero",
    enabled: true,
    alignment: "center",
    component: "Hero",
    title: undefined
  },
  {
    id: "about",
    enabled: true,
    alignment: "center",
    component: "About",
    title: "About Me",
    data: "gridItems"
  },
  // ADD THIS SKILLS SECTION (after about, before projects)
  {
    id: "skills",
    enabled: true,
    alignment: "center",
    component: "Skills",
    title: "My Skills",
    data: "skillsData"
  },
  {
    id: "projects",
    enabled: true,
    alignment: "center",
    component: "Projects",
    title: "Featured Projects",
    data: "projects"
  },
  {
    id: "education",
    enabled: true,
    alignment: "center",
    component: "Education",
    title: "Education",
    data: "educationData"
  },
  {
    id: "experience",
    enabled: true,
    alignment: "center",
    component: "Experience",
    title: "Experience",
    data: "experienceData"
  },
  {
    id: "contact",
    enabled: true,
    alignment: "center",
    component: "Contact",
    title: "Get In Touch"
  }
];

export const gridItems: GridItem[] = [
  {
    id: 1,
    title: "Meet Taro",
    description: "This is my cat Taro! He's my coding companion and the inspiration behind my love for creating user-friendly applications.",
    image: "/images/profile/taro.jpg"
  },
  {
    id: 2,
    title: "My Journey",
    description: "Recent graduate from California Polytechnic University of Pomona with a degree in Computer Science and a minor in Data Science. I'm passionate about creating impactful software solutions with a focus on quality and innovation."
  },
  {
    id: 3,
    title: "Currently",
    description: "I'm actively looking for new opportunities where I can contribute to exciting projects and continue growing as a software engineer. Always improving my skills and learning new technologies!"
  }
];

// ADD THIS SKILLS DATA
export const skillsData: SkillsCategory[] = [
  {
    title: "Frontend",
    skills: [
      "React",
      "Next.js", 
      "TypeScript",
      "HTML/CSS",
      "Tailwind CSS"
    ]
  },
  {
    title: "Backend", 
    skills: [
      "Python",
      "Node.js",
      "Java",
      "Express.js",
      "REST APIs"
    ]
  },
  {
    title: "AI/ML",
    skills: [
      "Machine Learning",
      "TensorFlow", 
      "Data Science",
      "Neural Networks"
    ]
  },
  {
    title: "Mobile",
    skills: [
      "Flutter",
      "Dart",
      "React Native",
      "Android Studio"
    ]
  },
  {
    title: "Database",
    skills: [
      "Firebase",
      "MongoDB",
      "MySQL",
      "PostgreSQL"
    ]
  },
  {
    title: "Cloud & DevOps",
    skills: [
      "AWS",
      "Docker",
      "Git",
      "CI/CD"
    ]
  }
];

export const socialMedia: SocialMediaItem[] = [
  {
    id: 1,
    name: "GitHub",
    icon: "/icons/social/github.svg",
    url: "https://github.com/2SikNinja"
  },
  {
    id: 2,
    name: "LinkedIn", 
    icon: "/icons/social/linkedin.svg",
    url: "https://www.linkedin.com/in/phupeternguyen/"
  },
  {
    id: 3,
    name: "Instagram",
    icon: "/icons/social/instagram.svg", 
    url: "https://www.instagram.com/ppeternnguyen"
  }
];

export const navigationItems = [
  { name: "Home", link: "#hero" },
  { name: "About", link: "#about" },
  { name: "Skills", link: "#skills" }, // ADD THIS NAVIGATION ITEM
  { name: "Projects", link: "#projects" },
  { name: "Education", link: "#education" },
  { name: "Experience", link: "#experience" },
  { name: "Contact", link: "#contact" }
];