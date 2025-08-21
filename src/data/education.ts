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
   gpa: "3.44 GPA",
   description: "Focused on software engineering, data structures, algorithms, artificial intelligence, and machine learning. Completed comprehensive coursework in systems programming, database design, mobile development, and big data analytics.",
   minor: "Minor in Data Science"
 }
];

export const courseworkData: CourseItem[] = [
 // Programming and Software Development
 { code: "CS 1400", name: "Intro Programming Problem Solving", category: "Programming" },
 { code: "CS 2560", name: "C++ Programming", category: "Programming" },
 { code: "CS 2520", name: "Python for Programmers", category: "Programming" },
 { code: "CS 2600", name: "Systems Programming", category: "Programming" },
 { code: "CS 3560", name: "Object-Oriented Design and Programming", category: "Programming" },
 { code: "CS 4080", name: "Concepts of Programming Languages", category: "Programming" },
 
 // Data Structures and Algorithms
 { code: "CS 1300", name: "Discrete Structures", category: "Mathematics" },
 { code: "CS 2400", name: "Data Structures and Advanced Programming", category: "Data Structures" },
 { code: "CS 3310", name: "Design and Analysis of Algorithms", category: "Algorithms" },
 
 // Systems and Architecture
 { code: "CS 2640", name: "Computer Organization and Assembly Programming", category: "Systems" },
 { code: "CS 3650", name: "Computer Architecture", category: "Systems" },
 { code: "CS 4310", name: "Operating Systems", category: "Systems" },
 
 // Theory and Mathematics
 { code: "CS 3110", name: "Formal Languages and Automata", category: "Theory" },
 { code: "CS 3010", name: "Numerical Methods and Computing", category: "Mathematics" },
 { code: "CS 4230", name: "Social Computing", category: "Mathematics" },
 
 // Artificial Intelligence and Machine Learning
 { code: "CS 4200", name: "Artificial Intelligence", category: "AI/ML" },
 { code: "CS 4210", name: "Machine Learning and Its Applications", category: "AI/ML" },
 { code: "CS 4650", name: "Big Data Analytics and Cloud Computing", category: "AI/ML" },
 
 // Database and Information Systems
 { code: "CS 4350", name: "Database Systems", category: "Database" },
 
 // Mobile and Application Development
 { code: "CS 4750", name: "Mobile Application Development", category: "Mobile Development" },
 
 // Software Engineering and Project Management
 { code: "CS 4800", name: "Software Engineering", category: "Software Engineering" },
 { code: "CS 4610", name: "Undergraduate Research", category: "Capstone" },
 { code: "CS 4620", name: "Undergraduate Research II", category: "Capstone" },
 { code: "CS 4630", name: "Undergraduate Seminar", category: "Capstone" },
 
 // Social and Ethical Computing
 { code: "CS 3750", name: "Computers and Society", category: "Ethics" },
 
 // Special Topics
 { code: "CS 4990", name: "Prompt Engineering", category: "AI/ML" }
];