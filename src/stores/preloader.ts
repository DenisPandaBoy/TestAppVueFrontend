import { defineStore } from 'pinia'
import { ref } from 'vue'

export const preloaderStore = defineStore('preloader', () => {
  const loaded = ref<boolean>(false)

  const setLoaded = (value: boolean): void => {
    loaded.value = value
  }

  return { loaded, setLoaded }
})
