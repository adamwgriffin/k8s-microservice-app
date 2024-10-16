import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import buildClient from './lib/build_client'
import { CurrentUserResponse } from './types'

export async function middleware(request: NextRequest) {
  const client = buildClient()
  const { data } = await client.get<CurrentUserResponse>(
    '/api/users/current_user'
  )
  if (!data.currentUser) {
    // https://nextjs.org/docs/messages/middleware-relative-urls
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.rewrite(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
