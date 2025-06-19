// Formulário para atualizar a senha do usuário
'use client'

import { useState } from 'react'

export default function ProfileForm() {
  const [newPassword, setNewPassword] = useState('') // Campo para nova senha
  const [confirmPassword, setConfirmPassword] = useState('') // Campo para confirmar nova senha
  const [message, setMessage] = useState('') // Mensagem de feedback ao usuário

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      setMessage('As senhas não coincidem.')
      return
    }

    const userId = document.cookie
      .split('; ')
      .find((c) => c.startsWith('user_id='))
      ?.split('=')[1]

    if (!userId) {
      setMessage('Usuário não identificado.')
      return
    }

    const res = await fetch('/api/perfil/update-password', {
      method: 'POST',
      body: JSON.stringify({ userId: Number(userId), newPassword }),
    })

    const data = await res.json()
    setMessage(data.message || 'Erro ao atualizar a senha.')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold text-blue-700">Alterar Senha</h2>

       <input
          type="password"
          placeholder="Nova senha"
          className="block w-1/2 border border-gray-300 rounded px-3 py-2"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirmar nova senha"
          className="block w-1/2 border border-gray-300 rounded px-3 py-2"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="block w-1/4 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
        >
          Atualizar Senha
        </button>

      {message && <p className="text-sm text-gray-700 mt-2">{message}</p>}
    </form>
  )
}
