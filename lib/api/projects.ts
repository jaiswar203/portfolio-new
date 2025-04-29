import apiClient from './client';
import { ProjectDTO, ProjectInput, ProjectUpdate } from '@/lib/types/project';

const projectsApi = {
  /**
   * Get all projects
   */
  getAllProjects: async (): Promise<ProjectDTO[]> => {
    const response = await apiClient.get('/projects');
    return response.data;
  },

  /**
   * Get active projects only
   */
  getActiveProjects: async (): Promise<ProjectDTO[]> => {
    const response = await apiClient.get('/projects?active=true');
    return response.data;
  },

  /**
   * Get featured projects
   */
  getFeaturedProjects: async (): Promise<ProjectDTO[]> => {
    const response = await apiClient.get('/projects?featured=true');
    return response.data;
  },

  /**
   * Get projects by category
   */
  getProjectsByCategory: async (category: string): Promise<ProjectDTO[]> => {
    const response = await apiClient.get(`/projects?category=${category}`);
    return response.data;
  },

  /**
   * Get a project by ID
   */
  getProjectById: async (id: string): Promise<ProjectDTO> => {
    const response = await apiClient.get(`/projects/${id}`);
    return response.data;
  },

  /**
   * Create a new project
   */
  createProject: async (project: ProjectInput): Promise<ProjectDTO> => {
    const response = await apiClient.post('/projects', project);
    return response.data;
  },

  /**
   * Update an existing project
   */
  updateProject: async (id: string, project: ProjectUpdate): Promise<ProjectDTO> => {
    const response = await apiClient.put(`/projects/${id}`, project);
    return response.data;
  },

  /**
   * Delete a project
   */
  deleteProject: async (id: string): Promise<void> => {
    await apiClient.delete(`/projects/${id}`);
  },
};

export default projectsApi; 