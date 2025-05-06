import type React from "react"
import { Metadata } from "next"
import mongoose from 'mongoose'
import Blog from '@/lib/models/Blog'

type Props = {
  params: { slug: string }
}

// Generate dynamic metadata for blog post pages
export async function generateMetadata({ params: paramsProp }: Props): Promise<Metadata> {
  // Explicitly resolve params as per the error message suggestion, though unconventional for direct props.
  const params = await Promise.resolve(paramsProp);
  const slug = params.slug
  
  // Connect to database if not connected
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI as string)
  }
  
  try {
    // Find the blog post by slug
    const blog = await Blog.findOne({ slug: slug })
    
    if (!blog) {
      return {
        title: 'Blog Post Not Found | NJT Blog',
        description: 'The requested blog post could not be found.',
      }
    }
    
    
    
    return {
      title: `${blog.title} | NJT Blog`,
      description: blog.excerpt,
      authors: [{ name: blog.author.name }],
      keywords: blog.tags,
      openGraph: {
        title: blog.title,
        description: blog.excerpt,
        type: 'article',
        url: `https://njt.dev/blogs/${blog.slug}`,
        images: [
          {
            url: blog.coverImage,
            width: 1200,
            height: 630,
            alt: blog.title
          }
        ],
        publishedTime: blog.publishedAt.toISOString(),
        modifiedTime: blog.updatedAt.toISOString(),
        section: blog.tags[0] || 'Technology',
        tags: blog.tags
      },
      twitter: {
        card: 'summary_large_image',
        title: blog.title,
        description: blog.excerpt,
        images: [blog.coverImage]
      },
      alternates: {
        canonical: `https://njt.dev/blogs/${blog.slug}`,
      }
    }
  } catch (error) {
    console.error('Error fetching blog metadata:', error)
    return {
      title: 'Blog Post | NJT Blog',
      description: 'Read our latest insights on technology and web development.',
    }
  }
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 