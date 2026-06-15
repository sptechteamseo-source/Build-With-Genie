import { Schema, model, models } from "mongoose";
import type { ISubscriber } from "@/types";

const subscriberSchema = new Schema<ISubscriber>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  },
  { timestamps: true }
);

export const Subscriber = models.Subscriber ?? model<ISubscriber>("Subscriber", subscriberSchema);
