export interface EducationItem {
  id: number;
  degree: string;
  school: string;
  period: string;
  gpa: string;
  description: string;
  minor?: string;
}

export interface CourseItem {
  code: string;
  name: string;
  category: string;
}

export const educationData: EducationItem[] = [
  {
    id: 1,
    degree: "Bachelor of Science in Computer Science",
    school: "California Polytechnic University, Pomona",
    period: "2020 - 2024",
    gpa: "3.7 GPA",
    description: "Focused on software engineering, data structures, algorithms, and artificial intelligence. Completed coursework in machine learning, database systems, and software development methodologies.",
    minor: "Minor in Data Science"
  }
];

export const courseworkData: CourseItem[] = [
  { code: "CS 061", name: "Machine Organization and Assembly Language Programming", category: "Systems" },
  { code: "CS 100", name: "Software Construction", category: "Software Engineering" },
  { code: "CS 110", name: "Principles of Web Development", category: "Web Development" },
  { code: "CS 111", name: "Discrete Structures", category: "Mathematics" },
  { code: "CS 120A", name: "Logic Design", category: "Hardware" },
  { code: "CS 141", name: "Intermediate Data Structures and Algorithms", category: "Algorithms" },
  { code: "CS 150", name: "The Theory of Automata and Formal Languages", category: "Theory" },
  { code: "CS 153", name: "Compiler Design", category: "Systems" },
  { code: "CS 154", name: "Design of Operating Systems", category: "Systems" },
  { code: "CS 160", name: "Concurrent Programming and Parallel Systems", category: "Systems" },
  { code: "CS 161", name: "Design and Architecture of Computer Systems", category: "Systems" },
  { code: "CS 166", name: "Database Management Systems", category: "Database" },
  { code: "CS 170", name: "Introduction to Artificial Intelligence", category: "AI/ML" },
  { code: "CS 172", name: "Introduction to Information Retrieval", category: "AI/ML" },
  { code: "CS 175", name: "Entrepreneurship in Computing", category: "Business" },
  { code: "CS 178A", name: "Project Sequence in CSE", category: "Capstone" },
  { code: "CS 178B", name: "Project Sequence in CSE", category: "Capstone" },
  { code: "CS 180", name: "Introduction to Software Engineering", category: "Software Engineering" }
];