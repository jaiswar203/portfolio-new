"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { ArrowRight, Clock, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { blogsApi } from "@/lib/api"
import { formatDate } from "@/lib/utils"

// Animations
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function BlogsSection() {
  const [isHovered, setIsHovered] = useState<number | null>(null)

  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ["featuredBlogs"],
    queryFn: () => blogsApi.getFeaturedBlogs(3),
  })

  if (error) {
    console.error("Error loading blogs:", error)
    return null // Don't show section if there's an error
  }

  return (
    <section id="blogs" className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="flex flex-col items-center text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-600 to-teal-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-teal-400 mb-4">
              Latest from the Blog
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Thoughts, insights, and perspectives on technology, design, and development.
            </p>
          </motion.div>

          {/* Blog Cards */}
          <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-800">
                  <Skeleton className="w-full h-48" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <div className="flex justify-between items-center mt-4">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-4 w-1/3" />
                    </div>
                  </div>
                </div>
              ))
            ) : blogs && blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  variants={fadeInUp}
                  className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-gray-200/50 dark:border-gray-800/50 transition-all duration-300 hover:shadow-lg hover:border-violet-200 dark:hover:border-violet-800/50 relative"
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <Link href={`/blogs/${blog.slug}`}>
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={blog.coverImage}
                        alt={blog.title}
                        fill
                        className={`object-cover transition-transform duration-500 ${
                          isHovered === index ? "scale-105" : "scale-100"
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70" />
                    </div>
                  </Link>
                  
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      {blog.tags.slice(0, 2).map((tag, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 hover:bg-violet-200 dark:hover:bg-violet-800/40"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                      {blog.tags.length > 2 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          +{blog.tags.length - 2}
                        </span>
                      )}
                    </div>
                    
                    <Link href={`/blogs/${blog.slug}`}>
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100 line-clamp-1 hover:text-violet-600 dark:hover:text-violet-400">
                        {blog.title}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {blog.excerpt}
                    </p>
                    
                    <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{blog.readingTime} min read</span>
                      </div>
                      <span>{formatDate(blog.publishedAt)}</span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10 text-gray-500 dark:text-gray-400">
                No featured blogs available yet. Check back soon!
              </div>
            )}
          </motion.div>

          {/* View All Link */}
          <motion.div variants={fadeInUp} className="mt-12 text-center">
            <Button 
              asChild
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-full px-6"
            >
              <Link href="/blogs">
                View All Posts
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 