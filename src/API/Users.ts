import { useAxios } from '@/Composables/axios.ts'
import type { User } from '@/types/User.ts'

export const useUsers = () => {
  const { execAxios } = useAxios()
  const getUsers = () => {
    return execAxios({
      method: 'GET',
      url: '/api/users',
    })
  }

  const deleteUser = (id: number) => {
    return execAxios({
      method: 'DELETE',
      url: `/api/users/${id}`,
    })
  }

  const createUser = (data: any) => {
    return execAxios({
      method: 'POST',
      url: '/api/users',
      data,
    })
  }

  return { getUsers, deleteUser, createUser }
}
