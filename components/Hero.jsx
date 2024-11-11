"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="bg-primary p-12 lg:p-[200px] text-white "
      style={{
        backgroundImage: "url('/images/bg2.png')",
        backgroundPosition: "center",
      }}
    >
      <div className="container grid grid-cols-1 lg:grid-cols-[50%_40%] gap-8 items-center">
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl font-bold mb-4 line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Achieve Career Success with Expert Coaching, Mock Interviews, and
            AI-Driven Practice
          </motion.h2>
          <motion.p
            className="mb-4 text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Unlock your potential and prepare for your dream job. Our platform
            combines personalized expert guidance with realistic mock
            interviews, quizzes and cutting-edge AI-powered practice sessions.
            Gain confidence, sharpen your skills, and tackle interviews with
            ease.
          </motion.p>
          <motion.div
            className="flex gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.button
              className="text-white px-4 md:px-10 py-2 lg:py-4 bg-black rounded-2xl lg:text-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book 1:1 Mock Interviews
            </motion.button>
            <motion.button
              className="text-black px-4 md:px-10 py-2 lg:py-4 bg-white rounded-2xl lg:text-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              TRY AI Tool
            </motion.button>
          </motion.div>
        </motion.div>
        <motion.div
          className="relative w-full h-[300px] lg:h-[400px] hidden lg:block overflow-hidden rounded-tl-[10%] rounded-br-[10%]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/images/Interview.jpg"
            alt="Interview illustration"
            layout="fill"
            objectFit="cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
