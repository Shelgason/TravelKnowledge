import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Block test pages in production
  if (process.env.NODE_ENV === 'production') {
    const testRoutes = [
      '/debug',
      '/map-links-test',
      '/map-snippet-test',
      '/practical-info-test',
      '/api/env-debug',
    ];

    if (testRoutes.some(route => pathname.startsWith(route))) {
      return new NextResponse('Not Found', { status: 404 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
