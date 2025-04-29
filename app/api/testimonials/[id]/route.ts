import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/lib/models/Testimonial';
import { authMiddleware } from '@/lib/auth';
import mongoose from 'mongoose';

// Helper function to validate MongoDB ObjectId
function isValidObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

// GET a specific testimonial
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid testimonial ID' },
        { status: 400 }
      );
    }
    
    await connectDB();
    const testimonial = await Testimonial.findById(id);
    
    if (!testimonial) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(testimonial, { status: 200 });
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonial' },
      { status: 500 }
    );
  }
}

// PUT (update) a specific testimonial (protected)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Validate admin authentication
  const authError = await authMiddleware(req);
  if (authError) return authError;
  
  try {
    const { id } = params;
    const data = await req.json();
    
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid testimonial ID' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    // Check if testimonial exists
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }
    
    // Handle Update data
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      {
        content: data.content || testimonial.content,
        name: data.name || testimonial.name,
        role: data.role || testimonial.role,
        image: data.image || testimonial.image,
        company: data.company || testimonial.company,
        avatar: data.avatar || testimonial.avatar,
        rating: data.rating !== undefined ? data.rating : testimonial.rating,
        isActive: data.isActive !== undefined ? data.isActive : testimonial.isActive,
      },
      { new: true }
    );
    
    return NextResponse.json(updatedTestimonial, { status: 200 });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to update testimonial' },
      { status: 500 }
    );
  }
}

// DELETE a specific testimonial (protected)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Validate admin authentication
  const authError = await authMiddleware(req);
  if (authError) return authError;
  
  try {
    const { id } = params;
    
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid testimonial ID' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    // Check if testimonial exists
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }
    
    // Delete testimonial
    await Testimonial.findByIdAndDelete(id);
    
    return NextResponse.json(
      { message: 'Testimonial deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to delete testimonial' },
      { status: 500 }
    );
  }
} 