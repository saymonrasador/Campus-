'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()
  const [userName, setUserName] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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

  const handleUserLogin = () => {
    readCookies()
  }

  window.addEventListener('user-logged-in', handleUserLogin)
  window.addEventListener('user-logged-out', handleUserLogin)

  return () => {
    window.removeEventListener('user-logged-in', handleUserLogin)
    window.removeEventListener('user-logged-out', handleUserLogin)
  }
  }, [])

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    document.cookie = 'user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = 'user_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = 'user_role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    window.dispatchEvent(new Event('user-logged-out'))
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="bg-blue-800 text-white py-4 px-6 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">Campus+</h1>

      <nav className="flex items-center space-x-4">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/chat">Chat</Link>

        {isLoggedIn ? (
          <>
            <span className="text-sm italic">Olá, {userName}!</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
            >
              Sair
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="bg-white text-blue-800 px-3 py-1 rounded text-sm hover:bg-blue-100"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-white text-blue-800 px-3 py-1 rounded text-sm hover:bg-blue-100"
            >
              Cadastrar
            </Link>
          </>
        )}
      </nav>
    </header>
  )
}
