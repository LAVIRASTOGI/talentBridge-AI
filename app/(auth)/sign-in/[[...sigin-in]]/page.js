"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { signInHandler } from "@/lib/userAction";
import toast from "react-hot-toast";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email_username: "",
      password: "",
    },
  });

  const handleSignupRedirect = () => {
    router.push("/sign-up"); // Navigate to the signup page
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setAuthError("");
    try {
      await signInHandler(data);
      toast.success("User is Signed In.");
      const searchParams = new URLSearchParams(window.location.search);
      const callbackUrl = searchParams.get("callbackUrl");

      if (callbackUrl) {
        // If there's a callback URL (from middleware redirect), go there
        router.push(callbackUrl);
      } else {
        // Otherwise, go to home page
        router.push("/");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error.message || "Error occured While SignIn. Please Try After Sometime"
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

  const emailValidation = {
    required: "Email/Username is required",
    minLength: {
      value: 3,
      message: "Email/Username must be at least 3 characters",
    },
  };

  const passwordValidation = {
    required: "Password is required",
    minLength: {
      value: 4,
      message: "Password must be at least 4 characters",
    },
  };

  return (
    <main className="min-h-screen flex">
      {/* Left Section with Image */}
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
          <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
          <p className="text-lg text-center">
            Start your journey with our platform and explore amazing
            possibilities.
          </p>
        </div>
      </div>

      {/* Right Section with Sign In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-base-100">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-base-content">
              Sign in to your account
            </h2>
          </div>

          <div className="bg-base-200/50 p-8 rounded-xl shadow-sm">
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
                {renderFormField("email_username", "Email/Username", {
                  inputType: "text",
                  placeholder: "Enter your Email/Username",
                  validation: emailValidation,
                })}

                {renderFormField("password", "Password", {
                  inputType: "password",
                  placeholder: "Enter your password",
                  validation: passwordValidation,
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
                          Signing in...
                        </span>
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline border-primary text-primary hover:text-white hover:bg-primary rounded-xl"
                    disabled={isLoading}
                    onClick={handleSignupRedirect}
                  >
                    SignUp
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
