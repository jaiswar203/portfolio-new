import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/lib/models/Project";
import { authMiddleware } from "@/lib/auth";
import mongoose from "mongoose";
import { ProjectUpdate } from "@/lib/types/project";

// Helper function to validate MongoDB ObjectId
function isValidObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

// GET a specific project
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }

    await connectDB();
    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// PUT (update) a specific project (protected)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Validate admin authentication
  const authError = await authMiddleware(req);
  if (authError) return authError;

  try {
    const { id } = await params;
    const data: ProjectUpdate = await req.json();

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if project exists
    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Update project
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        title: data.title,
        description: data.description,
        image: data.image,
        tags: data.tags,
        category: data.category,
        liveUrl: data.liveUrl,
        githubUrl: data.githubUrl,
        detailedContent: data.detailedContent,
        carousels: data.carousels,
        video_url: data.video_url,
        isDetailedPage: data.isDetailedPage,
        isPrivate: data.isPrivate,
        order: data.order,
        isActive: data.isActive,
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE a specific project (protected)
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
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if project exists
    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Delete project
    await Project.findByIdAndDelete(id);

    // Rearrange order of remaining projects
    const remainingProjects = await Project.find({}).sort({ order: 1 });
    
    // Update order of remaining projects to be sequential
    const updateOperations = remainingProjects.map((project, index) => {
      return Project.findByIdAndUpdate(
        project._id,
        { order: index },
        { new: true }
      );
    });
    
    // Execute all updates in parallel
    await Promise.all(updateOperations);

    return NextResponse.json(
      { message: "Project deleted successfully and order rearranged" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
