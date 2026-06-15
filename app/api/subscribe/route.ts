import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import { Subscriber } from "@/models/Subscriber";

const schema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existing = await Subscriber.findOne({ email: parsed.data.email });
    if (existing) {
      return NextResponse.json({ ok: true, alreadySubscribed: true });
    }

    await Subscriber.create({ email: parsed.data.email });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
