// Componente de botão reutilizável com suporte a links e classes personalizadas
'use client'

import React from 'react'
import Link from 'next/link'

// Definição das propriedades do botão
interface CustomButtonProps {
  label: string
  onClick?: () => void
  href?: string
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export default function CustomButton({
  label,
  onClick,
  href,
  className = '',
  type = 'button',
}: CustomButtonProps) {
  const baseClasses =
    'bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded transition'

  // Se tiver href, retorna Link com classe de botão
  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${className}`}>
        {label}
      </Link>
    )
  }

  // Caso contrário, botão normal
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${className}`}
    >
      {label}
    </button>
  )
}
