import apiClient from './client';
import { IBlog } from '../models/Blog';

export interface BlogInput {
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  author: {
    name: string;
    image?: string;
  };
  tags: string[];
  isPublished: boolean;
  featured: boolean;
}

export interface BlogsResponse {
  blogs: IBlog[];
  totalCount: number;
}

const blogsApi = {
  // Get all blogs with pagination and filtering
  getBlogs: async (
    page = 1, 
    limit = 10, 
    tag?: string,
    featured?: boolean
  ): Promise<BlogsResponse> => {
    const params: Record<string, any> = { page, limit }; // eslint-disable-line
    if (tag) params.tag = tag;
    if (featured !== undefined) params.featured = featured;
    
    const response = await apiClient.get('/blogs', { params });
    return response.data;
  },

  // Get featured blogs for homepage
  getFeaturedBlogs: async (limit = 3): Promise<IBlog[]> => {
    const response = await apiClient.get('/blogs/featured', { params: { limit } });
    return response.data;
  },

  // Get a single blog by slug (for public page)
  getBlogBySlug: async (slug: string): Promise<IBlog> => {
    const response = await apiClient.get(`/blogs/by-slug/${slug}`);
    return response.data;
  },

  // Get a single blog by ID (for admin editor)
  getBlogById: async (id: string): Promise<IBlog> => {
    const response = await apiClient.get(`/blogs/manage/${id}`);
    return response.data;
  },

  // Create a new blog
  createBlog: async (data: BlogInput): Promise<IBlog> => {
    const response = await apiClient.post('/blogs', data);
    return response.data;
  },

  // Update a blog by ID
  updateBlog: async (id: string, data: Partial<BlogInput>): Promise<IBlog> => {
    const response = await apiClient.put(`/blogs/manage/${id}`, data);
    return response.data;
  },

  // Delete a blog by ID
  deleteBlog: async (id: string): Promise<void> => {
    await apiClient.delete(`/blogs/manage/${id}`);
  },

  // Increment blog view count
  incrementViews: async (slug: string): Promise<void> => {
    await apiClient.post(`/blogs/by-slug/${slug}/views`);
  },

  // Get all blog tags
  getTags: async (): Promise<string[]> => {
    const response = await apiClient.get('/blogs/tags');
    return response.data;
  },
};

export default blogsApi; 