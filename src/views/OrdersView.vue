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

const { getUsersOrders } = useOrders()
const products = ref<Order[]>([])

onMounted(() => {
  getUsersOrders().then((res) => {
    products.value = res.data.data
  })
})

const selectRow = (row: Order) => {
  console.log(row)
}
</script>

<template>
  <BasicLayout>
    <DataTable :value="products" tableStyle="min-width: 50rem">
      <Column field="id" header="ID"></Column>
      <Column field="order_number" header="OrderNumber"></Column>
      <Column field="category_id" header="Category"></Column>
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
