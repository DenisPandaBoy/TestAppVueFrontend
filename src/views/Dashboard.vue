<script setup lang="ts">
import BasicLayout from '@/views/BasicLayout.vue'
import { onMounted } from 'vue'
import { preloaderStore } from '@/stores/preloader.ts'

const { setLoaded } = preloaderStore()
onMounted(() => {
  setLoaded(true)
})
</script>

<template>
  <BasicLayout>
    <div>Dashboard</div>
  </BasicLayout>
</template>
