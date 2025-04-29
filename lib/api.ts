/**
 * Central API exports to simplify imports
 * 
 * Instead of importing from individual files like:
 * import { projectsApi } from "@/lib/api/projects";
 * 
 * You can now import from a single location:
 * import { api } from "@/lib/api";
 * 
 * Or import specific APIs:
 * import { projectsApi, testimonialsApi } from "@/lib/api";
 */

export { default as api } from './api/index';
export { apiClient, projectsApi, testimonialsApi, contactApi } from './api/index';
export type { ProjectDTO, ProjectInput, ProjectUpdate } from './types/project';
export type { ITestimonial, TestimonialDTO, TestimonialInput, TestimonialUpdate } from './types/testimonial';
export type { ContactFormData } from './api/contact'; 