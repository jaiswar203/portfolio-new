'use client';

import { useState } from 'react';
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
import { Loader2, PencilIcon, TrashIcon, PlusCircle } from 'lucide-react';
import { testimonialsApi, TestimonialDTO, TestimonialInput, TestimonialUpdate } from '@/lib/api';

export default function TestimonialsPage() {
  const queryClient = useQueryClient();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<Partial<TestimonialDTO>>({});
  const [formError, setFormError] = useState<string | null>(null);

  // Query to fetch testimonials
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: testimonialsApi.getAllTestimonials,
  });

  // Mutation to create testimonial
  const createMutation = useMutation({
    mutationFn: testimonialsApi.createTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      setIsCreateDialogOpen(false);
      resetForm();
    },
    onError: (error: Error) => {
      setFormError(error.message);
    },
  });

  // Mutation to update testimonial
  const updateMutation = useMutation({
    mutationFn: ({ id, testimonial }: { id: string; testimonial: TestimonialUpdate }) => 
      testimonialsApi.updateTestimonial(id, testimonial),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      setIsEditDialogOpen(false);
      resetForm();
    },
    onError: (error: Error) => {
      setFormError(error.message);
    },
  });

  // Mutation to delete testimonial
  const deleteMutation = useMutation({
    mutationFn: testimonialsApi.deleteTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      setIsDeleteDialogOpen(false);
    },
  });

  // Reset form state
  const resetForm = () => {
    setCurrentTestimonial({});
    setFormError(null);
  };

  // Open edit dialog with testimonial data
  const handleEdit = (testimonial: TestimonialDTO) => {
    setCurrentTestimonial({
      _id: testimonial._id,
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      content: testimonial.content,
      image: testimonial.image,
      rating: testimonial.rating,
      isActive: testimonial.isActive,
    });
    setIsEditDialogOpen(true);
  };

  // Open delete dialog with testimonial data
  const handleDelete = (testimonial: TestimonialDTO) => {
    setCurrentTestimonial(testimonial);
    setIsDeleteDialogOpen(true);
  };

  // Handle create testimonial form submission
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!currentTestimonial.name || !currentTestimonial.content || !currentTestimonial.role) {
      setFormError('Please fill out all required fields');
      return;
    }
    
    createMutation.mutate(currentTestimonial as TestimonialInput);
  };

  // Handle update testimonial form submission
  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!currentTestimonial.name || !currentTestimonial.content || !currentTestimonial.role) {
      setFormError('Please fill out all required fields');
      return;
    }
    
    if (!currentTestimonial._id) {
      setFormError('Testimonial ID is missing');
      return;
    }
    
    updateMutation.mutate({
      id: currentTestimonial._id,
      testimonial: {
        name: currentTestimonial.name,
        role: currentTestimonial.role,
        company: currentTestimonial.company,
        content: currentTestimonial.content,
        image: currentTestimonial.image,
        rating: currentTestimonial.rating,
        isActive: currentTestimonial.isActive,
      },
    });
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentTestimonial((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Manage Testimonials</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center my-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center my-12 p-6 border rounded-lg">
          <p className="text-muted-foreground">No testimonials found. Add your first testimonial!</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((testimonial) => (
              <TableRow key={testimonial._id}>
                <TableCell className="font-medium">{testimonial.name}</TableCell>
                <TableCell>{testimonial.role}</TableCell>
                <TableCell>{testimonial.company}</TableCell>
                <TableCell>{testimonial.isActive ? 'Yes' : 'No'}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(testimonial)}>
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDelete(testimonial)}>
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Create Testimonial Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add Testimonial</DialogTitle>
            <DialogDescription>
              Add a new testimonial from a client or collaborator.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateSubmit}>
            {formError && (
              <div className="text-sm text-red-500 mb-4 p-2 bg-red-50 rounded-md">{formError}</div>
            )}
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name*
                </Label>
                <Input
                  id="name"
                  name="name"
                  className="col-span-3"
                  value={currentTestimonial.name || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role*
                </Label>
                <Input
                  id="role"
                  name="role"
                  className="col-span-3"
                  value={currentTestimonial.role || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="company" className="text-right">
                  Company*
                </Label>
                <Input
                  id="company"
                  name="company"
                  className="col-span-3"
                  value={currentTestimonial.company || ''}
                  onChange={handleInputChange}
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
                  className="col-span-3"
                  value={currentTestimonial.image || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rating" className="text-right">
                  Rating (1-5)
                </Label>
                <Input
                  id="rating"
                  name="rating"
                  type="number"
                  min="1"
                  max="5"
                  className="col-span-3"
                  value={currentTestimonial.rating || '5'}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="content" className="text-right pt-2">
                  Content*
                </Label>
                <Textarea
                  id="content"
                  name="content"
                  className="col-span-3"
                  rows={5}
                  value={currentTestimonial.content || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="submit" 
                disabled={createMutation.isPending}
                className={createMutation.isPending ? 'opacity-70 cursor-not-allowed' : ''}
              >
                {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Testimonial Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Testimonial</DialogTitle>
            <DialogDescription>
              Update the testimonial information.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateSubmit}>
            {formError && (
              <div className="text-sm text-red-500 mb-4 p-2 bg-red-50 rounded-md">{formError}</div>
            )}
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name*
                </Label>
                <Input
                  id="edit-name"
                  name="name"
                  className="col-span-3"
                  value={currentTestimonial.name || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">
                  Role*
                </Label>
                <Input
                  id="edit-role"
                  name="role"
                  className="col-span-3"
                  value={currentTestimonial.role || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-company" className="text-right">
                  Company*
                </Label>
                <Input
                  id="edit-company"
                  name="company"
                  className="col-span-3"
                  value={currentTestimonial.company || ''}
                  onChange={handleInputChange}
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
                  className="col-span-3"
                  value={currentTestimonial.image || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-rating" className="text-right">
                  Rating (1-5)
                </Label>
                <Input
                  id="edit-rating"
                  name="rating"
                  type="number"
                  min="1"
                  max="5"
                  className="col-span-3"
                  value={currentTestimonial.rating || '5'}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-content" className="text-right pt-2">
                  Content*
                </Label>
                <Textarea
                  id="edit-content"
                  name="content"
                  className="col-span-3"
                  rows={5}
                  value={currentTestimonial.content || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update
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
              This will permanently delete the testimonial from {currentTestimonial.name}.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => currentTestimonial._id && deleteMutation.mutate(currentTestimonial._id)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 