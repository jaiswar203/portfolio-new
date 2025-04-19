import apiClient from './client';

export interface Project {
  _id?: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  detailedContent?: string;
  isDetailedPage?: boolean;
  featured?: boolean;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const projectsApi = {
  /**
   * Get all projects
   */
  getAllProjects: async (): Promise<Project[]> => {
    const response = await apiClient.get('/projects');
    return response.data;
  },

  /**
   * Get active projects only
   */
  getActiveProjects: async (): Promise<Project[]> => {
    const response = await apiClient.get('/projects?active=true');
    return response.data;
  },

  /**
   * Get featured projects
   */
  getFeaturedProjects: async (): Promise<Project[]> => {
    const response = await apiClient.get('/projects?featured=true');
    return response.data;
  },

  /**
   * Get projects by category
   */
  getProjectsByCategory: async (category: string): Promise<Project[]> => {
    const response = await apiClient.get(`/projects?category=${category}`);
    return response.data;
  },

  /**
   * Get a project by ID
   */
  getProjectById: async (id: string): Promise<Project> => {
    const response = await apiClient.get(`/projects/${id}`);
    return response.data;
  },

  /**
   * Create a new project
   */
  createProject: async (project: Project): Promise<Project> => {
    const response = await apiClient.post('/projects', project);
    return response.data;
  },

  /**
   * Update an existing project
   */
  updateProject: async (id: string, project: Partial<Project>): Promise<Project> => {
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