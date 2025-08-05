import { NextResponse } from 'next/server';
import { verifyToken } from './src/lib/auth';

export function middleware(request) {
  // Check if this is a protected route
  const protectedRoutes = ['/dashboard', '/api/student', '/api/fees'];
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
    '/api/student/:path*',
    '/api/fees/:path*'
  ]
};
