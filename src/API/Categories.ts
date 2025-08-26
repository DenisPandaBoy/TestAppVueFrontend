import { useAxios } from '@/Composables/axios.ts'

export const useCategories = () => {
  const { execAxios } = useAxios()

  const getCategories = () => {
    return execAxios({
      method: 'GET',
      url: '/api/categories',
    })
  }

  const createCategory = (data) => {
    return execAxios({
      method: 'POST',
      url: '/api/categories',
      data: data,
    })
  }

  const updateCategory = (id: number, data) => {
    return execAxios({
      method: 'PATCH',
      url: `/api/categories/${id}`,
      data: data,
    })
  }

  const deleteCategory = (id: number) => {
    return execAxios({
      method: 'DELETE',
      url: `/api/categories/${id}`,
    })
  }

  return { getCategories, createCategory, updateCategory, deleteCategory }
}
