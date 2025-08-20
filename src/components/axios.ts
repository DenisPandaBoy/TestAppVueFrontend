import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { ref } from 'vue'
import { authStore } from '@/stores/auth.ts'
import { useRoute } from 'vue-router'

export const useAxios = () => {
  const auth = authStore()
  const loading = ref(false)

  const request: (config: AxiosRequestConfig) => Promise<AxiosResponse<any, any>> = async (
    config,
  ) => {
    loading.value = true

    return axios({
      baseURL: 'http://localhost',
      withCredentials: true,
      withXSRFToken: true,
      ...config,
    })
      .catch((err) => {
        const route = useRoute()
        if (err.response?.status === 401) {
          if (route.name === 'login') {
            auth.setIsAuthenticated(false)
          }
        }

        throw err
      })
      .finally(() => {
        loading.value = false
      })
  }

  return { loading, request }
}
