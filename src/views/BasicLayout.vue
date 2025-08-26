<script setup lang="ts">
import MegaMenu from 'primevue/megamenu'
import { ref } from 'vue'
import Avatar from 'primevue/avatar'
import TieredMenu from 'primevue/tieredmenu'
import { useAxios } from '@/Composables/axios.ts'
import router from '@/router'
import { authStore } from '@/stores/auth.ts'

const auth = authStore()
const { execAxios } = useAxios()
const logout = (): void => {
  execAxios({
    method: 'POST',
    url: 'logout',
  }).then(() => router.push('/login'))
}
const redirectToUserProfile = (): void => {
  router.push('/profile')
}

const redirectToDashBoard = (): void => {
  router.push('/')
}

const redirectToOrders = (): void => {
  router.push('/orders')
}

const redirectToCategories = (): void => {
  router.push('/categories')
}

const items = ref([
  { icon: 'pi pi-home', label: 'Home', command: redirectToDashBoard },
  { icon: 'pi pi-shopping-bag', label: 'Orders', command: redirectToOrders },
  { icon: 'pi pi-folder', label: 'Categories', command: redirectToCategories },
])
const tieredItems = ref([
  { icon: 'pi pi-id-card', label: 'Profile', command: redirectToUserProfile },
  { icon: 'pi pi-power-off', label: 'Logout', command: logout },
])

const menu = ref()
const toggle = (event: MouseEvent): void => {
  menu.value.toggle(event)
}
</script>

<template>
  <div class="flex flex-row justify-between">
    <MegaMenu :model="items" />
    <Avatar
      :label="auth.firstLetter"
      class="mr-2"
      size="xlarge"
      shape="circle"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="overlay_tmenu"
    />
  </div>
  <TieredMenu ref="menu" id="overlay_tmenu" :model="tieredItems" popup />
  <slot />
</template>
