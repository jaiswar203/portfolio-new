'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, PencilIcon, TrashIcon, PlusCircle, FileText, X, Plus } from 'lucide-react';
import { ProjectDTO } from '@/lib/types/project';

// Fetch all projects
const fetchProjects = async (): Promise<ProjectDTO[]> => {
  const res = await fetch('/api/projects');
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
};

// Create a new project
const createProject = async (project: Partial<ProjectDTO>): Promise<ProjectDTO> => {
  const res = await fetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to create project');
  }

  return res.json();
};

// Update an existing project
const updateProject = async ({
  id,
  project
}: {
  id: string;
  project: Partial<ProjectDTO>;
}): Promise<ProjectDTO> => {
  const res = await fetch(`/api/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to update project');
  }

  return res.json();
};

// Delete a project
const deleteProject = async (id: string): Promise<void> => {
  const res = await fetch(`/api/projects/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to delete project');
  }
};

export default function ProjectsPage() {
  const queryClient = useQueryClient();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<ProjectDTO> & { _id?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);

  // Query to fetch projects
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  // Mutation to create project
  const createMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setIsCreateDialogOpen(false);
      resetForm();
    },
    onError: (error: Error) => {
      setFormError(error.message);
    },
  });

  // Mutation to update project
  const updateMutation = useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setIsEditDialogOpen(false);
      resetForm();
    },
    onError: (error: Error) => {
      setFormError(error.message);
    },
  });

  // Mutation to delete project
  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setIsDeleteDialogOpen(false);
    },
  });

  // Reset form state
  const resetForm = () => {
    setCurrentProject({});
    setFormError(null);
  };

  // Open edit dialog with project data
  const handleEdit = (project: ProjectDTO) => {
    setCurrentProject({
      _id: project._id,
      title: project.title,
      description: project.description,
      image: project.image,
      tags: project.tags,
      category: project.category,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      carousels: project.carousels || [],
      video_url: project.video_url,
    });
    setIsEditDialogOpen(true);
  };

  // Open delete dialog with project data
  const handleDelete = (project: ProjectDTO) => {
    setCurrentProject(project);
    setIsDeleteDialogOpen(true);
  };

  // Handle create project form submission
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!currentProject.title || !currentProject.description || !currentProject.category) {
      setFormError('Please fill out all required fields');
      return;
    }

    createMutation.mutate({
      title: currentProject.title,
      description: currentProject.description,
      image: currentProject.image,
      tags: currentProject.tags,
      category: currentProject.category as string,
      liveUrl: currentProject.liveUrl,
      githubUrl: currentProject.githubUrl,
      carousels: currentProject.carousels,
      video_url: currentProject.video_url,
    });
  };

  // Handle update project form submission
  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!currentProject.title || !currentProject.description || !currentProject.category) {
      setFormError('Please fill out all required fields');
      return;
    }

    if (!currentProject._id) {
      setFormError('Project ID is missing');
      return;
    }

    updateMutation.mutate({
      id: currentProject._id,
      project: {
        title: currentProject.title,
        description: currentProject.description,
        image: currentProject.image,
        tags: currentProject.tags,
        category: currentProject.category as string,
        liveUrl: currentProject.liveUrl,
        githubUrl: currentProject.githubUrl,
        carousels: currentProject.carousels,
        video_url: currentProject.video_url,
      },
    });
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProject((prev) => ({ ...prev, [name]: value }));
  };

  // Handle select input changes
  const handleSelectChange = (value: string, name: string) => {
    setCurrentProject((prev) => ({ ...prev, [name]: value }));
  };

  // Handle tags input (comma-separated list)
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(Boolean);
    setCurrentProject((prev) => ({ ...prev, tags: tagsArray }));
  };
  
  // Handle tag input on Enter key
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      const input = e.target as HTMLInputElement;
      const value = input.value.trim();
      
      if (value) {
        const currentTags = currentProject.tags || [];
        if (!currentTags.includes(value)) {
          setCurrentProject((prev) => ({
            ...prev,
            tags: [...currentTags, value]
          }));
          input.value = '';
        }
      }
    }
  };

  // Add a single carousel image
  const addCarouselImage = (url: string) => {
    if (!url.trim()) return;
    
    const currentCarousels = currentProject.carousels || [];
    setCurrentProject((prev) => ({
      ...prev,
      carousels: [...currentCarousels, url.trim()]
    }));
  };

  // Remove a carousel image at specific index
  const removeCarouselImage = (index: number) => {
    const currentCarousels = [...(currentProject.carousels || [])];
    currentCarousels.splice(index, 1);
    setCurrentProject((prev) => ({
      ...prev,
      carousels: currentCarousels
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Manage Projects</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center my-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center my-12 p-6 border rounded-lg">
          <p className="text-muted-foreground">No projects found. Add your first project!</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project: ProjectDTO) => (
              <TableRow key={project._id}>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell>{project.category}</TableCell>
                <TableCell>{project.tags?.join(', ')}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(project)}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                    >
                      <Link href={`/admin/dashboard/projects/${project._id}`}>
                        <FileText className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(project)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Create Project Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>
              Fill out the form below to add a new project to your portfolio.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateSubmit}>
            <div className="grid gap-4 py-4">
              {formError && (
                <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title *
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={currentProject.title || ''}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={currentProject.description || ''}
                  onChange={handleInputChange}
                  className="col-span-3"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="image"
                  name="image"
                  value={currentProject.image || ''}
                  onChange={handleInputChange}
                  placeholder="/placeholder.svg?height=400&width=600"
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category *
                </Label>
                <Select
                  onValueChange={(value) => handleSelectChange(value, 'category')}
                  defaultValue={currentProject.category}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                    <SelectItem value="fullstack">Fullstack</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="ai">AI</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tags" className="text-right">
                  Tags
                </Label>
                <div className="col-span-3 space-y-2">
                  {/* Display current tags */}
                  {currentProject.tags && currentProject.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {currentProject.tags.map((tag, index) => (
                        <div key={index} className="flex items-center bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                          <span className="text-sm mr-1">{tag}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5"
                            onClick={() => {
                              const newTags = [...(currentProject.tags || [])];
                              newTags.splice(index, 1);
                              setCurrentProject((prev) => ({ ...prev, tags: newTags }));
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Add new tag */}
                  <Input
                    id="tags"
                    name="tags"
                    placeholder="Type a tag and press Enter (e.g., React, Next.js)"
                    onChange={handleTagsChange}
                    onKeyDown={handleTagKeyDown}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter tags one at a time and press Enter, or separate multiple tags with commas.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="liveUrl" className="text-right">
                  Live URL
                </Label>
                <Input
                  id="liveUrl"
                  name="liveUrl"
                  value={currentProject.liveUrl || ''}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="githubUrl" className="text-right">
                  GitHub URL
                </Label>
                <Input
                  id="githubUrl"
                  name="githubUrl"
                  value={currentProject.githubUrl || ''}
                  onChange={handleInputChange}
                  placeholder="https://github.com/username/repo"
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="carousels" className="text-right">
                  Carousel Images
                </Label>
                <div className="col-span-3 space-y-2">
                  {/* Display current carousel images with option to remove */}
                  {currentProject.carousels && currentProject.carousels.length > 0 && (
                    <div className="space-y-2 mb-3">
                      {currentProject.carousels.map((url, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input value={url} readOnly className="flex-1" />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => removeCarouselImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Add new carousel image */}
                  <div className="flex items-center gap-2">
                    <Input
                      id="new-carousel"
                      placeholder="Enter image URL"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault(); // Prevent form submission
                          const input = e.target as HTMLInputElement;
                          if (input.value.trim()) {
                            addCarouselImage(input.value);
                            input.value = '';
                          }
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        const input = document.getElementById('new-carousel') as HTMLInputElement;
                        if (input?.value) {
                          addCarouselImage(input.value);
                          input.value = '';
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Enter image URLs one at a time. Press Enter or click the + button to add each image.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="video_url" className="text-right">
                  Video URL
                </Label>
                <Input
                  id="video_url"
                  name="video_url"
                  value={currentProject.video_url || ''}
                  onChange={handleInputChange}
                  placeholder="https://www.youtube.com/embed/video_id"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsCreateDialogOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Project'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Update your project details below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateSubmit}>
            <div className="grid gap-4 py-4">
              {formError && (
                <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Title *
                </Label>
                <Input
                  id="edit-title"
                  name="title"
                  value={currentProject.title || ''}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description *
                </Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={currentProject.description || ''}
                  onChange={handleInputChange}
                  className="col-span-3"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-image" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="edit-image"
                  name="image"
                  value={currentProject.image || ''}
                  onChange={handleInputChange}
                  placeholder="/placeholder.svg?height=400&width=600"
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right">
                  Category *
                </Label>
                <Select
                  onValueChange={(value) => handleSelectChange(value, 'category')}
                  defaultValue={currentProject.category}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                    <SelectItem value="fullstack">Fullstack</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="ai">AI</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-tags" className="text-right">
                  Tags
                </Label>
                <div className="col-span-3 space-y-2">
                  {/* Display current tags */}
                  {currentProject.tags && currentProject.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {currentProject.tags.map((tag, index) => (
                        <div key={index} className="flex items-center bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                          <span className="text-sm mr-1">{tag}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5"
                            onClick={() => {
                              const newTags = [...(currentProject.tags || [])];
                              newTags.splice(index, 1);
                              setCurrentProject((prev) => ({ ...prev, tags: newTags }));
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Add new tag */}
                  <Input
                    id="edit-tags"
                    name="tags"
                    placeholder="Type a tag and press Enter (e.g., React, Next.js)"
                    onChange={handleTagsChange}
                    onKeyDown={handleTagKeyDown}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter tags one at a time and press Enter, or separate multiple tags with commas.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-liveUrl" className="text-right">
                  Live URL
                </Label>
                <Input
                  id="edit-liveUrl"
                  name="liveUrl"
                  value={currentProject.liveUrl || ''}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-githubUrl" className="text-right">
                  GitHub URL
                </Label>
                <Input
                  id="edit-githubUrl"
                  name="githubUrl"
                  value={currentProject.githubUrl || ''}
                  onChange={handleInputChange}
                  placeholder="https://github.com/username/repo"
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-carousels" className="text-right">
                  Carousel Images
                </Label>
                <div className="col-span-3 space-y-2">
                  {/* Display current carousel images with option to remove */}
                  {currentProject.carousels && currentProject.carousels.length > 0 && (
                    <div className="space-y-2 mb-3">
                      {currentProject.carousels.map((url, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input value={url} readOnly className="flex-1" />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => removeCarouselImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Add new carousel image */}
                  <div className="flex items-center gap-2">
                    <Input
                      id="edit-new-carousel"
                      placeholder="Enter image URL"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault(); // Prevent form submission
                          const input = e.target as HTMLInputElement;
                          if (input.value.trim()) {
                            addCarouselImage(input.value);
                            input.value = '';
                          }
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        const input = document.getElementById('edit-new-carousel') as HTMLInputElement;
                        if (input?.value) {
                          addCarouselImage(input.value);
                          input.value = '';
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Enter image URLs one at a time. Press Enter or click the + button to add each image.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-video_url" className="text-right">
                  Video URL
                </Label>
                <Input
                  id="edit-video_url"
                  name="video_url"
                  value={currentProject.video_url || ''}
                  onChange={handleInputChange}
                  placeholder="https://www.youtube.com/embed/video_id"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Project'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the project &quot;{currentProject.title}&quot;.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (currentProject._id) {
                  deleteMutation.mutate(currentProject._id);
                }
              }}
              disabled={deleteMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 