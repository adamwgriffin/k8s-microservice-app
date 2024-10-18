import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import type { CurrentUserResponse } from './types'

// Middleware only runs on the edge runtime, which does not support Node.js APIs. This means that we can't use a library
// like Axios to make the request to the auth service, we have to use fetch instead. Unfortunately the fetch API forbids
// certain headers from being altered, even on the server. Our Ingress Nginx reverse proxy requires the "host" header
// from the original request in order to proxy the request to the service correctly, otherwise we get a 404. Since we
// can't use Axios here, we have a separate NextJS route handler that we make a request to instead. Route handlers are
// able to use the Node runtime so we can use Axios there and forward the headers as needed. Doing this auth check
// inside middleware is preferable because it allows more pages to be statically rendered, which is better for
// performance.
export async function middleware(request: NextRequest) {
  try {
    // https://nextjs.org/docs/messages/middleware-relative-urls
    const apiUrl = request.nextUrl.clone()
    apiUrl.pathname = '/api/auth/current_user'
    const response = await fetch(apiUrl)
    const data = (await response.json()) as CurrentUserResponse
    // console.log('Middleware, data:', data)
    if (!data.currentUser) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('callbackUrl', request.nextUrl.toString())
      return NextResponse.redirect(url)
    }
  } catch (error) {
    console.error('Middleware, error:', error)
  }
  // console.log('Middleware, request.nextUrl:', request.nextUrl.toString())
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
