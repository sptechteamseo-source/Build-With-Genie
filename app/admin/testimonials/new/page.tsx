import { TestimonialForm } from "@/components/admin/TestimonialForm";

export const metadata = { title: "Add Testimonial" };

export default function NewTestimonialPage() {
  return (
    <div style={{ padding: "28px 32px", flex: 1 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "var(--fg)" }}>Add Testimonial</h1>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--fg-2, #888)" }}>Create a new customer review</p>
      </div>
      <TestimonialForm />
    </div>
  );
}
