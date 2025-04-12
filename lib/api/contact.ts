import apiClient from './client';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const contactApi = {
  /**
   * Send a contact form message
   */
  sendContactForm: async (formData: ContactFormData): Promise<{ message: string }> => {
    const response = await apiClient.post('/mail', formData);
    return response.data;
  },
};

export default contactApi; 