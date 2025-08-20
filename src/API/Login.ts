import router from '@/router'
import { useAxios } from '@/components/axios.ts'
import { getCsrfCookie } from '@/API/CsrfCookie.ts'

export const login = (email: string, password: string) => {
  const loginRequest = useAxios()

  return getCsrfCookie()
    .then(() => {
      loginRequest
        .request({
          method: 'POST',
          url: '/login',
          data: {
            email: email,
            password: password,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            router.push('dashboard')
          }
        })
    })
    .catch((err) => {
      console.log(err)
      throw err
    })
}
