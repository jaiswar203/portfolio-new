/**
 * Testimonial interface that defines the structure of a testimonial
 */
export interface ITestimonial {
  _id?: string;
  content: string;
  name: string;
  role?: string;
  company?: string;
  image: string;
  avatar?: string;
  rating?: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Testimonial DTO (Data Transfer Object) for API communication
 */
export interface TestimonialDTO {
  _id?: string;
  content: string;
  name: string;
  role?: string;
  company?: string;
  image?: string;
  avatar?: string;
  rating?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Type for testimonial creation/update operations
 */
export type TestimonialInput = Omit<TestimonialDTO, '_id' | 'createdAt' | 'updatedAt'>;

/**
 * Type for testimonial update operations
 */
export type TestimonialUpdate = Partial<TestimonialInput>; 