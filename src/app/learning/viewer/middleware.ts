import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/learning/viewer') {
    return NextResponse.redirect(new URL('/learning/viewer/1', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/learning/viewer',
}
