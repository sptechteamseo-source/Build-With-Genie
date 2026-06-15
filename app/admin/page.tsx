import { Users, Quote, FileText, Eye, Activity } from "lucide-react";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import { Testimonial } from "@/models/Testimonial";
import { BlogPost } from "@/models/Blog";
import { StatCard } from "@/components/admin/StatCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { IAdminUser } from "@/types";

// Live dashboard stats — read from MongoDB at request time, never prerendered.
export const dynamic = "force-dynamic";

async function getDashboardData() {
  await connectToDatabase();
  const [
    totalUsers, activeUsers,
    totalTestimonials, visibleTestimonials,
    totalPosts, publishedPosts,
    recentLogins,
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ active: true }),
    Testimonial.countDocuments(),
    Testimonial.countDocuments({ visible: true }),
    BlogPost.countDocuments(),
    BlogPost.countDocuments({ status: "published" }),
    User.find({ lastLoginAt: { $exists: true, $ne: null } })
      .sort({ lastLoginAt: -1 })
      .limit(10)
      .select("name email role avatar lastLoginAt active")
      .lean() as Promise<IAdminUser[]>,
  ]);
  return { totalUsers, activeUsers, totalTestimonials, visibleTestimonials, totalPosts, publishedPosts, recentLogins };
}

function timeAgo(date: Date | string | undefined): string {
  if (!date) return "Never";
  const d = new Date(date as string);
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return d.toLocaleDateString();
}

const roleVariant: Record<string, "default" | "destructive" | "warning" | "secondary"> = {
  admin: "destructive",
  editor: "warning",
  user: "secondary",
};

export default async function AdminDashboardPage() {
  const data = await getDashboardData();

  const quickLinks = [
    { href: "/admin/users/new", label: "Add User", color: "var(--accent)" },
    { href: "/admin/testimonials/new", label: "Add Testimonial", color: "#a78bfa" },
    { href: "/admin/blog/new", label: "Write Post", color: "var(--good)" },
  ];

  return (
    <div style={{ padding: "32px 36px", flex: 1 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "var(--fg)" }}>Dashboard</h1>
        <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--fg-dim)" }}>
          Overview of your content and users.
        </p>
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
        <StatCard label="Total Users" value={data.totalUsers} icon={<Users size={18} />} sub={`${data.activeUsers} active`} accent />
        <StatCard label="Testimonials" value={data.totalTestimonials} icon={<Quote size={18} />} sub={`${data.visibleTestimonials} visible`} />
        <StatCard label="Blog Posts" value={data.totalPosts} icon={<FileText size={18} />} sub={`${data.publishedPosts} published`} />
        <StatCard label="Published" value={data.publishedPosts} icon={<Eye size={18} />} sub="live posts" />
      </div>

      {/* Two-column: main content + login activity */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }}>

        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Quick actions */}
          <div style={{ background: "var(--bg-1)", border: "1px solid var(--line)", borderRadius: 12, padding: 24 }}>
            <h2 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 600, color: "var(--fg)" }}>Quick Actions</h2>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {quickLinks.map(({ href, label, color }) => (
                <Link key={href} href={href} style={{
                  padding: "10px 18px",
                  borderRadius: 8,
                  border: `1px solid ${color}40`,
                  background: `${color}14`,
                  color,
                  fontSize: 13,
                  fontWeight: 500,
                  textDecoration: "none",
                  fontFamily: "var(--font-sans)",
                }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Modules overview */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
            {[
              { href: "/admin/users", label: "Users", desc: "Manage team members and roles", count: data.totalUsers, icon: <Users size={20} /> },
              { href: "/admin/testimonials", label: "Testimonials", desc: "Customer reviews and social proof", count: data.totalTestimonials, icon: <Quote size={20} /> },
              { href: "/admin/blog", label: "Blog", desc: "Articles, guides, and updates", count: data.totalPosts, icon: <FileText size={20} /> },
            ].map(({ href, label, desc, count, icon }) => (
              <Link key={href} href={href} style={{
                display: "block",
                padding: 20,
                background: "var(--bg-1)",
                border: "1px solid var(--line)",
                borderRadius: 12,
                textDecoration: "none",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <span style={{ color: "var(--accent)" }}>{icon}</span>
                  <span style={{
                    fontSize: 12, padding: "2px 8px", borderRadius: 999,
                    background: "var(--accent-soft)", color: "var(--accent)",
                    fontFamily: "var(--font-sans)",
                  }}>
                    {count} items
                  </span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fg)", marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 13, color: "var(--fg-dim)" }}>{desc}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right column — Login Activity */}
        <div style={{ background: "var(--bg-1)", border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden" }}>
          {/* Header */}
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: "color-mix(in srgb, var(--accent) 15%, transparent)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Activity size={14} style={{ color: "var(--accent)" }} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "var(--fg)" }}>Login Activity</p>
              <p style={{ margin: 0, fontSize: 11, color: "var(--fg-dim)" }}>Recent sign-ins</p>
            </div>
          </div>

          {/* List */}
          <div style={{ padding: "8px 0" }}>
            {data.recentLogins.length === 0 ? (
              <div style={{ padding: "24px 20px", textAlign: "center", fontSize: 13, color: "var(--fg-dim)" }}>
                No login activity yet.
              </div>
            ) : (
              data.recentLogins.map((u) => (
                <div key={u._id} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "10px 20px",
                  borderBottom: "1px solid var(--line)",
                }}>
                  <Avatar style={{ width: 34, height: 34, flexShrink: 0 }}>
                    {u.avatar && <AvatarImage src={u.avatar} alt={u.name} />}
                    <AvatarFallback style={{ background: "var(--accent)", color: "#fff", fontSize: 12, fontWeight: 700 }}>
                      {u.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fg)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {u.name}
                      </span>
                      <Badge variant={roleVariant[u.role] ?? "secondary"} style={{ fontSize: 10, padding: "1px 5px", flexShrink: 0 }}>
                        {u.role}
                      </Badge>
                    </div>
                    <div style={{ fontSize: 11, color: "var(--fg-dim)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {u.email}
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: "var(--fg-dim)", whiteSpace: "nowrap", flexShrink: 0 }}>
                    {timeAgo(u.lastLoginAt)}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {data.recentLogins.length > 0 && (
            <div style={{ padding: "10px 20px", borderTop: "1px solid var(--line)" }}>
              <Link href="/admin/users" style={{ fontSize: 12, color: "var(--accent)", textDecoration: "none", fontWeight: 500 }}>
                View all users →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
