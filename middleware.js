import { NextResponse } from 'next/server';
import { verifyToken } from './src/lib/auth';

export function middleware(request) {
  // Admin login page should not be protected
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Check if this is a protected route
  const protectedRoutes = ['/dashboard', '/admin', '/api/student', '/api/admin', '/api/fees', '/admission/submit-fee-slip', '/admission/status'];
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const decoded = verifyToken(token);
      if (!decoded) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/student/:path*',
    '/api/admin/:path*',
    '/api/fees/:path*',
    '/admission/submit-fee-slip',
    '/admission/status',
  ]
};
