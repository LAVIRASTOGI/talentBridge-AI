export const sidebarLinks = [
  {
    // imgURL: "/icons/Home.svg",
    route: "/",
    label: "Home",
  },

  {
    // imgURL: "/icons/upcoming.svg",
    route: "/AIMockInterview",
    label: "AI Mock Interview",
  },
  {
    // imgURL: "/mockInterview",
    route: "/mockInterview",
    label: "Mock Interview",
  },
  {
    // imgURL: "/mockInterview",
    route: "/quizzes",
    label: "Quizzes",
  },
  {
    // imgURL: "/icons/Video.svg",
    route: "/about-us",
    label: "About us",
  },
];

export const QUESTION_FORMATS = [
  { value: "conceptual", label: "Technical Concepts & Problem Solving" },
  { value: "multipleChoice", label: "Multiple Choice Questions (MCQs)" },
];

export const SKILL_LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export const DEFAULT_FORM_VALUES = {
  role: "",
  description: "",
  experience: "",
  skillLevel: "beginner",
  questionFormat: "conceptual",
  skills: [],
};

export const QUESTION_FORMATS_MAP = {
  conceptual: "Mixture of Problem Solving and Technical Concepts",
  multipleChoice: "Multiple Choice Questions (MCQs)",
};
