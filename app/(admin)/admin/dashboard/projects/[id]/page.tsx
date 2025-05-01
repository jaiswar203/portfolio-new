"use client"

import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Save, Loader2, Plus, X, Image as ImageIcon, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { ProjectInput, projectsApi } from "@/lib/api"
import Image from "next/image"
import dynamic from "next/dynamic"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

// Import markdown editor dynamically to avoid SSR issues
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
)

export default function ProjectDetailEditor() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const params = useParams<{ id: string }>()
  const projectId = params.id

  const [mounted, setMounted] = useState(false)
  const [isDetailedPage, setIsDetailedPage] = useState(false)
  const [isPrivate, setIsPrivate] = useState(false)
  const [detailedContent, setDetailedContent] = useState("")
  const [carousels, setCarousels] = useState<string[]>([])
  const [carouselImage, setCarouselImage] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState<number | null>(null)
  
  // Fetch project data
  const { data: project, isLoading, error } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => projectsApi.getProjectById(projectId),
    enabled: !!projectId
  })

  // Set initial values when data is loaded
  useEffect(() => {
    if (project) {
      setDetailedContent(project.detailedContent || "")
      setIsDetailedPage(project.isDetailedPage || false)
      setIsPrivate(project.isPrivate || false)
      setCarousels(project.carousels || [])
      setVideoUrl(project.video_url || "")
    }
  }, [project])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Add a new carousel image URL
  const handleAddCarouselImage = () => {
    if (carouselImage && carouselImage.trim()) {
      setCarousels([...carousels, carouselImage.trim()])
      setCarouselImage("")
      toast({
        title: "Image added",
        description: "Carousel image has been added successfully."
      })
    }
  }

  // Remove a carousel image URL
  const handleRemoveCarouselImage = (index: number) => {
    setCarousels(carousels.filter((_, i) => i !== index))
    setPreviewMode(null)
    toast({
      title: "Image removed",
      description: "Carousel image has been removed."
    })
  }

  // Move carousel image up in order
  const handleMoveUp = (index: number) => {
    if (index === 0) return
    const newCarousels = [...carousels]
    const temp = newCarousels[index]
    newCarousels[index] = newCarousels[index - 1]
    newCarousels[index - 1] = temp
    setCarousels(newCarousels)
    if (previewMode === index) setPreviewMode(index - 1)
    else if (previewMode === index - 1) setPreviewMode(index)
  }

  // Move carousel image down in order
  const handleMoveDown = (index: number) => {
    if (index === carousels.length - 1) return
    const newCarousels = [...carousels]
    const temp = newCarousels[index]
    newCarousels[index] = newCarousels[index + 1]
    newCarousels[index + 1] = temp
    setCarousels(newCarousels)
    if (previewMode === index) setPreviewMode(index + 1)
    else if (previewMode === index + 1) setPreviewMode(index)
  }

  // Toggle image preview
  const togglePreview = (index: number) => {
    if (previewMode === index) {
      setPreviewMode(null)
    } else {
      setPreviewMode(index)
    }
  }

  // Update project mutation
  const updateMutation = useMutation({
    mutationFn: (data: Partial<ProjectInput>) => projectsApi.updateProject(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] })
      toast({
        title: "Project updated",
        description: "The project details have been successfully updated.",
      })
      setIsSaving(false)
    },
    onError: (error) => {
      console.error("Error updating project:", error)
      toast({
        title: "Error",
        description: "Failed to update project. Please try again.",
        variant: "destructive",
      })
      setIsSaving(false)
    }
  })

  const handleSave = async () => {
    setIsSaving(true)
    updateMutation.mutate({
      detailedContent,
      isDetailedPage,
      isPrivate,
      carousels,
      video_url: videoUrl,
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="mb-6">Failed to load project details. Please try again.</p>
          <Button asChild>
            <Link href="/admin/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container p-6">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" asChild>
          <Link href="/admin/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <Button 
          type="button"
          onClick={handleSave} 
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
              Save Changes
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Project: {project.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Switch
                id="isDetailedPage"
                checked={isDetailedPage}
                onCheckedChange={setIsDetailedPage}
              />
              <Label htmlFor="isDetailedPage">
                Enable detailed project page
              </Label>
            </div>
            <p className="text-sm text-gray-500 ml-6">
              When enabled, a &qout;View Details&qout; button will appear on the project card, 
              linking to a dedicated page with this markdown content.
            </p>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Switch
                id="isPrivate"
                checked={isPrivate}
                onCheckedChange={setIsPrivate}
              />
              <Label htmlFor="isPrivate">
                Mark as private project
              </Label>
            </div>
            <p className="text-sm text-gray-500 ml-6">
              When enabled, the project will be marked as private with a special indicator. 
              The code and demo links will be hidden from public view.
            </p>
          </div>

          {/* Video URL Section */}
          <div className="mb-6">
            <div className="space-y-2">
              <Label htmlFor="video_url" className="text-base font-semibold">Video URL</Label>
              <div className="flex gap-2">
                <Input
                  id="video_url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/embed/video_id"
                  className="flex-1"
                />
                {videoUrl && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => window.open(videoUrl, '_blank')}
                    title="Open video link"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <p className="text-sm text-gray-500">
                Enter a YouTube embed URL. If provided, the video will be shown instead of images.
              </p>
            </div>
          </div>

          {/* Carousel Preview Section */}
          {carousels.length > 0 && (
            <div className="mb-6 max-w-3xl mx-auto">
              <Label className="text-base font-semibold mb-2 block">Carousel Preview</Label>
              <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                <Carousel className="w-full">
                  <CarouselContent>
                    {carousels.map((url, index) => (
                      <CarouselItem key={index}>
                        <div className="relative h-60 w-full rounded-md overflow-hidden">
                          <Image
                            src={url}
                            alt={`Slide ${index + 1}`}
                            fill
                            className="object-contain bg-gray-100 dark:bg-gray-900"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-12" />
                  <CarouselNext className="-right-12" />
                </Carousel>
              </div>
            </div>
          )}

          {/* Carousel Images Section */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-base font-semibold">Carousel Images</Label>
              <span className="text-sm text-gray-500">{carousels.length} image(s)</span>
            </div>
            
            {/* Add new image */}
            <div className="flex gap-2 mb-4">
              <Input
                value={carouselImage}
                onChange={(e) => setCarouselImage(e.target.value)}
                placeholder="Enter image URL"
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && carouselImage.trim()) {
                    e.preventDefault();
                    handleAddCarouselImage();
                  }
                }}
              />
              <Button
                type="button"
                onClick={handleAddCarouselImage}
                className="bg-red-600 hover:bg-red-700 min-w-24"
                disabled={!carouselImage.trim()}
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
            
            <p className="text-sm text-gray-500 mb-4">
              Add image URLs to create a carousel. The images will be displayed in the order added.
              If no images are provided, the main project image will be shown.
            </p>

            {/* Image preview section */}
            {previewMode !== null && carousels[previewMode] && (
              <div className="mb-4 relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
                <div className="relative h-60 w-full">
                  <Image
                    src={carousels[previewMode]}
                    alt={`Preview of slide ${previewMode + 1}`}
                    fill
                    className="object-contain bg-gray-100 dark:bg-gray-900"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 h-auto"
                  onClick={() => setPreviewMode(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 text-center">
                  Preview of slide {previewMode + 1} of {carousels.length}
                </div>
              </div>
            )}

            {/* Image list */}
            <div className="space-y-2 mt-4">
              {carousels.length === 0 ? (
                <div className="text-center py-8 border border-dashed rounded-lg border-gray-300 dark:border-gray-700">
                  <ImageIcon className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-500">No carousel images added yet</p>
                </div>
              ) : (
                carousels.map((url, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-2 p-3 rounded-lg border ${
                      previewMode === index 
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/10' 
                        : 'border-gray-200 dark:border-gray-800'
                    }`}
                  >
                    <div 
                      className="h-10 w-10 relative rounded overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 cursor-pointer"
                      onClick={() => togglePreview(index)}
                    >
                      {url ? (
                        <Image 
                          src={url} 
                          alt={`Slide ${index + 1}`} 
                          fill 
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full w-full">
                          <ImageIcon className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    <Input 
                      value={url} 
                      onChange={(e) => {
                        const newCarousels = [...carousels];
                        newCarousels[index] = e.target.value;
                        setCarousels(newCarousels);
                      }}
                      className="flex-1"
                    />
                    
                    <div className="flex gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => togglePreview(index)}
                        title="Preview image"
                        className="h-8 w-8"
                      >
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                        title="Move up"
                        className="h-8 w-8"
                      >
                        <ArrowLeft className="h-4 w-4 rotate-90" />
                      </Button>
                      
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleMoveDown(index)}
                        disabled={index === carousels.length - 1}
                        title="Move down"
                        className="h-8 w-8"
                      >
                        <ArrowLeft className="h-4 w-4 -rotate-90" />
                      </Button>
                      
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveCarouselImage(index)}
                        title="Remove image"
                        className="h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {mounted && (
            <div className="mb-6" data-color-mode="auto">
              <div className="wmde-markdown-var"></div>
              <label className="block text-base font-semibold mb-2">
                Detailed Project Content (Markdown)
              </label>
              <MDEditor
                value={detailedContent}
                onChange={(value) => setDetailedContent(value || "")}
                height={500}
                preview="edit"
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            type="button"
            onClick={handleSave} 
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
                Save Changes
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 