import mongoose, { Schema, model, models } from "mongoose";
import type { ILead } from "@/types";

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    company: { type: String, required: true, trim: true },
    role: { type: String, trim: true },
    fit: { type: String, required: true },
    budget: { type: String, required: true },
    timeline: { type: String, required: true },
    summary: { type: String, required: true },
  },
  { timestamps: true }
);

// Prevent model redefinition on hot-reload
export const Lead = models.Lead ?? model<ILead>("Lead", LeadSchema);
