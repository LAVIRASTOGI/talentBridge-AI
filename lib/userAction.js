import { signInUser, signupUser } from "@/app/services/user";

export async function signUpHandler(formData) {
  try {
    const {
      name,
      emailId,
      phoneNumber,
      username,
      password,
      skills,
      yearsOfExperience,
    } = formData;

    let inputData = {
      name,
      emailId,
      phoneNumber,
      username,
      password,
      skills,
      yearsOfExperience,
    };

    const signUpUserDetails = await signupUser(inputData);
    if (signUpUserDetails?.success) {
      return {
        success: true,
        message: "User signed up successfully",
        data: signUpUserDetails,
      };
    } else {
      throw new Error(
        signUpUserDetails?.error ||
          "Error occured While SignUp. Please Try After Sometime hhh"
      );
    }
  } catch (error) {
    console.log("message", error);
    throw new Error(
      error?.message || "Error occured While SignUp. Please Try After Sometime"
    );
  }
}

export async function signInHandler(formData) {
  try {
    const { email_username, password } = formData;
    let inputData = {
      email_username,
      password,
    };

    const signInResult = await signInUser(inputData);
    if (signInResult?.success) {
      return {
        success: true,
        message: "User signed in successfully",
        data: signInResult,
      };
    } else {
      throw new Error(
        signInResult?.error ||
          "Error occured While SignIn. Please Try After Sometime"
      );
    }
  } catch (error) {
    console.log("message", error);
    throw new Error(
      error?.message || "Error occured While SignIn. Please Try After Sometime"
    );
  }
}
