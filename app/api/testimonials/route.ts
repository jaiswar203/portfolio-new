import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/lib/models/Testimonial';
import { authMiddleware } from '@/lib/auth';

// GET all testimonials
export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

// POST a new testimonial (protected)
export async function POST(req: NextRequest) {
  // Validate admin authentication
  const authError = await authMiddleware(req);
  if (authError) return authError;

  try {
    const data = await req.json();
    
    // Validate required fields
    if (!data.content || !data.name || !data.role) {
      return NextResponse.json(
        { error: 'Content, name, and role are required' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    // Create new testimonial
    const newTestimonial = await Testimonial.create({
      content: data.content,
      name: data.name,
      role: data.role,
      image: data.image || '/placeholder.svg?height=80&width=80',
      company: data.company,
      avatar: data.avatar,
      rating: data.rating,
      isActive: data.isActive,
    });
    
    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
} 