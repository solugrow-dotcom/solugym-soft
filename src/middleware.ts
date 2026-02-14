import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Cloudflare Pages + Next.js ke liye middleware ko Node runtime par force karna
export const config = {
  runtime: "nodejs",
  matcher: ["/dashboard/:path*"],
};

export async function middleware(req: NextRequest) {
  // Abhi ke liye simple pass-through middleware
  return NextResponse.next();
}