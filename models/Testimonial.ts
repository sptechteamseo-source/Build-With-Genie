import { Schema, model, models } from "mongoose";
import type { ITestimonial } from "@/types";

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    text: { type: String, required: true },
    image: { type: String },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Testimonial = models.Testimonial ?? model<ITestimonial>("Testimonial", TestimonialSchema);
