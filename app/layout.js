import { ThemeProvider } from "@/contexts/ThemeProvider";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/util/userContext";

export const metadata = {
  title: "TalentBridge - AI-Powered Mock Interviews & Quizzes",
  description:
    "Prepare for your next job interview with TalentBridge. Our AI-powered mock interviews and quizzes help you sharpen your skills and boost your confidence.",
  keywords:
    "mock interview, AI interview, interview preparation, job interview, quiz, career development",
  author: "TalentBridge",
  openGraph: {
    title: "TalentBridge - Ace Your Next Interview",
    description:
      "Practice with AI-powered mock interviews and quizzes. Improve your skills and land your dream job.",
    type: "website",
    url: "https://talentbridge.com", // Replace with your actual URL
    image: "/images/talentbridge-og.jpg", // Create and add an Open Graph image
  },
  twitter: {
    card: "summary_large_image",
    title: "TalentBridge - AI Mock Interviews & Quizzes",
    description:
      "Prepare for success with our AI-powered interview practice platform.",
    image: "/images/talentbridge-twitter.jpg", // Create and add a Twitter card image
  },
  icons: {
    icon: "/icons/favicon.ico", // Consider creating a favicon
    apple: "/icons/apple-touch-icon.png", // Consider creating an Apple touch icon
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative">
        <UserProvider>
          <ThemeProvider>{children}</ThemeProvider>
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              // Define default options
              className: "",
              duration: 5000,
              style: {
                background: "#363636",
                color: "#fff",
              },
            }}
          />
        </UserProvider>
      </body>
    </html>
  );
}
