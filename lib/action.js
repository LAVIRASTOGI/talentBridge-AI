"use server";

import { chatSession } from "@/util/geminiAI";
import { generateInterviewPrompt } from "@/util/promptGenrator";

export async function mockInterviewGenerate(prevState, formData, user) {
  try {
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

    const result = await chatSession.sendMessage(promptGenerated);
    //replace ```json and ``` with '' in one line
    const interviewQuestions = result.response
      .text()
      .replace(/```json|```/g, "")
      .trim();

    interviewDetails.interviewQuestions = JSON.parse(interviewQuestions);
    console.log(interviewDetails.interviewQuestions);
    return "success";
  } catch (err) {
    console.log(err);
    throw new Error(
      "Failed to generate interview questions Please Mention deatails Properly."
    );
  }

  //   await saveMeal(meal);
  //   revalidatePath("/meals");
  //   redirect("/meals");
}
