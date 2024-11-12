"use server";

import { generateInterviewPrompt } from "@/util/promptGenrator";

export async function mockInterviewGenerate(prevState, formData, user) {
  const interviewDetails = {
    role: formData?.["role"],
    skillLevel: formData?.["skillLevel"],
    experience: formData?.["experience"],
    skills: formData?.["skills"],
    description: formData?.["description"],
    questionFormat: formData?.["questionFormat"],
    interviewQuestions: [],
    user: {
      id: user?.id,
    },
  };

  const promptGenerated = generateInterviewPrompt({
    role: interviewDetails?.["role"],
    skillLevel: interviewDetails?.["skillLevel"],
    experienceYears: interviewDetails?.["experience"],
    technologies: interviewDetails?.["skills"],
    description: interviewDetails?.["description"],
    questionFormat: interviewDetails?.["questionFormat"],
  });
  console.log("promptGenerated", promptGenerated);

  await new Promise((resolve) => setTimeout(resolve, 2000));
  return "success";
  //   await saveMeal(meal);
  //   revalidatePath("/meals");
  //   redirect("/meals");
}
