"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink, Github, Loader2, Info, Lock, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useQuery } from '@tanstack/react-query'
import { projectsApi } from "@/lib/api"

const categories = [
  { id: "all", label: "All Projects" },
  { id: "frontend", label: "Frontend" },
  { id: "fullstack", label: "Full Stack" },
  { id: "backend", label: "Backend" },
  { id: "mobile", label: "Mobile" },
  { id: "ai", label: "AI" },
]

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all")

  // Fetch projects with React Query
  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: projectsApi.getActiveProjects,
  });

  // Filter active projects and order them correctly
  const activeProjects = projects.filter(project => project.isActive !== false);

  const filteredProjects =
    activeCategory === "all"
      ? [...activeProjects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      : [...activeProjects]
          .filter((project) => project.category === activeCategory)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const container = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const item = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: 20, 
      transition: { duration: 0.3 } 
    }
  }

  return (
    <section id="projects" className="py-24 bg-white dark:bg-gray-900/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-tr from-indigo-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-purple-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-gradient-to-bl from-pink-500/5 to-transparent rounded-full blur-3xl" />
        
        <div className="absolute inset-0 bg-mesh-pattern opacity-20" />
        
        <svg className="absolute top-0 left-0 w-full h-full opacity-30 dark:opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" fillOpacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="container relative">
        {/* Section header */}
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <motion.div variants={fadeIn} className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4 border border-indigo-200 dark:border-indigo-800/30">
            <span>My Work</span>
          </motion.div>
          
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </motion.h2>
          
          <motion.div variants={fadeIn} className="w-24 h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full mb-6" />
          
          <motion.p variants={fadeIn} className="max-w-2xl text-gray-600 dark:text-gray-300 text-lg">
            Explore my latest work and the projects I&apos;ve built using modern technologies and best practices.
          </motion.p>
        </motion.div>
        
        {/* Filter buttons */}
        <motion.div 
          variants={container}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={item}>
              <Button
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full px-6 py-2 font-medium text-sm transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md"
                    : "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50"
                }`}
              >
                {category.label}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {isLoading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center py-20"
          >
            <div className="relative">
              <Loader2 className="h-12 w-12 animate-spin text-indigo-600 dark:text-indigo-400" />
              <div className="absolute inset-0 h-12 w-12 rounded-full border-t-2 border-indigo-600/20 dark:border-indigo-400/20 animate-ping" />
            </div>
          </motion.div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 px-6 rounded-2xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-indigo-600 dark:text-indigo-400 font-medium text-lg">Failed to load projects. Please try again later.</p>
          </motion.div>
        ) : filteredProjects.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 px-6 rounded-2xl bg-gray-50 dark:bg-gray-900/30 border border-gray-100 dark:border-gray-800/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-gray-600 dark:text-gray-300 font-medium text-lg">No projects found in this category.</p>
          </motion.div>
        ) : (
          <motion.div 
            key={activeCategory}
            variants={container}
            initial="initial"
            animate="animate"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                variants={item}
                layout
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="group h-full"
              >
                <Card className="flex flex-col h-full overflow-hidden border-none rounded-2xl bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm shadow-glass hover:shadow-glass-strong transition-all duration-300">
                  <div className="relative h-52 w-full overflow-hidden">
                    {project.image && (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                    
                    {project.featured && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        Featured
                      </div>
                    )}
                    
                    {project.isPrivate && (
                      <div className="absolute top-4 right-4 bg-gray-800/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-lg flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" />
                        Private
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <CardContent className="p-6 relative z-10 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      
                      {project.isPrivate && (
                        <Badge 
                          variant="outline" 
                          className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700 ml-2 flex items-center gap-1"
                        >
                          <Lock className="w-3 h-3" />
                          Private
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 flex-shrink-0">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags && project.tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary"
                          className="bg-indigo-100/80 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200/80 dark:hover:bg-indigo-800/30 border-none"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-3 mt-auto">
                      {project.isDetailedPage && !project.isPrivate && (
                        <Button
                          variant="default"
                          size="sm"
                          asChild
                          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-md"
                        >
                          <Link href={`/projects/${project._id}`}>
                            <Info className="mr-1.5 h-4 w-4" />
                            Details
                          </Link>
                        </Button>
                      )}
                      
                      {project.isDetailedPage && project.isPrivate && (
                        <Button
                          variant="default"
                          size="sm"
                          asChild
                          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-md"
                        >
                          <Link href={`/projects/${project._id}`}>
                            <Info className="mr-1.5 h-4 w-4" />
                            Details
                          </Link>
                        </Button>
                      )}
                      
                      {project.liveUrl && !project.isPrivate && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="border-indigo-200 dark:border-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30"
                        >
                          <Link href={project.liveUrl} target="_blank">
                            <ExternalLink className="mr-1.5 h-4 w-4" />
                            Demo
                          </Link>
                        </Button>
                      )}
                      
                      {project.githubUrl && !project.isPrivate && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="border-indigo-200 dark:border-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30"
                        >
                          <Link href={project.githubUrl} target="_blank">
                            <Github className="mr-1.5 h-4 w-4" />
                            Code
                          </Link>
                        </Button>
                      )}
                      
                      {project.isPrivate && (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled
                          className="ml-auto border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-800/50 cursor-not-allowed flex items-center gap-1.5"
                        >
                          <ShieldAlert className="h-4 w-4" />
                          Restricted
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {filteredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 flex justify-center"
          >
            <Button 
              onClick={() => window.open("https://github.com/jaiswar203", "_blank")}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-gray-800 dark:text-gray-200 border border-gray-200/50 dark:border-gray-700/50 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 shadow-glass rounded-full px-6"
            >
              View More Projects
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
