import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";
import { contactSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate with Zod
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    await connectToDatabase();
    await Lead.create(parsed.data);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("[contact] POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
