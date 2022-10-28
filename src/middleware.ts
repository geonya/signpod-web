import { NextRequest, NextResponse } from 'next/server'
import { JWT_TOKEN } from './constants'

export function middleware(req: NextRequest) {
  const token = req.cookies.get(JWT_TOKEN)

  return NextResponse.next()
}
export const config = {
  matcher: '/:path*',
}
