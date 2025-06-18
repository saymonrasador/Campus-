import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}

const publicRoutes = ['/', '/login', '/register']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // rotas públicas
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // tenta ler cookie user_id
  const userId = request.cookies.get('user_id')?.value

  // se não tiver cookie, manda para login
  if (!userId) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    return NextResponse.redirect(loginUrl)
  }

  // ok, está logado
  return NextResponse.next()
}
