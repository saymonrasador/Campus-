'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(form),
    })
    const data = await res.json()

    if (res.ok) {
      router.push('/dashboard')
    } else {
      setMessage(data.message)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-8">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 p-3 w-full rounded-md"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Senha"
          className="border border-gray-300 p-3 w-full rounded-md"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white p-3 w-full rounded-md transition">
          Entrar
        </button>
        {message && <p className="text-center text-sm text-gray-600">{message}</p>}
        <p className="text-center text-sm mt-2">
          Ainda não tem conta?{' '}
          <Link href="/register" className="text-blue-700 underline">
            Cadastrar
          </Link>
        </p>
      </form>
    </main>
  )
}
