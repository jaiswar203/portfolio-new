"use client"

import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { projectsApi } from "@/lib/api"
import dynamic from "next/dynamic"

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
  const [detailedContent, setDetailedContent] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  
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
    }
  }, [project])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Update project mutation
  const updateMutation = useMutation({
    mutationFn: (data: any) => projectsApi.updateProject(projectId, data), // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

          {mounted && (
            <div className="mb-6" data-color-mode="auto">
              <div className="wmde-markdown-var"></div>
              <label className="block text-sm font-medium mb-2">
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