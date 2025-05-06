import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';

// POST: Increment view count for a blog by slug
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await params;

    const result = await Blog.updateOne({ slug }, { $inc: { views: 1 } });

    if (result.modifiedCount === 0) {
      // This could mean the blog wasn't found, or views field doesn't exist (less likely with schema defaults)
      // For view incrementing, we might not want to return 404 strictly, as it's a side effect.
      // console.warn(`Blog with slug '${slug}' not found or no views field to increment.`);
    }
    
    return NextResponse.json({ message: 'View count incremented' }, { status: 200 });
  } catch (error) {
    console.error('Error incrementing blog views:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 