import mongoose, { Schema } from 'mongoose';

export interface IProject {
  _id?: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  liveUrl: string;
  githubUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true, default: '/placeholder.svg?height=400&width=600' },
    tags: { type: [String], required: true },
    category: { type: String, required: true, enum: ['frontend', 'backend', 'fullstack'] },
    liveUrl: { type: String, required: true },
    githubUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema); 