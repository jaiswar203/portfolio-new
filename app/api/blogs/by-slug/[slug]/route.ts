import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';

// GET: Fetch a single blog by slug (for public)
export async function GET(
  request: NextRequest,
  { params: paramsProp }: { params: { slug: string } }
) {
  try {
    await connectDB();
    // Explicitly resolve params as per the error message suggestion
    const params = await Promise.resolve(paramsProp);
    const { slug } = params;
    
    const blog = await Blog.findOne({ slug, isPublished: true }).lean();
    
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 