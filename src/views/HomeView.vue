<script setup lang="ts">
import { ref } from 'vue'

import MegaMenu from 'primevue/megamenu'

const items = ref([{ icon: 'pi pi-home', label: 'Home' }, { label: 'Test2' }])
</script>

<template>
  <MegaMenu :model="items" />
</template>

<style scoped></style>
