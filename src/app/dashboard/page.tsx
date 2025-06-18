'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [role, setRole] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('user_role='))
    const userRole = cookie?.split('=')[1] || null

    if (!userRole) {
      router.push('/login')
      return
    }

    setRole(userRole)
  }, [router])

  const logout = async () => {
  await fetch('/api/logout', { method: 'POST' })

  // Limpar cookies manualmente
  document.cookie = 'user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  document.cookie = 'user_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  document.cookie = 'user_role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

  // Disparar evento global de logout
  window.dispatchEvent(new Event('user-logged-out'))

  // Redirecionar
  router.push('/login')
  router.refresh()
}


  // enquanto o role não for carregado, não renderiza
  if (role === null) return null

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">Área Protegida - {role}</h1>

      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md shadow transition"
      >
        Sair
      </button>
    </main>
  )
}
