import mongoose, { Schema } from 'mongoose';

export interface ITestimonial {
  _id?: string;
  content: string;
  name: string;
  role?: string;
  company?: string;
  position: string;
  image: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    content: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String },
    company: { type: String },
    position: { type: String, required: true },
    image: { type: String, required: true, default: '/placeholder.svg?height=80&width=80' },
    avatar: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema); 