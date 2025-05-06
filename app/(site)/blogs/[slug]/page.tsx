"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Share, Tag, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import { blogsApi } from "@/lib/api"
import { formatDate } from "@/lib/utils"
import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeSanitize from "rehype-sanitize"
import { BlogJsonLd } from "@/components/blog-json-ld"

// Animation variants
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

export default function BlogPostPage() {
  const [mounted, setMounted] = useState(false)
  const params = useParams<{ slug: string }>()
  const slug = params.slug

  useEffect(() => {
    setMounted(true)
    
    // Increment view count when the page loads
    if (slug) {
      blogsApi.incrementViews(slug).catch(err => 
        console.error("Failed to increment view count:", err)
      )
    }
  }, [slug])

  const { data: blog, isLoading, error } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => blogsApi.getBlogBySlug(slug),
    enabled: !!slug
  })

  if (error) {
    console.error("Error loading blog:", error)
    notFound()
  }

  // Share blog post
  const handleShare = async () => {
    if (navigator.share && blog) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href
        })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    } else {
      // Fallback - copy URL to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("URL copied to clipboard!")
    }
  }

  // Define markdown components
  const markdownComponents = {
    h2: ({ ...props }) => <h2 className="text-3xl font-bold mt-12 mb-6 border-b border-gray-200 dark:border-gray-700 pb-3 text-gray-900 dark:text-gray-100" {...props} />,
    h3: ({ ...props }) => <h3 className="text-2xl font-bold mt-10 mb-5 text-gray-900 dark:text-gray-100" {...props} />,
    img: ({ ...props }) => <img className="mb-4 rounded-md shadow-sm border dark:border-gray-700 mx-auto" {...props} />,
    hr: ({ ...props }) => <hr className="my-8 border-t border-gray-200 dark:border-gray-700" {...props} />,
    p: ({ ...props }) => <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed" {...props} />,
    a: ({ ...props }) => <a className="text-violet-600 dark:text-violet-400 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 underline decoration-violet-300 dark:decoration-violet-700 hover:decoration-fuchsia-400 dark:hover:decoration-fuchsia-500 underline-offset-2 transition-colors" {...props} />,
    ul: ({ ...props }) => <ul className="list-disc list-inside mb-4 pl-5 space-y-2 text-gray-700 dark:text-gray-300" {...props} />,
    ol: ({ ...props }) => <ol className="list-decimal list-inside mb-4 pl-5 space-y-2 text-gray-700 dark:text-gray-300" {...props} />,
    li: ({ ...props }) => <li className="marker:text-violet-500 dark:marker:text-violet-400" {...props} />,
    strong: ({ ...props }) => <strong className="font-semibold text-gray-800 dark:text-gray-200" {...props} />,
    em: ({ ...props }) => <em className="italic text-gray-700 dark:text-gray-300" {...props} />,
    blockquote: ({ ...props }) => <blockquote className="border-l-4 border-violet-500 dark:border-violet-400 pl-4 py-2 my-6 italic text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/30 rounded-r-md" {...props} />,
    pre: ({ ...props }) => <pre className="bg-gray-800 dark:bg-gray-900 rounded-md p-4 my-6 overflow-x-auto text-sm shadow-md" {...props} />,
    code: ({ className, children, ...props }: any) => { // eslint-disable-line
      const inline = props.inline
      
      if (inline) {
        return <code className={`bg-gray-100 dark:bg-gray-800 text-violet-600 dark:text-violet-400 px-1 py-0.5 rounded text-sm ${className || ''}`} {...props}>{children}</code>;
      }

      return (
        <div className="overflow-hidden">
          <pre className={`bg-gray-800 dark:bg-gray-900 rounded-md p-4 text-sm shadow-md block overflow-x-auto ${className || ''}`}>
            <code>{children}</code>
          </pre>
        </div>
      );
    },
    table: ({ ...props }) => <div className="overflow-x-auto my-6"><table className="w-full border-collapse border border-gray-200 dark:border-gray-700 shadow-sm" {...props} /></div>,
    thead: ({ ...props }) => <thead className="bg-gray-50 dark:bg-gray-800/50" {...props} />,
    th: ({ ...props }) => <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300" {...props} />,
    td: ({ ...props }) => <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-700 dark:text-gray-300" {...props} />,
    tr: ({ ...props }) => <tr className="border-b border-gray-200 dark:border-gray-700 even:bg-gray-50/50 dark:even:bg-gray-800/20" {...props} />,
  }

  if (isLoading) {
    return <BlogPostSkeleton />
  }

  if (!blog) {
    notFound()
  }

  return (
    <motion.div
      className="relative overflow-hidden pt-28 md:pt-32 lg:pt-36 pb-16 md:pb-24"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      {/* Add JSON-LD Schema */}
      {mounted && blog && <BlogJsonLd blog={blog} />}
      
      {/* Background Elements */}
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
      </div>

      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        <motion.div variants={fadeInUp}>
          <Button
            variant="ghost"
            size="sm"
            className="mb-10 text-gray-600 dark:text-gray-400 hover:bg-violet-50 dark:hover:bg-violet-950/30 hover:text-violet-600 dark:hover:text-violet-400 group transition-all duration-300 rounded-full px-4 py-2"
            asChild
          >
            <Link href="/blogs">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              <span>Back to Blogs</span>
            </Link>
          </Button>
        </motion.div>

        <motion.article
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-gray-200/50 dark:border-gray-800/50"
          variants={fadeInUp}
        >
          {/* Blog Header */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-end">
              <div className="p-6 md:p-8 lg:p-10 w-full">
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-gradient-to-r from-violet-500/80 to-fuchsia-500/80 text-white px-3 py-1 text-xs md:text-sm border border-transparent hover:from-violet-600 hover:to-fuchsia-600 transition-all duration-200 shadow-sm"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                  {blog.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Blog Content */}
          <div className="p-6 md:p-8 lg:p-10">
            {/* Meta Information */}
            <div className="flex flex-wrap justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-6 mb-8">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mr-3">
                  {blog.author.image ? (
                    <Image
                      src={blog.author.image}
                      alt={blog.author.name}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <User className="w-full h-full p-2 text-gray-400 dark:text-gray-500" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {blog.author.name}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-3.5 h-3.5 mr-1" />
                    {formatDate(blog.publishedAt)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{blog.readingTime} min read</span>
                </div>
                
                {mounted && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Share className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                )}
              </div>
            </div>

            {/* Blog Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-headings:font-bold prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-violet-600 dark:prose-a:text-violet-400 hover:prose-a:text-fuchsia-600 dark:hover:prose-a:text-fuchsia-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:text-fuchsia-600 dark:prose-code:text-fuchsia-400 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-800 dark:prose-pre:bg-gray-900 prose-pre:text-gray-200 dark:prose-pre:text-gray-300 prose-strong:text-gray-800 dark:prose-strong:text-gray-200 prose-blockquote:border-l-violet-500 dark:prose-blockquote:border-l-violet-400 prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400 prose-li:marker:text-violet-500 dark:prose-li:marker:text-violet-400">
              {mounted && (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeSanitize]}
                  components={markdownComponents}
                >
                  {blog.content}
                </ReactMarkdown>
              )}
            </div>

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Tags:
              </h4>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <Link key={index} href={`/blogs?tag=${tag}`}>
                    <Badge 
                      variant="outline"
                      className="bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800 hover:bg-violet-100 dark:hover:bg-violet-800/40 transition-colors"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.article>

        {/* Navigation */}
        <motion.div variants={fadeInUp} className="mt-10 flex justify-center">
          <Button
            variant="ghost"
            asChild
            className="text-gray-600 dark:text-gray-400 hover:bg-violet-50 dark:hover:bg-violet-950/30 hover:text-violet-600 dark:hover:text-violet-400 group transition-all duration-300 rounded-full px-4 py-2"
          >
            <Link href="/blogs">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to All Blogs
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Loading skeleton
function BlogPostSkeleton() {
  return (
    <div className="relative overflow-hidden pt-28 md:pt-32 lg:pt-36 pb-16 md:pb-24 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-950">
      {/* Minimal background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] bg-violet-500/5 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-teal-500/5 rounded-full blur-3xl opacity-30" />
      </div>
      
      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        <Skeleton className="h-8 w-36 mb-10 rounded-full" />
        
        <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-gray-200/30 dark:border-gray-800/30">
          {/* Blog Header Skeleton */}
          <Skeleton className="h-64 sm:h-80 md:h-96 w-full" />
          
          {/* Blog Content Skeleton */}
          <div className="p-6 md:p-8 lg:p-10">
            {/* Meta Information Skeleton */}
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-6 mb-8">
              <div className="flex items-center">
                <Skeleton className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-16 rounded-md" />
              </div>
            </div>
            
            {/* Content Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-4/5" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/5" />
              <Skeleton className="h-20 w-full" />
            </div>
            
            {/* Tags Skeleton */}
            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
              <Skeleton className="h-5 w-20 mb-3" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-7 w-16 rounded-full" />
                <Skeleton className="h-7 w-20 rounded-full" />
                <Skeleton className="h-7 w-14 rounded-full" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10 flex justify-center">
          <Skeleton className="h-10 w-40 rounded-full" />
        </div>
      </div>
    </div>
  );
} 