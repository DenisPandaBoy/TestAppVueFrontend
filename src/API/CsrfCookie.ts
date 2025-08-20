import { useAxios } from '@/components/axios.ts'

export const getCsrfCookie = () => {
  const axios = useAxios()
  return axios.request({
    method: 'GET',
    url: '/sanctum/csrf-cookie',
  })
}
