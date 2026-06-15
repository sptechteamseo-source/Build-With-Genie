import type { ReactNode } from "react";
import { headers } from "next/headers";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Toaster } from "@/components/ui/toast";

export const metadata = {
  title: { default: "Admin — Build with Genie", template: "%s | Admin" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get("x-admin-pathname") ?? "";

  // Login page: full-screen blank canvas, no sidebar
  if (pathname === "/admin/login") {
    return (
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "var(--bg-0)",
        fontFamily: "var(--font-sans)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {children}
      </div>
    );
  }

  // All other admin pages: sidebar + scrollable content
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 1000,
      display: "flex",
      background: "var(--bg-0)",
      overflow: "hidden",
      fontFamily: "var(--font-sans)",
    }}>
      <AdminSidebar />
      <main style={{ flex: 1, overflowY: "auto", minWidth: 0 }}>
        {children}
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
}
