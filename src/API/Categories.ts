import { useAxios } from '@/Composables/axios.ts'

export const useCategories = () => {
  const { execAxios } = useAxios()

  const getCategories = () => {
    return execAxios({
      method: 'GET',
      url: '/api/categories',
    })
  }

  return { getCategories }
}
