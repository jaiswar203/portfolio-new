"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Twitter, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden pt-16 pb-8">
      {/* Enhanced Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black"></div>
      <div className="absolute inset-0 -z-10 bg-mesh-pattern opacity-30"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-indigo-50 dark:bg-indigo-900/10 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-50 dark:bg-purple-900/10 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute top-40 left-10 w-60 h-60 bg-pink-50 dark:bg-pink-900/10 rounded-full filter blur-3xl opacity-20"></div>
      
      {/* Animated subtle shapes */}
      <div className="absolute top-20 right-[20%] w-16 h-16 rounded-full border border-indigo-200 dark:border-indigo-800/30 opacity-20 animate-spin-slow"></div>
      <div className="absolute bottom-40 left-[30%] w-12 h-12 rounded-full border border-purple-200 dark:border-purple-800/30 opacity-20 animate-float"></div>
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <Link
              href="#home"
              className="inline-block text-2xl font-bold"
              onClick={(e) => {
                e.preventDefault()
                scrollToTop()
              }}
            >
              <span className="text-gradient">JaisFolio</span>
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              Building powerful full-stack applications and intelligent AI agents that transform ideas into impactful digital experiences.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: <Github className="h-4 w-4" />, href: "https://github.com/jaiswar203", label: "GitHub" },
                { icon: <Linkedin className="h-4 w-4" />, href: "https://www.linkedin.com/in/jaiswarnilesh/", label: "LinkedIn" },
                { icon: <Mail className="h-4 w-4" />, href: "mailto:jaiswarnilesh2002@gmail.com", label: "Email" },
                { icon: <Twitter className="h-4 w-4" />, href: "https://twitter.com", label: "Twitter" },
              ].map((social, index) => (
                <Button 
                  key={index}
                  variant="outline" 
                  size="icon" 
                  className="rounded-full border-gray-200 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950/30 dark:hover:to-purple-950/30 transition-all duration-300 hover:shadow-sm group" 
                  asChild
                >
                  <Link href={social.href} target="_blank" rel="noopener noreferrer">
                    <span className="text-gray-600 dark:text-gray-400 group-hover:text-gradient">{social.icon}</span>
                    <span className="sr-only">{social.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: "#about", label: "About Me" },
                { href: "#projects", label: "Projects" },
                { href: "#experience", label: "Experience" },
                { href: "#services", label: "Services" },
                { href: "#contact", label: "Contact" },
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="group text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 flex items-center"
                  >
                    <span className="w-0 h-px bg-gradient-to-r from-indigo-500 to-purple-500 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300 inline-block"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Contact Info</h3>
            <div className="space-y-3">
              <p className="text-gray-600 dark:text-gray-400 flex items-start">
                <Mail className="h-4 w-4 mr-2 mt-1 text-indigo-600 dark:text-indigo-400" />
                <a href="mailto:jaiswarnilesh2002@gmail.com" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">
                  jaiswarnilesh2002@gmail.com
                </a>
              </p>
              <div className="mt-4 p-4 rounded-xl bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm border border-gray-100/80 dark:border-gray-700/30 shadow-glass animate-pulse-slow">
                <span className="block text-sm text-gray-800 dark:text-gray-300 font-medium">Available for freelance work</span>
                <span className="block text-sm text-gray-600 dark:text-gray-400 mt-1">Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200/50 dark:border-gray-800/50">
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-4 md:mb-0">
            &copy; {currentYear} <span className="text-gradient">JaisFolio</span>. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full h-10 w-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/20 dark:hover:to-purple-900/20 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 hover:shadow-sm group" 
              onClick={scrollToTop}
            >
              <ArrowUp className="h-4 w-4 group-hover:animate-float" />
              <span className="sr-only">Back to top</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
