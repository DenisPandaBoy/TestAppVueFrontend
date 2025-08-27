<script setup lang="ts">
import MegaMenu from 'primevue/megamenu'
import { ref } from 'vue'
import Avatar from 'primevue/avatar'
import TieredMenu from 'primevue/tieredmenu'
import { useAxios } from '@/Composables/axios.ts'
import { authStore } from '@/stores/auth.ts'
import ProgressSpinner from 'primevue/progressspinner'
import { preloaderStore } from '@/stores/preloader.ts'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const auth = authStore()
const preloader = preloaderStore()
const router = useRouter()
const { loaded } = storeToRefs(preloader)
const { execAxios } = useAxios()

const logout = (): void => {
  execAxios({
    method: 'POST',
    url: 'logout',
  }).then(() => {
    auth.setIsAuthenticated(false)
    router.push('/login')
  })
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

const redirectToUsers = (): void => {
  router.push('/users')
}

const items = ref([
  { icon: 'pi pi-home', label: 'Home', command: redirectToDashBoard },
  { icon: 'pi pi-shopping-bag', label: 'Orders', command: redirectToOrders },
  { icon: 'pi pi-folder', label: 'Categories', command: redirectToCategories },
  { icon: 'pi pi-user', label: 'Users', command: redirectToUsers },
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
  <div class="fixed h-screen w-screen bg-black" v-if="!loaded">
    <ProgressSpinner class="mx-auto !w-full" />
  </div>

  <slot v-if="loaded" />
</template>
