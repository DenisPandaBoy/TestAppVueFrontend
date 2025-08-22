import { useAxios } from '@/Composables/axios.ts'
import type { OrderItem } from '@/types/OrderItem.ts'

export const useOrderItems = () => {
  const { execAxios } = useAxios()

  const getOrderItems = (orderId: number) => {
    return execAxios({
      method: 'GET',
      url: `/api/order-items/${orderId}`,
    })
  }

  const deleteOrderItem = (id: number) => {
    return execAxios({
      method: 'DELETE',
      url: `/api/order-items/${id}`,
    })
  }

  const createOrderItem = (id: number, data: OrderItem) => {
    return execAxios({
      method: 'POST',
      url: `/api/order-items/store/${id}`,
      data: data,
    })
  }

  const updateOrderItem = (id: number, data: any) => {
    return execAxios({
      method: 'PATCH',
      url: `/api/order-items/${id}`,
      data: data,
    })
  }

  return { getOrderItems, deleteOrderItem, createOrderItem, updateOrderItem }
}
