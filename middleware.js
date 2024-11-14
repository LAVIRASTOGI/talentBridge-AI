import { NextResponse } from "next/server";

// Define public routes that don't require authentication
const PUBLIC_ROUTES = ["/sign-in", "/sign-up", "/forgot-password", "/"];

// // Define routes that require specific roles (optional)
// const PROTECTED_ROUTES = {
//   "/admin": ["admin"],
//   "/dashboard": ["user", "admin"]
// };

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if the requested route is public

  // If it's a public route, allow access
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // Get authentication token from cookies
  const authToken = request.cookies.get("authToken") || "123";
  //from local Stoarge get token

  // If no auth token is present, redirect to sign-in
  if (!authToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // Optional: Role-based access control
  // const userRole = request.cookies.get("userRole")?.value;

  // // Check if the current route requires specific roles
  // const requiredRoles = PROTECTED_ROUTES[pathname];
  // if (requiredRoles && !requiredRoles.includes(userRole)) {
  //   // Redirect to unauthorized page or dashboard
  //   const url = request.nextUrl.clone();
  //   url.pathname = "/unauthorized";
  //   return NextResponse.redirect(url);
  // }

  // Allow the request to proceed
  return NextResponse.next();
}

// Configure which routes should be handled by middleware
export const config = {
  matcher: [
    /*
     * Match all routes except for:
     * 1. /api (API routes)
     * 2. /_next (Next.js internals)
     * 3. /static (static files)
     * 4. /*.{png,jpg,gif} (image files)
     */
    "/((?!api|_next|static|.*\\..*|_vercel).*)",
  ],
};
