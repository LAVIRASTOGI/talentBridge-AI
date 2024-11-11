import AboutUs from "@/components/AboutUs";
import Features from "@/components/Features";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-custom-2 mt-20">
      <Hero />
      <Features />
      <AboutUs />
    </div>
  );
}
