"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import { SendIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const [scrollToId, setScrollToId] = useState<string | null>(null)

  useEffect(() => {
    if (scrollToId) {
      const element = document.getElementById(scrollToId)
      if (element) {
        const yOffset = -80
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: "smooth" })
        setScrollToId(null)
      }
    }
  }, [scrollToId])

  const scrollTo = (id: string) => {
    setScrollToId(id)
  }

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const shapeAnimation = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const floatAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section id="home" className="relative w-full overflow-hidden pt-28 md:pt-36 lg:pt-40 xl:pt-48 pb-16 md:pb-24">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] bg-gradient-to-bl from-purple-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/3 h-[400px] w-[400px] bg-gradient-to-br from-teal-500/10 to-transparent rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.5 }}
          className="absolute top-20 right-20 h-40 w-40 border border-gray-200 dark:border-gray-800 rounded-full"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute bottom-20 left-20 h-60 w-60 border border-gray-200 dark:border-gray-800 rounded-full"
        />

        <svg className="absolute opacity-10 dark:opacity-5 w-full h-full">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <motion.div
          variants={shapeAnimation}
          initial="initial"
          animate="animate"
          className="absolute top-1/4 left-1/4 h-8 w-8 bg-purple-500/30 dark:bg-purple-500/40 rounded-full hidden md:block"
        />
        <motion.div
          variants={shapeAnimation}
          initial="initial"
          animate="animate"
          className="absolute bottom-1/3 right-1/4 h-6 w-6 bg-blue-500/30 dark:bg-blue-500/40 rounded-full hidden md:block"
        />
        <motion.div
          variants={shapeAnimation}
          initial="initial"
          animate="animate"
          className="absolute top-2/3 right-1/3 h-10 w-10 bg-teal-500/30 dark:bg-teal-500/40 rounded-full hidden md:block"
        />
      </div>

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col items-start space-y-6 lg:col-span-7"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium border border-indigo-100 dark:border-indigo-900/50"
            >
              Full Stack Developer & AI Agent Specialist
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              Crafting Seamless Apps, <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 dark:from-indigo-400 dark:via-purple-400 dark:to-teal-400">
                Smart Agents & Scalable Systems
              </span>
            </motion.h1>

            <motion.div variants={fadeInUp} className="h-16 md:h-20">
              <TypeAnimation
                sequence={[
                  "I design and build mobile apps",
                  1000,
                  "I develop web platforms",
                  1000,
                  "I create intelligent AI agents",
                  1000,
                  "From idea to deployment",
                  1000,
                ]}
                wrapper="div"
                speed={50}
                repeat={Infinity}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300"
              />
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-gray-600 dark:text-gray-300 max-w-md text-base md:text-lg"
            >
              End-to-end development with a focus on performance, usability, and innovation.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-4 mt-4"
            >
              <Button
                onClick={() => scrollTo("contact")}
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-600 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-full px-8"
              >
                <SendIcon className="mr-2 h-4 w-4" /> Contact Me
              </Button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-4 pt-4"
            >
              <span className="text-sm text-gray-500 dark:text-gray-400">Follow me on:</span>
              <div className="flex gap-3">
                {[
                  { name: "github", url: "https://github.com/jaiswar203" },
                  { name: "linkedin", url: "https://www.linkedin.com/in/jaiswarnilesh/" }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      {social.name === "github" && <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />}
                      {social.name === "linkedin" && <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />}
                    </svg>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative mt-10 lg:mt-0 flex justify-center lg:justify-end lg:col-span-5"
          >
            {/* Abstract 3D Element instead of profile image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="relative w-[300px] h-[300px] md:w-[380px] md:h-[380px]"
            >
              {/* 3D Abstract shapes */}
              <motion.div
                variants={floatAnimation}
                animate="animate"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] md:w-[280px] md:h-[280px] rounded-full bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 dark:border-gray-800/30 shadow-xl"
              />

              <motion.div
                variants={floatAnimation}
                animate="animate"
                transition={{ delay: 0.5 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full bg-gradient-to-br from-purple-500/20 to-teal-500/20 backdrop-blur-sm border border-white/10 dark:border-gray-800/30 shadow-xl"
              />

              <motion.div
                variants={floatAnimation}
                animate="animate"
                transition={{ delay: 1 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] md:w-[160px] md:h-[160px] rounded-full bg-gradient-to-tl from-teal-500/20 to-indigo-500/20 backdrop-blur-sm border border-white/10 dark:border-gray-800/30 shadow-xl"
              />

              {/* Code & AI symbols */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl md:text-5xl font-bold text-indigo-600 dark:text-indigo-400 mix-blend-overlay z-10"
              >
                &lt;/&gt;
              </motion.div>

              {/* Floating tech icons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.8 }}
                className="absolute -top-4 left-[5%] px-3 py-1.5 bg-white/80 dark:bg-gray-900/80 rounded-lg shadow-lg backdrop-blur-sm border border-gray-100 dark:border-gray-800"
              >
                <span className="text-xs font-medium text-sky-600 dark:text-sky-400">Next.js</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2 }}
                className="absolute top-[15%] -right-4 px-3 py-1.5 bg-white/80 dark:bg-gray-900/80 rounded-lg shadow-lg backdrop-blur-sm border border-gray-100 dark:border-gray-800"
              >
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">LLMs</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.2 }}
                className="absolute top-[55%] -left-4 px-3 py-1.5 bg-white/80 dark:bg-gray-900/80 rounded-lg shadow-lg backdrop-blur-sm border border-gray-100 dark:border-gray-800"
              >
                <span className="text-xs font-medium text-red-600 dark:text-red-400">Nest.JS</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.4 }}
                className="absolute -bottom-2 right-[10%] px-3 py-1.5 bg-white/80 dark:bg-gray-900/80 rounded-lg shadow-lg backdrop-blur-sm border border-gray-100 dark:border-gray-800"
              >
                <span className="text-xs font-medium text-green-600 dark:text-green-400">OpenAI</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.6 }}
                className="absolute bottom-[20%] -right-5 px-3 py-1.5 bg-white/80 dark:bg-gray-900/80 rounded-lg shadow-lg backdrop-blur-sm border border-gray-100 dark:border-gray-800"
              >
                <span className="text-xs font-medium text-orange-600 dark:text-orange-400">Anthropic</span>
              </motion.div>

              {/* Glowing effect */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] bg-indigo-500/30 dark:bg-indigo-500/20 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] bg-purple-500/30 dark:bg-purple-500/20 rounded-full blur-2xl" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <button
            onClick={() => scrollTo("about")}
            className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
          >
            <span className="text-sm font-medium mb-2">Scroll Down</span>
            <span className="animate-bounce">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
