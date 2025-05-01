import mongoose, { Schema } from 'mongoose';
import { IProject } from '@/lib/types/project';

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
    carousels: { type: [String], required: false },
    video_url: { type: String, required: false },
    isDetailedPage: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isPrivate: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema); 