import apiClient from './client';
import projectsApi from './projects';
import testimonialsApi from './testimonials';
import contactApi from './contact';
import blogsApi from './blogs';

export { apiClient, projectsApi, testimonialsApi, contactApi, blogsApi };

// Use centralized types
export type { ProjectDTO, ProjectInput, ProjectUpdate } from '../types/project';
export type { Testimonial } from './testimonials';
export type { ContactFormData } from './contact';
export type { BlogInput, BlogsResponse } from './blogs';

// Export a default API object with all services for easy importing
const api = {
  projects: projectsApi,
  testimonials: testimonialsApi,
  contact: contactApi,
  blogs: blogsApi,
};

export default api; 