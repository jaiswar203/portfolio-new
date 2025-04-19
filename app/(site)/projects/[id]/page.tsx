"use client"

import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import { projectsApi } from "@/lib/api"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSanitize from 'rehype-sanitize'

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
    <div className="bg-white dark:bg-black min-h-screen py-16">
      <div className="container max-w-5xl mx-auto px-4">
        <Button
          variant="ghost"
          size="sm"
          className="mb-8 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          asChild
        >
          <Link href="/#projects">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </Button>

        <div className="bg-white dark:bg-gray-950 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
          {/* Project Header with Image */}
          <div className="relative h-80 w-full">
            <Image
              src={project.image || "/placeholder.svg?height=600&width=1200"}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {project.title}
                </h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags?.map((tag, index) => (
                    <Badge 
                      key={index} 
                      className="bg-red-600/80 hover:bg-red-700/80 text-white"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Project Content */}
          <div className="p-8">
            <div className="flex flex-wrap gap-4 mb-8">
              {project.liveUrl && (
                <Button 
                  variant="default" 
                  size="sm" 
                  className="bg-red-600 hover:bg-red-700 text-white"
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
                  size="sm"
                  className="border-red-600 text-red-600 hover:bg-red-50 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-950"
                  asChild
                >
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    View Code
                  </Link>
                </Button>
              )}
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
            </div>

            {/* Markdown Content */}
            {project.detailedContent && mounted && (
              <div className="mt-10 prose dark:prose-invert max-w-none">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeSanitize]}
                >
                  {project.detailedContent}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="bg-white dark:bg-black min-h-screen py-16">
      <div className="container max-w-5xl mx-auto px-4">
        <Skeleton className="h-10 w-32 mb-8" />
        <div className="bg-white dark:bg-gray-950 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
          <Skeleton className="h-80 w-full" />
          <div className="p-8">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <div className="flex gap-2 mb-8">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="flex gap-4 mb-8">
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