<script setup lang="ts">
import BasicLayout from '@/views/BasicLayout.vue'
import { useOrders } from '@/API/Orders.ts'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import ColumnGroup from 'primevue/columngroup'
import Row from 'primevue/row'
import { onMounted, ref } from 'vue'
import type { Order } from '@/types/Order.ts'
import type { Category } from '@/types/Category.ts'
import { useCategories } from '@/API/Categories.ts'
import router from '@/router'

const { getUsersOrders } = useOrders()
const { getCategories } = useCategories()
const products = ref<Order[]>([])
const categories = ref<Category[]>([])

onMounted(() => {
  getUsersOrders().then((res) => {
    products.value = res.data.data
  })

  getCategories().then((res) => {
    categories.value = res.data.data
  })
})

const getCategory = (id: number) => {
  return categories.value.find((item) => item.id === id)
}
const selectRow = (row: Order) => {
  router.push('/orders/' + row.id)
  console.log(row)
}
</script>

<template>
  <BasicLayout>
    <DataTable :value="products" tableStyle="min-width: 50rem">
      <Column field="id" header="ID"></Column>
      <Column field="order_number" header="OrderNumber"></Column>
      <Column header="Category">
        <template #body="{ data }">
          {{ getCategory(data.category_id)?.name }}
        </template>
      </Column>
      <Column field="due_date" header="Due Date"></Column>
      <Column field="payment_date" header="Payment Date"></Column>
      <Column class="w-24" header="Actions">
        <template #body="{ data }">
          <Button icon="pi pi-search" @click="selectRow(data)" severity="secondary"></Button>
        </template>
      </Column>
    </DataTable>
  </BasicLayout>
</template>
