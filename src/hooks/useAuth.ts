// Hook para gerenciar autenticação do usuário com cookies
'use client'

import { useState, useEffect } from 'react'

export interface UserAuth {
  userId: string
  userName: string
  role: string
  isLoggedIn: boolean
}

export function useAuth() {
  const [auth, setAuth] = useState<UserAuth>({
    userId: '',
    userName: '',
    role: '',
    isLoggedIn: false,
  })

  const readCookies = () => {
    const cookies = document.cookie.split('; ').reduce((acc: any, curr) => {
      const [key, value] = curr.split('=')
      acc[key] = decodeURIComponent(value)
      return acc
    }, {})

    if (cookies.user_id) {
      setAuth({
        userId: cookies.user_id,
        userName: cookies.user_name || 'Usuário',
        role: cookies.user_role || '',
        isLoggedIn: true,
      })
    } else {
      setAuth({
        userId: '',
        userName: '',
        role: '',
        isLoggedIn: false,
      })
    }
  }

  useEffect(() => {
    readCookies()

    const update = () => readCookies()

    window.addEventListener('user-logged-in', update)
    window.addEventListener('user-logged-out', update)

    return () => {
      window.removeEventListener('user-logged-in', update)
      window.removeEventListener('user-logged-out', update)
    }
  }, [])

  return auth
}
