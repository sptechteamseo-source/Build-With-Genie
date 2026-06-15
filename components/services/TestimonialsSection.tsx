import { SectionHead } from "@/components/ui/SectionHead";
import { TestimonialsCarousel } from "@/components/services/TestimonialsCarousel";
import { getVisibleTestimonials } from "@/lib/testimonials";

export async function TestimonialsSection() {
  const testimonials = await getVisibleTestimonials();

  if (testimonials.length === 0) return null;

  return (
    <section style={{ padding: "80px 0", borderTop: "1px solid var(--line)" }}>
      <div className="wrap">
        <SectionHead
          eyebrow="Client Stories"
          heading="What teams say after shipping with us."
          lede="From legal to fintech to education — teams across every industry use our AI stack to move faster and think sharper."
        />
        <TestimonialsCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}
