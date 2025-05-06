"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Clock, Search, Tag, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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

export default function BlogsPage() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const [isHovered, setIsHovered] = useState<number | null>(null)
    const [searchValue, setSearchValue] = useState("")

    // Parse search params
    const page = Number(searchParams.get("page") || "1")
    const limit = Number(searchParams.get("limit") || "9")
    const tag = searchParams.get("tag") || undefined

    // Fetch blogs
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ["blogs", page, limit, tag],
        queryFn: () => blogsApi.getBlogs(page, limit, tag),
    })

    // Fetch tags
    const {
        data: tags,
        isLoading: isTagsLoading
    } = useQuery({
        queryKey: ["blogTags"],
        queryFn: () => blogsApi.getTags(),
    })

    // Handle search
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        // In a real app, you would implement search functionality
        // For now, we'll just log the search value
        console.log("Search for:", searchValue)
    }

    // Handle tag click
    const handleTagClick = (selectedTag: string) => {
        // If we're already filtering by this tag, remove the filter
        if (tag === selectedTag) {
            const params = new URLSearchParams(searchParams)
            params.delete("tag")
            params.set("page", "1")
            router.push(`${pathname}?${params.toString()}`)
        } else {
            const params = new URLSearchParams(searchParams)
            params.set("tag", selectedTag)
            params.set("page", "1")
            router.push(`${pathname}?${params.toString()}`)
        }
    }

    // Handle pagination
    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams)
        params.set("page", newPage.toString())
        router.push(`${pathname}?${params.toString()}`)
    }

    // Total pages calculation
    const totalPages = data ? Math.ceil(data.totalCount / limit) : 0

    if (error) {
        console.error("Error loading blogs:", error)
    }

    return (
        <main className="pt-32 pb-20">
            <div className="container mx-auto px-4">
                <motion.div
                    className="max-w-7xl mx-auto"
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                >
                    {/* Page Header */}
                    <motion.div variants={fadeInUp} className="mb-12 text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-600 to-teal-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-teal-400 mb-4">
                            Blog
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Thoughts, insights, and perspectives on technology, design, and development.
                        </p>
                    </motion.div>

                    {/* Search and Filters */}
                    <motion.div
                        variants={fadeInUp}
                        className="mb-12 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6"
                    >
                        {/* Search Form */}
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search articles..."
                                    className="pl-10"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="bg-violet-600 hover:bg-violet-700"
                            >
                                Search
                            </Button>
                        </form>

                        {/* Tags Filter */}
                        <div className="flex flex-wrap gap-2 items-center">
                            {isTagsLoading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <Skeleton key={i} className="h-7 w-20 rounded-full" />
                                ))
                            ) : tags && tags.length > 0 ? (
                                <>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 mr-1">
                                        Filter by:
                                    </span>
                                    {tags.map((tagName, i) => (
                                        <Badge
                                            key={i}
                                            variant={tag === tagName ? "default" : "secondary"}
                                            className={`cursor-pointer ${tag === tagName
                                                    ? "bg-violet-600 hover:bg-violet-700"
                                                    : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                                                }`}
                                            onClick={() => handleTagClick(tagName)}
                                        >
                                            <Tag className="h-3 w-3 mr-1" />
                                            {tagName}
                                        </Badge>
                                    ))}
                                </>
                            ) : null}
                        </div>
                    </motion.div>

                    {/* Current Tag Filter Display */}
                    {tag && (
                        <motion.div variants={fadeInUp} className="mb-8">
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant="outline"
                                    className="px-3 py-1 border-violet-300 dark:border-violet-700 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300"
                                >
                                    <Tag className="h-3 w-3 mr-1" />
                                    Filtered by: {tag}
                                </Badge>
                                <button
                                    onClick={() => {
                                        const params = new URLSearchParams(searchParams)
                                        params.delete("tag")
                                        router.push(`${pathname}?${params.toString()}`)
                                    }}
                                    className="text-sm text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                                >
                                    Clear filter
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Blog Grid */}
                    <motion.div
                        variants={fadeInUp}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {isLoading ? (
                            // Loading skeletons
                            Array.from({ length: 9 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-800"
                                >
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
                        ) : data && data.blogs.length > 0 ? (
                            data.blogs.map((blog, index) => (
                                <motion.div
                                    key={blog._id}
                                    variants={fadeInUp}
                                    className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-gray-200/50 dark:border-gray-800/50 transition-all duration-300 hover:shadow-lg hover:border-violet-200 dark:hover:border-violet-800/50"
                                    onMouseEnter={() => setIsHovered(index)}
                                    onMouseLeave={() => setIsHovered(null)}
                                >
                                    <Link href={`/blogs/${blog.slug}`}>
                                        <div className="relative h-48 w-full overflow-hidden">
                                            <Image
                                                src={blog.coverImage}
                                                alt={blog.title}
                                                fill
                                                className={`object-cover transition-transform duration-500 ${isHovered === index ? "scale-105" : "scale-100"
                                                    }`}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70" />
                                        </div>
                                    </Link>

                                    <div className="p-5">
                                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                                            {blog.tags.slice(0, 3).map((tag, i) => (
                                                <Badge
                                                    key={i}
                                                    variant="secondary"
                                                    className="bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 hover:bg-violet-200 dark:hover:bg-violet-800/40 cursor-pointer"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        handleTagClick(tag)
                                                    }}
                                                >
                                                    <Tag className="h-3 w-3 mr-1" />
                                                    {tag}
                                                </Badge>
                                            ))}
                                            {blog.tags.length > 3 && (
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    +{blog.tags.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        <Link href={`/blogs/${blog.slug}`}>
                                            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100 line-clamp-2 hover:text-violet-600 dark:hover:text-violet-400">
                                                {blog.title}
                                            </h3>
                                        </Link>

                                        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                                            {blog.excerpt}
                                        </p>

                                        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                                            <div className="flex items-center">
                                                <User className="h-4 w-4 mr-1" />
                                                <span>{blog.author.name}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="h-4 w-4 mr-1" />
                                                <span>{blog.readingTime} min read</span>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                            {formatDate(blog.publishedAt)}
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
                                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    No blog posts found
                                </h3>
                                {tag ? (
                                    <p className="text-gray-500 dark:text-gray-400">
                                        No posts found with the tag: {tag}
                                    </p>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Check back soon for new content!
                                    </p>
                                )}
                            </div>
                        )}
                    </motion.div>

                    {/* Pagination */}
                    {!isLoading && data && data.blogs.length > 0 && totalPages > 1 && (
                        <motion.div
                            variants={fadeInUp}
                            className="flex justify-center items-center mt-12 gap-2"
                        >
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page <= 1}
                                className="flex items-center gap-1"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Previous
                            </Button>

                            {Array.from({ length: totalPages }).map((_, index) => {
                                const pageNumber = index + 1
                                // Show only current page, first, last, and 1 page before and after current
                                if (
                                    pageNumber === 1 ||
                                    pageNumber === totalPages ||
                                    (pageNumber >= page - 1 && pageNumber <= page + 1)
                                ) {
                                    return (
                                        <Button
                                            key={pageNumber}
                                            variant={pageNumber === page ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => handlePageChange(pageNumber)}
                                            className={pageNumber === page ? "bg-violet-600 hover:bg-violet-700" : ""}
                                        >
                                            {pageNumber}
                                        </Button>
                                    )
                                } else if (
                                    pageNumber === page - 2 ||
                                    pageNumber === page + 2
                                ) {
                                    return <span key={pageNumber}>...</span>
                                }
                                return null
                            })}

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page >= totalPages}
                                className="flex items-center gap-1"
                            >
                                Next
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </motion.div>
                    )}

                    {/* Back to Home */}
                    <motion.div variants={fadeInUp} className="mt-12 text-center">
                        <Button
                            variant="ghost"
                            asChild
                            className="text-gray-600 dark:text-gray-400 hover:bg-violet-50 dark:hover:bg-violet-950/30 hover:text-violet-600 dark:hover:text-violet-400"
                        >
                            <Link href="/">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Home
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </main>
    )
} 