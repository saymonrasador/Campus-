// Componente de cabeçalho com menu dropdown e autenticação
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Definição do componente DropdownMenu
const DropdownMenu = ({
  items,
  className = '',
}: {
  items: string[]
  className?: string
}) => {
  const [open, setOpen] = useState(false) // Estado para controlar a visibilidade do menu dropdown
  const [selected, setSelected] = useState(items[0]) // Estado para o item selecionado

  // Função para fechar o menu ao clicar fora
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="bg-white text-blue-800 px-3 py-1 rounded hover:bg-blue-100 flex items-center justify-between min-w-[160px] text-sm"
      >
        <span>{selected}</span>
        <span className="ml-2 text-blue-600 text-sm">
          {open ? '▬' : '▼'}
        </span>
      </button>

      {/* Dropdown items */}
      {open && (
        <div className="absolute z-20 bg-white border mt-1 rounded shadow-md w-full">
          {items.map((item) => (
            <div
              key={item}
              onClick={() => {
                setSelected(item)
                setOpen(false)
              }}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Componente de cabeçalho principal
export default function Header() {
  const router = useRouter() 
  const [userName, setUserName] = useState('') // Nome do usuário
  const [role, setRole] = useState('') // Papel do usuário (ex: ALUNO, PROFESSOR, etc.)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Estado de autenticação do usuário
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) // Estado para controle do menu mobile

  // Função para ler cookies e atualizar o estado de autenticação
  const readCookies = () => {
    const cookies = document.cookie.split('; ').reduce((acc: any, curr) => {
      const [key, value] = curr.split('=')
      acc[key] = decodeURIComponent(value)
      return acc
    }, {})

    if (cookies.user_id) {
      setIsLoggedIn(true)
      setUserName(cookies.user_name || 'Usuário')
      setRole(cookies.user_role || '')
    } else {
      setIsLoggedIn(false)
    }
  }

  // Efeito para ler cookies ao montar o componente e atualizar com eventos de login/logout
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

  // Função para lidar com logout
  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    document.cookie = 'user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = 'user_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = 'user_role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    window.dispatchEvent(new Event('user-logged-out'))
    router.push('/login')
  }

  // Renderização do cabeçalho
  return (
    <header className="bg-blue-800 text-white py-4 px-6 flex justify-between items-center shadow relative z-30">
      <Link href="/">
        <h1 className="text-xl font-bold">Campus+</h1>
      </Link>

      <div className="flex items-center gap-4">
        {/* Always show dropdowns */}
        {isLoggedIn && ['PROFESSOR', 'ALUNO', 'COORDENADOR', 'SECRETARIA'].includes(role) && (
          <>
            <DropdownMenu
              className="text-black"
              items={['Engenharia de Software', 'Análise de Sistemas']}
            />
            <DropdownMenu
              className="text-black"
              items={['Banco de Dados', 'Qualidade de Software', 'Projeto Temático I']}
            />
          </>
        )}

        {/* Burger Menu para Mobile */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="text-2xl font-bold">≡</span>
        </button>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <span>🔔</span>
          <span>💬</span>
          <Link href="/eventos">Eventos</Link>

          {isLoggedIn && (
            <>
              <span className="italic text-sm text-gray-400">Olá, {role}!</span>
              <Link href="/perfil" className="flex items-center space-x-2">
                <span>Meu Perfil</span>
                <img
                  src="/user-icon.jpg"
                  alt="Foto do perfil"
                  className="w-8 h-8 rounded-full border object-cover"
                />
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
              >
                Sair
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Mobile menu drawer */}
      {isMobileMenuOpen && (
        <div className="absolute top-full right-0 w-64 bg-white text-blue-800 shadow-lg p-4 flex flex-col gap-3 md:hidden z-40">
          {isLoggedIn && (
            <>
              <span className="italic text-sm text-gray-400">Olá, {role}!</span>
              <Link href="/perfil" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-2">
                <span>Meu Perfil</span>
                <img
                  src="/user-icon.jpg"
                  alt="Foto do perfil"
                  className="w-8 h-8 rounded-full border object-cover"
                />
              </Link>
            </>
          )}
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
          <Link href="/eventos" onClick={() => setIsMobileMenuOpen(false)}>Eventos</Link>
          <span>🔔</span>
          <span>💬</span>

          {isLoggedIn && (
            <>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  handleLogout()
                }}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm text-white"
              >
                Sair
              </button>
            </>
          )}
        </div>
      )}
    </header>
  )
}
