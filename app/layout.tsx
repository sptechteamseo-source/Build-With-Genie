import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Build with Genie — Ship faster with AI",
    template: "%s — Build with Genie",
  },
  description:
    "We design, architect, build, test and deliver production software using Claude, Gemini and OpenAI on every step. A senior pod, not a body shop.",
  keywords: ["AI development", "software agency", "Claude Code", "MVP", "Next.js"],
  authors: [{ name: "Build with Genie" }],
  openGraph: {
    title: "Build with Genie — Ship faster with AI",
    description:
      "A senior pod + AI stack. 14-day MVPs, legacy modernization, AI features. 3–6× faster than a traditional agency.",
    type: "website",
    siteName: "Build with Genie",
  },
  twitter: {
    card: "summary_large_image",
    title: "Build with Genie",
    description: "Ship software at Genie speed — without a 30-person team.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Runs before first paint — sets data-theme on <html> to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('genie-theme');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <ThemeProvider>
          <Navbar />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
