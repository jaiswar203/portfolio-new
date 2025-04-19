import mongoose, { Schema } from 'mongoose';

export interface IProject {
  _id?: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  liveUrl?: string;
  githubUrl?: string;
  detailedContent?: string;
  isDetailedPage: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true, default: '/placeholder.svg?height=400&width=600' },
    tags: { type: [String], required: true },
    category: { type: String, required: true, enum: ['frontend', 'backend', 'fullstack', 'mobile', 'ai'] },
    liveUrl: { type: String, required: false },
    githubUrl: { type: String, required: false },
    detailedContent: { type: String, required: false },
    isDetailedPage: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema); 