import { MetadataRoute } from 'next'
import mongoose from 'mongoose'
import Blog from '@/lib/models/Blog'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Connect to database if not connected
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI as string)
  }
  
  // Base URLs
  const baseUrl = 'https://njt.dev'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    // Add other static pages here
  ]
  
  // Get all blog posts
  let blogEntries: MetadataRoute.Sitemap = []
  
  try {
    const blogs = await Blog.find({ isPublished: true })
      .sort({ publishedAt: -1 })
      .select('slug updatedAt')
    
    blogEntries = blogs.map(blog => ({
      url: `${baseUrl}/blogs/${blog.slug}`,
      lastModified: blog.updatedAt || new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }))
  } catch (error) {
    console.error('Error generating blog sitemap entries:', error)
  }
  
  // Return static pages + dynamic blog pages
  return [...staticPages, ...blogEntries] as MetadataRoute.Sitemap
} 