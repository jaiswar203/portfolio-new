"use client"

import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { ArrowLeft, Github, ExternalLink, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import { projectsApi } from "@/lib/api"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSanitize from 'rehype-sanitize'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { motion } from "framer-motion"

export default function ProjectDetailPage() {
  const [mounted, setMounted] = useState(false)
  const params = useParams<{ id: string }>()
  const projectId = params.id

  useEffect(() => {
    setMounted(true)
  }, [])

  const { data: project, isLoading, error } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => projectsApi.getProjectById(projectId),
    enabled: !!projectId
  })

  if (error) {
    notFound()
  }

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (!project) {
    notFound()
  }

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-950 min-h-screen py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-40 right-0 w-96 h-96 bg-red-50 dark:bg-red-900/10 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute -bottom-40 left-0 w-96 h-96 bg-red-50 dark:bg-red-900/10 rounded-full filter blur-3xl opacity-30"></div>

      <div className="container max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            size="sm"
            className="mb-10 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 group transition-all duration-300"
            asChild
          >
            <Link href="/#projects">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              <span>Back to Projects</span>
            </Link>
          </Button>

          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Project Header with Image */}
            <div className="relative h-96 w-full overflow-hidden">
              <Image
                src={project.image || "/placeholder.svg?height=600&width=1200"}
                alt={project.title}
                fill
                className="object-cover transform hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end">
                <div className="p-10">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-md">
                    {project.title}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags?.map((tag, index) => (
                      <Badge
                        key={index}
                        className="bg-red-600/90 hover:bg-red-700/90 text-white px-3 py-1 text-sm"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Project Content */}
            <div className="p-10">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
                <div className="flex flex-wrap gap-4">
                  {project.liveUrl && (
                    <Button
                      variant="default"
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-md hover:shadow-lg transition-all duration-200"
                      asChild
                    >
                      <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </Link>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      className="border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                      asChild
                    >
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        View Code
                      </Link>
                    </Button>
                  )}
                </div>

                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                  <Code className="h-4 w-4 mr-1" />
                  <span>Category: </span>
                  <span className="ml-1 text-red-600 dark:text-red-500 font-medium">{project.category}</span>
                </div>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                <div className="inline-block mb-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="h-px w-10 bg-gradient-to-r from-transparent to-red-600"></div>
                    <span className="text-red-600 dark:text-red-500 font-semibold tracking-wider uppercase text-sm">Overview</span>
                    <div className="h-px w-10 bg-gradient-to-l from-transparent to-red-600"></div>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-xl leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Markdown Content */}
              {project.detailedContent && mounted && (
                <div className="mt-12 prose dark:prose-invert max-w-none mb-14 prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-headings:font-bold prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-red-600 dark:prose-a:text-red-500">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeSanitize]}
                  >
                    {project.detailedContent}
                  </ReactMarkdown>
                </div>
              )}

              {project.carousels && project.carousels.length > 0 && (
                <div className="mt-16 pt-10 border-t border-gray-100 dark:border-gray-800">
                  <h2 className="text-3xl font-bold mb-8">Project Gallery</h2>
                  <div className="relative w-full h-[500px] overflow-hidden rounded-xl shadow-lg border border-gray-100 dark:border-gray-800">
                    <Carousel className="w-full h-full">
                      <CarouselContent className="h-full">
                        {project.carousels.map((url, index) => (
                          <CarouselItem key={index} className="h-full">
                            <div className="relative h-96 w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900/50">
                              <Image
                                src={url}
                                alt={`${project.title} - slide ${index + 1}`}
                                fill
                                className="object-contain"
                                quality={95}
                                priority={index === 0}
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-4 bg-black/50 hover:bg-black/70 text-white hover:text-white hover:scale-105 transition-all duration-200" />
                      <CarouselNext className="right-4 bg-black/50 hover:bg-black/70 text-white hover:text-white hover:scale-105 transition-all duration-200" />
                    </Carousel>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-950 min-h-screen py-20">
      <div className="container max-w-5xl mx-auto px-4">
        <Skeleton className="h-10 w-32 mb-10" />
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
          <Skeleton className="h-96 w-full" />
          <div className="p-10">
            <Skeleton className="h-12 w-3/4 mb-6" />
            <div className="flex gap-2 mb-8">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="flex gap-4 mb-10">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
            <Skeleton className="h-8 w-40 mb-4" />
            <Skeleton className="h-24 w-full mb-8" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
} 