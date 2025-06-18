import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    return NextResponse.json({ message: 'Usuário não encontrado.' }, { status: 404 })
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return NextResponse.json({ message: 'Senha incorreta.' }, { status: 401 })
  }

  const response = NextResponse.json({ message: 'Login realizado com sucesso!' })

  // Salva o ID do usuário em cookie
  response.cookies.set('user_id', user.id.toString(), {
    httpOnly: false,
    path: '/',
  });
  response.cookies.set('user_name', user.name, {
    path: '/',
  });
  response.cookies.set('user_role', user.role, {
    path: '/',
  });

  return response;
}
