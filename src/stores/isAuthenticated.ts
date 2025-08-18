import { ref } from 'vue'
import { defineStore } from 'pinia'
export const isAuthenticated = defineStore('isAuthenticated', () => {
  const state = ref(false)

  function setState(stateInput: boolean) {
    state.value = stateInput
  }

  return { state, setState }
})
