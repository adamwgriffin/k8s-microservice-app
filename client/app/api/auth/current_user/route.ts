import type { NextRequest } from 'next/server'
import type { CurrentUserResponse } from '../../../../types'
import { NextResponse } from 'next/server'
import buildClient from '../../../../lib/build_client'
import { AxiosResponse } from 'axios'

export async function GET(request: NextRequest) {
  // We have to add the headers that came from the middleware request because they include the session cookie. Using the
  // next headers() function does not work since this route is executing on the server
  const client = buildClient(request.headers)
  let response: AxiosResponse<CurrentUserResponse>
  try {
    response = await client.get<CurrentUserResponse>('/api/users/current_user')
  } catch (error) {
    return NextResponse.json(
      { error },
      { status: 500 }
    )
  }
  return NextResponse.json(response.data, { status: response.status })
}
