'use client'
import Link from 'next/link'
import '../app/globals.css'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-8">
      <h1 className="text-4xl font-bold text-blue-800 mb-4">Bem-vindo ao Campus+</h1>
      <p className="text-center max-w-md text-gray-700 mb-6">
        Uma plataforma de aprendizado moderna construída com Next.js, Tailwind e Prisma.
      </p>

      <div className="flex space-x-4">
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
      </div>
    </main>
  )
}
