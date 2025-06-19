// Página de perfil do usuário com informações e ações específicas dependendo o usuário
'use client'

import { useEffect, useState } from 'react'
import ProfileForm from '@/components/ProfileForm'
import CustomButton from '@/components/buttom'

export default function PerfilPage() {
  // Estado para armazenar as informações do usuário
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
  })

  // Efeito para ler cookies e definir o usuário
  useEffect(() => {
    // Função para ler cookies e atualizar o estado do usuário
    const cookies = document.cookie.split('; ').reduce((acc: any, curr) => { 
      const [key, value] = curr.split('=')
      acc[key] = decodeURIComponent(value)
      return acc
    }, {})

    // Definindo o usuário com base nos cookies
    setUser({
      name: cookies.user_name || '',
      email: '', // se quiser exibir, pode puxar via API depois
      role: cookies.user_role || '',
    })
  }, [])

  return (
    <main className="min-h-screen p-8 bg-gray-50 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Meu Perfil</h1>

      <div className="bg-white rounded shadow p-6 w-full max-w-2xl space-y-6">
        {/* DUAS COLUNAS */}
        <div className="flex items-center gap-6">
          {/* IMAGEM */}
          <img
            src="/user-icon.jpg" 
            alt="Foto do perfil"
            className="w-24 h-24 rounded-full border object-cover"
          />

          {/* INFOS */}
          <div>
            <p className="text-lg"><strong>Nome:</strong> {user.name}</p>
            <p className="text-lg"><strong>Função:</strong> {user.role}</p>
          </div>
        </div>

        <hr className="my-4" />

        {/* FORM DE TROCAR SENHA */}
        <ProfileForm />

        {/* AÇÕES EXTRAS PARA ALUNO */}
        {user.role === 'ALUNO' && (
          <div className="mt-6 space-y-2">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Acesso Rápido</h2>
            <div className="flex flex-col space-y-2">
              <CustomButton label="Histórico" />
              <CustomButton label="Matricula" />
             <CustomButton label="Documentos" />
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
