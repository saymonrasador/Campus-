import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { name, email, password, role } = await req.json()

  if (!email || !password || !name || !role) {
    return NextResponse.json({ message: 'Todos os campos são obrigatórios!' }, { status: 400 })
  }

  const userExists = await prisma.user.findUnique({ where: { email } })
  if (userExists) {
    return NextResponse.json({ message: 'Usuário já existe!' }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    }


  })

  return NextResponse.json({ message: 'Usuário cadastrado com sucesso!' })
}
