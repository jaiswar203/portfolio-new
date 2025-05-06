import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Blog from '@/lib/models/Blog';
import { isAuthenticated, authMiddleware } from '@/lib/auth';

// GET: Fetch blogs with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    // Ensure database connection
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }

    const searchParams = new URL(request.url).searchParams;
    
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;
    
    // Optional filters
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const featured = searchParams.get('featured');
    
    // Build query based on filters
    const query: any = {}; // eslint-disable-line
    
    if (tag) query.tags = tag;
    if (search) query.title = { $regex: search, $options: 'i' };
    if (status) query.status = status;
    if (featured === 'true') query.featured = true;
    
    // Only show published blogs for non-admin users
    const isAdmin = await isAuthenticated();
    if (!isAdmin) {
      query.status = 'published';
    }
    
    const total = await Blog.countDocuments(query);
    
    const blogs = await Blog.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    return NextResponse.json({ 
      blogs,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit
      }
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

// POST: Create a new blog (requires authentication)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authError = await authMiddleware(request);
    if (authError) {
      return authError;
    }
    
    // Ensure database connection
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }
    
    const data = await request.json();
    
    // Generate slug from title
    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
    }
    
    // Calculate reading time (rough estimate: average reading speed is 200-250 words per minute)
    if (data.content) {
      const wordCount = data.content.trim().split(/\s+/).length;
      data.readingTime = Math.ceil(wordCount / 200);
    }
    
    const newBlog = new Blog(data);
    await newBlog.save();
    
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error: any) { // eslint-disable-line
    console.error('Error creating blog:', error);
    if (error.code === 11000) {
      return NextResponse.json({ error: 'A blog with this slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 