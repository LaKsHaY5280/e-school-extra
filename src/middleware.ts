import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Log the requested path and query parameters
//   console.log('Request path:', request.nextUrl.pathname);
//   console.log('Query params:', Object.fromEntries(request.nextUrl.searchParams.entries()));
  
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
}; 