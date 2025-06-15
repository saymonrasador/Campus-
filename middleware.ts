import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware de proteção
export function middleware(request: NextRequest) {
  const userId = request.cookies.get('user_id')?.value

  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard')

  if (isProtectedRoute && !userId) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// Define quais rotas o middleware vai proteger
export const config = {
  matcher: ['/dashboard/:path*'],
}
