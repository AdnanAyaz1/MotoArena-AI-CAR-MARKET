import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;
  
  const isAuthPage = pathname.startsWith("/sign-in") || 
                     pathname.startsWith("/sign-up");
  const isApiRoute = pathname.startsWith("/api");

  // Allow API routes
  if (isApiRoute) {
    return NextResponse.next();
  }

  // Allow auth pages without any redirect
  if (isAuthPage) {
    // Redirect logged in users from auth pages to home
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // Allow public routes without auth
  const isPublicRoute = pathname === "/" || pathname.startsWith("/cars");
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Protect all other routes - require authentication
  if (!isLoggedIn) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/|robots.txt|sitemap.xml).*)",
  ],
};
