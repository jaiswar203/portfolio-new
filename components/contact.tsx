"use client"

import { Mail, Phone, MapPin, Github, Linkedin, Instagram } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Contact() {
  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }
  
  return (
    <section id="contact" className="py-24 bg-white dark:bg-gray-900/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-purple-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-mesh-pattern opacity-20" />
        
        <svg className="absolute top-0 left-0 w-full h-full opacity-30 dark:opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid-contact" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-contact)" />
        </svg>
      </div>
      
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <motion.div variants={fadeIn} className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4 border border-indigo-200 dark:border-indigo-800/30">
            <span>Get In Touch</span>
          </motion.div>
          
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4">
            Let&apos;s <span className="text-gradient">Connect</span>
          </motion.h2>
          
          <motion.div variants={fadeIn} className="w-24 h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full mb-6" />
          
          <motion.p variants={fadeIn} className="max-w-2xl text-gray-600 dark:text-gray-300 text-lg">
            Have a question or want to work together? Drop me a message and I&apos;ll get back to you as soon as possible.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-none shadow-glass-strong overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl border border-gray-100/20 dark:border-gray-800/20">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                {/* Left side - Image/Background */}
                <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-700 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-800 p-10 flex items-center justify-center relative overflow-hidden">
                  {/* Background decorative elements */}
                  <div className="absolute inset-0 bg-gradient-shine opacity-10 animate-shimmer"></div>
                  <div className="absolute h-32 w-32 rounded-full bg-white/10 blur-2xl top-10 -left-10"></div>
                  <div className="absolute h-24 w-24 rounded-full bg-white/10 blur-2xl bottom-10 -right-10"></div>
                  
                  <div className="text-center text-white relative z-10">
                    <h3 className="text-2xl font-bold mb-6">Let&apos;s Connect</h3>
                    <p className="mb-8 opacity-90">
                      Ready to start your next project or have questions? Reach out through any of these channels.
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm group" asChild>
                        <Link href="https://github.com/yourusername" target="_blank">
                          <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
                          <span className="sr-only">GitHub</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm group" asChild>
                        <Link href="https://linkedin.com/in/yourusername" target="_blank">
                          <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
                          <span className="sr-only">LinkedIn</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm group" asChild>
                        <Link href="https://instagram.com/yourusername" target="_blank">
                          <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform" />
                          <span className="sr-only">Instagram</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Right side - Contact Information */}
                <div className="p-10">
                  <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                  <div className="space-y-8">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="flex items-start group"
                    >
                      <div className="bg-indigo-100 dark:bg-indigo-900/20 p-3 rounded-lg mr-5 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/40 transition-colors shadow-sm border border-indigo-200/50 dark:border-indigo-800/50">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-medium text-lg">Email</h4>
                        <a 
                          href="mailto:jaiswarnilesh2002@gmail.com" 
                          className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          jaiswarnilesh2002@gmail.com
                        </a>
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="flex items-start group"
                    >
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg mr-5 text-purple-600 dark:text-purple-400 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/40 transition-colors shadow-sm border border-purple-200/50 dark:border-purple-800/50">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-medium text-lg">Phone</h4>
                        <a 
                          href="tel:+917715969989" 
                          className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        >
                          +91 7715969989
                        </a>
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="flex items-start group"
                    >
                      <div className="bg-pink-100 dark:bg-pink-900/20 p-3 rounded-lg mr-5 text-pink-600 dark:text-pink-400 group-hover:bg-pink-200 dark:group-hover:bg-pink-900/40 transition-colors shadow-sm border border-pink-200/50 dark:border-pink-800/50">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-medium text-lg">Location</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Mumbai, Maharashtra, India
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Button 
                      className="mt-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white w-full rounded-full py-6 text-lg shadow-md transition-all duration-300 hover:shadow-xl"
                      asChild
                    >
                      <a href="mailto:jaiswarnilesh2002@gmail.com">
                        Send me an email
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
