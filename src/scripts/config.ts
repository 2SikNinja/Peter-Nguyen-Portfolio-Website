import { personalData } from '../data/personal'
import { projectsData } from '../data/projects'
import { educationData } from '../data/education'

export interface SectionConfig {
  id: string;
  enabled: boolean;
  alignment: 'left' | 'center' | 'right';
  component: string;
  title?: string;
  data?: string;
}

export interface NavigationItem {
  name: string;
  link: string;
}

export interface PortfolioConfig {
  sections: SectionConfig[];
  navigation: NavigationItem[];
  personal: typeof personalData;
  projects: typeof projectsData;
  educationData: typeof educationData;
  gridItems: Array<{
    id: number;
    title: string;
    description: string;
    image?: string;
  }>;
  socialMedia: Array<{
    id: number;
    name: string;
    icon: string;
    url: string;
  }>;
}

export const portfolioConfig: PortfolioConfig = {
  sections: [
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
  ],

  navigation: [
    { name: "Home", link: "#hero" },
    { name: "About", link: "#about" },
    { name: "Projects", link: "#projects" },
    { name: "Education", link: "#education" },
    { name: "Experience", link: "#experience" },
    { name: "Contact", link: "#contact" }
  ],

  personal: personalData,
  projects: projectsData,
  educationData: educationData,

  gridItems: [
    {
      id: 1,
      title: "A photo of my cat, Taro",
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
  ],

  socialMedia: [
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
  ]
};