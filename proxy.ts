import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE = "admin_session";
const SECRET = process.env.AUTH_SECRET ?? "fallback-secret";

function b64urlToBytes(str: string): Uint8Array {
  const padded = str + "=".repeat((4 - (str.length % 4)) % 4);
  const base64 = padded.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function verifySession(token: string): Promise<boolean> {
  try {
    const dot = token.lastIndexOf(".");
    if (dot === -1) return false;
    const data = token.slice(0, dot);
    const sig = token.slice(dot + 1);
    if (!data || !sig) return false;

    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      b64urlToBytes(sig) as BufferSource,
      new TextEncoder().encode(data)
    );
    if (!valid) return false;

    const payload = JSON.parse(new TextDecoder().decode(b64urlToBytes(data)));
    return payload.exp > Date.now();
  } catch {
    return false;
  }
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/admin")) return NextResponse.next();

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-admin-pathname", pathname);

  if (pathname === "/admin/login") {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  const valid = token ? await verifySession(token) : false;

  if (!valid) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/admin/:path*"],
};
