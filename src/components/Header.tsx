'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-blue-800 text-white py-4 px-6 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">Campus+</h1>
      <nav className="flex space-x-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link href="/chat" className="hover:underline">
          Chat
        </Link>
      </nav>
    </header>
  )
}
