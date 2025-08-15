<script setup lang="ts">
import axios from 'axios'
function csrfToken() {
  axios.get('http://localhost:80/sanctum/csrf-cookie')
  axios.defaults.withCredentials = true
  axios.defaults.withXSRFToken = true
}
csrfToken()
</script>

<template>
  <RouterView />
</template>
