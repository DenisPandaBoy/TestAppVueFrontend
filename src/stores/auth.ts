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

  const setUser = (userInput: User) => {
    user.id = userInput.id
    user.name = userInput.name
    user.email = userInput.email
    user.isAdmin = userInput.isAdmin
    user.lastName = userInput.lastName
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
