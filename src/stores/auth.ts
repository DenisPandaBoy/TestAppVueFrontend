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

  const setUser = (user: User) => {
    user.id = user.id
    user.name = user.name
    user.email = user.email
    user.isAdmin = user.isAdmin
    user.lastName = user.lastName
  }
  const setIsAuthenticated = (isAuthenticatedInput: boolean) =>
    (isAuthenticated.value = isAuthenticatedInput)

  return {
    user,
    firstLetter,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
  }
})
