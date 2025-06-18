'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const router = useRouter()

  const readCookies = () => {
    const cookies = document.cookie.split('; ').reduce((acc: any, curr) => {
      const [key, value] = curr.split('=')
      acc[key] = value
      return acc
    }, {})

    if (cookies.user_id) {
      setIsLoggedIn(true)
      setUserName(decodeURIComponent(cookies.user_name || 'Usuário'))
    } else {
      setIsLoggedIn(false)
      setUserName('')
    }
  }

 useEffect(() => {
  readCookies()

  const handleUserChange = () => {
    readCookies()
  }

  window.addEventListener('user-logged-in', handleUserChange)
  window.addEventListener('user-logged-out', handleUserChange)

  return () => {
    window.removeEventListener('user-logged-in', handleUserChange)
    window.removeEventListener('user-logged-out', handleUserChange)
  }
}, [])


  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    document.cookie = 'user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = 'user_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = 'user_role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    window.dispatchEvent(new Event('user-logged-out'))
    router.push('/login')
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-8">
      <h1 className="text-4xl font-bold text-blue-800 mb-4">Bem-vindo ao Campus+</h1>

      {isLoggedIn && (
        <p className="text-gray-700 text-sm mb-4">
          Olá, <strong>{userName}</strong>!
        </p>
      )}

      <p className="text-center max-w-md text-gray-700 mb-6">
        Uma plataforma de aprendizado moderna construída com Next.js, Tailwind e Prisma.
      </p>

      <div className="flex space-x-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md shadow transition"
          >
            Sair
          </button>
        ) : (
          <>
            <Link href="/login">
              <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-md shadow transition">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="bg-white border border-blue-700 text-blue-700 hover:bg-blue-100 px-6 py-2 rounded-md shadow transition">
                Cadastrar
              </button>
            </Link>
          </>
        )}
      </div>
    </main>
  )
}
