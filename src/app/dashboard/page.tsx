'use client'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const [role, setRole] = useState('')

  useEffect(() => {
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('user_role='))
    const userRole = cookie?.split('=')[1]
    setRole(userRole || '')
  }, [])

  const commonButtons = (
    <>
      <Button label="Curso" />
      <Button label="Eventos Acadêmicos" />
      <Button label="Chat de Mensagem" />
    </>
  )

  const alunoButtons = (
    <>
      <Button label="Matrícula" />
      <Button label="Histórico Escolar" />
      <Button label="Documentos" />
      <Button label="Calendário Acadêmico" />
    </>
  )

  const extraButtons = <Button label="Disciplinas" />

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 space-y-4">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Área Protegida - {role}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
        {commonButtons}
        {role === 'ALUNO' && alunoButtons}
        {['PROFESSOR', 'COORDENADOR', 'SECRETARIA'].includes(role) && extraButtons}
      </div>
    </main>
  )
}

function Button({ label }: { label: string }) {
  return (
    <button className="bg-blue-700 hover:bg-blue-800 text-white w-full py-3 rounded-md shadow transition text-center">
      {label}
    </button>
  )
}
