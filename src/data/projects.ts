export interface Project {
  id: number;
  title: string;
  description: string;
  images: string[];
  techIcons: string[];
  link: string;
  featured: boolean;
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Conscious Carts",
    description: "A mobile app utilizing Gemini AI to give users detailed analysis of products in markets, helping them make informed purchasing decisions with real-time data and recommendations.",
    images: [
      "/images/projects/conscious-carts/main.jpg",
      "/images/projects/conscious-carts/screenshot-1.jpg",
      "/images/projects/conscious-carts/screenshot-2.jpg"
    ],
    techIcons: [
      "/icons/tech/database/firebase.svg",
      "/icons/tech/mobile/dart.svg",
      "/icons/tech/backend/python.svg"
    ],
    link: "https://github.com/2SikNinja/Google-AI-Hackathon-Project",
    featured: true
  },
  {
    id: 2,
    title: "Media Music Recommender (Pickify)",
    description: "A web application that uses OpenAI to provide personalized music recommendations based on user preferences, listening history, and advanced AI analysis of musical taste patterns.",
    images: [
      "/images/projects/pickify/main.jpg",
      "/images/projects/pickify/screenshot-1.jpg"
    ],
    techIcons: [
      "/icons/tech/backend/php.svg",
      "/icons/tech/frontend/javascript.svg",
      "/icons/tech/tools/aws.svg"
    ],
    link: "https://github.com/2SikNinja/Media-Recommender",
    featured: true
  },
  {
    id: 3,
    title: "AI Image Tagging System",
    description: "An intelligent application that automatically tags and categorizes images using trained machine learning datasets and computer vision techniques for enhanced image organization.",
    images: [
      "/images/projects/image-tagging/main.jpg"
    ],
    techIcons: [
      "/icons/tech/backend/python.svg",
      "/icons/tech/ai-ml/tensorflow.svg"
    ],
    link: "https://github.com/2SikNinja/Image-Tagging",
    featured: true
  },
  {
    id: 4,
    title: "Chess Using Trained Neural Network",
    description: "A sophisticated chess game powered by trained neural networks that can play against users, featuring an intuitive Java Swing GUI and advanced AI decision-making algorithms.",
    images: [
      "/images/projects/chess-ai/main.jpg"
    ],
    techIcons: [
      "/icons/tech/backend/java.svg"
    ],
    link: "https://github.com/2SikNinja/Chess",
    featured: true
  },
  {
    id: 5,
    title: "Calculator App",
    description: "A feature-rich calculator application built with Java, supporting basic and advanced mathematical operations with a clean, user-friendly interface design.",
    images: [
      "/images/projects/calculator/main.jpg"
    ],
    techIcons: [
      "/icons/tech/backend/java.svg"
    ],
    link: "https://github.com/2SikNinja/Calculator-App",
    featured: false
  }
];