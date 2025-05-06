'use client'

import { IBlog } from "@/lib/models/Blog"

interface BlogJsonLdProps {
  blog: IBlog
}

export function BlogJsonLd({ blog }: BlogJsonLdProps) {
  // Create the JSON-LD structured data for the blog post
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.coverImage,
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt,
    author: {
      '@type': 'Person',
      name: blog.author.name,
      image: blog.author.image
    },
    publisher: {
      '@type': 'Organization',
      name: 'Nilesh Jaiswar Technologies',
      logo: {
        '@type': 'ImageObject',
        url: 'https://njt.dev/images/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://njt.dev/blogs/${blog.slug}`
    },
    keywords: blog.tags.join(', '),
    wordCount: blog.content.split(/\s+/).length,
    articleBody: blog.content
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
} 