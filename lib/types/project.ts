/**
 * Project interface that defines the structure of a project
 */
export interface IProject {
  _id?: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'ai';
  liveUrl?: string;
  githubUrl?: string;
  detailedContent?: string;
  carousels?: string[];
  video_url?: string;
  isDetailedPage: boolean;
  featured?: boolean;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Project DTO (Data Transfer Object) for API communication
 */
export interface ProjectDTO {
  _id?: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  detailedContent?: string;
  carousels?: string[];
  video_url?: string;
  isDetailedPage?: boolean;
  featured?: boolean;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Type for project creation/update operations
 */
export type ProjectInput = Omit<ProjectDTO, '_id' | 'createdAt' | 'updatedAt'>;

/**
 * Type for project update operations
 */
export type ProjectUpdate = Partial<ProjectInput>; 