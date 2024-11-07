// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("isAuthenticated")?.value === "true";

  console.log("Middleware - isAuthenticated cookie:", isAuthenticated);

  if (!isAuthenticated && request.nextUrl.pathname.startsWith("/dashboard")) {
    console.log("Redirecting to /login from middleware");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Protects all dashboard routes and subpaths
};
