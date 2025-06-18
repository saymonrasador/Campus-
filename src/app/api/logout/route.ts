// src/app/api/logout/route.ts
import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ message: 'Logout realizado com sucesso!' })
  response.cookies.set('user_id', '', { path: '/', expires: new Date(0) })
  response.cookies.set('user_role', '', { path: '/', expires: new Date(0) })
  return response
}
