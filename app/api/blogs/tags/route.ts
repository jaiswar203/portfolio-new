import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";

// GET: Fetch all unique tags from published blogs
export async function GET() {
  try {
    await connectDB();

    // Aggregate to get all unique tags from published blogs
    const tagsResult = await Blog.aggregate([
      { $match: { isPublished: true } },
      { $unwind: "$tags" },
      { $group: { _id: "$tags" } },
      { $sort: { _id: 1 } },
    ]);

    // Extract tags from aggregation result
    const tags = tagsResult.map((tag) => tag._id);

    return NextResponse.json(tags);
  } catch (error) {
    console.error("Error fetching blog tags:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
