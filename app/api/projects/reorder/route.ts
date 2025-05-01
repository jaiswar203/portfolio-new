import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/lib/models/Project';
import { authMiddleware } from '@/lib/auth';
import mongoose from 'mongoose';

// Helper function to validate MongoDB ObjectId
function isValidObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

interface ReorderRequest {
  projectId: string;
  direction: 'up' | 'down';
}

// POST - reorder a project (protected)
export async function POST(req: NextRequest) {
  // Validate admin authentication
  const authError = await authMiddleware(req);
  if (authError) return authError;

  try {
    const data: ReorderRequest = await req.json();
    const { projectId, direction } = data;
    
    if (!projectId || !direction) {
      return NextResponse.json(
        { error: 'Project ID and direction are required' },
        { status: 400 }
      );
    }

    if (!isValidObjectId(projectId)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    if (direction !== 'up' && direction !== 'down') {
      return NextResponse.json(
        { error: 'Direction must be either "up" or "down"' },
        { status: 400 }
      );
    }

    await connectDB();

    // Get all projects sorted by order
    const allProjects = await Project.find({}).sort({ order: 1 });
    
    // Find the index of the current project
    const currentIndex = allProjects.findIndex(p => p._id.toString() === projectId);
    
    if (currentIndex === -1) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    // Calculate target index based on direction
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    // Check if the move is possible
    if (targetIndex < 0 || targetIndex >= allProjects.length) {
      return NextResponse.json(
        { 
          error: `Cannot move ${direction}. Project is already at the ${direction === 'up' ? 'top' : 'bottom'}.`,
          projects: allProjects  // Return the current projects anyway
        },
        { status: 200 }  // Return 200 instead of 400 to avoid error in UI
      );
    }
    
    // Get the current project and target project
    const currentProject = allProjects[currentIndex];
    const targetProject = allProjects[targetIndex];
    
    // Swap the order values
    const tempOrder = currentProject.order;
    currentProject.order = targetProject.order;
    targetProject.order = tempOrder;
    
    // Save both projects
    await currentProject.save();
    await targetProject.save();
    
    // Get the updated list of projects (re-sorted)
    const updatedProjects = await Project.find({}).sort({ order: 1 });
    
    return NextResponse.json(updatedProjects, { status: 200 });
  } catch (error) {
    console.error('Error reordering projects:', error);
    return NextResponse.json(
      { error: 'Failed to reorder projects' },
      { status: 500 }
    );
  }
} 