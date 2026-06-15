import { Schema, model, models } from "mongoose";
import type { IAdminUser } from "@/types";

const UserSchema = new Schema<IAdminUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    role: { type: String, enum: ["admin", "editor", "user"], default: "user" },
    avatar: { type: String },
    active: { type: Boolean, default: true },
    passwordHash: { type: String, select: false },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

export const User = models.User ?? model<IAdminUser>("User", UserSchema);
