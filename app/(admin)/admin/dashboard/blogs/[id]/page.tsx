"use client"

import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Save, Loader2, Tag as TagIcon, Plus, X, Eye, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { blogsApi } from "@/lib/api"
import dynamic from "next/dynamic"

// Import markdown editor dynamically to avoid SSR issues
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
)

export default function BlogEditor() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const id = params.id
  const isNewBlog = id === "new"

  // State
  const [mounted, setMounted] = useState(false)
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [coverImage, setCoverImage] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [authorImage, setAuthorImage] = useState("")
  const [isPublished, setIsPublished] = useState(false)
  const [featured, setFeatured] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  // Fetch blog if editing existing one
  const { data: blog, isLoading, error } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => blogsApi.getBlogById(id),
    enabled: !isNewBlog && !!id,
  })

  // Set initial values when data is loaded
  useEffect(() => {
    if (blog) {
      setTitle(blog.title || "")
      setSlug(blog.slug || "")
      setExcerpt(blog.excerpt || "")
      setContent(blog.content || "")
      setCoverImage(blog.coverImage || "")
      setAuthorName(blog.author?.name || "")
      setAuthorImage(blog.author?.image || "")
      setIsPublished(blog.isPublished || false)
      setFeatured(blog.featured || false)
      setTags(blog.tags || [])
    }
  }, [blog])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Create blog mutation
  const createMutation = useMutation({
    mutationFn: (data: any) => blogsApi.createBlog(data), // eslint-disable-line
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminBlogs"] })
      toast({
        title: "Blog created",
        description: "The blog post has been created successfully.",
      })
      setIsSaving(false)
      router.push("/admin/dashboard/blogs")
    },
    onError: (error) => {
      console.error("Error creating blog:", error)
      toast({
        title: "Error",
        description: "Failed to create blog post. Please try again.",
        variant: "destructive",
      })
      setIsSaving(false)
    }
  })

  // Update blog mutation
  const updateMutation = useMutation({
    mutationFn: (data: any) => blogsApi.updateBlog(id, data), // eslint-disable-line
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog", id] })
      queryClient.invalidateQueries({ queryKey: ["adminBlogs"] })
      toast({
        title: "Blog updated",
        description: "The blog post has been updated successfully.",
      })
      setIsSaving(false)
    },
    onError: (error) => {
      console.error("Error updating blog:", error)
      toast({
        title: "Error",
        description: "Failed to update blog post. Please try again.",
        variant: "destructive",
      })
      setIsSaving(false)
    }
  })

  // Generate slug from title
  const generateSlug = () => {
    if (!title) return
    
    const newSlug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')
    
    setSlug(newSlug)
  }

  // Add tag
  const addTag = () => {
    if (!tagInput.trim()) return
    
    // Don't add duplicate tags
    if (tags.includes(tagInput.trim())) {
      setTagInput("")
      return
    }
    
    setTags([...tags, tagInput.trim()])
    setTagInput("")
  }

  // Remove tag
  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    // Validate form
    if (!title || !slug || !content || !coverImage || !authorName) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      setIsSaving(false)
      return
    }
    
    const blogData = {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      author: {
        name: authorName,
        image: authorImage,
      },
      tags,
      isPublished,
      featured,
    }
    
    if (isNewBlog) {
      createMutation.mutate(blogData)
    } else {
      updateMutation.mutate(blogData)
    }
  }

  if (error) {
    console.error("Error loading blog:", error)
    
    return (
      <div className="p-8">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="mb-6">Failed to load blog. The blog post may not exist or there was a server error.</p>
          <Button asChild>
            <Link href="/admin/dashboard/blogs">Back to Blogs</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (!isNewBlog && isLoading) {
    return (
      <div className="flex items-center justify-center p-8 h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    )
  }

  return (
    <div className="container p-6">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" asChild>
          <Link href="/admin/dashboard/blogs">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blogs
          </Link>
        </Button>
        <Button 
          type="button"
          onClick={handleSubmit} 
          disabled={isSaving}
          className="bg-red-600 hover:bg-red-700"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Blog
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isNewBlog ? "Create New Blog Post" : "Edit Blog Post"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-semibold">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title"
                required
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="slug" className="text-base font-semibold">URL Slug *</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={generateSlug}
                >
                  Generate from title
                </Button>
              </div>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'))}
                placeholder="your-blog-post-url"
                required
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This will be used as the URL for your blog post: /blogs/{slug || 'your-blog-post-url'}
              </p>
            </div>

            {/* Cover Image */}
            <div className="space-y-2">
              <Label htmlFor="coverImage" className="text-base font-semibold">Cover Image URL *</Label>
              <Input
                id="coverImage"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                required
              />
              {coverImage && (
                <div className="relative mt-2 h-40 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Image
                    src={coverImage}
                    alt="Cover preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <Label htmlFor="excerpt" className="text-base font-semibold">Excerpt/Summary *</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Write a brief summary of your blog post"
                className="min-h-[100px]"
                required
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This will be displayed in blog listings and search results.
              </p>
            </div>

            {/* Author Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="authorName" className="text-base font-semibold">Author Name *</Label>
                <Input
                  id="authorName"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="authorImage" className="text-base font-semibold">Author Image URL</Label>
                <Input
                  id="authorImage"
                  value={authorImage}
                  onChange={(e) => setAuthorImage(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">Tags</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={addTag}
                  disabled={!tagInput.trim()}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary"
                    className="flex items-center gap-1 px-3 py-1"
                  >
                    <TagIcon className="h-3 w-3" />
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="ml-1 text-gray-500 hover:text-red-500 focus:outline-none"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {tags.length === 0 && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    No tags added yet. Tags help categorize your blog posts.
                  </span>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="space-y-4">
              <div className="flex flex-col space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label 
                      htmlFor="isPublished" 
                      className="text-base font-semibold"
                    >
                      Publish
                    </Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      When enabled, the blog post will be publicly visible.
                    </p>
                  </div>
                  <Switch
                    id="isPublished"
                    checked={isPublished}
                    onCheckedChange={setIsPublished}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label 
                      htmlFor="featured" 
                      className="text-base font-semibold"
                    >
                      Featured
                    </Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Feature this post on the homepage and blog listings.
                    </p>
                  </div>
                  <Switch
                    id="featured"
                    checked={featured}
                    onCheckedChange={setFeatured}
                  />
                </div>
              </div>
            </div>

            {/* Content Editor */}
            {mounted && (
              <div className="space-y-2" data-color-mode="auto">
                <div className="wmde-markdown-var"></div>
                <Label className="text-base font-semibold">Content *</Label>
                <MDEditor
                  value={content}
                  onChange={(value) => setContent(value || "")}
                  height={500}
                  preview="edit"
                  visiableDragbar
                />
              </div>
            )}

            {/* Preview Button */}
            {!isNewBlog && blog && (
              <div className="flex justify-end mt-6">
                <Button 
                  type="button" 
                  variant="outline"
                  asChild
                >
                  <Link href={`/blogs/${blog.slug}`} target="_blank">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Link>
                </Button>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            type="button"
            onClick={handleSubmit} 
            disabled={isSaving}
            className="bg-red-600 hover:bg-red-700"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Blog
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 