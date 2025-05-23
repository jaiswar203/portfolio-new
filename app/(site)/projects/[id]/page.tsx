"use client"

import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { ArrowLeft, Github, ExternalLink, Code, ZoomIn, ZoomOut, X, RefreshCw, Lock, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import { projectsApi } from "@/lib/api"
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSanitize from 'rehype-sanitize'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Player from 'next-video/player';

// Animation variants similar to Hero
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
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

export default function ProjectDetailPage() {
  const [mounted, setMounted] = useState(false)
  const params = useParams<{ id: string }>()
  const projectId = params.id
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [totalSlides, setTotalSlides] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  // Listen to carousel changes to update pagination
  useEffect(() => {
    if (!carouselApi) return

    setTotalSlides(carouselApi.scrollSnapList().length)
    
    const onSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap() + 1)
    }
    
    carouselApi.on("select", onSelect)
    // Initialize with the first slide
    setCurrentSlide(carouselApi.selectedScrollSnap() + 1)
    
    return () => {
      carouselApi.off("select", onSelect)
    }
  }, [carouselApi])

  const openImageModal = useCallback((imageUrl: string) => {
    setCurrentImage(imageUrl)
    setModalOpen(true)
  }, [])

  const { data: project, isLoading, error } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => projectsApi.getProjectById(projectId),
    enabled: !!projectId
  })

  if (error) {
    console.error("Error fetching project:", error)
    notFound()
  }

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (!project) {
    console.log("Project not found for ID:", projectId)
    notFound()
  }

  // Define components object with explicit Components type
  const markdownComponents: Components = {
    h2: ({ ...props }) => <h2 className="text-3xl font-bold mt-12 mb-6 border-b border-gray-200 dark:border-gray-700 pb-3" {...props} />,
    h3: ({ ...props }) => <h3 className="text-2xl font-bold mt-10 mb-5" {...props} />,
    img: ({ ...props }) => <img className="mb-4 rounded-md shadow-sm border dark:border-gray-700" {...props} />,
    hr: ({ ...props }) => <hr className="my-8 border-t border-gray-200 dark:border-gray-700" {...props} />,
    p: ({ ...props }) => <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed" {...props} />,
    a: ({ ...props }) => <a className="text-violet-600 dark:text-violet-400 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 underline decoration-violet-300 dark:decoration-violet-700 hover:decoration-fuchsia-400 dark:hover:decoration-fuchsia-500 underline-offset-2 transition-colors" {...props} />,
    ul: ({ ...props }) => <ul className="list-disc list-inside mb-4 pl-5 space-y-2 text-gray-700 dark:text-gray-300" {...props} />,
    ol: ({ ...props }) => <ol className="list-decimal list-inside mb-4 pl-5 space-y-2 text-gray-700 dark:text-gray-300" {...props} />,
    li: ({ ...props }) => <li className="marker:text-violet-500 dark:marker:text-violet-400" {...props} />,
    strong: ({ ...props }) => <strong className="font-semibold text-gray-800 dark:text-gray-200" {...props} />,
    em: ({ ...props }) => <em className="italic text-gray-700 dark:text-gray-300" {...props} />,
    blockquote: ({ ...props }) => <blockquote className="border-l-4 border-violet-500 dark:border-l-violet-400 pl-4 py-2 my-6 italic text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/30 rounded-r-md" {...props} />,
    pre: ({ ...props }) => <pre className="bg-gray-800 dark:bg-gray-900 rounded-md p-4 my-6 overflow-x-auto text-sm shadow-md" {...props} />,
    table: ({ ...props }) => <table className="w-full my-6 border-collapse border border-gray-200 dark:border-gray-700 shadow-sm" {...props} />,
    thead: ({ ...props }) => <thead className="bg-gray-50 dark:bg-gray-800/50" {...props} />,
    th: ({ ...props }) => <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300" {...props} />,
    td: ({ ...props }) => <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-700 dark:text-gray-300" {...props} />,
    tr: ({ ...props }) => <tr className="border-b border-gray-200 dark:border-gray-700 even:bg-gray-50/50 dark:even:bg-gray-800/20" {...props} />,
  }

  return (
    <motion.div
      className="relative overflow-hidden pt-28 md:pt-32 lg:pt-36 pb-16 md:pb-24"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      {/* Enhanced Background Elements - Consistent with Hero */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-950">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] bg-gradient-to-bl from-violet-500/10 to-transparent rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-gradient-to-tr from-teal-500/10 to-transparent rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/3 left-1/3 h-[400px] w-[400px] bg-gradient-to-br from-fuchsia-500/5 to-transparent rounded-full blur-3xl opacity-40" />
        <svg className="absolute opacity-10 dark:opacity-5 w-full h-full">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <motion.div
          variants={shapeAnimation}
          className="absolute top-1/4 left-1/4 h-8 w-8 bg-violet-500/20 dark:bg-violet-500/30 rounded-full hidden md:block"
        />
        <motion.div
          variants={shapeAnimation}
          transition={{ delay: 0.2 }}
          className="absolute bottom-1/3 right-1/4 h-6 w-6 bg-teal-500/20 dark:bg-teal-500/30 rounded-full hidden md:block"
        />
        <motion.div
          variants={shapeAnimation}
          transition={{ delay: 0.4 }}
          className="absolute top-2/3 right-1/3 h-10 w-10 bg-fuchsia-500/20 dark:bg-fuchsia-500/30 rounded-full hidden md:block"
        />
      </div>

      <div className="container max-w-5xl mx-auto px-4 relative z-10">
        <motion.div variants={fadeInUp}>
          <Button
            variant="ghost"
            size="sm"
            className="mb-10 text-gray-600 dark:text-gray-400 hover:bg-violet-50 dark:hover:bg-violet-950/30 hover:text-violet-600 dark:hover:text-violet-400 group transition-all duration-300 rounded-full px-4 py-2"
            asChild
          >
            <Link href="/#projects">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              <span>Back to Projects</span>
            </Link>
          </Button>
        </motion.div>

        <motion.div
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-gray-200/50 dark:border-gray-800/50"
          variants={fadeInUp}
        >
          {/* Project Header with Image */}
          <div className="relative h-96 md:h-[500px] w-full overflow-hidden group">
            <Image
              src={project.image || "/placeholder.svg?height=600&width=1200"}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-end">
              <motion.div
                className="p-8 md:p-12 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                  {project.title}
                </h1>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tags?.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-gradient-to-r from-violet-500/80 to-fuchsia-500/80 text-white px-3 py-1 text-xs md:text-sm border border-transparent hover:from-violet-600 hover:to-fuchsia-600 transition-all duration-200 shadow-sm"
                    >
                      {tag}
                    </Badge>
                  ))}
                  
                  {project.isPrivate && (
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-gray-700/90 to-gray-900/90 text-white px-3 py-1 text-xs md:text-sm border border-transparent shadow-sm flex items-center gap-1"
                    >
                      <Lock className="w-3 h-3" />
                      Private Project
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-gray-300 text-sm mt-3">
                  <Code className="h-4 w-4 mr-1.5 text-teal-400" />
                  <span>Category: </span>
                  <span className="ml-1 font-medium text-teal-300 tracking-wide">{project.category}</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Project Content */}
          <motion.div
            className="p-8 md:p-12"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {project.isPrivate && (
              <motion.div variants={fadeInUp} className="mb-10">
                <Alert className="bg-gray-100/80 dark:bg-gray-800/80 border-gray-300 dark:border-gray-700">
                  <AlertTriangle className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  <AlertTitle className="text-gray-900 dark:text-gray-100 font-semibold text-lg">Private Project</AlertTitle>
                  <AlertDescription className="text-gray-700 dark:text-gray-300">
                    This is a private project with restricted access. The demo and source code are not publicly available.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-between gap-6 mb-10">
              <div className="flex flex-wrap gap-4">
                {project.liveUrl && !project.isPrivate && (
                  <Button
                    className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-teal-500 hover:from-violet-700 hover:via-fuchsia-700 hover:to-teal-600 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-full px-6 py-2"
                    asChild
                  >
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Link>
                  </Button>
                )}
                {project.githubUrl && !project.isPrivate && (
                  <Button
                    variant="outline"
                    className="border-violet-300 dark:border-violet-800 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/30 hover:border-violet-400 dark:hover:border-violet-700 shadow-sm transition-all duration-300 rounded-full px-6 py-2"
                    asChild
                  >
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      View Code
                    </Link>
                  </Button>
                )}
                {project.isPrivate && (
                  <Button
                    variant="outline"
                    className="border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 bg-gray-100/50 dark:bg-gray-800/50 cursor-not-allowed shadow-sm rounded-full px-6 py-2"
                    disabled
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Private Project
                  </Button>
                )}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="prose prose-lg dark:prose-invert max-w-none mb-12 prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-violet-600 dark:prose-a:text-violet-400 hover:prose-a:text-fuchsia-600 dark:hover:prose-a:text-fuchsia-400 prose-strong:text-gray-800 dark:prose-strong:text-gray-200 prose-li:marker:text-violet-500 dark:prose-li:marker:text-violet-400">
              <div className="inline-block mb-6">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="h-1 w-10 bg-gradient-to-r from-transparent via-violet-500 to-fuchsia-500 rounded-full"></div>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-600 to-teal-500 dark:from-violet-400 dark:via-fuchsia-400 dark:to-teal-400 font-semibold tracking-wider uppercase text-sm">Project Overview</span>
                  <div className="h-1 w-10 bg-gradient-to-l from-transparent via-fuchsia-500 to-teal-500 rounded-full"></div>
                </div>
              </div>

              <p className="text-xl leading-relaxed">
                {project.description}
              </p>
            </motion.div>

            {/* Video Player - Custom Component */}
            {project.video_url && (
              <motion.div 
                variants={fadeInUp} 
                className="mt-16 mb-16"
              >
                <div className="flex items-center space-x-2 mb-8 justify-center">
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent via-violet-500 to-fuchsia-500 rounded-full"></div>
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-600 to-teal-500 dark:from-violet-400 dark:via-fuchsia-400 dark:to-teal-400 text-center">Project Demo</h2>
                  <div className="h-1 w-16 bg-gradient-to-l from-transparent via-fuchsia-500 to-teal-500 rounded-full"></div>
                </div>
                
                <div className="rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-800/50 overflow-hidden">
                  <Player
                    src={project.video_url}
                    poster={project.image}
                    className="aspect-video"
                  />
                </div>
              </motion.div>
            )}

            {/* Markdown Content */}
            {project.detailedContent && mounted && (
              <motion.div
                variants={fadeInUp}
                className="mt-12 prose prose-lg dark:prose-invert max-w-none mb-14 prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-headings:font-bold prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-violet-600 dark:prose-a:text-violet-400 hover:prose-a:text-fuchsia-600 dark:hover:prose-a:text-fuchsia-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:text-fuchsia-600 dark:prose-code:text-fuchsia-400 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-800 dark:prose-pre:bg-gray-900 prose-pre:text-gray-200 dark:prose-pre:text-gray-300 prose-strong:text-gray-800 dark:prose-strong:text-gray-200 prose-blockquote:border-l-violet-500 dark:prose-blockquote:border-l-violet-400 prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400 prose-li:marker:text-violet-500 dark:prose-li:marker:text-violet-400"
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeSanitize]}
                  components={markdownComponents}
                >
                  {project.detailedContent}
                </ReactMarkdown>
              </motion.div>
            )}

            {project.carousels && project.carousels.length > 0 && (
              <motion.div
                variants={fadeInUp}
                className="mt-16 pt-12 border-t border-gray-200/50 dark:border-gray-800/50"
              >
                <div className="flex items-center space-x-2 mb-8 justify-center">
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent via-violet-500 to-fuchsia-500 rounded-full"></div>
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-600 to-teal-500 dark:from-violet-400 dark:via-fuchsia-400 dark:to-teal-400 text-center">Project Gallery</h2>
                  <div className="h-1 w-16 bg-gradient-to-l from-transparent via-fuchsia-500 to-teal-500 rounded-full"></div>
                </div>
                <div className="relative w-full h-auto md:h-[550px] overflow-hidden rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-800/50 bg-white/30 dark:bg-gray-950/30 backdrop-blur-sm p-2">
                  <Carousel className="w-full h-full" opts={{ loop: true }} setApi={setCarouselApi}>
                    <CarouselContent className="h-full">
                      {project.carousels.map((url, index) => (
                        <CarouselItem key={index} className="h-full">
                          <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center bg-gray-100/50 dark:bg-black/30 rounded-lg overflow-hidden group cursor-pointer" onClick={() => openImageModal(url)}>
                            <Image
                              src={url}
                              alt={`${project.title} - slide ${index + 1}`}
                              fill
                              className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                              quality={95}
                              priority={index === 0}
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <ZoomIn className="h-10 w-10 text-white drop-shadow-lg" />
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/70 dark:bg-black/70 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-black/90 text-violet-600 dark:text-violet-400 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 rounded-full shadow-md border border-transparent hover:border-violet-200 dark:hover:border-violet-800 transition-all duration-200" />
                    <CarouselNext className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/70 dark:bg-black/70 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-black/90 text-violet-600 dark:text-violet-400 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 rounded-full shadow-md border border-transparent hover:border-violet-200 dark:hover:border-violet-800 transition-all duration-200" />
                  </Carousel>
                  
                  {/* Carousel Counter and Pagination */}
                  <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center space-y-2">
                    {/* Page Counter */}
                    <div className="bg-black/40 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                      {currentSlide} / {totalSlides}
                    </div>
                    
                    {/* Pagination Dots */}
                    <div className="flex items-center space-x-1.5">
                      {Array.from({ length: totalSlides }).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => carouselApi?.scrollTo(index)}
                          className={`h-2 rounded-full transition-all duration-300 ${currentSlide === index + 1
                              ? "w-6 bg-violet-500"
                              : "w-2 bg-gray-300/70 dark:bg-gray-600/70 hover:bg-violet-400"
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Image Modal with Zoom using TransformWrapper */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-none shadow-2xl overflow-hidden">
          <DialogTitle className="sr-only">
            {project.title}
          </DialogTitle>
          <div className="relative w-full h-full bg-black/90 backdrop-blur-md overflow-hidden rounded-lg">
            <TransformWrapper
              initialScale={1}
              minScale={0.5}
              maxScale={6}
              wheel={{ step: 0.1 }}
              pinch={{}}
              doubleClick={{ mode: "reset" }}
              panning={{ activationKeys: ["Space"] }}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  {/* Zoom Controls */}
                  <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm"
                      onClick={() => zoomIn(0.25)}
                    >
                      <ZoomIn className="h-5 w-5" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm"
                      onClick={() => zoomOut(0.25)}
                    >
                      <ZoomOut className="h-5 w-5" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm"
                      onClick={() => resetTransform()}
                    >
                      <RefreshCw className="h-5 w-5" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm"
                      onClick={() => setModalOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Zoom Container */}
                  <div className="overflow-hidden h-[80vh] w-full flex items-center justify-center">
                    <TransformComponent 
                      wrapperClass="w-full h-full flex items-center justify-center" 
                      contentClass="!overflow-visible"
                    >
                      {currentImage && (
                        <img
                          src={currentImage}
                          alt={project.title}
                          className="max-w-[90vw] max-h-[70vh] object-contain"
                        />
                      )}
                    </TransformComponent>
                  </div>
                  
                  {/* Instructions */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
                    Scroll to zoom • Drag to pan • Double-click to reset
                  </div>
                </>
              )}
            </TransformWrapper>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

// Updated Loading Skeleton with video player skeleton
function LoadingSkeleton() {
  return (
    <div className="relative overflow-hidden pt-28 md:pt-32 lg:pt-36 pb-16 md:pb-24 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-950 min-h-screen">
      {/* Minimal background elements for loading state */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] bg-violet-500/5 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-teal-500/5 rounded-full blur-3xl opacity-30" />
      </div>
      <div className="container max-w-5xl mx-auto px-4 relative z-10">
        <Skeleton className="h-8 w-36 mb-10 rounded-full" />
        <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-gray-200/30 dark:border-gray-800/30">
          <Skeleton className="h-96 md:h-[500px] w-full" />
          <div className="p-8 md:p-12">
            <Skeleton className="h-12 w-3/4 mb-4 rounded" />
            <div className="flex gap-2 mb-6">
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <div className="flex gap-4 mb-10">
              <Skeleton className="h-10 w-32 rounded-full" />
              <Skeleton className="h-10 w-32 rounded-full" />
            </div>
            <Skeleton className="h-6 w-48 mb-4 rounded" />
            <Skeleton className="h-20 w-full mb-10 rounded" />
            
            {/* Video player skeleton */}
            <Skeleton className="h-8 w-36 mx-auto mb-4 rounded" />
            <Skeleton className="h-[400px] w-full mb-10 rounded-xl" />
            
            <Skeleton className="h-96 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
} 