import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { Testimonial } from "@/models/Testimonial";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import type { ITestimonial } from "@/types";

export const metadata = { title: "Edit Testimonial" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTestimonialPage({ params }: PageProps) {
  const { id } = await params;
  await connectToDatabase();
  const doc = await Testimonial.findById(id).lean() as (ITestimonial & { _id: { toString(): string } }) | null;
  if (!doc) notFound();

  const serialized: ITestimonial = {
    ...doc,
    _id: doc._id.toString(),
    createdAt: undefined,
    updatedAt: undefined,
  };

  return (
    <div style={{ padding: "28px 32px", flex: 1 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "var(--fg)" }}>Edit Testimonial</h1>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--fg-2, #888)" }}>{serialized.name}&apos;s review</p>
      </div>
      <TestimonialForm initial={serialized} id={serialized._id} />
    </div>
  );
}
