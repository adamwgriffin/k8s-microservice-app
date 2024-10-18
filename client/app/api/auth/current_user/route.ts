import type { CurrentUserResponse } from '../../../../types'
import { NextResponse } from 'next/server'
import buildClient from '../../../../lib/build_client'
import { AxiosResponse } from 'axios'

export async function GET() {
  const client = buildClient()
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
