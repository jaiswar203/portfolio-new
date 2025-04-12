import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/lib/models/Project';
import { authMiddleware } from '@/lib/auth';

// GET all projects
export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find({}).sort({ createdAt: -1 });
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
    const data = await req.json();
    
    // Validate required fields
    if (!data.title || !data.description || !data.category) {
      return NextResponse.json(
        { error: 'Title, description, and category are required' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    // Create new project
    const newProject = await Project.create({
      title: data.title,
      description: data.description,
      image: data.image || '/placeholder.svg?height=400&width=600',
      tags: data.tags || [],
      category: data.category,
      liveUrl: data.liveUrl || '#',
      githubUrl: data.githubUrl || '#',
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