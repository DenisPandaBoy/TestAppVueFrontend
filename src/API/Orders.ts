import { useAxios } from '@/Composables/axios.ts'

export const useOrders = () => {
  const { execAxios } = useAxios()
  const getUsersOrders = () => {
    return execAxios({
      method: 'GET',
      url: '/api/orders',
    })
  }

  return { getUsersOrders }
}
