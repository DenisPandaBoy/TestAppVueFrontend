import { useAxios } from '@/components/axios.ts'

export const getUser = () => {
  const axios = useAxios()
  return axios.request({
    method: 'GET',
    url: 'api/user',
  })
}
