'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Notification from '@/components/Notification'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', role: '' })
  const [message, setMessage] = useState('')
  const [showNotification, setShowNotification] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(form),
    })
    const data = await res.json()

    if (res.ok) {
      setMessage(data.message)
      setShowNotification(true)

      setTimeout(() => {
        router.push('/login')
      }, 5000)
    } else {
      setMessage(data.message)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-8">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Criar Conta</h1>

      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
        <input
          type="text"
          placeholder="Nome"
          className="border border-gray-300 p-3 w-full rounded-md"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
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

        <select
          className="border border-gray-300 p-3 w-full rounded-md"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="">Selecione uma função</option>
          <option value="ALUNO">Aluno</option>
          <option value="PROFESSOR">Professor</option>
          <option value="SECRETARIA">Secretaria</option>
          <option value="COORDENADOR">Coordenador</option>
        </select>

        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white p-3 w-full rounded-md transition"
        >
          Cadastrar
        </button>

        {message && !showNotification && (
          <p className="text-center text-sm text-red-600">{message}</p>
        )}
      </form>

      {showNotification && (
        <Notification message={message} onClose={() => setShowNotification(false)} />
      )}
    </main>
  )
}
