import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';

// GET: Fetch featured blogs for homepage
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    
    // Get limit from query params
    const limit = Number(searchParams.get('limit')) || 3;
    
    // Get featured blogs
    const featuredBlogs = await Blog.find({ 
      isPublished: true,
      featured: true 
    })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .lean();
    
    return NextResponse.json(featuredBlogs);
  } catch (error) {
    console.error('Error fetching featured blogs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 