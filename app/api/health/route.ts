import { NextResponse } from "next/server";

// Azure App Service health probe endpoint
export async function GET() {
  return NextResponse.json({ status: "ok", timestamp: new Date().toISOString() });
}
