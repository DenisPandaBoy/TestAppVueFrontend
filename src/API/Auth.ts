import { useAxios } from '@/Composables/axios.ts'
import router from '@/router'
import { authStore } from '@/stores/auth.ts'

export const useAuth = () => {
  const auth = authStore()
  const { execAxios } = useAxios()

  const getCsrfCookie = () => {
    return execAxios({
      method: 'GET',
      url: '/sanctum/csrf-cookie',
    })
  }
  const getUser = () => {
    return execAxios({
      method: 'GET',
      url: 'api/user',
    })
  }

  const login = (email: string, password: string) => {
    return getCsrfCookie().then(() => {
      return execAxios({
        method: 'POST',
        url: '/login',
        data: {
          email: email,
          password: password,
        },
      }).then((res) => {
        if (res.status === 200) {
          router.push('/')
        }
      })
    })
  }

  const checkAuth = async (): Promise<boolean> => {
    if (auth.isAuthenticated) return true

    await getCsrfCookie()
      .then(() =>
        getUser().then((response) => {
          auth.setIsAuthenticated(true)
          auth.setUser({
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            isAdmin: response.data.is_admin,
            lastName: response.data.last_name,
          })
        }),
      )
      .catch((err) => {
        auth.setIsAuthenticated(false)
        throw err
      })
    return auth.isAuthenticated
  }

  return { getCsrfCookie, getUser, checkAuth, login }
}
