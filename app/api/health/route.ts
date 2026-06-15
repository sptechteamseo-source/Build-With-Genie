import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { BlogPost } from "@/models/Blog";

export const dynamic = "force-dynamic";

// Health probe + TEMPORARY DB diagnostics (no secrets exposed).
export async function GET() {
  const diag: Record<string, unknown> = {
    status: "ok",
    timestamp: new Date().toISOString(),
    mongoUriPresent: Boolean(process.env.MONGODB_URI),
  };

  try {
    await connectToDatabase();
    diag.dbConnected = mongoose.connection.readyState === 1; // 1 = connected
    diag.databaseName = mongoose.connection.name;            // which DB we're actually on
    diag.totalBlogs = await BlogPost.countDocuments();
    diag.publishedBlogs = await BlogPost.countDocuments({ status: "published" });
  } catch (err) {
    diag.dbConnected = false;
    diag.dbError = err instanceof Error ? err.message : String(err);
  }

  return NextResponse.json(diag);
}
