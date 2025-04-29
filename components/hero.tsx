"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import { DownloadIcon, SendIcon } from "lucide-react"
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
              Full Stack Developer & AI Agent Developer
            </motion.span>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              Crafting Digital <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 dark:from-indigo-400 dark:via-purple-400 dark:to-teal-400">
                Experiences & Intelligence
              </span>
            </motion.h1>
            
            <motion.div variants={fadeInUp} className="h-16 md:h-20">
              <TypeAnimation
                sequence={[
                  "I build full-stack applications",
                  1000,
                  "I develop AI-powered solutions",
                  1000,
                  "I create intelligent agents",
                  1000,
                  "I design seamless experiences",
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
              Passionate developer focused on bridging the gap between powerful backend systems, elegant frontends, and cutting-edge AI technologies to create solutions that truly matter.
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
              
              <Button
                variant="outline"
                onClick={() => window.open("/resume.pdf", "_blank")}
                className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 shadow-sm transition-all duration-300 rounded-full px-8"
              >
                <DownloadIcon className="mr-2 h-4 w-4" /> Download CV
              </Button>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="flex items-center gap-4 pt-4"
            >
              <span className="text-sm text-gray-500 dark:text-gray-400">Follow me on:</span>
              <div className="flex gap-3">
                {["github", "linkedin", "twitter", "instagram"].map((social) => (
                  <a 
                    key={social}
                    href={`https://${social}.com`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      {social === "github" && <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />}
                      {social === "linkedin" && <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />}
                      {social === "twitter" && <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />}
                      {social === "instagram" && <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />}
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
                className="absolute -top-4 left-1/4 px-3 py-1.5 bg-white/80 dark:bg-gray-900/80 rounded-lg shadow-lg backdrop-blur-sm border border-gray-100 dark:border-gray-800"
              >
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">React</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2 }}
                className="absolute top-1/4 -right-2 px-3 py-1.5 bg-white/80 dark:bg-gray-900/80 rounded-lg shadow-lg backdrop-blur-sm border border-gray-100 dark:border-gray-800"
              >
                <span className="text-xs font-medium text-purple-600 dark:text-purple-400">AI</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.2 }}
                className="absolute -bottom-2 left-1/3 px-3 py-1.5 bg-white/80 dark:bg-gray-900/80 rounded-lg shadow-lg backdrop-blur-sm border border-gray-100 dark:border-gray-800"
              >
                <span className="text-xs font-medium text-teal-600 dark:text-teal-400">Node.js</span>
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
