import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Only apply to admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('paras_admin_token')?.value || request.cookies.get('haven_admin_token')?.value;
    const isLoginPage = pathname === '/admin/login';

    // 1. If trying to access admin dashboard without token, redirect to login
    if (!token && !isLoginPage) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 2. If already logged in and visiting login page, redirect to dashboard
    if (token && isLoginPage) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
