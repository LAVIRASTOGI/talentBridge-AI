"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useCallback, useMemo, useState } from "react";
import { SkillsAutocomplete } from "@/components/SkillsAutocomplete";
import { signUpHandler } from "@/lib/userAction";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  emailValidation,
  experienceValidation,
  nameValidation,
  passwordValidation,
  phoneValidation,
  usernameValidation,
} from "@/util/validation";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const router = useRouter();

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
      emailId: "",
      phoneNumber: "",
      username: "",
      password: "",
      confirmPassword: "",
      skills: [],
      yearsOfExperience: "",
    },
  });

  const confirmPasswordValidation = {
    required: "Please confirm your password",
    validate: (value) =>
      value === watch("password") || "Passwords do not match",
  };

  const resetForm = useCallback(() => {
    reset();
  }, [reset]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setAuthError("");
    try {
      await signUpHandler(data);
      toast.success("Form submitted successfully and user is Signed Up.");
      router.push("/sign-in");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error.message || "Error occured While SignUp. Please Try After Sometime"
      );
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

                {renderFormField("emailId", "Email Address", {
                  inputType: "emailId",
                  placeholder: "Enter your emailId",
                  validation: emailValidation,
                })}

                {renderFormField("phoneNumber", "Phone Number", {
                  inputType: "tel",
                  placeholder: "Enter your phone number",
                  validation: phoneValidation,
                })}

                {renderFormField("username", "Username", {
                  placeholder: "Choose a username",
                  validation: usernameValidation,
                })}
                <SkillsAutocomplete control={control} name="skills" />

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
