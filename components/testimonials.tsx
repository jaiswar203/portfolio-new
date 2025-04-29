"use client"

import { useState, useEffect, useRef } from "react"
import { useQuery } from "@tanstack/react-query"
import { testimonialsApi, TestimonialDTO } from "@/lib/api"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import Image from "next/image"

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  const { data, isLoading, isError } = useQuery<TestimonialDTO[]>({
    queryKey: ["testimonials"],
    queryFn: testimonialsApi.getActiveTestimonials,
  })

  // Reset current index when data changes
  useEffect(() => {
    if (data?.length) {
      setCurrent(0)
    }
  }, [data])

  // Auto-rotate testimonials
  useEffect(() => {
    if (!data?.length) return
    
    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setCurrent(prev => (prev + 1) % data.length)
      }, 5000)
    }
    
    startInterval()
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [data])

  const next = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (!data?.length) return
    setCurrent(prev => (prev + 1) % data.length)
  }

  const prev = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (!data?.length) return
    setCurrent(prev => (prev - 1 + data.length) % data.length)
  }

  const goToTestimonial = (index: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setCurrent(index)
  }

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    }),
  }

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-gray-900/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-purple-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-gradient-to-bl from-pink-500/5 to-transparent rounded-full blur-3xl" />
        
        <div className="absolute inset-0 bg-mesh-pattern opacity-20" />
        
        <svg className="absolute top-0 left-0 w-full h-full opacity-30 dark:opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid-testimonials" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-testimonials)" />
        </svg>
      </div>

      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <motion.div variants={fadeIn} className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4 border border-indigo-200 dark:border-indigo-800/30">
            <span>Client Feedback</span>
          </motion.div>
          
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4">
            What <span className="text-gradient">Clients Say</span>
          </motion.h2>
          
          <motion.div variants={fadeIn} className="w-24 h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full mb-6" />
          
          <motion.p variants={fadeIn} className="max-w-2xl text-gray-600 dark:text-gray-300 text-lg">
            Don&apos;t just take my word for it - hear what others have to say about their experiences working with me.
          </motion.p>
        </motion.div>

        {/* Testimonials */}
        <div className="relative max-w-4xl mx-auto">
          {isLoading ? (
            <div className="min-h-[350px] flex items-center justify-center">
              <div className="animate-pulse flex flex-col items-center justify-center gap-4">
                <div className="h-20 w-20 bg-indigo-200 dark:bg-indigo-800/30 rounded-full" />
                <div className="h-4 w-60 bg-indigo-200 dark:bg-indigo-800/30 rounded" />
                <div className="h-4 w-80 bg-indigo-200 dark:bg-indigo-800/30 rounded" />
                <div className="h-4 w-72 bg-indigo-200 dark:bg-indigo-800/30 rounded" />
              </div>
            </div>
          ) : isError ? (
            <div className="min-h-[350px] flex items-center justify-center">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Failed to load testimonials</h3>
                <p className="text-gray-600 dark:text-gray-400">Please try again later or contact support.</p>
              </div>
            </div>
          ) : data?.length === 0 ? (
            <div className="min-h-[350px] flex items-center justify-center">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 mb-4">
                  <Quote className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium mb-2">No testimonials yet</h3>
                <p className="text-gray-600 dark:text-gray-400">Check back soon for client feedback.</p>
              </div>
            </div>
          ) : data ? (
            <>
              {/* Large quote icon */}
              <div className="absolute -top-6 -left-6 text-indigo-200 dark:text-indigo-900 opacity-50 z-0">
                <Quote className="w-20 h-20" />
              </div>
              
              <AnimatePresence mode="wait" initial={false} custom={1}>
                <motion.div
                  key={current}
                  custom={1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative z-10"
                >
                  <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-glass dark:shadow-none border border-gray-200/50 dark:border-gray-700/30 p-8 md:p-10 overflow-hidden">
                    <div className="relative z-10">
                      {/* Rating */}
                      <div className="flex mb-6">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${i < (data[current].rating || 5) 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-gray-300 dark:text-gray-700'}`} 
                          />
                        ))}
                      </div>
                      
                      {/* Testimonial text */}
                      <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 italic">
                        &quot;{data[current].content}&quot;
                      </blockquote>
                      
                      {/* Client info */}
                      <div className="flex items-center">
                        <div className="mr-4 flex-shrink-0">
                          {data[current].avatar ? (
                            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-indigo-100 dark:border-indigo-900/30">
                              <Image
                                src={data[current].avatar} 
                                alt={`${data[current].name} avatar`}
                                className="w-full h-full object-cover" 
                                width={56}
                                height={56}
                              />
                            </div>
                          ) : (
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                              {data[current].name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {data[current].name}
                          </div>
                          {data[current].role && (
                            <div className="text-indigo-600 dark:text-indigo-400 text-sm">
                              {data[current].role}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative corner gradient */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-indigo-100/30 via-purple-100/30 to-transparent dark:from-indigo-800/10 dark:via-purple-800/10 rounded-tl-full"></div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons */}
              {data.length > 1 && (
                <div className="flex justify-between items-center mt-8">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prev}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-glass text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 border border-gray-200/50 dark:border-gray-700/30 transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  
                  <div className="flex gap-2">
                    {data.map((_: unknown, i: number) => (
                      <button
                        key={i}
                        onClick={() => goToTestimonial(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          current === i 
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 w-8' 
                            : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                        }`}
                        aria-label={`Go to testimonial ${i + 1}`}
                      />
                    ))}
                  </div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={next}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-glass text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 border border-gray-200/50 dark:border-gray-700/30 transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
    </section>
  )
}
