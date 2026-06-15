import { Schema, model, models } from "mongoose";
import type { IBlogPostDoc } from "@/types";

const BlogSchema = new Schema<IBlogPostDoc>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    featuredImage: { type: String },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    author: { type: String, required: true },
    tags: [{ type: String, trim: true }],
    category: { type: String, trim: true },
    seoTitle: { type: String },
    seoDescription: { type: String },
    seoKeywords: { type: String },
  },
  { timestamps: true }
);

export const BlogPost = models.BlogPost ?? model<IBlogPostDoc>("BlogPost", BlogSchema);
