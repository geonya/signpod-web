import { NextRequest, NextResponse } from 'next/server'
import { JWT_TOKEN } from './constants'

export function middleware(req: NextRequest) {
  const token = req.cookies.get(JWT_TOKEN)
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next()
  }
  if (
    req.nextUrl.pathname.startsWith('/login') ||
    req.nextUrl.pathname.startsWith('/register')
  ) {
    if (token) {
      req.nextUrl.pathname = '/'
      return NextResponse.redirect(req.nextUrl)
    }
  }
  if (
    !req.nextUrl.pathname.startsWith('/login') &&
    !req.nextUrl.pathname.startsWith('/register')
  ) {
    if (!token) {
      req.nextUrl.pathname = '/login'
      return NextResponse.redirect(req.nextUrl)
    }
  }
  return NextResponse.next()
}
export const config = {
  matcher: '/:path*',
}
