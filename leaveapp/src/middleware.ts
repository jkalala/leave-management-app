// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define public, protected, and ignored routes
const publicRoutes = new Set(['/', '/sign-in', '/sign-up', '/api/auth']);
const protectedRoutes = new Set(['/dashboard', '/account', '/settings']);
const ignoredRoutes = new Set(['/api/health', '/favicon.ico']);

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Skip middleware for ignored routes
  if (ignoredRoutes.has(path)) {
    return NextResponse.next();
  }

  // Handle protected routes
  if (protectedRoutes.has(path)) {
    const token = await getToken({ req: request });
    
    if (!token) {
      // Redirect unauthenticated users to sign-in
      const signInUrl = new URL('/sign-in', request.url);
      signInUrl.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except:
    // - _next/ paths
    // - static files (e.g., .png, .js)
    // - API routes (handled separately)
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    // Explicitly include API routes
    '/(api|trpc)(.*)'
  ]
};