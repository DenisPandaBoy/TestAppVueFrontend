import { authStore } from '@/stores/auth.ts'
import { getCsrfCookie } from '@/API/CsrfCookie.ts'
import { getUser } from '@/API/GetUser.ts'

export function useAuth() {
  const auth = authStore()

  const checkAuth: () => Promise<boolean> = async () => {
    if (auth.isAuthenticated) return true

    await getCsrfCookie()
      .then(() =>
        getUser().then((response) => {
          auth.setIsAuthenticated(true)
          auth.setId(response.data.id)
          auth.setName(response.data.name)
          auth.setEmail(response.data.email)
          auth.setLastName(response.data.last_name)
          auth.setIsAdmin(response.data.is_admin)
        }),
      )
      .catch((err) => {
        auth.setIsAuthenticated(false)
        throw err
      })
    return auth.isAuthenticated
  }

  return { checkAuth }
}
