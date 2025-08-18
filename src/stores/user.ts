import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const isAuthenticated = defineStore('isAuthenticated', () => {
  const state = ref(false)

  function setState(stateInput: boolean) {
    state.value = stateInput
  }

  return { state, setState }
})
