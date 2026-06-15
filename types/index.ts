// ─── Shared TypeScript types ──────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

// ─── How it works ─────────────────────────────────────────────────────────────

export type StepArtType = "doc" | "flow" | "arch" | "code" | "qa" | "deploy";

export interface Step {
  key: string;
  label: string;
  sub: string;
  title: string;
  desc: string;
  meta: string[];
  art: StepArtType;
}

// ─── Tools ────────────────────────────────────────────────────────────────────

export interface Tool {
  mark: string;
  name: string;
  role: string;
  body: string;
  uses: string[];
  accent?: boolean;
}

// ─── Services ─────────────────────────────────────────────────────────────────

export interface ServiceMeta {
  label: string;
  value: string;
}

export interface Service {
  id: string;
  num: string;
  title: string;
  meta: ServiceMeta[];
  ctaLabel: string;
  description: string;
  sectionTitle: string;
  items: string[];
  callout: string;
  calloutSub: string;
}

// ─── Case studies ─────────────────────────────────────────────────────────────

export interface CaseResult {
  value: string;
  label: string;
}

export interface CaseSidebar {
  label: string;
  value: string;
}

export interface Case {
  id: string;
  tags: string[];
  accentTag: string;
  title: string;
  lede: string;
  imgClass: string;
  annotTl: string;
  sidebar: CaseSidebar[];
  problem: string;
  shipped: string;
  quote: string;
  quoteCite: string;
  aiNote: string;
  results: CaseResult[];
}

// ─── Use cases ────────────────────────────────────────────────────────────────

export type UseCaseIconKey =
  | "rocket"
  | "compass"
  | "code"
  | "megaphone"
  | "pen"
  | "settings";

export interface UseCaseCapability {
  title: string;
  body: string;
}

export interface UseCaseStep {
  title: string;
  body: string;
}

export interface UseCaseOutcome {
  value: string;
  label: string;
}

export interface UseCase {
  // Card + identity
  slug: string;
  role: string;
  icon: UseCaseIconKey;
  index: string;
  title: string;
  desc: string;
  points: string[];

  // Long-form detail page
  heroHeading: string;
  heroLede: string;
  intro: string[];
  capabilities: UseCaseCapability[];
  workflow: UseCaseStep[];
  scenario: { before: string[]; after: string[] };
  outcomes: UseCaseOutcome[];
  faqs: FaqItem[];
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

export interface PricingTier {
  badge: string;
  name: string;
  description: string;
  price: string;
  priceSuffix: string;
  priceFrom?: boolean;
  features: string[];
  ctaLabel: string;
  featured?: boolean;
}

export interface EstimatorQuestion {
  id: string;
  label: string;
  options: EstimatorOption[];
}

export interface EstimatorOption {
  v: string | number;
  l: string;
  mult?: number;
  base?: number;
  days?: number;
  weeks?: number;
  add?: number;
}

// ─── Contact form ─────────────────────────────────────────────────────────────

export interface ContactFormData {
  fit: string;
  budget: string;
  timeline: string;
  summary: string;
  name: string;
  company: string;
  email: string;
  role: string;
}

export interface ContactFormErrors {
  fit?: string;
  budget?: string;
  timeline?: string;
  summary?: string;
  name?: string;
  company?: string;
  email?: string;
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export interface FaqItem {
  question: string;
  answer: string;
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

export type BlogKwColor = "accent" | "purple" | "green";

export type BlogContentBlock =
  | { type: "p"; text: string; html?: boolean }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; text: string }
  | { type: "blockquote"; text: string; cite?: string }
  | { type: "code"; label: string; lines: { n: number; kw: string; kwColor: BlogKwColor; text: string }[] }
  | { type: "two_col"; left: { head: string; color: string; items: string[] }; right: { head: string; color: string; items: string[] } }
  | { type: "stats"; items: { value: string; label: string }[] };

export interface BlogAuthor {
  name: string;
  role: string;
  initials: string;
  bio?: string;
  links?: { label: string; href: string }[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: BlogAuthor;
  date: string;
  readTime: string;
  featured?: boolean;
  content?: BlogContentBlock[];
}

// View-model for public blog pages, mapped from the MongoDB `BlogPost` doc.
export interface PublicPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  authorInitials: string;
  date: string;
  readTime: string;
  contentHtml: string;
  featuredImage?: string;
}

// View-model for the public testimonials carousel, mapped from the MongoDB doc.
export interface PublicTestimonial {
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
}

export interface ISubscriber {
  email: string;
  createdAt?: Date;
}

// ─── Mongoose Lead model ──────────────────────────────────────────────────────

export interface ILead {
  name: string;
  email: string;
  company: string;
  role?: string;
  fit: string;
  budget: string;
  timeline: string;
  summary: string;
  createdAt?: Date;
}

// ─── Admin — User ─────────────────────────────────────────────────────────────

export type AdminUserRole = "admin" | "editor" | "user";

export interface IAdminUser {
  _id?: string;
  name: string;
  email: string;
  role: AdminUserRole;
  avatar?: string;
  active: boolean;
  passwordHash?: string;
  lastLoginAt?: Date | string;
  createdAt?: Date;
  updatedAt?: Date;
}

// ─── Admin — Testimonial ──────────────────────────────────────────────────────

export interface ITestimonial {
  _id?: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  image?: string;
  visible: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// ─── Admin — Blog Post ────────────────────────────────────────────────────────

export type BlogPostStatus = "draft" | "published";

export interface IBlogPostDoc {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  status: BlogPostStatus;
  author: string;
  tags: string[];
  category?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
