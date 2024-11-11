import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsVariant: "iconButton",
          logoImageUrl: "/icons/video.jpg",
        },
        variables: {
          colorText: "black",
          colorPrimary: "#0E78F9",
          colorBackground: "#faf5ff",
          colorInputBackground: "#faf5ff",
          colorInputText: "black",
        },
      }}
    >
      <html lang="en">
        <body className="bg-dark-2 text-dark-white relative">{children}</body>
      </html>
    </ClerkProvider>
  );
}
