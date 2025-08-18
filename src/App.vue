<script setup lang="ts">
import { useAxios } from '@/axios/axios.ts'
import { isAuthenticated } from '@/stores/isAuthenticated.ts'
import router from '@/router'

const isUserAuthenticated = isAuthenticated()
function csrfToken() {
  useAxios('/sanctum/csrf-cookie', 'get', {}).then(function (response) {
    useAxios('api/user', 'get', {})
      .then(function (responseUser) {
        isUserAuthenticated.setState(responseUser.status === 200)
        if (isUserAuthenticated.state) {
          router.push('/dashboard')
        } else {
          router.push('/login')
        }
      })
      .catch(function (error) {
        isUserAuthenticated.setState(false)
        router.push('/login')
      })
  })
}
csrfToken()
</script>

<template>
  <RouterView />
</template>
