// Função para realizar logout do usuário, limpando cookies e redirecionando para a página de login.
'use client'

import { useRouter } from 'next/navigation'

export async function logout(router: ReturnType<typeof useRouter>) {
  await fetch('/api/logout', { method: 'POST' })

  document.cookie = 'user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  document.cookie = 'user_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  document.cookie = 'user_role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

  window.dispatchEvent(new Event('user-logged-out'))
  router.push('/login')
  router.refresh?.()
}
