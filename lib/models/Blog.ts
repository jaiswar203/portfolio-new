import mongoose, { Schema } from 'mongoose';

export interface IBlog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  author: {
    name: string;
    image?: string;
  };
  tags: string[];
  publishedAt: Date;
  updatedAt: Date;
  isPublished: boolean;
  featured: boolean;
  readingTime: number;
  views: number;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    coverImage: { type: String, required: true },
    author: {
      name: { type: String, required: true },
      image: { type: String }
    },
    tags: [{ type: String }],
    publishedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isPublished: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    readingTime: { type: Number, default: 0 },
    views: { type: Number, default: 0 }
  },
  { timestamps: true }
);

// Create a text index for search functionality
BlogSchema.index({ title: 'text', content: 'text', tags: 'text' });

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema); 