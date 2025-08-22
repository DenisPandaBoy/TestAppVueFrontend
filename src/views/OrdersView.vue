<script setup lang="ts">
import BasicLayout from '@/views/BasicLayout.vue'
import { useOrders } from '@/API/Orders.ts'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { onMounted, reactive, ref } from 'vue'
import type { Order } from '@/types/Order.ts'
import type { Category } from '@/types/Category.ts'
import { useCategories } from '@/API/Categories.ts'
import router from '@/router'
import { useConfirm } from 'primevue/useconfirm'
import Dialog from 'primevue/dialog'
import ConfirmDialog from 'primevue/confirmdialog'
import Select from 'primevue/select'
import DatePicker from 'primevue/datepicker'
import { useDateFormatter } from '@/Composables/DateFormatter.ts'

const { getUsersOrders, createOrder } = useOrders()
const { getCategories } = useCategories()
const { formatDateForBackend } = useDateFormatter()
const products = ref<Order[]>([])
const categories = ref<Category[]>([])
const confirm = useConfirm()
const editOrderDialogVisible = ref(false)
const createOrderDialogVisible = ref(false)

const createFormData = reactive({
  category: {},
  due_date: {},
  payment_date: {},
})

onMounted(() => {
  loadData()

  getCategories().then((res) => {
    categories.value = res.data.data
  })
})

const loadData = () => {
  getUsersOrders().then((res) => {
    products.value = res.data.data
  })
}

const getCategory = (id: number) => {
  return categories.value.find((item) => item.id === id)
}
const selectRow = (row: Order) => {
  router.push('/orders/' + row.id)
  console.log(row)
}

const createOrderSubmit = () => {
  createOrder({
    category_id: createFormData.category.id,
    due_date: formatDateForBackend(createFormData.due_date),
    payment_date: formatDateForBackend(createFormData.payment_date),
  }).then(loadData)
  createOrderDialogVisible.value = false
}
</script>

<template>
  <BasicLayout>
    <Button
      icon="pi pi-file-plus"
      @click="createOrderDialogVisible = true"
      severity="info"
    ></Button>
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
    <ConfirmDialog></ConfirmDialog>
    <Dialog
      v-model:visible="createOrderDialogVisible"
      modal
      header="Edit Profile"
      position="left"
      :style="{ width: '25rem' }"
    >
      <span class="text-surface-500 dark:text-surface-400 block mb-8"
        >Update your information.</span
      >
      <div class="card flex justify-center">
        <label for="category" class="font-semibold w-24">Category</label>
        <Select
          id="category"
          v-model="createFormData.category"
          :options="categories"
          optionLabel="name"
          placeholder="Select a Category"
          class="w-full md:w-56"
        />
      </div>
      <div class="card flex justify-center">
        <label for="due_date" class="font-semibold w-24">Due date</label>
        <DatePicker v-model="createFormData.due_date" id="due_date" />
      </div>
      <div class="card flex justify-center">
        <label for="payment_date" class="font-semibold w-24">Payment Date</label>
        <DatePicker v-model="createFormData.payment_date" id="payment_date" />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="createOrderDialogVisible = false"
        ></Button>
        <Button type="button" label="Save" @click="createOrderSubmit"></Button>
      </div>
    </Dialog>
  </BasicLayout>
</template>
