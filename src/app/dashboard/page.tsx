// Página de dashboard que verifica o cookie de autenticação e exibe a área protegida
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { logout } from '@/utils/logout'

export default function DashboardPage() {
  const { role, isLoggedIn } = useAuth() // Obtém o papel do usuário e se está logado
  const router = useRouter() 

  // Se não houver papel definido, não renderizar nada
  if (role === null) return null

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">Área Protegida - {role}</h1>

      <button
        onClick={() => logout(router)}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md shadow transition"
      >
        Sair
      </button>
    </main>
  )
}
