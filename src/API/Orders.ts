import { useAxios } from '@/Composables/axios.ts'

export const useOrders = () => {
  const { execAxios } = useAxios()
  const getUsersOrders = () => {
    return execAxios({
      method: 'GET',
      url: '/api/orders',
    })
  }

  const getOrder = (id: number) => {
    return execAxios({
      method: 'GET',
      url: `/api/orders/${id}`,
    })
  }

  const createOrder = (data: any) => {
    return execAxios({
      method: 'POST',
      url: '/api/orders',
      data: data,
    })
  }

  const editOrder = (id: number, data: any) => {
    return execAxios({
      method: 'PATCH',
      url: `/api/orders/${id}`,
      data: data,
    })
  }

  const deleteOrder = (id: number) => {
    return execAxios({
      method: 'DELETE',
      url: `/api/orders/${id}`,
    })
  }

  return { getUsersOrders, getOrder, createOrder, editOrder, deleteOrder }
}
