"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useCallback, useMemo, useState } from "react";
import { SkillsAutocomplete } from "@/components/SkillsAutocomplete";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      username: "",
      password: "",
      confirmPassword: "",
      skills: [],
      yearsOfExperience: "",
    },
  });

  const resetForm = useCallback(() => {
    reset();
  }, [reset]);
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setAuthError("");

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Registration data:", data);
      // Add your registration logic here
    } catch (error) {
      console.error("Registration error:", error);
      setAuthError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormField = useMemo(
    () => (name, label, options) =>
      (
        <div className="form-control w-full">
          <label className="label font-bold">
            <span className="text-lg">{label}</span>
          </label>
          <input
            type={options.inputType || "text"}
            placeholder={options.placeholder}
            className={`input input-bordered w-full ${
              errors[name] ? "input-error" : ""
            }`}
            disabled={isLoading}
            {...register(name, {
              ...options.validation,
              onChange: () => {
                if (authError) setAuthError("");
              },
            })}
          />
          {errors[name] && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors[name].message}
              </span>
            </label>
          )}
        </div>
      ),
    [errors, register, isLoading, authError]
  );

  const nameValidation = {
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

  const emailValidation = {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
  };

  const phoneValidation = {
    required: "Phone number is required",
    pattern: {
      value: /^[0-9]{10}$/,
      message: "Please enter a valid 10-digit phone number",
    },
  };

  const usernameValidation = {
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

  const passwordValidation = {
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

  const confirmPasswordValidation = {
    required: "Please confirm your password",
    validate: (value) =>
      value === watch("password") || "Passwords do not match",
  };

  const experienceValidation = {
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

  return (
    <main className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="/images/interviewCall.JPG"
          alt="Authentication background"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 0vw, 50vw"
        />
        <div className="absolute inset-0 bg-primary/30 flex flex-col justify-center items-center text-white p-12">
          <h1 className="text-4xl font-bold mb-4">Create Account</h1>
          <p className="text-lg text-center">
            Join our platform and start your professional journey today.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center  bg-base-100 mb-4">
        <div className="w-full max-w-lg space-y-4">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-base-content">
              Sign up for an account
            </h2>
          </div>

          <div className="bg-base-200/50 p-4 rounded-xl shadow-sm">
            <div className="p-4">
              {authError && (
                <div className="alert alert-error mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {renderFormField("name", "Full Name", {
                  placeholder: "Enter your full name",
                  validation: nameValidation,
                })}

                {renderFormField("email", "Email Address", {
                  inputType: "email",
                  placeholder: "Enter your email",
                  validation: emailValidation,
                })}

                {renderFormField("phone", "Phone Number", {
                  inputType: "tel",
                  placeholder: "Enter your phone number",
                  validation: phoneValidation,
                })}

                {renderFormField("username", "Username", {
                  placeholder: "Choose a username",
                  validation: usernameValidation,
                })}

                {renderFormField("password", "Password", {
                  inputType: "password",
                  placeholder: "Create a password",
                  validation: passwordValidation,
                })}

                {renderFormField("confirmPassword", "Confirm Password", {
                  inputType: "password",
                  placeholder: "Confirm your password",
                  validation: confirmPasswordValidation,
                })}

                {renderFormField("yearsOfExperience", "Years of Experience", {
                  inputType: "number",
                  placeholder: "Enter years of experience",
                  validation: experienceValidation,
                })}
                <SkillsAutocomplete control={control} name="skills" />

                <div className="py-4 flex gap-4 justify-end">
                  <button
                    type="submit"
                    className="btn bg-primary rounded-xl text-white hover:text-white hover:bg-primary hover:border-white
                    disabled:opacity-75 disabled:cursor-not-allowed disabled:bg-primary disabled:text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="loading loading-spinner">
                          Creating account...
                        </span>
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                  {/* cancel reset  */}
                  <button
                    type="button"
                    className="btn btn-outline border-primary text-primary hover:text-white hover:bg-primary rounded-xl"
                    disabled={isLoading}
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
