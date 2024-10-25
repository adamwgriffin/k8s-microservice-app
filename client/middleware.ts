import { type NextRequest, NextResponse } from 'next/server'
import { isProtectedRoute, getCurrentUserFromSession } from './lib/auth'

function redirectToLogin(request: NextRequest) {
  const url = request.nextUrl.clone()
  url.pathname = '/login'
  url.searchParams.set('callbackUrl', request.nextUrl.toString())
  return NextResponse.redirect(url)
}

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('K8s-Microservice-App:Session')?.value
  const currentUser = await getCurrentUserFromSession(session)
  if (!currentUser) {
    return isProtectedRoute(request.nextUrl.pathname)
      ? redirectToLogin(request)
      : NextResponse.next()
  }
  const headers = new Headers(request.headers)
  headers.set('X-Current-User', JSON.stringify(currentUser))
  return NextResponse.next({
    request: {
      headers: headers
    }
  })
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
