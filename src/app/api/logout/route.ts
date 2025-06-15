import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ message: 'Logout realizado!' })
  response.cookies.set('user_id', '', {
    path: '/',
    expires: new Date(0),
  })
  return response
}
