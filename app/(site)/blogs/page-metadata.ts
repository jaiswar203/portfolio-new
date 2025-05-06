import { Metadata } from "next"
import mongoose from 'mongoose'
import Blog from '@/lib/models/Blog'

type MetadataProps = {
  params: {} // eslint-disable-line
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { searchParams }: MetadataProps
): Promise<Metadata> {
  // Get tag from search params
  const tag = searchParams?.tag as string | undefined
  
  // Define base metadata
  let title = "NJT Blog - Insights on Web Development and Technology"
  let description = "Explore articles and tutorials about web development, programming, and the latest tech trends by Nilesh Jaiswar Technologies."
  
  // If tag filter is applied, customize metadata
  if (tag) {
    title = `${tag} Articles - NJT Blog`
    description = `Read our latest articles about ${tag} - tips, tutorials, and insights from Nilesh Jaiswar Technologies.`
  }
  
  // Connect to database to fetch latest blogs if needed
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI as string)
  }
  
  // Get featured blog image for OG image if no tag is specified
  let ogImageUrl = "/images/blog-og-image.jpg"
  
  if (!tag) {
    try {
      // Get the most recent featured blog for OG image
      const featuredBlog = await Blog.findOne({ featured: true, isPublished: true })
        .sort({ publishedAt: -1 })
        .limit(1)
      
      if (featuredBlog && featuredBlog.coverImage) {
        ogImageUrl = featuredBlog.coverImage
      }
    } catch (error) {
      console.error("Error fetching featured blog for OG image:", error)
    }
  }
  
  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: tag ? `https://njt.dev/blogs?tag=${tag}` : "https://njt.dev/blogs",
      siteName: "NJT Blog",
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl]
    },
    keywords: tag 
      ? [`${tag}`, "web development", "programming", "technology", "tutorials", "nilesh jaiswar"] 
      : ["web development", "programming", "technology", "tutorials", "nilesh jaiswar", "blog"],
    alternates: {
      canonical: tag ? `https://njt.dev/blogs?tag=${tag}` : "https://njt.dev/blogs",
    }
  }
} 