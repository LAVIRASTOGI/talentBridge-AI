"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

const AnimatedSection = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const ImageSection = () => (
  <AnimatedSection>
    <div className="relative">
      <div className="relative shadow rounded">
        <Image
          src="/images/about/mock-interview.jpg"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto rounded"
          alt="Student participating in a mock interview"
        />
      </div>
      <div className="absolute bottom-0 right-0 shadow rounded p-2 bg-white">
        <Image
          src="/images/about/ab02.jpg"
          width={0}
          height={0}
          sizes="100vw"
          className="l h-auto rounded w-[80px] lg:w-[200px]"
          alt="Student taking an online quiz"
        />
      </div>
    </div>
  </AnimatedSection>
);

const FeatureItem = ({ icon, title, description, delay }) => (
  <AnimatedSection delay={delay}>
    <div className="mb-6">
      <h5 className="text-lg font-semibold mb-2 flex items-center gap-4">
        <FaCheckCircle color="#3b82f6" />
        {title}
      </h5>
      <p className="text-gray-600 ml-6">{description}</p>
    </div>
  </AnimatedSection>
);

const ContentSection = () => (
  <div className="lg:ml-5">
    <AnimatedSection>
      <h4 className="text-2xl font-bold mb-3">
        Elevate Your Career Preparation
      </h4>
      <p className="text-gray-600 mb-6">
        Our comprehensive platform offers cutting-edge tools to help you excel
        in your job search and career development. Discover how our mock
        interviews, quizzes, and courses can transform your preparation
        strategy.
      </p>
    </AnimatedSection>

    <FeatureItem
      icon="fa-user-tie"
      title="Realistic Mock Interviews"
      description="Practice with AI-powered simulations and industry experts. Receive instant feedback on your performance, body language, and responses to boost your confidence."
      delay={200}
    />

    <FeatureItem
      icon="fa-clipboard-list"
      title="Adaptive Skill Quizzes"
      description="Test your knowledge with our dynamic quizzes. Our system adapts to your performance, focusing on areas that need improvement and ensuring comprehensive skill development."
      delay={400}
    />

    <FeatureItem
      icon="fa-book-open"
      title="Industry-Specific Courses"
      description="Access a wide range of courses tailored to your career goals. From technical skills to soft skills, our expert-led courses keep you ahead in your field."
      delay={600}
    />

    <AnimatedSection delay={800}>
      <div className="mt-8">
        <Link
          href="/career-tools"
          className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition duration-300 inline-flex items-center"
        >
          Book 1:1 Mock Interview
          <i className="fas fa-arrow-right ml-2"></i>
        </Link>
      </div>
    </AnimatedSection>
  </div>
);

export default function AboutUs() {
  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-wrap mx-4 items-center">
        <div className="w-full md:w-1/2 lg:w-1/2 px-4 mb-8 md:mb-0">
          <ImageSection />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/2 px-4">
          <ContentSection />
        </div>
      </div>
    </div>
  );
}
