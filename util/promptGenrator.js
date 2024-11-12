import { QUESTION_FORMATS_MAP } from "@/constant";

export function generateInterviewPrompt({
  role,
  experienceYears,
  skillLevel,
  technologies,
  questionCount = 1,
  description = "",
  questionFormat = "conceptual",
}) {
  const techStackValue = technologies ? technologies.join(", ") : "";

  return `Generate ${questionCount} interview questions in JSON format for a ${role} role
  with ${skillLevel} skill level and ${experienceYears} years of experience. 
  The candidate should be proficient in ${techStackValue}.
  Each question should be categorized as easy, medium, or tough.
  Return the response in the following JSON format:
  Please continue to generate ${questionCount} such interview questions according to the structure and requirements provided.
  The questions should be a ${QUESTION_FORMATS_MAP[questionFormat]}.
   ${
     questionFormat === "conceptual"
       ? `
  {
    "questions": [
      {
        "question": "question text",
        "topic": ${techStackValue},
        "subTopic": "Specific sub-topic here",
        "difficulty": "easy|medium|tough",
        "explanation": "detailed explanation",
      }
    ]
   
  }`
       : `
      {
    "questions": [
      {
        "question": "question text",
        "topic": ${techStackValue},
        "subTopic": "Specific sub-topic here",
        "difficulty": "easy|medium|tough",
        "options:" [
          "option 1",
          "option 2",
          "option 3",
          "option 4",
        ],
        "correct answer": "option 1",
        "answer": "detailed explanation",
      }
    ]
  
  }`
   }`;
}
