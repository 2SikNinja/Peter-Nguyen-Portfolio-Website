export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  image: string;
  email: string;
  resumeUrl: string;
}

export const personalData: PersonalInfo = {
  name: "Peter Nguyen",
  title: "Software Engineer",
  subtitle: "Software Engineer specializing in AI, Machine Learning, and Full-Stack Development. Passionate about creating innovative solutions and learning new technologies.",
  image: "/src/assets/peterNguyenIMG.JPG",
  email: "peter.nguyen2121@gmail.com",
  resumeUrl: "/documents/peter-nguyen-resume.pdf"
};