import apiClient from './client';

export interface Testimonial {
  _id?: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const testimonialsApi = {
  /**
   * Get all testimonials
   */
  getAllTestimonials: async (): Promise<Testimonial[]> => {
    const response = await apiClient.get('/testimonials');
    return response.data;
  },

  /**
   * Get active testimonials only
   */
  getActiveTestimonials: async (): Promise<Testimonial[]> => {
    const response = await apiClient.get('/testimonials?active=true');
    return response.data;
  },

  /**
   * Get a testimonial by ID
   */
  getTestimonialById: async (id: string): Promise<Testimonial> => {
    const response = await apiClient.get(`/testimonials/${id}`);
    return response.data;
  },

  /**
   * Create a new testimonial
   */
  createTestimonial: async (testimonial: Testimonial): Promise<Testimonial> => {
    const response = await apiClient.post('/testimonials', testimonial);
    return response.data;
  },

  /**
   * Update an existing testimonial
   */
  updateTestimonial: async (id: string, testimonial: Partial<Testimonial>): Promise<Testimonial> => {
    const response = await apiClient.put(`/testimonials/${id}`, testimonial);
    return response.data;
  },

  /**
   * Delete a testimonial
   */
  deleteTestimonial: async (id: string): Promise<void> => {
    await apiClient.delete(`/testimonials/${id}`);
  },
};

export default testimonialsApi; 