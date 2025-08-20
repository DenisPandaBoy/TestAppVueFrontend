import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import type { User } from '@/types/User.ts'

export const authStore = defineStore('authStore', () => {
  const isAuthenticated = ref(false)
  const firstLetter = computed(() => {
    return user.name[0]
  })
  const user = reactive<User>({
    id: 0,
    name: '',
    lastName: '',
    email: '',
    isAdmin: false,
  })

  const setName = (name: string) => (user.name = name)
  const setId = (id: number) => (user.id = id)
  const setLastName = (lastName: string) => (user.lastName = lastName)
  const setEmail = (email: string) => (user.email = email)
  const setIsAdmin = (isAdmin: boolean) => (user.isAdmin = isAdmin)
  const setIsAuthenticated = (isAuthenticatedInput: boolean) =>
    (isAuthenticated.value = isAuthenticatedInput)

  return {
    user,
    firstLetter,
    setName,
    setId,
    setLastName,
    setEmail,
    setIsAdmin,
    isAuthenticated,
    setIsAuthenticated,
  }
})
