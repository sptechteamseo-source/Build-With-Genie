import { connectToDatabase } from "@/lib/mongodb";
import { Testimonial } from "@/models/Testimonial";
import type { PublicTestimonial } from "@/types";

interface TestimonialDoc {
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
}

// Visible testimonials only, newest first.
export async function getVisibleTestimonials(): Promise<PublicTestimonial[]> {
  await connectToDatabase();
  const docs = await Testimonial.find({ visible: true })
    .sort({ createdAt: -1 })
    .lean<TestimonialDoc[]>();
  return docs.map((d) => ({
    name: d.name,
    role: d.role,
    company: d.company,
    rating: d.rating,
    text: d.text,
  }));
}
