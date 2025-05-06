"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter, useSearchParams, ReadonlyURLSearchParams } from "next/navigation"
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

// New component to handle content dependent on searchParams
function BlogListingsContent({ searchParams }: { searchParams: ReadonlyURLSearchParams }) {
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
        console.log("Search for:", searchValue) // Placeholder
    }

    // Handle tag click
    const handleTagClick = (selectedTag: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (tag === selectedTag) {
            params.delete("tag")
        } else {
            params.set("tag", selectedTag)
        }
        params.set("page", "1")
        router.push(`${pathname}?${params.toString()}`)
    }

    // Handle pagination
    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", newPage.toString())
        router.push(`${pathname}?${params.toString()}`)
    }

    const totalPages = data ? Math.ceil(data.totalCount / limit) : 0

    if (error) {
        console.error("Error loading blogs:", error)
        return <p className="text-center text-red-500">Error loading blog posts.</p>;
    }
    
    return (
        <>
            {/* Search and Filters */}
            <motion.div
                variants={fadeInUp}
                className="mb-12 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start"
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
                <div className="flex flex-wrap gap-2 items-center justify-start lg:justify-end">
                    {isTagsLoading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-7 w-20 rounded-full" />
                        ))
                    ) : tags && tags.length > 0 ? (
                        <>
                            <span className="text-sm text-gray-500 dark:text-gray-400 mr-1 hidden sm:inline">
                                Filter by:
                            </span>
                            {tags.slice(0, 4).map((tagName) => ( 
                                <Badge
                                    key={tagName}
                                    variant={tag === tagName ? "default" : "secondary"}
                                    className={`cursor-pointer ${
                                        tag === tagName
                                            ? "bg-violet-600 hover:bg-violet-700"
                                            : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
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
                            onClick={() => handleTagClick(tag)} // Click again to clear
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
                    Array.from({ length: limit }).map((_, i) => (
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
                            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-gray-200/50 dark:border-gray-800/50 transition-all duration-300 hover:shadow-lg hover:border-violet-200 dark:hover:border-violet-800/50 flex flex-col"
                            onMouseEnter={() => setIsHovered(index)}
                            onMouseLeave={() => setIsHovered(null)}
                        >
                            <Link href={`/blogs/${blog.slug}`} className="block">
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={blog.coverImage}
                                        alt={blog.title}
                                        fill
                                        className={`object-cover transition-transform duration-500 ${
                                            isHovered === index ? "scale-105" : "scale-100"
                                        }`}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70" />
                                </div>
                            </Link>

                            <div className="p-5 flex flex-col flex-grow">
                                <div className="flex items-center gap-2 mb-3 flex-wrap">
                                    {blog.tags.slice(0, 2).map((tagItem, i) => (
                                        <Link key={i} href={`${pathname}?tag=${tagItem}`}>
                                            <Badge
                                                variant="secondary"
                                                className="bg-violet-100/80 dark:bg-violet-900/60 text-violet-700 dark:text-violet-300 text-xs px-2 py-0.5 hover:bg-violet-200/80 dark:hover:bg-violet-800/60"
                                            >
                                                {tagItem}
                                            </Badge>
                                        </Link>
                                    ))}
                                </div>

                                <Link href={`/blogs/${blog.slug}`} className="block mb-2">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200 line-clamp-2">
                                        {blog.title}
                                    </h2>
                                </Link>

                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">
                                    {blog.excerpt}
                                </p>

                                <div className="mt-auto pt-3 border-t border-gray-200/50 dark:border-gray-800/50 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center">
                                        <User className="w-3 h-3 mr-1" />
                                        <span>{blog.author.name}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-3 h-3 mr-1" />
                                        <span>{formatDate(blog.publishedAt)}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 md:col-span-2 lg:col-span-3 py-10">
                        No blog posts found matching your criteria.
                    </p>
                )}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
                <motion.div variants={fadeInUp} className="mt-12 flex justify-center items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page <= 1}
                        className="hover:bg-violet-50 dark:hover:bg-violet-900/30"
                    >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Previous
                    </Button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                        <Button
                            key={pageNumber}
                            variant={pageNumber === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(pageNumber)}
                            className={pageNumber === page ? "bg-violet-600 hover:bg-violet-700" : "hover:bg-violet-50 dark:hover:bg-violet-900/30"}
                        >
                            {pageNumber}
                        </Button>
                    ))}
                    
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page >= totalPages}
                        className="hover:bg-violet-50 dark:hover:bg-violet-900/30"
                    >
                        Next
                        <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                </motion.div>
            )}
        </>
    )
}

// Fallback UI for Suspense
function BlogListingsSkeleton() {
    const limit = 9; // Default limit for skeleton
    return (
        <>
            {/* Skeleton for Search and Filters */}
            <motion.div
                variants={fadeInUp}
                className="mb-12 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start"
            >
                <div className="flex gap-2">
                    <Skeleton className="h-10 flex-1 rounded-md" />
                    <Skeleton className="h-10 w-24 rounded-md" />
                </div>
                <div className="flex flex-wrap gap-2 items-center justify-start lg:justify-end">
                    <Skeleton className="h-7 w-16 rounded-full" />
                    <Skeleton className="h-7 w-20 rounded-full" />
                    <Skeleton className="h-7 w-24 rounded-full" />
                    <Skeleton className="h-7 w-16 rounded-full" />
                </div>
            </motion.div>

            {/* Skeleton for Blog Grid */}
            <motion.div
                variants={fadeInUp}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {Array.from({ length: limit }).map((_, i) => (
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
                ))}
            </motion.div>

            {/* Skeleton for Pagination */}
            <motion.div variants={fadeInUp} className="mt-12 flex justify-center items-center gap-2">
                <Skeleton className="h-9 w-24 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-24 rounded-md" />
            </motion.div>
        </>
    )
}

export default function BlogsPage() {
    // The page header can remain here as it doesn't depend on searchParams
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
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-600 to-teal-500 dark:from-violet-400 dark:via-fuchsia-400 dark:to-teal-400 mb-4">
                            Blog
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Thoughts, insights, and perspectives on technology, design, and development.
                        </p>
                    </motion.div>

                    {/* Wrap the content that uses useSearchParams in Suspense */}
                    <Suspense fallback={<BlogListingsSkeleton />}>
                        <BlogListingsWrapper />
                    </Suspense>
                </motion.div>
            </div>
        </main>
    )
}

// Wrapper component to call useSearchParams
function BlogListingsWrapper() {
    const searchParams = useSearchParams();
    return <BlogListingsContent searchParams={searchParams} />;
} 