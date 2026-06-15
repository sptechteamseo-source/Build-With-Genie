import { z } from "zod";

export const contactSchema = z.object({
  fit: z.string().min(1, "Please select an engagement type."),
  budget: z.string().min(1, "Please select a budget range."),
  timeline: z.string().min(1, "Please select a timeline."),
  summary: z.string().min(20, "Please provide at least 20 characters about your project."),
  name: z.string().min(1, "Your name is required."),
  email: z.string().email("Please provide a valid email address."),
  company: z.string().min(1, "Your company name is required."),
  role: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
