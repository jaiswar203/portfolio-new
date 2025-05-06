"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  AlertTriangle,
  ArrowUpDown,
  Clock,
  Loader2,
} from "lucide-react"
import { blogsApi } from "@/lib/api"
import { formatDate } from "@/lib/utils"

export default function BlogsManagementPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  
  // State
  const [searchTerm, setSearchTerm] = useState("")
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  
  // Get current page and sorting from query params
  const page = Number(searchParams.get("page") || "1")
  const limit = Number(searchParams.get("limit") || "10")
  
  // Query to fetch blogs
  const { 
    data, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ["adminBlogs", page, limit],
    queryFn: () => blogsApi.getBlogs(page, limit),
  })
  
  // Delete blog mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => blogsApi.deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminBlogs"] })
      toast({
        title: "Blog post deleted",
        description: "The blog post has been deleted successfully.",
      })
      setIsDeleting(null)
    },
    onError: (error) => {
      console.error("Error deleting blog post:", error)
      toast({
        title: "Error",
        description: "Failed to delete blog post. Please try again.",
        variant: "destructive",
      })
      setIsDeleting(null)
    }
  })
  
  // Handle deletion
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
      setIsDeleting(id)
      deleteMutation.mutate(id)
    }
  }
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement search functionality when API supports it
    console.log("Search for:", searchTerm)
  }
  
  // Handle page change
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", newPage.toString())
    router.push(`${pathname}?${params.toString()}`)
  }
  
  // Calculate total pages
  const totalPages = data ? Math.ceil(data.totalCount / limit) : 0
  
  if (error) {
    console.error("Error loading blogs:", error)
  }
  
  return (
    <div className="container p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="text-2xl font-bold">Manage Blogs</h1>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search blogs..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button type="submit" variant="outline">
              Search
            </Button>
          </form>
          
          <Button 
            className="bg-red-600 hover:bg-red-700"
            onClick={() => router.push("/admin/dashboard/blogs/new")}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Blog
          </Button>
        </div>
      </div>
      
      {/* Blog List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">
                  <div className="flex items-center space-x-1">
                    <span>Title</span>
                    <ArrowUpDown className="h-3.5 w-3.5" />
                  </div>
                </TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>
                  <div className="flex items-center space-x-1">
                    <span>Published</span>
                    <ArrowUpDown className="h-3.5 w-3.5" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>Read</span>
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                // Loading skeleton
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-10 w-10 rounded" />
                        <Skeleton className="h-4 w-48" />
                      </div>
                    </TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-8 rounded-full ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : data && data.blogs.length > 0 ? (
                data.blogs.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {blog.coverImage ? (
                          <div className="relative h-10 w-10 overflow-hidden rounded">
                            <Image
                              src={blog.coverImage}
                              alt={blog.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-10 w-10 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                            <AlertTriangle className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                          </div>
                        )}
                        <div className="font-medium truncate max-w-[200px]" title={blog.title}>
                          {blog.title}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{blog.author.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {blog.tags.slice(0, 2).map((tag, i) => (
                          <Badge key={i} variant="outline" className="whitespace-nowrap">
                            {tag}
                          </Badge>
                        ))}
                        {blog.tags.length > 2 && (
                          <Badge variant="outline">+{blog.tags.length - 2}</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(blog.publishedAt)}</TableCell>
                    <TableCell>{blog.readingTime} min</TableCell>
                    <TableCell>
                      {blog.isPublished ? (
                        <Badge variant="default" className="bg-green-500">Published</Badge>
                      ) : (
                        <Badge variant="outline" className="text-gray-500 dark:text-gray-400">Draft</Badge>
                      )}
                    </TableCell>
                    <TableCell>{blog.views || 0}</TableCell>
                    <TableCell className="text-right">
                      {isDeleting === blog._id ? (
                        <Button size="icon" variant="ghost" disabled>
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </Button>
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/blogs/${blog.slug}`} target="_blank">
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/dashboard/blogs/${blog._id}`}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600 dark:text-red-400"
                              onClick={() => handleDelete(blog._id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <p className="mb-2 text-gray-500 dark:text-gray-400">No blog posts found</p>
                      <Button variant="outline" onClick={() => router.push("/admin/dashboard/blogs/new")}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create your first blog post
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        {!isLoading && data && data.blogs.length > 0 && totalPages > 1 && (
          <div className="flex items-center justify-center py-4 gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
            >
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
                    className={pageNumber === page ? "bg-red-600 hover:bg-red-700" : ""}
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
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  )
} 