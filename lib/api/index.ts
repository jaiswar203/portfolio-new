import apiClient from './client';
import projectsApi from './projects';
import testimonialsApi from './testimonials';
import contactApi from './contact';

export { apiClient, projectsApi, testimonialsApi, contactApi };

// Use centralized types
export type { ProjectDTO, ProjectInput, ProjectUpdate } from '../types/project';
export type { Testimonial } from './testimonials';
export type { ContactFormData } from './contact';

// Export a default API object with all services for easy importing
const api = {
  projects: projectsApi,
  testimonials: testimonialsApi,
  contact: contactApi,
};

export default api; 