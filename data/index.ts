export const navItems = [
  { name: "Top", link: "#home" },
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "A photo of my cat, Taro",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh] text-darkPurple",
    imgClassName: "w-full h-full object-cover object-center",
    titleClassName: "justify-end",
    img: "/Taro.jpg",
    spareImg: "",
  },
  {
    id: 2,
    title: "Passionate about creating impactful software solutions with a focus on quality and innovation. ",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "Skills",
    description: "Technologies I've worked with",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Always improving my skills and learning new technologies",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Currently on the lookout for new opportunities",
    description: "What am I doing now?",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    title: "Concious Carts",
    des: "A mobile app utilizing Gemini to give users an analysis of products in markets.",
    img: "/conciousCarts.jpg",
    iconLists: ["/firebase-original.svg", "/dart-original.svg", "/python-original.svg", "/androidstudio-original.svg", "/apple-original.svg"],
    link: "https://github.com/2SikNinja/Google-AI-Hackathon-Project",
  },
  {
    id: 2,
    title: "Media Music Recommender Web App (Pickify)",
    des: "A web app utilizing OpenAI to give users music recommendations based on their music taste.",
    img: "/mediaRecommender.jpg",
    iconLists: ["/php-original.svg", "/css3-original.svg", "javascript-original.svg", "/amazonwebservices-original-wordmark.svg",],
    link: "https://github.com/2SikNinja/Media-Recommender",
  },
  {
    id: 3,
    title: "Image Tagging Program Through Trained Datasets",
    des: "An application that uses AI to tag images based on trained datasets.",
    img: "/imageTagging.png",
    iconLists: ["/python-original.svg", "/tensorflow-original.svg"],
    link: "https://github.com/2SikNinja/Image-Tagging",
  },
  {
    id: 4,
    title: "Chess Using Trained Neural Network",
    des: "A chess game that uses a trained neural network to play against the user utilizing java swing for the GUI.",
    img: "/chess.jpg",
    iconLists: ["/java-original.svg"],
    link: "https://github.com/2SikNinja/Chess",
  },
  {
    id: 5,
    title: "Calculator App",
    des: "A calculator app that can perform basic arithmetic operations.",
    img: "/calculatorApp.PNG",
    iconLists: ["/java-original.svg"],
    link: "https://github.com/2SikNinja/Calculator-App",
  },
];

export const testimonials = [
  {
    quote:
      "",
    name: "",
    title: "",
  },
  {
    quote:
      "",
    name: "",
    title: "",
  },
  {
    quote:
      "",
    name: "",
    title: "",
  },
  {
    quote:
      "",
    name: "",
    title: "",
  },
  {
    quote:
      "",
    name: "",
    title: "",
  },
];

export const companies = [
  {
    id: 1,
    name: "cloudinary",
    img: "/cloud.svg",
    nameImg: "/cloudName.svg",
  },
  {
    id: 2,
    name: "appwrite",
    img: "/app.svg",
    nameImg: "/appName.svg",
  },
  {
    id: 3,
    name: "HOSTINGER",
    img: "/host.svg",
    nameImg: "/hostName.svg",
  },
  {
    id: 4,
    name: "stream",
    img: "/s.svg",
    nameImg: "/streamName.svg",
  },
  {
    id: 5,
    name: "docker.",
    img: "/dock.svg",
    nameImg: "/dockerName.svg",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Frontend Engineer Intern",
    desc: "Assisted in the development of a web-based platform using React.js, enhancing interactivity.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    title: "Mobile App Dev - JSM Tech",
    desc: "Designed and developed mobile app for both iOS & Android platforms using React Native.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "Freelance App Dev Project",
    desc: "Led the dev of a mobile app for a client, from initial concept to deployment on app stores.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp3.svg",
  },
  {
    id: 4,
    title: "Lead Frontend Developer",
    desc: "Developed and maintained user-facing features using modern frontend technologies.",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    url: "https://github.com/2SikNinja"
  },
  {
    id: 2,
    img: "/insta.svg",
    url: "https://www.instagram.com/ppeternnguyen"
  },
  {
    id: 3,
    img: "/link.svg",
    url: "https://www.linkedin.com/in/phupeternguyen/"
  },
];