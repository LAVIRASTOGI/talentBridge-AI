import axiosInstance from "@/lib/axiosInstance";

export const signupUser = async (data) => {
  try {
    const response = await axiosInstance.post("/signup", data);
    return response.data;
  } catch (error) {
    // Properly handle axios error object
    const errorMessage =
      error.response?.data?.error ||
      error.message ||
      "An unexpected error occurred during signup";

    console.error("Error signing up:", {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });

    // Return a structured error response
    return {
      success: false,
      error: errorMessage,
      status: error.response?.status,
    };
  }
};
