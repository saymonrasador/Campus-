'use client'
import { useEffect } from 'react'

type Props = {
  message: string
  onClose: () => void
}

export default function Notification({ message, onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed top-6 right-6 bg-green-600 text-white px-4 py-3 rounded shadow-lg z-50">
      {message}
    </div>
  )
}
