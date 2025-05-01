import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/lib/models/Project';
import { authMiddleware } from '@/lib/auth';
import { ProjectInput } from '@/lib/types/project';

// GET all projects
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const url = new URL(req.url);
    const active = url.searchParams.get('active');
    const featured = url.searchParams.get('featured');
    const category = url.searchParams.get('category');
    
    // Build query based on parameters
    const query: {
      isActive?: boolean;
      featured?: boolean;
      category?: string;
    } = {};
    
    if (active === 'true') {
      query.isActive = true;
    }
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    if (category) {
      query.category = category;
    }
    
    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST a new project (protected)
export async function POST(req: NextRequest) {
  // Validate admin authentication
  const authError = await authMiddleware(req);
  if (authError) return authError;

  try {
    const data: ProjectInput = await req.json();
    
    // Validate required fields
    if (!data.title || !data.description || !data.category) {
      return NextResponse.json(
        { error: 'Title, description, and category are required' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    // Find the highest order value to place new project at the end
    const highestOrderProject = await Project.findOne().sort({ order: -1 });
    const nextOrder = highestOrderProject ? highestOrderProject.order + 1 : 0;
    
    // Create new project
    const newProject = await Project.create({
      title: data.title,
      description: data.description,
      image: data.image || '/placeholder.svg?height=400&width=600',
      tags: data.tags || [],
      category: data.category,
      liveUrl: data.liveUrl || '',
      githubUrl: data.githubUrl || '',
      detailedContent: data.detailedContent || '',
      carousels: data.carousels || [],
      video_url: data.video_url || '',
      isDetailedPage: Boolean(data.isDetailedPage),
      isPrivate: Boolean(data.isPrivate),
      order: data.order !== undefined ? data.order : nextOrder,
    });
    
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
} 