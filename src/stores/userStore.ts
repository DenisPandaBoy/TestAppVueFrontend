import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userStore = defineStore('userStore', () => {
  const id = ref(0)
  const name = ref('')

  function setName(nameInput: string) {
    name.value = nameInput
  }

  function setId(idInput: number) {
    id.value = idInput
  }

  return { id, name, setName, setId }
})
