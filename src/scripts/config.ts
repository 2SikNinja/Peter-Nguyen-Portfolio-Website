import { personalData } from '../data/personal'
import { projectsData } from '../data/projects'
import { educationData } from '../data/education'
import { experienceData } from '../data/experience'
import { portfolioSections as sections, gridItems, socialMedia, navigationItems, skillsData } from '../data/portfolio'

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

export interface PortfolioConfig {
  sections: SectionConfig[];
  navigation: NavigationItem[];
  personal: typeof personalData;
  projects: typeof projectsData;
  educationData: typeof educationData;
  experienceData: typeof experienceData;
  gridItems: GridItem[];
  socialMedia: SocialMediaItem[];
  skillsData: typeof skillsData;
}

export const portfolioConfig: PortfolioConfig = {
  sections: sections,
  navigation: navigationItems,
  personal: personalData,
  projects: projectsData,
  educationData: educationData,
  experienceData: experienceData,
  gridItems: gridItems,
  socialMedia: socialMedia,
  skillsData: skillsData
};