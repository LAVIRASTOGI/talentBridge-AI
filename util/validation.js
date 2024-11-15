export const nameValidation = {
  required: "Full name is required",
  minLength: {
    value: 2,
    message: "Name must be at least 2 characters",
  },
  pattern: {
    value: /^[A-Za-z\s]+$/,
    message: "Name can only contain letters and spaces",
  },
};

export const emailValidation = {
  required: "Email is required",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Invalid emailId address",
  },
};

export const phoneValidation = {
  required: "Phone number is required",
  pattern: {
    value: /^[0-9]{10}$/,
    message: "Please enter a valid 10-digit phone number",
  },
};

export const usernameValidation = {
  required: "Username is required",
  minLength: {
    value: 3,
    message: "Username must be at least 3 characters",
  },
  pattern: {
    value: /^[a-zA-Z0-9_]+$/,
    message: "Username can only contain letters, numbers, and underscores",
  },
};

export const passwordValidation = {
  required: "Password is required",
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters",
  },
  pattern: {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message:
      "Password must contain uppercase, lowercase, number and special character",
  },
};

export const experienceValidation = {
  required: "Years of experience is required",
  min: {
    value: 0,
    message: "Years of experience cannot be negative",
  },
  max: {
    value: 50,
    message: "Please enter a valid years of experience",
  },
  pattern: {
    value: /^\d+$/,
    message: "Please enter a valid number",
  },
};
