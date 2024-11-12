"use server";
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
      // userName: user?.username,
      id: user?.id,
    },
  };
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("interviewDetails666", interviewDetails);
  //   const succes = await saveInterview(interviewDetails);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return "succes";
  //   await saveMeal(meal);
  //   revalidatePath("/meals");
  //   redirect("/meals");
}
