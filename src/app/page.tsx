// Página inicial do Campus+ com autenticação e navegação dinâmica
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import CustomButton from '@/components/buttom'
import { logout } from '../utils/logout'
import { useAuth } from '../hooks/useAuth'


export default function HomePage() {
  const { isLoggedIn, userName, role } = useAuth() // Obtém o estado de autenticação e informações do usuário
  const router = useRouter()

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-8">
      <h1 className="text-4xl font-bold text-blue-800 mb-4">Campus+</h1>

      {!isLoggedIn ? (
        <>
          <p className="text-gray-700 text-center max-w-md mb-6">
            Bem-vindo à plataforma Campus+. Gerencie seu aprendizado com Next.js, Tailwind e Prisma.
          </p>

          <div className="flex space-x-4">
            <CustomButton label="Login" href="/login" />
            <CustomButton
              label="Cadastrar"
              href="/register"
              className="bg-blue-700 text-blue-800 border border-blue-700"
            />
          </div>
        </>
      ) : (
        <>
          <p className="text-lg text-gray-700 mb-4">
            Olá, <strong>{userName}</strong>! Você está logado como <strong>{role}</strong>.
          </p>

          <div className="bg-white rounded shadow p-6 w-full max-w-md space-y-4 text-center">
            <p className="text-gray-600">Acesse funcionalidades rápidas:</p>

            {/* Botões por role */}
            {role === 'ALUNO' && (
              <div className="flex flex-col space-y-2">
                <CustomButton label="Perfil" href="/perfil" />
                <CustomButton label="Histórico" />
                <CustomButton label="Matrícula" />
                <CustomButton label="Documentos" />
              </div>
            )}

            {(role === 'PROFESSOR' || role === 'COORDENADOR') && (
              <div className="flex flex-col space-y-2">
                <CustomButton label="Perfil" href="/perfil" />
                <CustomButton label="Painel de Cursos" />
                <CustomButton label="Gestão de Matrícula" />
              </div>
            )}

            {role === 'SECRETARIA' && (
              <div className="flex flex-col space-y-2">
                <CustomButton label="Perfil" href="/perfil" />
                <CustomButton label="Painel de Eventos" />
              </div>
            )}

            <CustomButton
              label="Sair"
              onClick={() => logout(router)}
              className="bg-red-600 w-full"
            />
          </div>
        </>
      )}
    </main>
  )
}