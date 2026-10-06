import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Login routes across all portal personas
const LOGIN_ROUTES = [
  "/login",
  "/admin/login",
  "/franchise/login",
  "/org/login",
];

// Routes requiring active authentication
const PROTECTED_PREFIXES = [
  "/app-dashboard",
  "/admin/chat",
  "/dashboard",
];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const accessToken = request.cookies.get("itsoftlab_access_token")?.value;
  const portalType = request.cookies.get("itsoftlab_portal_type")?.value;
  const isAuthenticated = Boolean(accessToken && accessToken.trim().length > 0);

  const isLoginRoute = LOGIN_ROUTES.some(
    (route) => pathname === route || pathname === `${route}/`
  );

  // 1. If user is already authenticated and visits a login page, redirect to app-dashboard
  if (isAuthenticated && isLoginRoute) {
    const targetUrl = new URL("/app-dashboard", request.url);
    if (portalType === "ORGANIZATION") {
      targetUrl.searchParams.set("tab", "org-users");
    }
    return NextResponse.redirect(targetUrl);
  }

  // 2. Check if route is protected
  const isExplicitlyProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (isExplicitlyProtected && !isAuthenticated) {
    // Determine the most appropriate login portal for the redirect
    let targetLogin = "/login";
    if (pathname.startsWith("/admin")) {
      targetLogin = "/admin/login";
    } else if (pathname.startsWith("/franchise")) {
      targetLogin = "/franchise/login";
    } else if (pathname.startsWith("/org")) {
      targetLogin = "/org/login";
    } else if (portalType === "INTERNAL") {
      targetLogin = "/admin/login";
    } else if (portalType === "FRANCHISE") {
      targetLogin = "/franchise/login";
    } else if (portalType === "ORGANIZATION") {
      targetLogin = "/org/login";
    }

    const redirectUrl = new URL(targetLogin, request.url);
    const nextPath = `${pathname}${search}`;
    if (nextPath !== "/" && !nextPath.includes("login")) {
      redirectUrl.searchParams.set("next", nextPath);
    }
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - public asset file extensions (.png, .jpg, .jpeg, .svg, .gif, .webp, .ico, .docx, .json)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|docx|json)).*)",
  ],
};
