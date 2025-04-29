import mongoose, { Schema } from 'mongoose';
import { ITestimonial } from '@/lib/types/testimonial';

const TestimonialSchema = new Schema<ITestimonial>(
  {
    content: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String },
    image: { type: String, required: true, default: '/placeholder.svg?height=80&width=80' },
    avatar: { type: String },
    rating: { type: Number },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema); 