import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { userId, newPassword } = await req.json()

  if (!userId || !newPassword) {
    return NextResponse.json({ message: 'Dados incompletos.' }, { status: 400 })
  }

  const hashed = await bcrypt.hash(newPassword, 10)

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashed },
  })

  return NextResponse.json({ message: 'Senha atualizada com sucesso!' })
}
