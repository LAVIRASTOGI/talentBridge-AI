import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

import "./signIn.css";
export default function SignInPage() {
  return (
    <main className="min-h-screen flex">
      {/* Left Section with Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="/images/interviewCall.JPG" // Add your image path here
          alt="Authentication background"
          fill
          className="object-cover"
          priority
        />
        {/* Optional Overlay with Text */}
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
          {/* Logo and Header */}
          <div className="text-center">
            {/* <Image
              src="/logo.png" // Add your logo path here
              alt="Logo"
              width={48}
              height={48}
              className="mx-auto"
            /> */}
            {/* <h2 className="mt-6 text-3xl font-bold text-base-content">
              Sign in to your account
            </h2> */}
            {/* <p className="mt-2 text-sm text-base-content/70">
              Or{" "}
              <a
                href="#"
                className="font-medium text-primary hover:text-primary/80"
              >
                start your 14-day free trial
              </a>
            </p> */}
          </div>

          {/* Clerk SignIn Component */}
          <div className="bg-base-200/50 p-8 rounded-xl shadow-sm">
            <SignIn
              appearance={{
                elements: {
                  formButtonPrimary:
                    "bg-primary hover:bg-primary/90 text-white",
                  headerTitle: "text-2xl p-1 pt-6",
                  headerSubtitle: "text-[1rem]",
                  socialButtonsBlockButton:
                    "bg-base-100 hover:bg-base-200 border border-base-300",
                  socialButtonsBlockButtonText:
                    "text-base-content font-medium text-xl",
                  dividerLine: "bg-base-300",
                  dividerText: "text-base-content/70",
                  formFieldInput: "text-xl",
                  footerActionLink: "text-primary hover:text-primary/80",
                },
              }}
            />
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-base-content/70">
            <p>
              By signing in, you agree to our{" "}
              <a
                href="#"
                className="font-medium text-primary hover:text-primary/80"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="font-medium text-primary hover:text-primary/80"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
